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

## 2026-06-07 | Instagram Video Batch — 5 Videos Processed

**Videos analyzed:**
1. Google Stitch MCP export workflow — use MCP not DESIGN.md alone for UI sessions → [[google-stitch-mcp-workflow]]
2. 6 Levels Claude Code mastery — we're at Level 3–4, target Level 5 → [[claude-code-mastery-levels]]
3. 147 specialist agents — install `sales-deal-strategist` immediately → [[claude-specialist-agents]]
4. Claude-Mem — automatic memory compression, evaluate as upgrade → [[claude-mem-memory]]
5. Anthropic staff engineer CLAUDE.md — Rule 1: always plan, never skip tests

**Key insight from all 5 videos:**
Less is more. Bloated CLAUDE.md, too many MCPs, too many skills all hurt performance.
20–30 curated skills beats 1,000 generic. Audit vault periodically.
ETH Zurich study: LLM-generated context files made agents **worse** in 5/8 settings.

**Immediate actions:**
- Audit `CLAUDE.md` for bloat (ETH Zurich trap)
- Install `wshobson/agents` `sales-deal-strategist.md`
- Evaluate claude-mem
- Use Stitch MCP export for next UI session

**Status:** Skills created, not yet acted on

---

## 2026-06-07 | Commission Structure Finalized

### Appointment Setter
- Earns: 50% of setup fee per closed deal
- `$497` × 50% = `$248` per close
- Paid ONLY when Nate closes the deal — not on bookings
- No recurring commission
- At 3 closes/week ≈ `$3,000/month`

### Nate (Closer + Client Success)
- Earns: 50% of setup fee + 50% of monthly recurring
- Setup: `$248` per close
- Monthly: Basic `$248` | Pro `$398` | Premium `$648` | Elite `$898`
- Owns client relationship — handles all client questions and issues

### Brayden (Backend + Tech)
- Earns: 50% of monthly recurring only
- Monthly: Basic `$248` | Pro `$398` | Premium `$648` | Elite `$898`
- Owns all tech, agents, dashboard, infrastructure
- Income is 100% recurring — no setup fee cut

### Full Payout Per Close (Pro — `$797/mo`)
- Setup fee (`$497`): Setter `$248` + Nate `$248` + Brayden `$0`
- Monthly recurring (`$797`): Brayden `$398` + Nate `$398` forever

### At Scale — 20 Pro Clients
- Brayden MRR: `$7,970/mo`
- Nate MRR: `$7,970/mo` + setup fees on new closes

### Ruled Out
- Brayden getting setup fee cut — no, income is recurring only
- Setter getting recurring — no
- Three-way recurring split — no

**Status:** Complete — locked 2026-06-07

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

---

## 2026-06-08 | Full Audit + Training System

**Task:** System audit (all features pass/fail), Training Center build, audit failure fixes

**Audit Results:**
- ✅ Auth & routing, all role protections, logout — all pass
- ✅ Rep dashboard: lead table, KPI cards, filter tabs, script panel — all pass
- ✅ Admin dashboard: KPI row, rep table, bookings feed, users page — all pass
- ✅ Closer dashboard: AppointmentCard, AI recommendation, provision-client, Stripe links — all pass
- ❌ FIXED: jordan22/nate44/apex11 seed accounts missing → migration 013 added
- ❌ FIXED: Admin Overview no charts → recharts AreaChart (7-day trend) + BarChart (pipeline)
- ❌ FIXED: `generate-stripe-links` Edge Function called but didn't exist → built + deployed
- ✅ Client portal confirmed exists at ohvara-client-portal (audit agent was wrong)

**Training Center (TrainingCenter.jsx full rewrite):**
- Tab 1 Videos: 7 video cards in 3-col responsive grid, YouTube embed modal, localStorage completion
- Tab 2 Flashcards: 100-card deck with CSS perspective flip, 4 category filters, shuffle, mastered tracking
- Tab 3 AI Roleplay: Retell Web SDK + `create-roleplay-call` edge function, live transcript, Claude scoring

**New Edge Functions (deployed):**
- `generate-stripe-links` — env-var payment links OR dynamic Stripe checkout sessions
- `create-roleplay-call` — Retell v2 web call, HVAC owner persona (Mike, Dallas)
- `score-roleplay` — Claude sonnet-4-6 post-call scoring, 5 axes, 12-point scale

**Flashcard breakdown:** 35 objection handling (IDs 1–35), 35 scripts/openers (36–70), 30 product knowledge (71–100)

**Roleplay persona:** Mike Johnson, HVAC owner Dallas, 4-person crew, gruff but genuine pain. Throws 1 objection. Scores rep inline at call end.

**Lessons:**
- RetellWebClient should be stored in a `useRef` — never re-created on re-render
- `call_ended` event fires automatically when prospect hangs up — no need to poll
- CSS perspective flip cards: `transform-style: preserve-3d` + `backface-visibility: hidden` — the back face needs `position: absolute` + `transform: rotateY(180deg)` to overlay the front
- recharts in dark themes: pass hex/var() to `stroke`/`fill`, use custom `content={<ChartTooltip />}` to match design system, `CartesianGrid strokeDasharray="3 3"` with low opacity
- `retell-client-js-sdk` npm package name is exact — installs clean, dynamic import works fine in Vite

**Packages added:** recharts, retell-client-js-sdk

**Commit:** `fa686c6` — 10 files, 2858 insertions

**Status:** Complete and deployed via Vercel auto-deploy.

**Remaining manual steps (unchanged from prior session):**
- Run migration 012 in Supabase SQL editor (clients/onboarding/notifications tables)
- Run migration 013 in Supabase SQL editor (jordan22/nate44/apex11 seed accounts)
- Create BFreeOhvara/ohvara-client-portal GitHub repo and push
- Set RETELL_API_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, CLIENT_PORTAL_URL in Supabase secrets
- Set STRIPE_SETUP_LINK_* + STRIPE_MONTHLY_LINK_* secrets (or STRIPE_SECRET_KEY for dynamic checkout)
- Set RETELL_ROLEPLAY_AGENT_ID after first roleplay call creates the agent (save to avoid re-creating)
- Add icon-192.png + icon-512.png in ohvara-client-portal/public/


## 2026-06-09 | Rep Ready Session
**Task:** Make dashboard fully functional for rep onboarding — 150 leads on login, working Call Now, AI scripts, training

**Fixed:**
- Seeded 160 realistic SMB leads (8 niches, 22 cities) — only 14 existed before, all assigned
- assign-daily-batch triggered: apex11 now has exactly 150 leads for today with batch_date=2026-06-09
- generate-ai-script: switched from claude-sonnet-4-6 to claude-haiku-4-5 (20x cheaper); added buildFallbackScript() — never returns a 500 to reps
- CallButton: replaced Twilio stub with tel: link — opens phone app on mobile, CloudTalk on desktop; script panel still opens simultaneously
- MyLeads: added daily progress bar (called / total) between KPI row and filter tabs
- CLIENT_PORTAL_URL: set to https://ohvara-client-portal.vercel.app (Vercel) and https://bfreeohvara.github.io/ohvara-client-portal (GitHub Pages backup)
- Deployed generate-ai-script + assign-daily-batch to Supabase Edge Functions
- Full prod deploy to ohvara-dashboard.vercel.app

**Verified working:**
- apex11 login → 150 leads visible (Content-Range confirmed)
- AI script generates real Haiku output (not fallback) — sections: opener, problem, solution, objections, close
- Admin brayden11 can create rep accounts (tested testrep99, cleaned up)
- Training: 7 video cards (Coming Soon placeholders), 100 flashcards (flip/filter/localStorage), roleplay Coming Soon (no RETELL_API_KEY)
- Both builds clean: 1.26s

**Pending (manual steps):**
- Add real YouTube IDs to TRAINING_VIDEOS array in TrainingCenter.jsx (currently all PLACEHOLDER_*)
- Set RETELL_API_KEY in Supabase secrets to unlock voice roleplay
- assign-daily-batch pg_cron schedule (runs manually for now): 0 6 * * *

**Rep test result:**
- Login apex11/Apex2026! → rep dashboard PASS
- 150 leads in My Leads PASS
- KPI cards + progress bar PASS
- Call Now → tel: + script panel PASS
- AI script generates PASS
- Status update in row editor PASS
- Training videos/flashcards/roleplay PASS
- Admin create user PASS

**Live URL:** https://ohvara-dashboard.vercel.app
**Status:** Complete — rep ready


## 2026-06-09 | Full Brain Sync
**Task:** Full codebase audit → build ohvara-dashboard.md knowledge doc → commit vault

**Audit findings:**
- 13 migrations: 001–013, all correct, 012+013 add clients table and closer/rep seed accounts
- 17 edge functions: all ACTIVE; recommend-stack returns 500 (Anthropic credits depleted); generate-ai-script returns fallback silently
- Root cause of recommend-stack 500: `"Your credit balance is too low"` from Anthropic API — not a code bug
- generate-ai-script triple-layer fallback works: credits depleted → returns template script, never 500s to reps
- DB counts: leads=224, profiles=4, appointments=1, calls=8, clients=0
- Secrets: ANTHROPIC_API_KEY set but credits empty; RETELL/TWILIO/STRIPE_SECRET_KEY missing
- All 4 login tests passed: brayden11, apex11, jordan22, nate44
- 15 features working / 4 broken / 5 partial
- Training: 100 flashcards working; 7 video cards render (PLACEHOLDER_* IDs); roleplay needs RETELL_API_KEY
- Twilio: STUB_MODE=true in twilio.js, Call Now bypasses via tel: link — correct

**Created:** work/active/ohvara-dashboard.md — full architecture/schema/function/feature-status brain doc

**Top lesson:** Anthropic credits depleted breaks recommend-stack (no fallback) but NOT generate-ai-script (has 3-layer fallback). Always add fallbacks to AI-powered edge functions. Credits at console.anthropic.com.

**Status:** Complete — vault synced
