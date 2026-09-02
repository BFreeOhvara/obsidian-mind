---
date: 2026-09-01
description: "The live CC task queue for Restorix — open build items only, written by the manager/Cowork chat, emptied by CC on ship. The one file CC reads at session start."
tags:
  - restorix
  - cc-queue
---

# Restorix CC Queue

> **The live task queue for CC (the builder).** Manager/Cowork chats (Eagle/Falcon) **append** prompt specs here; CC executes top to bottom, **deletes each item the moment it ships**, and writes the full record to [[Restorix Memories]]. An empty queue below means there is nothing for CC to do.
>
> **Why this is its own file** (added 2026-09-01 after a stale-clone incident): keeps ownership clean — manager chats own this file, CC owns [[Restorix LIVE_STATE]] + [[Restorix Memories]] — and keeps it small enough to read whole, append to, and re-read to verify in seconds. See vault-root `CLAUDE.md` → "Reaching Atlas safely".
>
> **Rules for whoever writes here:**
> - Write into the **connected local vault folder** `C:\Users\freem\obsidian-mind`, never a clone. Confirm it's attached first.
> - After writing, **re-read this file from disk** and confirm your text is present before telling Brayden it's queued.
> - **Numbering:** next prompt number = one past the highest referenced in [[Restorix LIVE_STATE]] + [[Restorix Memories]]. Don't reserve numbers anywhere but here.
> - One `## Prompt NNN — <title>` heading per item. Put the full spec inline (or in a `<details>` block). Order = execution order.


---

## Prompt 570 — build out the "Follow-Ups" agent page as if it were live — layout only, no real system yet

**Same shape as 568 (Phone Calls) and 569 (Insurance), applied to Follow-Ups:** a UI/layout pass only, on one page, for one agent. `AGENT_CATALOG.follow_up.status` stays `'placeholder'` — do **not** flip it to `'live'`, same reason both predecessors gave: `MyAgent.jsx` is shared across every agent, `status` is what Overview's card and the badge actually key off, no real automation exists behind Follow-Ups yet. This only builds what the page *would* look like.

**Gate:** extend the same `?preview=live` query-param gate from 568/569 in `src/pages/MyAgent.jsx`, now also matching `agentKey === 'follow_up'` — a third branch alongside `intake_triage` and `insurance`, same mechanism, not a new one. Every other `agentKey`, and Follow-Ups' own page without the query param, renders exactly as it does today. Test client's `sub_agents` already includes `follow_up`, so `portal.restorix.co/my-agents/follow_up?preview=live` as `test_client` is how Brayden reviews it.

**What renders when `?preview=live` is present, for Follow-Ups only:**

Keep the existing header row as-is. Under `?preview=live`, the badge reads "Live" — same `STATUS_SOLID.appointment_booked` solid-green treatment 568/569 used.

Below the header, replace the `whatItIs`/`whatItDoes`/`needsConnect` block (preview-flag path only) with:

1. **A stat-tile row, 4 tiles** — same `Tile` pattern/grid as 568/569 (`rounded-card border border-line bg-elevated p-5`, `.eyebrow` label, `font-display text-3xl font-medium` value, `grid grid-cols-2 sm:grid-cols-4 gap-4`). Hardcoded sample values:
   - "Active sequences" → 6
   - "Messages sent today" → 14
   - "Re-engaged this week" → 3
   - "Avg days to book" → 2.4

2. **A "Recent activity" section** — `.eyebrow` label, ~8 sample rows. Each row: lead phone number + the channel and one-line result (text/email/call, matching the "texts, emails, calls" the catalog copy already promises), an outcome pill on the right using the existing `STATUS_SOLID`/`STATUS_TINT` colors — this agent's own natural outcomes:
   - Replied, booked → green (`appointment_booked`)
   - In sequence, awaiting response → gray (`no_answer`)
   - Replied, not ready yet — sequence continues → yellow (`follow_up`) — this one's a deliberate fit, not a stretch: it's the same status color the rest of the app already uses to mean "follow-up," reused here for exactly that meaning.
   - Opted out / unsubscribed → red (`not_interested`) — the one standout case worth surfacing distinctly, parallel to Phone Calls' crisis row and Insurance's expired-coverage row: include at least one among the 8 sample rows.
   Relative timestamp per row, same as 568/569. Names/numbers are CC's own sample judgment, not fetched from anywhere real.

3. **A condensed value-prop line** below the log — reuse `entry.copy.whatItDoes` (unchanged on the catalog: "Decisions to enter treatment often aren't made on the first call... This keeps every one of them warm until they actually book..."), rendered smaller/fainter than its current placeholder treatment, same as 568/569.

**Visual system:** identical constraint to 568/569 — reuse `rounded-card`, `bg-elevated`, `border-line`, `.eyebrow`, `font-display`/`font-sans`, `STATUS_SOLID`/`STATUS_TINT` exactly as already defined. No new colors, no new fonts, no new component patterns — this page should feel like the same system as the two before it.

**Do:** build in `src/pages/MyAgent.jsx` behind the extended preview gate, hardcoded sample data only, `npm run build && npm run lint`, visually verify at `/my-agents/follow_up?preview=live` as `test_client`, confirm Phone Calls' (568) and Insurance's (569) previews still render correctly and every other agent page — including Follow-Ups' own page without the query param — is pixel-identical to before this prompt. Commit as `Prompt 570: build live-state layout preview for the Follow-Ups agent page`, push, log in [[Restorix Memories]], clear from the queue.

**Not in scope:** the Overview page's own redesign (still queued for after every individual agent page is done), any other agent's page, and anything that actually makes Follow-Ups functional.
