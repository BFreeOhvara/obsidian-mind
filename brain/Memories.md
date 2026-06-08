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

---

## Recent Context

- Vault initialized 2026-06-07 with full Ohvara business context
- Brain upgraded 2026-06-07 with full sales process, commission, rep onboarding, and dialer context
- Google Maps scraper active at `C:\Users\freem\OneDrive\Desktop\Scraper`
- Ohvara dashboard live at `ohvara-dashboard.vercel.app`
- Priority niche: transportation — cast wide across all SMB niches
- Stripe payment link generation skill defined — not yet implemented in dashboard
