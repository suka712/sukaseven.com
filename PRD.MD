# sukaseven.com — Portfolio Spec

## Concept
A lab dashboard / war room. Feels like a developer's actual workstation — lived in, real, grows as new projects ship. Not a portfolio template. Think mission control.

---

## Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│  [tabs] sukaseven | katanaid | caphne | anyu | hasaki | +   │
├───────────────┬─────────────────────────────┬───────────────┤
│               │                             │  last active  │
│  LEFT NAV     │                             ├───────────────┤
│  TREE         │     CENTRAL PANEL           │  contacts     │
│               │     (main display)          ├───────────────┤
│  projects/    │                             │ ping my phone │
│  tools/       │                             │               │
│  experience/  │                             │ content       │
│  other/       │                             │               │
│               │                             │ send          │
├───────────────┴──────────────┬──────────────┴───────────────┤
│  TERMINAL (navigation)       │  TERMINAL (stats)            │
└──────────────────────────────┴──────────────────────────────┘
```

---

## Section Specs

### (1) Top Tabs
Navigation between live services. Each tab links out or embeds the service.

| Tab | URL | Behavior |
|-----|-----|----------|
| sukaseven | sukaseven.com | Current site (active state) |
| katanaid | katanaid.com | External link or iframe |
| caphne | caphne.co | External link or iframe |
| anyu | anyu.sukaseven.com | External link or iframe |
| hasaki | github.com/suka712/hasaki-go | External link |
| tldraw | tldraw.sukaseven.com | External link or iframe |

Notes:
- Active tab highlighted
- Tabs are expandable — new projects get added here as they ship
- If iframing: respect `X-Frame-Options`, fall back to external link if blocked

---

### (2) Left Sidebar — Nav Tree
A collapsible file tree. Click a node → central panel loads that project's devlog.

```
projects/
  ├── caphne
  ├── katanaid
  └── [new projects slot in here]
tools/
  ├── anyu-s3
  ├── tldraw
  └── hasaki-go
experience/
  └── phuquocdevs-internship
other/
  └── [misc shit]
```

Notes:
- Built with `react-arborist` or custom recursive component
- Status dot next to each node: 🟢 live, 🟡 WIP, ⚫ archived
- `+` slot at bottom for new entries
- Clicking a folder expands/collapses
- Clicking a leaf node loads its content in central panel

---

### (3) Central Panel — Main Display
The primary content area. Renders devlog/blog for the selected project or tool.

Each project page contains:
- **What it is** — one line description
- **Why I built it** — motivation, problem it solves
- **How it works** — architecture, key decisions
- **Technical challenges** — what broke, what was hard, how it was fixed
- **Stats** — users, uptime, commits (pulled live where possible)
- **Links** — live site, GitHub repo

Content is written in MDX or Markdown, stored in `/content/projects/[slug].md`.

Default state (nothing selected): show a landing devlog — who Khiem is, what this place is, what's currently being built.

---

### (4) Right Sidebar — Three Panels

**Panel 1 — Last Active**
- Shows last GitHub commit timestamp
- "X minutes/hours/days ago" format
- Pulled from GitHub API

**Panel 2 — Ping My Phone**
- A single button
- On click: fires a POST to Go backend → sends push notification to Khiem's phone via Telegram bot or Pushover
- Optional: visitor leaves a one-line message before pinging
- Rate limited — max 1 ping per IP per hour

**Panel 3 — Contacts**
- Name, email, message form
- POST to Go backend → stores in `contacts` table in Postgres
- Simple, no third party form service

---

### (5) Bottom Left — Navigation Terminal
Emulates a real terminal. Visitors can type commands to navigate the site.

```bash
$ help
$ ls
$ ls projects
$ cat caphne
$ cd tools
$ whoami
$ open katanaid
$ ping        # triggers ping my phone
```

Built with `xterm.js`. Command parser is a switch statement mapping commands to actions (navigate, render content, trigger effects).

Easter eggs encouraged.

---

### (6) Bottom Right — Stats Terminal
Live feed of activity and stats. Read-only, auto-updates.

Displays:
- GitHub contribution graph (ASCII or rendered)
- Commit streak
- Last pushed repo + timestamp
- Uptime for each live service (caphne, katanaid, anyu, tldraw)
- New user signups (pulled from Go backend APIs)
- Open PRs / issues across repos
- Live feed: `[2m ago] pushed 3 commits to katanaid`

Data sources:
- GitHub API for commits, streak, PRs
- Go backend APIs for user counts, signups
- Uptime: ping endpoints every 5 min via cron on Railway, or use Better Stack free tier

---

## Tech Stack

| Piece | Tech |
|-------|------|
| Framework | Next.js (already scaffolded) |
| Styling | Tailwind CSS |
| Layout | CSS Grid — center dominant |
| Nav tree | `react-arborist` or custom recursive component |
| Terminals | `xterm.js` |
| Live feed | Server-Sent Events (SSE) from Go backend |
| Content | Markdown/MDX files in `/content/` |
| Ping phone | Telegram Bot API or Pushover — one POST |
| Uptime | Better Stack free tier or self-ping cron |
| Backend | Existing Go API |
| DB | Existing Postgres  |

---

## Auth Behavior
- Public visitors see everything read-only
- Ping my phone and contacts are public (rate limited)

---

## Content Structure
```
/content
  /projects
    caphne.ts
    katanaid.go
  /tools
    hasaki.go
    anyu-s3.ts
    hanshi.rs
    tldraw.md
  /experience
    phuquocdevs.md
  index.md        ← default central panel content
```

---

## Build Order (recommended)
1. Layout shell — CSS grid, empty panels, correct proportions
2. Top tabs — static first, wire links
3. Left nav tree — hardcoded data
4. Central panel — render markdown from `/content/`
5. Right sidebar — last active (GitHub API), contacts form, ping button
6. Bottom terminals — stats terminal first, nav terminal second
7. Live feed via SSE
8. Polish — animations, easter eggs, terminal easter eggs

---

## Vibe Notes
- Dark theme, monospace font prominent
- Feels lived in, not designed
- Every panel should feel functional not decorative
- Grows naturally as new projects ship — no redesign needed, just add a new content file and nav tree entry