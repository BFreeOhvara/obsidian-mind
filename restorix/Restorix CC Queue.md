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

## Prompt 571 — build out the "Bed Availability" agent page as if it were live — layout only, no real system yet

**Same scope discipline as 568/569/570, applied to Bed Availability — but a different shape, deliberately.** `AGENT_CATALOG.bed_sync.status` stays `'placeholder'` — do **not** flip it to `'live'`, same reason as every prompt in this series: `MyAgent.jsx` is shared across every agent, `status` is what Overview's card and the badge actually key off, no real automation exists behind Bed Availability yet. This only builds what the page *would* look like.

**Gate:** extend the same test-account identity gate from 572 in `src/pages/MyAgent.jsx`, now also matching `agentKey === 'bed_sync'` — a fourth branch, same mechanism. Every other `agentKey` renders exactly as it does today, and any account other than `test_client` sees the unchanged placeholder on Bed Availability too. Test client's `sub_agents` already includes `bed_sync`, so `portal.restorix.co/my-agents/bed_sync` — no query param needed — as `test_client` is how Brayden reviews it.

**Why this one shouldn't just copy 568-570's call/message-log shape:** Bed Availability isn't a conversation with a discrete per-lead outcome (booked / routed / opted-out) — it's a continuously-synced *state* (how many beds are open right now, per program). Forcing it into the same "outcome pill per row" log would misrepresent what this agent actually does. Build it around availability instead, matching the shape already sketched on the Overview mockup Brayden and Eagle reviewed 2026-09-01 (occupancy bars, not outcome pills), just with more room to break it out by program.

**What renders for the test client account, on Bed Availability only:**

Keep the existing header row as-is. For the test client account, the badge reads "Live" — same `STATUS_SOLID.appointment_booked` solid-green treatment as the rest of this series.

Below the header, replace the `whatItIs`/`whatItDoes`/`needsConnect` block (test-account path only) with:

1. **A stat-tile row, 4 tiles** — same `Tile` pattern/grid as the rest of this series (`rounded-card border border-line bg-elevated p-5`, `.eyebrow` label, `font-display text-3xl font-medium` value, `grid grid-cols-2 sm:grid-cols-4 gap-4`). Hardcoded sample values:
   - "Beds open" → 12 <span style="opacity:.6">/ 18</span> (smaller "/ 18" the way the Overview mockup rendered it — CC's own call on exact markup)
   - "Occupancy" → 67%
   - "Programs synced" → 3
   - "Last synced" → 2 min ago

2. **A "By program" section** — `.eyebrow` label, then one row per program (3 rows: Detox, Residential, PHP/day program — CC's call on exact names, keep them plausible for a behavioral-health facility). Each row: program name on the left, a small horizontal occupancy bar (`bg-muted` track, `bg-accent` fill, matching the bar already built for this card on the Overview mockup) filled to that program's own ratio, "X / Y open" at the end. Sample split across the 12/18 total, e.g. Detox 4/6, Residential 6/9, PHP 2/3.

3. **A "Recent sync activity" section** below that — `.eyebrow` label, ~6 sample rows (fewer than the other pages' 8 — this agent doesn't generate per-lead conversation volume, padding it to 8 would be filler). Each row: a small colored dot (not an outcome pill — this isn't a discrete win/loss) + one-line description + relative timestamp, same dot pattern already used on the Overview mockup's hero card: green dot for a bed released/opened, blue (`accent-bright`) dot for a bed held/reserved, gray (`text-faint`) dot for a manual staff update. Sample content, e.g. "Detox wing — 2 beds released" / "Residential — 1 bed held for incoming transfer" / "PHP — capacity updated by staff."

4. **A condensed value-prop line** below that — reuse `entry.copy.whatItDoes` (unchanged on the catalog: "A delay here is a common reason an inquiry gets lost... Instant, accurate availability keeps the booking moving..."), rendered smaller/fainter than its current placeholder treatment, same as the rest of this series.

**Visual system:** identical constraint to the rest of this series — reuse `rounded-card`, `bg-elevated`, `border-line`, `.eyebrow`, `font-display`/`font-sans` tokens exactly as already defined. The occupancy-bar treatment is the one already used on the Overview mockup for this same card, not a new pattern. No new colors, no new fonts.

**Do:** build in `src/pages/MyAgent.jsx` behind the test-account gate from 572, hardcoded sample data only, `npm run build && npm run lint`, visually verify at `/my-agents/bed_sync` (no query param) as `test_client`, confirm Phone Calls (568), Insurance (569) and Follow-Ups (570) previews still render correctly and every other agent page — including Bed Availability's own page for any non-test account — is pixel-identical to before this prompt. Commit as `Prompt 571: build live-state layout preview for the Bed Availability agent page`, push, log in [[Restorix Memories]], clear from the queue.

**Not in scope:** the Overview page's own redesign (still queued for after every individual agent page is done), any other agent's page, and anything that actually makes Bed Availability functional.
