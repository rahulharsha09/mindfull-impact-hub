# Mindful Impact Hub

> **Give Wisely · Act Locally · Stay Grounded**

A production-ready, mental-health-aware single-page dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Lucide React**.

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 🧘 **Low Energy Mode** | Global Zustand toggle that shifts the entire UI to calming pastel aesthetics and filters out stressful content |
| 📡 **Daily Digest** | Paginated news banner — global macro progress (Full Mode) or gentle local stories (Low Energy Mode) |
| 🌍 **Volunteer Match Engine** | Searchable, filterable card grid of 15 real volunteer categories with postal code search and a full match confirmation modal |
| 💚 **Charity Finder** | Sortable table of 10 vetted charities with trust scores, program delivery bars, and a live Impact Multiplier Calculator |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
mindful-impact-hub/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Home page (server component)
│   └── globals.css         # Global Tailwind styles
├── components/
│   ├── Header.tsx          # Branding + mode toggle switch
│   ├── Dashboard.tsx       # Client shell with mode-reactive bg
│   ├── DailyDigest.tsx     # Mental Health Buffer news banner
│   ├── VolunteerMatch.tsx  # "Act Local" volunteer engine
│   ├── CharityFinder.tsx   # "Give Smart" charity table + calculator
│   └── Footer.tsx          # Accessible themed footer
├── store/
│   └── mindfulStore.ts     # Zustand state (lowEnergyMode + actions)
├── lib/
│   └── data.ts             # All static data (volunteers, charities, digest)
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## 🧠 Low Energy Mode Design Tokens

| Property | Full Capacity | Low Energy |
|----------|--------------|------------|
| Background | White | Warm cream `#fdf8f0` |
| Primary accent | Brand green `#22c55e` | Sage emerald `#4a8c6e` |
| Surface | Gray-50 | Soft sage `#f4f7f4` |
| Text | Gray-900 | Forest `#3d6b52` |
| Border | Gray-200 | Sage `#c9ddc9` |
| Content filter | All items | Low-intensity only |

---

## 📦 Tech Stack

- **Next.js 15** — App Router, Server + Client Components
- **TypeScript** — Strict mode, fully typed
- **Tailwind CSS 3** — Utility-first, custom design tokens
- **Zustand 5** — Lightweight global state with localStorage persistence
- **Lucide React** — Accessible, tree-shakeable icon set

---

## 🔐 Deployment

See `deploy.sh` in the repo root for the full GitHub automation script.

---

## 📄 License

MIT — free to use, fork, and build upon.
