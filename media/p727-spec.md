
## Prompt 727 — Book a call: unavailable times are just grayed out (no "Too soon" text) + prove the time-zone blocking works per instant

> **✅ REQUESTED by Brayden 2026-10-09 (Falcon session), screenshot of `/agent/book` in hand: "I don't want it to say too soon... they just shouldn't be able to book it. It should just be gray like the other ones are."** CC: build this. **Sonnet 5.5 is enough** (one label removed, plus a test). **Self-flag rule:** if the time-zone test in section 2 shows a slot being blocked by wall-clock text instead of by the actual moment in time, stop and surface it as an Opus-tier problem before changing any logic.

**What this is.** Small follow-up to P724 on `/agent/book` (the `SlotGrid` / slot buttons from P715 + P724). No migration, no new hooks, no mockup (the screenshot below is the whole reference).

### 1. Grayed out, no words

Today a slot inside the 30-minute notice window renders gray **with a small "Too soon" caption under the time** (screenshot: 12:30 PM shows "Too soon" while 12:00 PM, already past, is plain gray). Brayden wants every unavailable slot to look the same: the same gray disabled style the past slots already use, **no caption**.

- Remove the visible "Too soon" text. A too-soon slot becomes visually identical to a past slot (same disabled colour, no caption, same `disabled`, not focusable, not clickable). The cutoff rule itself (can't book within 30 minutes of now or in the past) is unchanged.
- Keep an accessible name so screen-reader users still get the reason: put it in `aria-label` / `title` only (e.g. "12:30 PM, unavailable"), not as visible text. Don't invent new visible copy.
- **Leave the "Booked" caption alone** on a slot the agent already has an open booking at. Brayden only asked about "Too soon"; "Booked" tells the agent *why* that slot is gray. Flag in the ship note that it's still there so he can decide.
- Don't touch the info note under the grid ("Today or tomorrow works best for most clients… Calls need 30 minutes' notice, and a time you've already booked is taken."): it stays, and it's the only place the 30-minute rule is stated.
- Update the P724 line in [[DESIGN]] (and `media/p724-book-a-call/` mockups need no change; they're a historical reference): a slot inside the notice window is a plain disabled slot, no caption.

### 2. Prove the time-zone blocking (Brayden's exact scenario)

Brayden's question: *does booking noon for a California client wrongly block noon for a Texas client?* Slots are the **client's local time**, but blocking must compare the **actual moment** (UTC instant), so two different local times that are the same instant block each other, and the same local clock time in two zones does **not**. The P724 ship log says this already works (`Booked` = same instant, checked in a harness). **Re-prove it with his numbers** in the same kind of throwaway Vite harness (mocked hooks, frozen clock; delete it, never commit):

- Agent already has an open booking at **12:00 PM Pacific** (= 2:00 PM Central) on a day in the future. In Book a call:
  - client in **California** (e.g. San Diego, CA): 12:00 PM is "Booked" (disabled)
  - client in **Texas** (e.g. Houston, TX): **12:00 PM is open** (not blocked); **2:00 PM is "Booked"** (same instant)
- Reverse: open booking at **12:00 PM Central** (Texas client) = 10:00 AM Pacific. California client: **10:00 AM "Booked", 12:00 PM open**. Texas client: 12:00 PM "Booked".
- The 30-minute cutoff also by instant: with the frozen clock at e.g. 12:19 PM Central, a Central client's 12:30 PM is disabled with **no caption**; an **Eastern** client's 1:30 PM (same instant as 12:30 Central) is disabled too; a Pacific client's 10:30 AM is disabled (same instant); the first open slot per zone is the first half hour at least 30 minutes ahead of now.
- A split-zone state (Pensacola, FL → Central; Miami, FL → Eastern) still resolves its zone, and the blocking then follows that zone (P724 already did this; just include it).
- If any of these fail, fix it only if it's a one-line comparison bug; otherwise stop and flag it as above.

Also confirm in the harness: dark and light, 1440 and 390 (no horizontal scroll), and `grep` the rendered `/agent/book` text for "Too soon": zero hits.

### 3. Files and rules

- Expect `src/pages/agent/BookCall.jsx` and/or the shared `SlotGrid` in `AgentUI.jsx` (it's also used by the My Pipeline drawer's Move / Re-book picker; the **same no-caption behaviour applies there**, since it's the same grid). Design tokens only; light mode works. No migration, no new dependencies.

### 4. Verify and log

- `vite build` + eslint clean on touched files. Ship note in [[Memories]]: say plainly it wasn't seen logged in, list which scenarios in section 2 passed, and that "Booked" still has its caption. Brayden checks: (1) a slot inside the next 30 minutes is plain gray with no words, same as past slots; (2) the same in the My Pipeline Move / Re-book picker; (3) book a call as a California client, then start a Texas one and confirm the two clock times aren't blocked against each other the way he described.
