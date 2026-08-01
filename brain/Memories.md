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

