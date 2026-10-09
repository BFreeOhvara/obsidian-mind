## Prompt 738 — Small fixes: the carrier field reads "Carrier" with a placeholder that fits, and the Overview's "You're all caught up" rows stop being clickable

> **✅ Asked for by Brayden 2026-10-09 (Falcon session), from screenshots of Book a call and the Overview. Sonnet 5.5** (two small agent-UI edits; no migration, no function, no new dependency; nothing to deploy). Queued after P737.

### 1. Book a call → New booking: the carrier field

- The label **"Carrier they're leaving" becomes just "Carrier"**. Change it everywhere the same field is labelled for the agent (`Book a call` New booking, the same field anywhere in Change a booking, and any validation or helper message that repeats the old phrase, e.g. "Pick the carrier they're leaving" → "Pick a carrier"). `grep -rn -i "they.re leaving" src/` and change only agent-facing strings; leave admin and Fulfillment pages and the code comments alone.
- The placeholder **"Start typing, e.g. Mutual of Omaha" is cut off** in the field (it is one of three columns in its row). Make it **"e.g. Mutual of Omaha"** (`CarrierInput` in `AgentUI.jsx`, P728). Check it is **not clipped at any width**: 1920, 1440, 1100 and 390, in dark and light, by measuring the placeholder's rendered width against the input's inner width (the `Building2` icon takes room on the left). If it still doesn't fit at some width, shorten it to just **"Mutual of Omaha"** at that width rather than let it truncate, and say so in the ship note. Nothing else about the field changes: the type-ahead, inline completion, "Use <text>", the pick check and the required rule stay exactly as P728 made them.

### 2. Overview → "You're all caught up" box: only the button is clickable

This is the side box that replaces the amber "needs attention" box when no client needs the agent (`ComingUpCard`, P723). Brayden's rule: **the rows are information only; the one button, "Open My Pipeline", is the only thing you can click in that box.**

- The **featured "Up next" call** (the blue card with the date tile, name, carrier, time and "In 3 days") and the **next three rows** (two on phones) become **plain, non-interactive elements**: no `<a>` / `Link` / `button` / `role=link`, no `tabindex`, no pointer cursor, no hover tint, no focus ring, no click handler. **Remove the faint arrow** at the right of the three small rows. Keep everything else about how they look (the date tiles, the booked-blue tint on the featured card, the relative label, the hairlines between rows).
- The "Up next" label row and its "12 calls booked" count stay as plain text.
- **"Open My Pipeline" (`.ov-primary`) stays and keeps its destination.** Tab from the box's title should reach exactly one stop in this box: that button.
- **Unchanged:** the amber "needs attention" box and its **Open** pills and clickable rows (P732); the "Nothing on the books yet" state with its **Book a call** button (nothing is listed there); the **Booked this week** and **Cancelled this week** cards and every other Overview element. The only change on the Overview is the rows inside "You're all caught up".
- Update `DESIGN.md`: rewrite the P723 line's "All link to `/agent/clients?stage=booked&open=<id>`" and the "faint arrow" wording, fix the P728 line's placeholder, and add a "P738" line.

### 3. Files and rules

`src/components/agent/AgentUI.jsx` (`ComingUpCard`, `CarrierInput`, the label), `src/pages/agent/BookCall.jsx` / `ChangeBooking.jsx` if the label lives there, `src/index.css` (drop `.ov-up-row` hover / arrow rules that are now unused), `DESIGN.md`. Design tokens only; light mode works. Don't touch the amber box, Fulfillment or admin pages.

### 4. Verify and log

- `vite build` + eslint clean on touched files. Throwaway Vite harness with mocked hooks (as before; delete it, stop its server first, never commit), Playwright + local Chrome, dark and light, 1920×930, 1440×900, 1100 and 390:
  - **Book a call:** the label reads "Carrier"; the placeholder reads "e.g. Mutual of Omaha" and is not clipped at any of the widths (measured); typing, suggestions, inline completion and the required error still work; Change a booking has no "they're leaving" text left.
  - **Overview, state "caught up" with 4+ booked calls:** inside the box there is exactly **one** `a` / `button` / `[tabindex]` (Open My Pipeline, to its same target); the featured card and the three rows are not links, show no pointer cursor and no hover change, don't navigate when clicked, and have no arrow; Tab reaches only the button; phone shows the featured card plus two rows. With 1 booked call (no extra rows), with 0 booked (the "Nothing on the books yet" state and its Book a call button), and with a Needs attention client (the amber box, its Open pills and rows still clickable), the other states behave as before.
  - `grep` for "they're leaving" in agent pages: zero.
- Ship note in [[Memories]]; say plainly it wasn't seen logged in. Brayden checks as Test Agent: (1) Book a call → New booking says "Carrier" and the placeholder reads "e.g. Mutual of Omaha" in full; (2) Overview, "You're all caught up": none of the four calls can be clicked, the three small rows have no arrow, and "Open My Pipeline" is the only button.
