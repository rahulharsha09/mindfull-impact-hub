# =============================================================================
#  auto-push.ps1  —  Mindful Impact Hub File Watcher & Auto-Pusher
#  
#  Watches the project folder for ANY file change, then automatically:
#    1. Stages all changes (git add -A)
#    2. Commits with a timestamped message
#    3. Pushes to GitHub main branch
#    → GitHub Actions then auto-deploys to Vercel
#
#  USAGE:
#    1. Fill in your GITHUB_PAT below (needs `repo` scope)
#    2. Open PowerShell in this folder
#    3. Run:  .\auto-push.ps1
#    4. Edit any file and save — the site auto-updates within ~2 minutes!
#
#  STOP:  Press Ctrl+C
# =============================================================================

param(
    [string]$PAT = "YOUR_GITHUB_PAT_HERE"   # <-- paste your token here
)

# ─── Config ───────────────────────────────────────────────────────────────────
$ProjectDir   = $PSScriptRoot
$GitUser      = "rahulharsha09"
$RepoName     = "mindful-impact-hub"
$Branch       = "main"
$DebounceMs   = 3000   # wait 3s after last change before pushing (batches rapid saves)

# ─── Colours ──────────────────────────────────────────────────────────────────
function Log-Info($msg)    { Write-Host "[INFO]  $msg" -ForegroundColor Cyan }
function Log-Ok($msg)      { Write-Host "[OK]    $msg" -ForegroundColor Green }
function Log-Warn($msg)    { Write-Host "[WARN]  $msg" -ForegroundColor Yellow }
function Log-Push($msg)    { Write-Host "[PUSH]  $msg" -ForegroundColor Magenta }
function Log-Error($msg)   { Write-Host "[ERROR] $msg" -ForegroundColor Red }

# ─── Validate PAT ─────────────────────────────────────────────────────────────
if ($PAT -eq "YOUR_GITHUB_PAT_HERE" -or $PAT -eq "") {
    Log-Error "Please set your GitHub PAT at the top of this script, or pass it as:"
    Log-Error "  .\auto-push.ps1 -PAT ghp_your_token_here"
    exit 1
}

# ─── Set authenticated remote ─────────────────────────────────────────────────
Set-Location $ProjectDir
$RemoteUrl = "https://${GitUser}:${PAT}@github.com/${GitUser}/${RepoName}.git"
git remote set-url origin $RemoteUrl 2>$null
if ($LASTEXITCODE -ne 0) {
    git remote add origin $RemoteUrl
}

# ─── Banner ───────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "  ║      Mindful Impact Hub — Auto-Push Watcher         ║" -ForegroundColor Magenta
Write-Host "  ╚══════════════════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""
Log-Info "Watching: $ProjectDir"
Log-Info "Remote:   https://github.com/$GitUser/$RepoName"
Log-Info "Debounce: ${DebounceMs}ms after last change"
Log-Info "Press Ctrl+C to stop."
Write-Host ""

# ─── File System Watcher ──────────────────────────────────────────────────────
$Watcher = New-Object System.IO.FileSystemWatcher
$Watcher.Path                  = $ProjectDir
$Watcher.IncludeSubdirectories = $true
$Watcher.EnableRaisingEvents   = $true
$Watcher.NotifyFilter          = [System.IO.NotifyFilters]::LastWrite `
                               -bor [System.IO.NotifyFilters]::FileName `
                               -bor [System.IO.NotifyFilters]::DirectoryName

# Ignore these paths (don't push node_modules, .next, .git)
$IgnorePatterns = @(
    '\.git',
    'node_modules',
    '\.next',
    'out',
    '\.DS_Store',
    'Thumbs\.db',
    '\.log$'
)

$PendingPush = $false
$LastChangeTime = [DateTime]::MinValue

$OnChange = {
    $path = $Event.SourceEventArgs.FullPath

    # Check ignore patterns
    foreach ($pattern in $IgnorePatterns) {
        if ($path -match $pattern) { return }
    }

    $script:PendingPush = $true
    $script:LastChangeTime = [DateTime]::Now
    Log-Info "Change detected: $($path.Replace($ProjectDir, '').TrimStart('\'))"
}

Register-ObjectEvent $Watcher Changed -Action $OnChange | Out-Null
Register-ObjectEvent $Watcher Created -Action $OnChange | Out-Null
Register-ObjectEvent $Watcher Deleted -Action $OnChange | Out-Null
Register-ObjectEvent $Watcher Renamed -Action $OnChange | Out-Null

# ─── Push Function ────────────────────────────────────────────────────────────
function Push-Changes {
    Set-Location $ProjectDir

    # Check if there are actual changes
    $status = git status --porcelain
    if (-not $status) {
        Log-Warn "No changes to commit."
        return
    }

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMsg = "auto: update $timestamp"

    Log-Push "Staging all changes..."
    git add -A

    Log-Push "Committing: '$commitMsg'"
    git commit -m $commitMsg

    if ($LASTEXITCODE -ne 0) {
        Log-Warn "Nothing to commit (already up to date)."
        return
    }

    Log-Push "Pushing to github.com/$GitUser/$RepoName (main)..."
    git push origin $Branch

    if ($LASTEXITCODE -eq 0) {
        Log-Ok "Pushed! GitHub Actions will now auto-deploy to Vercel."
        Log-Ok "Live URL: https://$RepoName.vercel.app  (ready in ~1 min)"
        Write-Host ""
    } else {
        Log-Error "Push failed. Check your PAT and network connection."
    }
}

# ─── Main Loop ────────────────────────────────────────────────────────────────
Log-Ok "Watcher active — edit and save any file to trigger auto-push!"
Write-Host ""

try {
    while ($true) {
        Start-Sleep -Milliseconds 500

        # Process queued FileSystemWatcher events
        [System.Threading.Thread]::Sleep(100)
        $events = Get-Event -ErrorAction SilentlyContinue
        if ($events) {
            foreach ($e in $events) {
                Handle-Event $e -ErrorAction SilentlyContinue
            }
            Remove-Event * -ErrorAction SilentlyContinue
        }

        # Debounce: push only when no new changes for $DebounceMs
        if ($PendingPush) {
            $elapsed = ([DateTime]::Now - $LastChangeTime).TotalMilliseconds
            if ($elapsed -ge $DebounceMs) {
                $PendingPush = $false
                Push-Changes
            }
        }
    }
}
finally {
    # Cleanup on Ctrl+C
    $Watcher.EnableRaisingEvents = $false
    $Watcher.Dispose()
    Get-EventSubscriber | Unregister-Event -Force
    Write-Host ""
    Log-Warn "Watcher stopped."
}
