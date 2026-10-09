## Prompt 732 — "Needs attention" means the Needs attention tab only: fix the Overview box, No answer rows and drawer, the Change a booking search, and the Next call line

> **✅ Asked for by Brayden 2026-10-09 (Falcon session), from screenshots of the live portal. Sonnet 5.5 is enough** (agent UI plus one filter; no migration, no new hooks, no new dependencies). Queued after P731; nothing here touches P731's files.

**Why.** P723's Overview box "Needs your attention" fills from the **No answer** count, so Test Agent's Overview shows "3 Needs your attention" with a **Re-book** button on each, while in My Pipeline **Needs attention is 0** and those same three sit in **No answer**. The page and the box disagree. Brayden's rule: **No answer = Fulfillment is still working it, the agent has nothing to do** (if the client texts back wanting a change, the agent changes the booking, nothing more). **Needs attention = only the Needs attention tab** (P726's two groups: *Confirm the number* and *Call and rebook*). Four fixes follow from that, plus one small tidy-up.

### 1. Overview "Needs your attention" box follows the Needs attention tab

- **Rows** = exactly the clients where `tabOf(...) === 'needs'` (both groups), the same helper My Pipeline's tab uses. **A No answer client never appears here.** Find every place the Overview derives "needs attention" from the No answer count (the `AttentionCard` list, its count badge, the switch between the amber box and P723's "Up next" box, any pill or number in the hero) and move all of them to the needs count, so the Overview, the My Pipeline tab, the header pill and the sidebar badge always show the same number. `grep -n -i "noanswer\|no_answer\|needsAttention\|AttentionCard" src/pages/agent/Overview.jsx src/components/agent/*`.
- **Button on each row:** replace **Re-book** with a ghost pill **"Open"** + arrow (`ArrowRight`, `.ov-ghost`, same size as today's button). It goes to `/agent/clients?open=<id>&stage=needs` (My Pipeline, Needs attention tab, that client's drawer open). The whole row is clickable to the same place. **No re-book or confirm flow starts from the Overview any more**; it only takes the agent there.
- **Row text:** name, then "Carrier · <the phase line My Pipeline shows for that row>" using the same helper (e.g. "The number didn't connect", "Texts + retry, no reply"). No "1 try, last on Oct 1" unless that is what the My Pipeline row shows for it.
- **Intro line** under the title: "N to confirm · N to call. Open one to see what to do." (omit a part that is zero). The bottom button "Open in My Pipeline" stays and goes to `/agent/clients?stage=needs`.
- **Zero needs-attention clients:** the box falls back to the "Up next" box exactly as P723 built it. With today's Test Agent data (3 No answer, 0 Needs attention) the Overview should now show Up next, not the amber box.

### 2. My Pipeline: No answer rows become plain rows

- **No answer tab rows lose the Re-book button.** They end in the same chevron as Booked rows; the whole row opens the drawer as today.
- **The "Next try" column** currently says "Re-book a time, or Fulfillment tries again" with a refresh icon. That tells the agent to act. Change it for No answer rows to a neutral line: **"Fulfillment will try again"**, keeping whatever timing the row already knows (e.g. "Retry call today", "Text tomorrow morning"; use what the recovery phase provides, don't invent timings). `grep -rn -i "re-book a time" src/`; change only strings a No answer row shows. **Needs attention rows keep their wording and their Confirm number / Rebook buttons exactly as they are.**
- **Drawer for a No answer client:** the bottom button becomes **"Change this booking"** (pencil, same ghost button and same target as a Booked client's: `/agent/book?change=<id>`), replacing "Re-book a call". The Journey, status line and everything else in the drawer is unchanged. Keep the in-drawer re-book mover (`useMove`, `?rebook=1`) for **Needs attention** clients, which still use it; just don't offer it to No answer. A `?rebook=1` URL for a No answer client simply opens the drawer.

### 3. Book a call → Change a booking: only show what can be changed

Step 1's type-ahead (`ChangeBooking.jsx`) lists **only** clients that are:
- **Booked**,
- **No answer**, or
- **Needs attention → Call and rebook** (not *Confirm the number*).

Everything else is **not shown at all**, not greyed: Cancelled and Complete, "on a call right now", and Confirm the number (P730 currently shows those greyed with "Can't be changed" / "On a call right now" / "Confirm their number first"; remove those greyed rows and their captions from the list). Do the filter with the **same `tabOf` helper** the My Pipeline tabs use plus the Confirm-the-number check, so the two screens can never disagree about a client's status. If what the agent typed only matches hidden clients, show the existing "no match" line. Deep links (`?change=<id>`) to a client that can't be changed keep the explanation page P730 built. The server guards in `agent_change_booking` stay exactly as they are.

### 4. My Pipeline → Your pipeline → "Next Fulfillment call": name only

- The line under "Next Fulfillment call" shows **only the client's name** (one line, truncates with an ellipsis). Remove the time and anything else from that line. Keep the small date tile on the left as it is (Falcon's call: it's the row's icon, and the date is the one thing a name alone doesn't give; Brayden can say if he wants it gone). Everything else about the call (time, carrier, city) is what the drawer shows when he presses **Open**.
- **"Open" stays an "Open" ghost pill** but must be **vertically centred on the row** (it currently sits visibly higher than the text). Centre the row with `align-items: center`, same height for the pill, and measure: the pill's centre is within 1px of the centre of the tile and the text block, at 1920×930 and 1440×900, with a short and a very long name. No call coming up: unchanged ("No calls booked" + the Book a call pill).

### 5. Files and rules

Expect `src/pages/agent/Overview.jsx` (and wherever `AttentionCard` lives), `src/components/agent/AgentUI.jsx` (`PipelineList` No answer rows, `ClientDrawer` bottom button, `PipelineSummary` next-call row), `src/pages/agent/ChangeBooking.jsx`, `src/index.css`, `DESIGN.md` (add a "P732" line under v16 and fix any line that says the Overview box is No answer). No migration. Design tokens only; light mode must work. Don't touch Fulfillment, admin or P731's files.

### 6. Verify and log

- `vite build` + eslint clean on touched files. Throwaway Vite harness with mocked hooks (delete it, stop its server before deleting its folder, never commit), Playwright + local Chrome, dark and light, 1920×930 and 1440×900, and 390px:
  - **Overview:** 3 No answer + 0 Needs attention → Up next box, no amber box, no "Re-book" anywhere. 2 Confirm-the-number + 1 Call-and-rebook → amber box with 3, the intro "2 to confirm · 1 to call", each row's **Open** lands on `/agent/clients?open=<id>&stage=needs` with the drawer open on the Needs attention tab. No answer clients never appear in it.
  - The Overview count, My Pipeline's Needs attention tab count, the header pill and the sidebar badge agree in each of those states.
  - **My Pipeline:** No answer rows show a chevron and no button; the Next try column has no "Re-book a time"; opening one shows "Change this booking" at the bottom and it opens `/agent/book?change=<id>` with that client picked. A Needs attention client still shows its Confirm number / Rebook buttons and the in-drawer mover works as before.
  - **Change a booking:** with sample clients in every status, the search shows only Booked, No answer and Call-and-rebook clients. Cancelled, Complete, on-a-call-now and Confirm-the-number never appear, however the agent types them, and there are no greyed rows left in the list.
  - **Next call:** name only, centred Open pill (measure), long name truncates and never pushes the button.
  - `grep` the agent pages for "Re-book" and confirm the only places left are the Needs attention flow and its drawer.
- Ship note in [[Memories]]; say plainly it wasn't seen logged in. Brayden checks as Test Agent: (1) Overview no longer shows the amber box for the 3 No answer clients; (2) in My Pipeline, No answer rows have an arrow and no Re-book button, and the drawer's bottom button says Change this booking; (3) Book a call → Change a booking: cancelled clients don't show up at all; (4) Next Fulfillment call shows just the name and the Open button is centred. **Test Agent has no Needs attention clients, so the amber Overview box can't be seen live until one exists** (CC: don't seed any; Brayden asked for none).
