## Prompt 733 — Activity: "events" wording, a display-only activity box, a full-width feed, and the client story becomes a slide-in drawer

> **✅ Asked for by Brayden 2026-10-09 (Falcon session), from a screenshot of `/agent/activity`. Sonnet 5.5 is enough** (agent UI only; reuses the My Pipeline drawer shell; no migration, no new hooks, no new dependencies). Queued after P732. P732 touches the Overview, My Pipeline and Change a booking, not this page.

**What this is.** P718's Activity page (day hero + activity box with filter tabs + timeline feed + a 420px "Client story" panel beside it) gets three changes in Brayden's words:
1. The hero says *"12 things happened with 12 clients"*; he doesn't like "things". It should say **"12 events happened with 12 clients"**.
2. The **activity box should just display information**, like "Your pipeline" on My Pipeline: no filter buttons, no **All**, no **Moved**, no **Edited**. *"They're not buttons to be clicked. They just display information."* The rows in the feed still say what happened ("You changed John Scott's appointment time to …") and show what status the client is in.
3. The **feed should be as wide as everything else**, and the **Client story box goes away**: clicking a row opens a **side drawer that slides in like My Pipeline's**, with a button **"Go to My Pipeline"**.

### 1. Wording ("events", never "things" or "updates")

- Hero summary under the date: **"N events happened with M clients"**; singular **"1 event happened with 1 client"**; the existing empty-day copy stays as it is. Same on every day, not just today.
- The page-header pill **"12 updates today" → "12 events today"** (singular "1 event today"). The activity box's own big number already says "12 events"; keep it.
- `grep -rn -i "things happened\|things\b\|updates today\|update today" src/pages/agent/Activity.jsx src/components/agent/AgentUI.jsx src/components/layout/` and change only the agent-facing strings for this page. Admin Activity (same page, admin branch) gets the same words.

### 2. Today's activity box becomes display-only

- **Keep:** the "Today's activity" label (the day title on other days, as now), the big **"N events"** at the right, and the proportional bar across the full width.
- **Remove:** the filter tabs (All, Booked, Calls, No answer, Cancelled, Moved, Edited) and the phone chips, the bar dimming, the filter state, the "default selection = newest visible" logic, the tablist keyboard handling, and the "no matches for this filter" empty state. Nothing in this box is a button, link or tab any more (no hover, no pointer, no focus ring), the same as the plain rows P729 made in "Your pipeline" (`.pl-row2`: dot, label, count, share %).
- **Instead of the tabs:** plain rows in the same style: **Booked, Calls, No answer, Cancelled**, each with a coloured dot, the count, and its share of the day as a % (0% when the day is empty; zero counts dimmed). Two columns on desktop, one on phones. A **Needs attention** row appears only when its count is above zero.
- **What counts where.** Each event is counted once, by what its feed row shows. **Moved and Edited events stay in the feed with their sentences, and they count in the total, but they get no row and no pill of their own:** their feed row shows the **status the client is in now** (the same status pill My Pipeline shows: Booked, No answer, Needs attention or Cancelled) and is counted under that status. So the rows add up to the total and the bar segments match the rows. Keep `moved` / `edited` in `lib/activityKinds.js` for their icon and sentence; they just aren't a filter, a bar segment or a pill label. If the status mapping isn't clean in the real data (e.g. no current status for a row's client), count it under the event's own kind and say so in the ship note.

### 3. The feed is full width; the Client story box goes away

- **Remove** the 420px `ClientStory` column, its sticky positioning and `max-height`, and the P718 phone bottom sheet (`.ov-sheet`) if nothing else uses it. The feed box now spans the **same width as the hero and the activity box** (measure: the three boxes' left and right edges match). Rows get the extra room: time gutter, the node on the connector line, then the client's name, status pill and the sentence, and a **`ChevronRight` at the right end** like My Pipeline's rows, so it reads as openable.
- **Rows are real buttons:** the whole row is clickable (hover tint like My Pipeline's rows, Enter / Space opens, visible focus ring). No row is selected by default; a row is highlighted **only while its drawer is open**.
- **Click a row → the drawer slides in from the right**, using **My Pipeline's drawer shell** (same width, scrim, 200ms slide-in, and the P729 slide-out on **X, scrim click and Esc**, then it unmounts; on phones the full-screen sheet with its own slide). Don't build a second drawer: reuse the shell from `ClientDrawer`, with different content.
- **Drawer content (read-only):** the client header (avatar, name, status pill, close X), "Carrier · phone", the status line the story panel showed ("Fulfillment calls Tue, Oct 13 at 11:00 AM", client time zone as today), then the **Journey** (the same steps P718's story shows, with the clicked event's step in the highlighted "Selected" box). Footer: **one button, "Go to My Pipeline"** (primary pill, arrow), to `/agent/clients?open=<policy id>&stage=<that client's tab>`, the same target the story's old "Open in My Pipeline" used. **No other actions in this drawer** (calling, messaging and changing a booking live in My Pipeline's drawer, one tap away). Admin branch: same layout; show the footer button only where the old "Open in My Pipeline" was shown.
- **State:** keep the open client in the URL (`?client=<policy id>&event=<event id>`, or the param the page already uses) so refresh and Back behave; clearing it happens after the slide-out ends. Nothing is open on first load. Changing the day (arrows, ← / →, swipe) while the drawer is open closes it first; ← / → and swipe are ignored while it's open (extend the existing "ignored while the month picker or sheet is open" rule).

### 4. Files and rules

Expect `src/pages/agent/Activity.jsx`, `src/components/agent/AgentUI.jsx` (`DayHero` summary, `ActivityBox`, `ActivityFeed` rows, `ClientStory` → a drawer content component using the `ClientDrawer` shell, `Journey` unchanged), `src/lib/activityKinds.js` (pill rule only), `src/index.css` (remove unused `.ov-activity` filter / `.ov-sheet` rules), the header-pill string, and `DESIGN.md`: rewrite the P718 Activity line (box, feed, story) and add a "P733" line under v16. Design tokens only; light mode must work. The day slide animation (hero centre, activity box, feed) keeps working. Don't touch Fulfillment or the other agent pages.

### 5. Verify and log

- `vite build` + eslint clean on touched files. Throwaway Vite harness with mocked hooks (as P718; delete it, stop its server first, never commit), Playwright + local Chrome, dark and light, 1920×930, 1440×900, 1100 and 390:
  - Hero reads "N events happened with M clients" for 0, 1 and many; the header pill reads "N events today"; zero hits for "things happened" / "updates today".
  - The activity box has **no interactive elements** (no `button`, `a`, `[role=tab]`, `[tabindex]` inside it) and no Moved / Edited / All label anywhere on the page; the row counts add up to the total; a moved and an edited event show the client's status pill and count under it.
  - The feed box's left and right edges equal the hero's and the activity box's at each width.
  - Click a row: the drawer slides in (sample the animation by pausing and seeking, as P718's lesson says), the row highlights, the Journey shows with that event selected, "Go to My Pipeline" lands on `/agent/clients?open=<id>&stage=<tab>` with the right drawer. X, scrim and Esc each slide it out and clear the URL param at the end; a second click mid-slide does nothing; reduced motion closes at once; body scroll unlocks.
  - Day change with the drawer open; empty day; admin branch; phone sheet; no horizontal scroll at 390.
- Ship note in [[Memories]]; say plainly it wasn't seen logged in. Brayden checks as Test Agent: (1) the hero and header say "events"; (2) nothing in "Today's activity" can be clicked and there's no All / Moved / Edited; (3) the feed is as wide as the boxes above it and there's no Client story box; (4) clicking a row slides a drawer in from the right, the X slides it out, and "Go to My Pipeline" opens that client there; (5) dark, light and his phone.
