---
date: 2026-06-19
description: "Ohvara persistent knowledge — hard-won lessons across Supabase, React, deployment, lead scraping. Read before every session."
tags:
  - brain
  - index
---

# Memories

Persistent context and knowledge retained across sessions. Each topic lives in its own note — follow the links.

- [[LIVE_STATE]] — single current-state doc (overwritten, not appended) — read FIRST on /reload
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

### Model Routing

- Use **Sonnet 4.6** for small fixes and routine tasks; **Fable 5** for big autonomous builds only

### Rules

- CC auto-logs every completed task to Atlas tagged `[CC | date]` — entry appended to [[Memories]], committed and pushed immediately (rule lives in [[cc-prompt-format]])
- /reload flow: old CC prints prompt → paste into new CC → new CC reads Atlas → new CC prints context summary → paste into new Claude chat → done (skill: [[reload]])

### General

- Read [[North Star]] and [[Memories]] before writing code
- Append to [[Memories]] before ending every session
- Never ask Brayden to run SQL or terminal commands manually
- **When a literal exported mockup file exists (e.g. a Claude Design `.dc.html` export), port its exact visual design literally — colors, layout, spacing, every styled element — not a reinterpretation built from the written brief alone.** Confirmed 2026-07-24: Prompt 326 built real, correct backend/data wiring but its own generic UI instead of literally porting `media/claude-design-export-ohvara-dashboard-v3.html`, and Brayden rejected the result outright — he'd spent dozens of design rounds locking down that exact look specifically so it wouldn't need to be redone. When both a written brief and a literal export exist, the export is the visual source of truth; the brief is the functional/data source of truth. Use both, don't substitute one for the other.
- **When retiring an old business's UI in favor of a new one, remove it fully — never leave old and new business nav/UI coexisting side-by-side in the same shell**, even temporarily, unless explicitly asked to keep both. Same 2026-07-24 incident: the old setter/SMB portal nav (Setter Performance, Pipeline, Payouts, Messages) shipped alongside the new insurance nav in one merged sidebar — Ohvara's pivot away from the SMB business is a full replacement, not an add-on (see [[North Star]] pivot note), so its UI needs to disappear when the new one lands, not merge with it.
- **A third-party authenticated tool's iframe embed can pass a static `curl -I` header check clean and still get blocked in the real browser.** Confirmed 2026-07-25: Prompt 328 shipped the Quoter embed after `curl -I` on `https://app.insurancetoolkits.com/fex/quoter` showed no `X-Frame-Options`/CSP frame-ancestors header, but in real logged-in use the page redirected (no shared session/cookies cross-origin) to `landing.insurancetoolkits.com`, which DOES block framing (`ERR_BLOCKED_BY_RESPONSE`). A header check on the one URL you set as `src` doesn't account for auth redirects. Verify third-party embeds logged-in in a real browser, not just a header check.

---

## Session Log

> Full entries live in per-quarter files (split out 2026-08-01 — this file had grown to ~1.6MB). Newest quarter first.

- [[2026-Q3]] — 2026-07-01 to 2026-08-01, 347 entries (includes the 2026-07-21 insurance pivot)
- [[2026-Q2]] — 2026-06-07 to 2026-06-30, 173 entries (business decisions, initial SMB-era dashboard build)

**Recent (pointer only — full write-ups in [[2026-Q3]]):**

- [CC | 2026-08-01 — Prompts 402/403/404 shipped, queue empty except HOLD] Overview You/Everyone toggle + role-aware attention (404, `84a91ce`), Overview clock now reads account timezone not device local (403, `0d542e7`), Leaderboard gets Production's date-nav stepper for browsing past periods (402, `0ed6702`). LIVE_STATE's "Next Up for CC" queue is empty except Prompt 393 (Zoom Live Room), still on HOLD pending Brayden's real Zoom URL. Full detail, verification notes, and resume prompts in [[2026-Q3]].
- [CC | 2026-08-01 — Prompt 407 shipped: profile avatars everywhere] `d46e661` + migration 096 (applied live, Brayden-confirmed). New shared Avatar component replaces 13 bespoke single-initial spots app-wide with real photo-or-two-initial-colored-circle rendering; Profile page gets click-to-upload. Build+lint clean; screenshot verification blocked by the same login wall as Prompts 401/403/404. Full detail + resume prompt in [[2026-Q3]].
- [CC | 2026-08-01 — Prompt 409 shipped: persistent avatar-upload camera badge] `0364e42`. Small follow-up to 407 — added a small always-visible camera-icon badge on the Profile avatar circle so it reads as clickable at rest, not just on hover. Found already partially written (uncommitted) on disk when picking up the queue; verified lint/build clean and shipped it. Full detail in [[2026-Q3]].
- [CC | 2026-08-01 — Prompt 408 shipped: Add-carrier form opens near the button] `8d84047`. Moved the Carrier Portals "Add carrier" form from below the full card grid to directly under the header row, so it's visible without scrolling. Pure JSX reorder, no logic change. Build+lint clean; screenshot verification blocked by the same login wall (Claude-in-Chrome also not connected this session). Full detail in [[2026-Q3]].
- [CC | 2026-08-01 — Prompt 406 shipped: Production defaults to Monthly] `e0f8aab`. Performance → Production's period toggle now opens on Monthly instead of All Time, matching Leaderboard. One-arg change (`usePeriodPicker(today, 'monthly')`) plus updated stale comments that documented the old default. Build+lint clean (one pre-existing, unrelated lint finding confirmed via git stash); screenshot verification blocked by the same login wall. Full detail in [[2026-Q3]].
- [CC | 2026-08-01 — Prompt 405 shipped: "Default Overview to" moved Settings→Profile] `54bca96`. Correction to Prompt 404 — the You/Everyone default-scope toggle only means anything once "I'm also actively writing business" is ON, so it moved off Settings → Regional (standalone) onto Profile, in the same section as the monthly-goal field, sharing that exact reveal gate. Build+lint clean (0 findings in both files); screenshot verification blocked by the same login wall. Queue now empty except Prompt 393 (HOLD). Full detail in [[2026-Q3]].
- [CC | 2026-08-01 — Prompt 410 shipped: Compensation Grid bigger text/rows] `815262e`. Increased table/header font size, row padding, and tier column width in `CompensationGrid.jsx` per Brayden's explicit tradeoff (readable text over fitting all 16 tiers without horizontal scroll). Skipped the softer secondary ask (own vertical-scroll box for the ~150 rows) — flagged as not fully committed and needs a live look to combine cleanly with the existing sticky-left columns. Build+lint clean; same login-wall screenshot block as recent prompts. Queue now just Prompt 393 (Daily.co Live Room, active). Full detail in [[2026-Q3]].
- [CC | 2026-08-01 — Prompt 393 shipped: Live Room built on Daily.co, blocked on Brayden's signup] `5344634`. Full Team → Meetings Live Room built with Daily's React SDK (custom join/mute/camera/tiles UI, real avatars when camera's off, admin "notify team" button) — everything CC can build is built and pushed. Genuinely stopped short of "done": CC cannot create accounts (hard policy), so this needs Brayden to sign up free at daily.co, create one room, and paste the URL into Settings → Integrations. No API key needed anywhere. Zero further code changes once that URL exists. Queue is now fully empty. Full detail in [[2026-Q3]].
- [CC | 2026-08-02 — Prompts 412+411 shipped: real Balance (projected commission) + tab reorder/rename] `a941f39` + fix `2a1facd`, migration 098 applied live. `policies.estimated_commission` now computed via trigger from `commission_schedule`'s tier-70 rate (exact carrier+product match), backfilled live — verified one real match ($739.20 on a Mutual of Omaha policy) and confirmed Aflac/Baltimore Life/Chubb correctly land on null → rendered as "Pending," never $0. New `Balance.jsx` replaces the ComingSoon placeholder; Commissions tabs reordered (Balance first/default) and renamed from "Balance & Reserve." Caught + fixed same session: the migration's function drop+recreate initially lost the avatar fields Prompt 407 had added to `team_performance_policies()` — corrected live before wrap-up. Build+lint clean; screenshot verification hit the same login wall (prod URL also 404'd this session) — build- and live-DB-verified only. Full detail in [[2026-Q3]].
- [CC | 2026-08-02 — Prompt 413 shipped: My Policies You/Everyone fixes + admin agent filter] `07cc83a`. Restyled My Policies' bespoke toggle to the standard `Segmented` component; wired it into the "I'm also actively writing business" gate Overview/Performance already respect (hides for admin when off, forces Everyone); added an admin-only "Filter by agent" option; renamed Profile's "Default Overview to" → "Default view" and wired that same setting into My Policies' and Performance's initial scope too (was Overview-only before). Build+lint clean (1 pre-existing unrelated finding confirmed via git stash). Screenshot verification blocked — same login wall, plus the Vercel prod URL itself 404'd in-browser for a second session running, flagged for Brayden to check directly. Build-verified only. Full detail in [[2026-Q3]].

