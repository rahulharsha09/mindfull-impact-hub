#!/usr/bin/env bash
# =============================================================================
#  deploy.sh — Mindful Impact Hub · GitHub Automation Script
#  Usage: bash deploy.sh
# =============================================================================
#
#  PREREQUISITES
#  ─────────────
#  1. Git installed  (git --version)
#  2. curl installed (curl --version)
#  3. A GitHub Personal Access Token (PAT) with the "repo" scope.
#     Create one at: https://github.com/settings/tokens/new
#     Required scopes: ✅ repo (Full control of private repositories)
#
# =============================================================================

set -euo pipefail

# ─── CONFIGURATION (FILL IN BEFORE RUNNING) ───────────────────────────────────

GITHUB_USERNAME="rahulharsha09"                  # ← Your GitHub username
GITHUB_PAT="YOUR_PERSONAL_ACCESS_TOKEN"         # ← Replace with your GitHub PAT
REPO_NAME="mindful-impact-hub"                  # ← Repository name (change if desired)
REPO_DESCRIPTION="A mental-health-aware charity, volunteer, and impact dashboard built with Next.js 15 + Zustand"
REPO_PRIVATE=false                              # ← true = private repo, false = public

# ─── COLOURS ──────────────────────────────────────────────────────────────────

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
RESET='\033[0m'
BOLD='\033[1m'

log()     { echo -e "${BLUE}[INFO]${RESET}  $*"; }
success() { echo -e "${GREEN}[OK]${RESET}    $*"; }
warn()    { echo -e "${YELLOW}[WARN]${RESET}  $*"; }
error()   { echo -e "${RED}[ERROR]${RESET} $*"; exit 1; }
section() { echo -e "\n${BOLD}${BLUE}══ $* ══${RESET}\n"; }

# ─── GUARD CHECKS ─────────────────────────────────────────────────────────────

section "Preflight Checks"

[[ "$GITHUB_USERNAME" == "YOUR_GITHUB_USERNAME" ]] && \
  error "Please set GITHUB_USERNAME at the top of this script."

[[ "$GITHUB_PAT" == "YOUR_PERSONAL_ACCESS_TOKEN" ]] && \
  error "Please set GITHUB_PAT at the top of this script."

command -v git  >/dev/null 2>&1 || error "git is not installed. Install from https://git-scm.com"
command -v curl >/dev/null 2>&1 || error "curl is not installed."
command -v npm  >/dev/null 2>&1 || error "npm is not installed. Install Node.js from https://nodejs.org"

success "All tools available (git, curl, npm)"

# ─── STEP 1: RESOLVE WORKING DIRECTORY ────────────────────────────────────────

section "Step 1 — Locate Project Root"

# The script should be placed in the mindful-impact-hub root.
# If you run it from a parent directory, cd into the project first.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

if [[ ! -f "$PROJECT_DIR/package.json" ]]; then
  error "package.json not found in $PROJECT_DIR. Run this script from the project root."
fi

cd "$PROJECT_DIR"
log "Working directory: $PROJECT_DIR"
success "Project root confirmed"

# ─── STEP 2: INSTALL DEPENDENCIES & VERIFY BUILD ──────────────────────────────

section "Step 2 — Install Dependencies"

log "Running npm install…"
npm install --silent
success "Dependencies installed"

log "Running next build to verify zero TypeScript/build errors…"
npm run build
success "Build succeeded — zero errors"

# ─── STEP 3: GIT REPOSITORY INIT ──────────────────────────────────────────────

section "Step 3 — Initialize Local Git Repository"

if [[ -d ".git" ]]; then
  warn ".git directory already exists — skipping git init"
else
  git init --quiet
  success "Git repository initialized"
fi

# Configure identity if not already set globally
GIT_USER_NAME="$(git config --global user.name 2>/dev/null || echo '')"
GIT_USER_EMAIL="$(git config --global user.email 2>/dev/null || echo '')"

if [[ -z "$GIT_USER_NAME" ]]; then
  git config user.name "$GITHUB_USERNAME"
  log "Set git user.name to $GITHUB_USERNAME"
fi

if [[ -z "$GIT_USER_EMAIL" ]]; then
  git config user.email "${GITHUB_USERNAME}@users.noreply.github.com"
  log "Set git user.email to ${GITHUB_USERNAME}@users.noreply.github.com"
fi

# ─── STEP 4: STAGE & COMMIT ───────────────────────────────────────────────────

section "Step 4 — Stage and Commit All Files"

git add -A
git status --short

COMMIT_COUNT=$(git log --oneline 2>/dev/null | wc -l | tr -d ' ')
if [[ "$COMMIT_COUNT" -eq 0 ]]; then
  git commit -m "🚀 Initial commit — Mindful Impact Hub v1.0

  - Next.js 15 App Router + TypeScript (strict mode)
  - Zustand global state: lowEnergyMode toggle
  - DailyDigest: mode-reactive news banner (6 full + 6 low-energy items)
  - VolunteerMatch: 15 opportunities with postal search + match modal
  - CharityFinder: 10 vetted charities with sortable table + impact calculator
  - Full mobile-responsive Tailwind UI with dual design token palettes
  - Accessible: ARIA roles, focus-visible, semantic HTML throughout"
  success "Initial commit created"
else
  git commit -m "♻️ Update — Mindful Impact Hub" || warn "Nothing new to commit"
fi

# ─── STEP 5: RENAME BRANCH TO MAIN ───────────────────────────────────────────

section "Step 5 — Set Branch to 'main'"

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'master')"

if [[ "$CURRENT_BRANCH" != "main" ]]; then
  git branch -M main
  success "Branch renamed from '$CURRENT_BRANCH' to 'main'"
else
  success "Already on 'main' branch"
fi

# ─── STEP 6: CREATE GITHUB REPOSITORY VIA REST API ────────────────────────────

section "Step 6 — Create GitHub Repository"

log "Checking if repository '$REPO_NAME' already exists on GitHub…"

REPO_CHECK=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Authorization: token $GITHUB_PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}")

if [[ "$REPO_CHECK" == "200" ]]; then
  warn "Repository '${GITHUB_USERNAME}/${REPO_NAME}' already exists on GitHub — skipping creation."
  REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
else
  log "Creating new repository '${REPO_NAME}' on GitHub…"

  CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X POST \
    -H "Authorization: token $GITHUB_PAT" \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Content-Type: application/json" \
    "https://api.github.com/user/repos" \
    -d "{
      \"name\": \"${REPO_NAME}\",
      \"description\": \"${REPO_DESCRIPTION}\",
      \"private\": ${REPO_PRIVATE},
      \"auto_init\": false,
      \"has_issues\": true,
      \"has_projects\": false,
      \"has_wiki\": false
    }")

  HTTP_CODE=$(echo "$CREATE_RESPONSE" | tail -n1)
  RESPONSE_BODY=$(echo "$CREATE_RESPONSE" | head -n -1)

  if [[ "$HTTP_CODE" == "201" ]]; then
    REPO_URL=$(echo "$RESPONSE_BODY" | grep -o '"html_url": "[^"]*"' | head -1 | cut -d'"' -f4)
    success "Repository created: $REPO_URL"
  else
    echo "$RESPONSE_BODY"
    error "GitHub API returned HTTP $HTTP_CODE. Check your PAT permissions and username."
  fi
fi

# ─── STEP 7: SET REMOTE ORIGIN ────────────────────────────────────────────────

section "Step 7 — Configure Remote Origin"

REMOTE_URL="https://${GITHUB_USERNAME}:${GITHUB_PAT}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
  log "Updated existing remote 'origin'"
else
  git remote add origin "$REMOTE_URL"
  log "Added remote 'origin'"
fi

success "Remote origin → https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# ─── STEP 8: PUSH TO GITHUB ───────────────────────────────────────────────────

section "Step 8 — Push to GitHub"

log "Pushing to origin/main…"
git push -u origin main --force
success "Code pushed to GitHub successfully!"

# ─── DONE ─────────────────────────────────────────────────────────────────────

section "Deployment Complete 🎉"

echo -e "${BOLD}${GREEN}"
echo "  ╔══════════════════════════════════════════════════════╗"
echo "  ║          Mindful Impact Hub is LIVE on GitHub!       ║"
echo "  ╚══════════════════════════════════════════════════════╝"
echo -e "${RESET}"
echo -e "  🔗 Repository : ${BLUE}https://github.com/${GITHUB_USERNAME}/${REPO_NAME}${RESET}"
echo -e "  🌿 Branch     : main"
echo -e "  📦 Files      : $(git ls-files | wc -l | tr -d ' ') files committed"
echo ""
echo -e "  ${BOLD}Next steps:${RESET}"
echo -e "  1. Deploy to Vercel:  ${BLUE}https://vercel.com/new${RESET}"
echo -e "  2. Deploy to Netlify: ${BLUE}https://app.netlify.com/start${RESET}"
echo -e "  3. Run locally:       ${YELLOW}npm run dev${RESET}"
echo ""
