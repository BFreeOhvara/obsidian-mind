---
date: 2026-06-12
description: "Single current-state doc for all Ohvara sessions — overwritten on update, never appended. Read this + /reload convention to become fully operational."
tags:
  - brain
  - live-state
---

# LIVE_STATE

> **This is the ONE file any session reads to become fully operational.** It is a CURRENT-STATE document — overwritten on every update, not appended to. [[Memories]] remains the historical append-only log; this file is "what is true right now."

**Last updated:** 2026-06-12 00:16 (CC)

---

## The /reload Convention

When Brayden types **`/reload`** in any session (Eagle, Falcon, chat, or CC), that session:

1. **Reads this file** (`~/obsidian-mind/brain/LIVE_STATE.md`).
2. Responds with **(a)** an operational summary covering all four sections below — current state, standing rules, open threads, recent problems/resolutions.
3. **(b)** If requested, also produces a condensed paste-back block suitable for handing off to a different session/platform.

For deeper history or grounding, [[Memories]] (full session logs) and [[North Star]] (who we are, packages, goals) remain the canonical references — but this file alone is sufficient to start working. The full chain flow lives in [[reload]].

---

## CURRENT STATE

*(verified live as of 2026-06-12, ~00:15 local)*

- **Dashboard** ([BFreeOhvara/ohvara-dashboard](https://github.com/BFreeOhvara/ohvara-dashboard)) live at ohvara-dashboard.vercel.app, master = origin at `9f16459`, tree clean. Rep-ready: login → 150 leads → Call Now modal (AI script) → 4-outcome status flow, all verified as apex11.
- **Production DB:** migrations 001–021 applied. pg_cron: daily-batch-assign (00:05 UTC), process-lead-queues (hourly), eod-pipeline-sweep (23:55 UTC), plus legacy HTTP crons (assign-daily-batch 06:00, trigger-re-engagement 06:15, process-reminders every minute).
- **Lead pipelines are pure Postgres — zero Twilio dependency, fully functional now** (code-audited + live-data-verified 2026-06-12). No Answer: trigger → 24h pool → hourly cron redistributes to a random active rep; lead stays visible in the rep's tab intraday. Follow-Up: trigger → same-rep queue → returns on chosen date (no date = visible until EOD sweep queues it for +1 day). Not Interested: permanent do-not-contact + scraper dedup, archived by the EOD sweep.
- **Training gate LIVE:** new reps locked out of leads until 8 videos + quiz 85%+ (from the 48-card setter deck) + Retell roleplay graded B+. apex11 unlocked; rep_sarah locked.
- **AI live on real model output** — Anthropic credits topped up with auto-reload ($10 → $50). generate-ai-script (haiku, triple fallback) and recommend-stack both healthy.
- **Retell live:** roleplay agent "Mike - HVAC Owner" (`agent_c08d332c255a8fdbd78eede5a0`) working — Start Practice Call verified as apex11. **create-lead-call (AI call coach) deployed v5 at 2026-06-12 04:16 UTC with the Retell v2 fix confirmed in the live source.**
- **Scrapers:** in-dashboard Indeed (28 Profile A titles, hard niche filter — returns notConfigured until INDEED_MCP_TOKEN); in-dashboard Maps (GOOGLE_MAPS_API_KEY confirmed SET since 06-08 — not key-blocked); standalone Python Maps scraper repo (`maps-scraper`, main `454875e`, PR #1 merged).
- **Supabase secrets state:** ANTHROPIC, RETELL_API_KEY, RETELL_ROLEPLAY_AGENT_ID, GOOGLE_MAPS_API_KEY, all STRIPE_*_LINK_*, SECRETS_ENCRYPTION_KEY, CLIENT_PORTAL_URL set. Missing: TWILIO_*, INDEED_MCP_TOKEN, RETELL_COACH_AGENT_ID (expected — set after first coach call), STRIPE_SECRET_KEY (static links work).
- **Client portal** deployed (ohvara-client-portal.vercel.app); close → provision-client → onboarding → build-agent chain in place.

## STANDING RULES / SKILLS

*(every session follows these — sources linked)*

1. **CC prompts ship as single clean artifacts** — prompt only, one artifact per prompt, descriptively named; commentary stays in chat ([[cc-prompt-format]]).
2. **CC auto-log:** after EVERY completed task, append `[CC | YYYY-MM-DD HH:MM] — {what}` to [[Memories]] and commit+push Atlas immediately. A task is not done until its log is pushed ([[cc-prompt-format]]).
3. **LIVE_STATE update rule (NEW, 2026-06-12):** every CC task that changes state — deploys, schema/migration changes, secret changes, protocol decisions — must update THIS FILE as part of "done," before or alongside the Memories.md log entry. Overwrite sections in place; keep Problems & Resolutions to the last ~10–15 entries.
4. **Context alarm:** at ~60% context full, warn at the end of every message until "wrap up"; at ~90%, escalate and start nothing large ([[session-management]]).
5. **Wrap-up always commits and pushes ALL repos** — no uncommitted work left behind ([[auto-handoff]]).
6. **Recon-first:** before writing a CC implementation prompt that touches existing files, get the real file contents from CC first ([[reload]]).
7. **Model routing:** Sonnet for small fixes/routine tasks; Fable 5 for big autonomous builds only.
8. **Never ask Brayden to run SQL or terminal commands manually**; when blocked, state the blocker + two options ([[North Star]] rules — full list there).

## OPEN THREADS

*(priority order per Phase 1)*

1. **Blocker — Twilio secrets** (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / phone number from console.twilio.com → paste into CC → `npx supabase secrets set --project-ref jjextitmbptoaolacocs`). **Confirmed NOT a Phase 1 blocker for the rep flow** — only gates appointment-reminder SMS (cleanly stubbed, silent no-op) and future outreach texts.
2. **Blocker — INDEED_MCP_TOKEN** (source TBD) — Indeed scraper returns notConfigured until set; Maps scraper is the working fallback.
3. **Full end-to-end rep test as apex11** — does NOT need to wait on Twilio.
4. Set RETELL_COACH_AGENT_ID after the first coach call runs (prevents agent re-creation).
5. Supabase secrets cleanup: delete malformed `brayden11@ohvara.internal` + `ohvara-dashboard` entries; unschedule the dead trigger-re-engagement cron while in there.
6. Firecrawl auth: Brayden runs `firecrawl login --browser`, tells CC "logged in."
7. GitHub PAT lacks `workflow` scope (vault `.github/workflows/` untracked — low priority). maps-scraper README stale vs code (low priority).
8. Parked until 5+ recurring clients: [[dynamic-stack-pricing]], [[review-agent-leads]].

## PROBLEMS & RESOLUTIONS LOG

*(most recent first, last ~10–15 — full detail in [[Memories]])*

1. **2026-06-12 — Zombie re-engagement cron.** trigger-re-engagement (day-one legacy) still fires nightly, writing SMS/email rows to re_engagement_log that NOTHING sends (6 rows stuck pending). Decoupled from pipeline v2, harmless, flagged for unscheduling (logged `a02cbb0`).
2. **2026-06-12 — Twilio "descope" false memory.** Believed descoped; verified NO such decision exists in vault, git history, or secrets. Resolution: Twilio stays blocker 3 as written, but code audit confirmed the pipelines never depended on it — the rep test can run without it.
3. **2026-06-12 — Retell v2 coach/roleplay fix.** Root cause: missing agent-ID secrets + broken dynamic fallback (invalid voice id; general_prompt passed straight to create-agent — Retell v2 requires create-retell-llm + response_engine). Fixed both functions; roleplay verified live; create-lead-call deployed v5 (04:16 UTC, fix confirmed in deployed source).
4. **2026-06-11 — OneDrive "Delete 673 items?" popup.** Git auto-gc repacked loose objects in OneDrive-synced repos; correct answer is "Delete all items" ([[Gotchas]]).
5. **2026-06-11 — fetch-secrets capabilities always false for reps.** `supabase.functions.invoke()` defaults to POST → admin-only branch. Fixed by passing `{ method: 'GET' }` — this was why roleplay showed Coming Soon with the key set.
6. **2026-06-11 — Tab switch reloaded the whole app.** Supabase fires TOKEN_REFRESHED on tab return; auth listener set loading=true on every event → full remount. Fixed with same-user ref guard + refetchOnWindowFocus off.
7. **2026-06-11 — apex11 saw 0 leads (twice).** batch_date never advanced past UTC midnight. Permanent fix: assign_daily_batches() on pg_cron at 00:05 UTC (migration 016).
8. **2026-06-10 — Call Now modal rendered inside its table row.** animation-fill-mode:forwards made rows containing blocks for position:fixed. Fixed by portaling the modal to document.body (+ stopPropagation — portals move DOM, not React event bubbling).
9. **2026-06-09 — recommend-stack 500s.** Anthropic credits depleted; generate-ai-script survived via triple fallback. Lesson: every AI edge function needs a fallback; credits now auto-reload.
10. **2026-06-09 — PowerShell 5.1 file corruption.** Set-Content/Out-File mangle UTF-8 (mojibake, BOM in commit subjects). Use the Write tool for non-ASCII files; `git commit -F` with `[System.IO.File]::WriteAllText` for messages.

---

## Related

- [[Memories]] — append-only historical log (the source this file distills)
- [[North Star]] — who we are, packages, pricing, goals, hard rules
- [[reload]] — the /reload chain flow
- [[cc-prompt-format]] — artifact + auto-log rules
- [[auto-handoff]] — full wrap-up protocol
- [[ohvara-dashboard]] — dashboard architecture brain doc
