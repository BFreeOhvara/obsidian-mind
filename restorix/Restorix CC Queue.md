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

## Prompt 573 — redo the Phone Calls preview: its own distinct layout, not the shared tiles+log shape

**Why:** 568's preview and 569's/570's all render through the same generic `LivePreview` component (4 `PreviewTile`s in a grid, then a flat `.map()` of log rows) — so Brayden opens Phone Calls, Insurance, Follow-Ups and they all look like the same page with different words in it. That's the actual problem, not any single value or label. Fix it for Phone Calls specifically, right now: give `intake_triage` its own dedicated render, purpose-built around what someone actually opens this page to check — is the phone getting answered, is anything sitting unhandled, are calls turning into booked consults. Leave `insurance` and `follow_up` exactly as they render today — this prompt touches `intake_triage` only, everything else in `MyAgent.jsx` must be pixel-identical to before this prompt.

**Where:** `src/pages/MyAgent.jsx`. Add a new component (e.g. `PhoneCallsPreview`) and route to it specifically when `agentKey === 'intake_triage'` and `showLivePreview` is true, instead of falling through to the shared `LivePreview`. `insurance` and `follow_up` keep using `LivePreview` unchanged, with their existing `PREVIEW.insurance` / `PREVIEW.follow_up` data untouched.

**Data:** restructure `PREVIEW.intake_triage` for this new shape (the flat `tiles`/`rows` shape it currently has is exactly what's being replaced — CC's call on the new object shape, but it needs to carry: the existing 8 sample call rows, each with an added flag marking whether it belongs in the attention panel; the three funnel-stage counts; and the avg-pickup stat). Keep the same 8 calls, outcomes, and relative timestamps already in the current sample data — don't invent new ones, just reshape/tag them:

1. **"Needs your attention" panel, first, above everything else.** Pull out only the calls that actually need a human to do something — the escalated after-hours crisis call `(415) 555-0195` and the awaiting-callback one `(925) 555-0134` (mark these two with an `attention: true`-style flag in the data rather than re-deriving it from their pill text). Distinct visual treatment from the log below it — not another row in a list: a card with a left accent border colored by urgency (red for the escalated one, amber/yellow for the awaiting-callback one), phone number, the one-line reason, relative time. **If there's nothing needing attention, this whole section doesn't render** — no empty-state box, it just isn't there.

2. **"Today at a glance" — a call funnel, not four stat tiles.** Three connected stages, each visually narrower than the last (reuse the `bg-muted`/`bg-accent` bar treatment already established for Bed Availability's occupancy bars in 571 — same tokens, a funnel is just that shape rotated to steps): **Answered 24 → Consult offered 14 → Booked 9**, with each stage's count and its conversion off the previous stage labeled (e.g. "58%" answered→offered, "64%" offered→booked — CC's call on exact wording/markup). These numbers must still support the existing "38% booking rate" claim (9 of 24 ≈ 38%) — don't change the headline number, just show the funnel it comes from. Keep **"Avg pickup: Instant"** as one small standalone stat next to or above the funnel (it doesn't have a stage-count, it's a speed claim, so it doesn't belong inside the funnel shape itself).

3. **"Recent calls," grouped by day** — same row treatment as today (mono phone number, one-line outcome, `STATUS_TINT` pill, relative time), but under `.eyebrow` day-group headers ("Today" / "Yesterday") instead of one flat list. Keep all 8 existing sample rows (including the two also surfaced in the attention panel above — a client should still see them in the full record, not just the callout); split them across the two day groups however reads naturally given their existing relative timestamps (the further-out ones — 5h/6h ago — can read as "Yesterday" if that helps the grouping feel real, CC's call).

4. **Condensed value-prop line** at the bottom — unchanged, still `entry.copy.whatItDoes`, same treatment as every other page.

**Visual system:** same constraint as every prompt in this series — reuse `rounded-card`, `bg-elevated`, `border-line`, `.eyebrow`, `font-display`/`font-sans`, `STATUS_SOLID`/`STATUS_TINT` tokens exactly as already defined. The funnel bars and the attention panel's accent border are compositions of these existing tokens, not new colors or a new design language.

**Not a template for the rest yet:** this is Phone Calls only. Insurance (569) and Follow-Ups (570) keep their current shared-`LivePreview` rendering for now — Brayden will ask for those to get their own distinct treatment separately when it's their turn; don't preemptively change them in this prompt.

**Do:** build in `src/pages/MyAgent.jsx`, hardcoded sample data only (reshaped from what's already there, nothing fetched), `npm run build && npm run lint`, visually verify as `test_client` at `/my-agents/intake_triage` (plain navigation, no query param — the 572 identity gate already handles this), confirm Insurance and Follow-Ups previews and every other agent page are pixel-identical to before this prompt. Commit as `Prompt 573: redo Phone Calls preview with its own distinct layout`, push, log in [[Restorix Memories]], clear from the queue.

**Not in scope:** Insurance's and Follow-Ups' own layouts (unchanged for now), Bed Availability (571, still queued, unrelated), and the Overview page's own redesign (still queued for after every individual agent page is done).
