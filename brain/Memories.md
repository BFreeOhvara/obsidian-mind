---
description: "Ohvara persistent knowledge — hard-won lessons across Supabase, React, deployment, lead scraping. Read before every session."
tags:
  - brain
  - index
---

# Memories

Persistent context and knowledge retained across sessions. Each topic lives in its own note — follow the links.

- [[Key Decisions]] — architectural and workflow decisions worth recalling
- [[Patterns]] — recurring patterns and conventions discovered across work
- [[Gotchas]] — things that have bitten before and will bite again
- [[North Star]] — living goals document, read at session start
- [[Skills]] — custom slash commands and workflows

---

## Hard-Won Lessons

### Supabase / RLS

- NEVER write a policy that queries the same table it protects → infinite recursion
- Always use SECURITY DEFINER functions for profile-based lookups
- Test auth as every role before marking auth work complete
- Use `auth.uid()` directly in policies — never join through profiles

### React

- Never use HTML form tags → use onClick handlers
- All colors via CSS custom properties — no hardcoded hex in JSX
- Font weights 400 and 500 ONLY — never 600 or 700

### Deployment

- Set env vars before deploying — not after hitting a 404
- Always handle CORS headers in Supabase Edge Functions
- Return consistent error shapes: `{ error: string, code: string }`

### Lead Scraping

- Deduplicate before every insert — check phone AND business name
- Indeed MCP: `mcp.indeed.com/claude/mcp`
- Google Maps fallback for niches/markets where Indeed is thin
- Flag no-website businesses as web agency candidates

### General

- Read [[North Star]] and [[Memories]] before writing code
- Append to [[Memories]] before ending every session
- Never ask Brayden to run SQL or terminal commands manually

---

## Session Log

### 2026-06-07 | Vault Initialized

**Task:** Bootstrap obsidian-mind vault with Ohvara context
**What was done:** Created North Star, Memories, DESIGN, work/Ohvara index, appended Ohvara section to CLAUDE.md
**Status:** Complete

### 2026-06-07 | Brain Upgrade — Full Business Context Added

**What was added:**
- Pre-revenue status confirmed — Phase 1 is the only focus
- Core insight logged: Indeed leads are warm leads — already problem-aware
- Rep onboarding flow defined: account created → login → 150 leads ready → calling in 60 seconds
- Commission structure: reps earn `$150`–`$250` per closed deal
- Sales process locked: two-call close, rep gathers pain, closer pitches + closes
- AI script behavior defined: question-based, pain-surfacing, NOT a pitch
- Stripe link auto-generation on close recommendation added to closer flow
- Rep recruiting channel: Facebook groups (posts + DMs)
- Dialer: TBD — do not hardcode any dialer assumption
- Geographic market: anywhere in the US
- Priority niche: transportation (hotshot, tow truck, 18-wheeler, owner-operators) but cast wide
- Jordan and Nate are ready to close now
- Training is optional for reps — available anytime, not required to start calling

**Key rules added:**
- AI scripts must always be question-based and pain-surfacing. Never a pitch on the rep call.
- Stripe link must be auto-generated when closer marks a recommendation.

**Skills created:** [[stripe-payment-links]], [[rep-call-script]]
**Status:** Complete

### 2026-06-08 | World Class Overhaul + In-Dashboard Scrapers

**Subagents run:** Auth Fix, Rep UI, Admin UI, Closer UI, Indeed Scraper, Maps Scraper, Integration Tests, Deploy

**What was done:**
- Fonts switched to Geist (UI) + JetBrains Mono (data/numbers) via @fontsource, 400/500 weights only
- Full CSS token system: all `--bg-*`, `--text-*`, `--border-*`, `--accent-*`, `--success/warning/danger/info` + `*-dim` variants
- Anti-rules enforced to zero: 0 box-shadow, 0 gradients, 0 font-bold/semibold, 0 rounded-xl, 0 hardcoded hex, 0 `<form>` tags
- Sidebar: 200px, 0.5px border, 2px left accent bar active state via `::before` pseudo
- Rep Dashboard: 4-card KPI row, table layout (flex columns) with inline RowEditor expand, AI script panel
- Admin Dashboard: two-column (flex-1 + 300px right panel), KPI row with 60s refresh, expandable rep rows, live bookings feed
- Closer Dashboard: appointment cards, weekly stats bar at bottom (4 metrics in mono)
- Lead Scraper page at `/admin/scraper`: Indeed tab + Google Maps tab, niche toggle grid, run → live results table, dedup flag, import to leads
- Edge Functions deployed: `indeed-scraper` (regex HTML parse + parseSalary) and `maps-scraper` (Google Places API) — both JWT-gated with `requireAdmin()`
- All hardcoded Tailwind color classes replaced with CSS token equivalents across all pages
- All 4 accounts verified: brayden11/admin, jordan22/closer, nate44/closer, apex11/rep

**Key commits:** `9593f09` — 28 files, 2206 insertions

**Pending:**
- Add `GOOGLE_MAPS_API_KEY` to Supabase → Edge Functions → Secrets for maps-scraper to function
- Verify live Vercel URL after auto-deploy triggers from push to master

## 2026-06-07 | Business Decisions Finalized

### Packages Locked

- Basic: `$497` setup + `$497/mo`
- Pro: `$497` setup + `$797/mo`
- Premium: `$497` setup + `$1,297/mo`
- Elite: `$497` setup + `$1,797/mo`
- Every package has `$497` one-time setup fee — no exceptions

### Team Structure Locked

- One confirmed closer: Nate
- All reps work Profile A only (trades & field services)
- Profile B/C/D expand when second closer confirmed

### Niche Strategy

- Not locking to specific niches — targeting language profiles instead
- Profile A covers highest Indeed lead volume
- Same pitch framework works across all trades
- AI scripts adapt tone per niche within the profile

### Pricing Logic

- `$1,797` for Elite beats `$1,997` (crosses $2K barrier) and `$1,597` (too close to Premium)
- Staircase: `$497` → `$797` → `$1,297` → `$1,797` — each step `$300`–`$500`
- ROI anchor: always compare to cost of human hire, not to competitors

### Rules Added

- AI recommendation engine uses labor cost + pain points + business size to pick tier
- Setup fee (`$497`) always presented as one-time, separate from monthly
- Closer only pitches Profile A — no context switching until second closer confirmed
- Two Stripe links generated per close: setup fee link + monthly subscription link

**Status:** Complete

---

## Recent Context

- Vault initialized 2026-06-07 with full Ohvara business context
- Brain upgraded 2026-06-07 with full sales process, commission, rep onboarding, and dialer context
- World class overhaul complete 2026-06-08 — all 8 subagents ran, zero anti-rule violations, deployed to master
- Google Maps scraper active at `C:\Users\freem\OneDrive\Desktop\Scraper`
- In-dashboard scrapers: Indeed + Maps tabs at `/admin/scraper`, Edge Functions deployed
- Ohvara dashboard live at `ohvara-dashboard.vercel.app` — new deploy auto-triggered from push `9593f09`
- Priority niche: transportation — cast wide across all SMB niches
- Stripe payment link generation skill defined — not yet implemented in dashboard
- ACTION NEEDED: Add `GOOGLE_MAPS_API_KEY` to Supabase → Edge Functions → Secrets

---

## 2026-06-08 | UI Polish + Closer Power Upgrade

**Task:** Fix visual issues from screenshots, upgrade closer to power user dashboard

**Changes:**
- Call Now button: `#22C55E` (green) → `var(--accent)` (purple) — green is semantic only
- Badge.jsx: rebuilt with inline CSS token styles — zero Tailwind hardcoded hex, correct semantic colors per spec
- Filter tabs: pill buttons → underline tab pattern with `2px solid var(--accent)` active indicator
- KPI cards: value fontSize 32px mono, label 10px uppercase 0.1em tracking
- Table rows: min-height 44px enforced on all cells
- Closer sidebar: 4 → 7 nav items (Lead Scraper, Call Leads, Pipeline, Rep Activity)
- MyAppointments: 4 KPI cards at top; AI briefing + stack analysis auto-load on mount, always visible
- AppointmentCard: default expanded=true; Mark Closed / Generate Stripe Link / Reschedule quick actions always visible
- New pages: CallLeads (unbooked leads, closer can call any), CloserPipeline (full bookings table + revenue total)
- Closer scraper: reused admin LeadScraper component at `/closer/scraper`
- CSS: Google Fonts @import moved before @tailwind directives (PostCSS requires @import first)

**Lessons:**
- Always check button colors against design tokens — green crept in on Call Now during the overhaul
- CSS `@import` must precede `@tailwind` directives or PostCSS throws a warning
- Badge inline styles beat Tailwind classes for design-token-only components — cleaner, no arbitrary value escaping

**Commit:** `8022a47` — 11 files, 903 insertions
**Status:** Complete — deployed via git push → Vercel auto-deploy

---

## 2026-06-08 | Premium Animated UI Applied

**Task:** Apply glass morphism, animated orbs, counting KPIs, staggered animations to full dashboard

**Files changed:**
- `src/index.css` — full design system: CSS vars, 6 keyframes, glass/glass-accent/sidebar-glass, btn-call, stagger, table-row-animated
- `src/hooks/useCountUp.js` (new) — rAF countup hook with easeOutCubic
- `src/components/BackgroundOrbs.jsx` (new) — 3 ambient orbs
- `src/components/ui/KPICard.jsx` (new) — shared KPI tile with countup + glass
- `src/App.jsx` — BackgroundOrbs + new closer routes
- `src/components/ui/Card.jsx` + `StatCard.jsx` — upgraded to `.glass` (cascades to all consumers)
- `src/pages/Login.jsx` — glass-accent login card
- All page components — glass tables, stagger grids, animated rows

**Lessons:**
- Mount `<BackgroundOrbs />` once in App.jsx root — not inside pages. Individual page mounts cause re-animation on every route change.
- Upgrading shared components (Card.jsx, StatCard.jsx) to `.glass` is the leverage move — cascades to every consumer automatically without touching individual pages.
- `table-row-animated` works on both `<div>` rows and `<tr>` elements — no special handling needed.
- `.glass:hover` uses `transform: translateY(-1px)` — ensure parent containers have `overflow:visible` or the lift is clipped.
- LeadPipeline kanban: column container needs `glass` + Tailwind `border-t-2` class simultaneously — use `className={\`glass border-t-2 ${colorClass}\`}`.

**Commit:** `a050dc4` — 20 files changed, 466 insertions, 264 deletions
**Build:** `✓ 1.05s` — zero errors
**Status:** Complete — deployed via git push → Vercel auto-deploy

---

## 2026-06-08 | Closer Dashboard + Auto-Provisioning + Client Portal

**Task:** AI recommendation engine, mark-closed workflow, auto-agent build, client PWA

**New Edge Functions:**
- `recommend-stack` — rich AI recommendation (headline, roi_argument, pain_points, why_pitch_this, talking_points, pushback_response, upsell_path) — uses `claude-sonnet-4-6`
- `provision-client` — fires on close: creates `clients` + `onboarding` records, fires admin notification
- `build-agent` — Retell agent creation + Twilio number purchase (graceful stub if keys not set)

**New DB tables:** `clients`, `onboarding`, `notifications` (migration 012)

**New repo:** `ohvara-client-portal` — Vite React PWA, mobile-first dark design
- Onboarding flow: one question at a time, type-aware inputs, fires build-agent on submit
- Portal home: AI number display, KPI stats, tier-gated features

**New components:** `NotificationBell`, `useNotifications` hook

**Flow:** Closer reviews AI recommendation → clicks Mark Closed → `provision-client` fires → onboarding URL generated → client fills form → `build-agent` fires → Retell agent + Twilio number provisioned → admin notified

**Lessons:**
- One question at a time on mobile onboarding — never show a long form. The `type-aware` input pattern (select → radio cards, textarea → resizable, phone → tel input) is correct on mobile.
- `recommend-stack` is a separate function from `generate-ai-script` — clean separation: scripts/briefings stay in generate-ai-script, sales intelligence lives in recommend-stack.
- `provision-client` uses the SERVICE_ROLE_KEY — never the anon key — for cross-table writes. Always check this before deploying.
- `build-agent` gracefully skips Retell/Twilio if keys not set — never throw on missing optional integrations.
- Notification bell: 15s polling is fine for a small team. Use `refetchInterval` on the query, not a manual `setInterval`.
- Client portal repo: `gh` CLI not installed in Claude Code env — must push manually: `git remote add origin ... && git push -u origin main`.

**Packages used in recommend-stack:** Basic $497/mo, Pro $797/mo, Premium $1,297/mo, Elite $1,797/mo + $497 setup on all
**Model used:** `claude-sonnet-4-6` (NOT `claude-sonnet-4-20250514` which was in the task spec — date suffixes are wrong)

**Commits:**
- Dashboard: `0c98040` — 8 files, 1365 insertions
- Client portal: initial commit (local only — push manually)

**Deploy pending:**
- Run migration 012 in Supabase SQL editor
- Create GitHub repo `BFreeOhvara/ohvara-client-portal` and push
- Set `CLIENT_PORTAL_URL` in Supabase Edge Function secrets
- Set `RETELL_API_KEY`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` when ready

**Status:** Dashboard complete and deployed via Vercel. Client portal built, awaiting GitHub push + Vercel setup.
