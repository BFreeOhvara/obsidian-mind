
## Prompt 726 — My Pipeline layout: two equal boxes on the left, statuses on top of one fixed list box, "Needs you" becomes "Needs attention", no more page twitch

> **✅ APPROVED by Brayden 2026-10-09 (Falcon session): "Perfect. I love that. So now let's cue that for CC."** CC: build this. **Sonnet 5.5 is enough** (agent UI only, built from an approved mockup; no migration, no data changes).

**Reference mockup (source of truth for sizes, colours, spacing):** `media/p726-my-pipeline-layout/mockup-dark.html` in the vault. It's interactive: click the status tabs; the dashed "Mockup only" toggle in the corner empties Needs attention to show the empty state (that toggle is **not** part of the build). `mockup-v1-not-used.html` beside it is the rejected first try; ignore it. Static with **sample data**: every name, city, carrier, time and count is made up. The sidebar and header are P722 context; build only the page body (plus the copy changes in section 5). Fonts fall back offline; the real build uses Space Grotesk and Manrope. No light or phone mockup: derive light from the existing v16 light tokens, and phone from P717's phone behaviour (section 4).

**What this is.** `/agent/clients` (`Clients.jsx` + the P717 components in `AgentUI.jsx`) gets a new layout. Same data, same hooks, same mutations, same drawer, same URL params (`open`, `rebook`, `stage`, `range`), same admin branch. Brayden's three problems, in his words:
1. *"Needs you"* should be **"Needs attention"**, and it has two kinds: the agent has to **confirm the number**, or has to **call and rebook** the client on their own time.
2. **The page twitches** when switching statuses: the list box's height follows the number of rows, so the page scrollbar appears and disappears and everything jumps sideways (e.g. empty Needs you → Cancelled). Every status has to sit still.
3. He likes the bar and the status picker, but the page wastes the sides, and "Find any client" was too big for what it does. He wants **two identical-size boxes stacked on the left** and **the statuses on top of the box the clients are in**.

### 1. Desktop layout (≥ 1280px)

- Page body is a grid: `grid-template-columns: 400px minmax(0, 1fr)`, gap 20px, `max-width: 1680px`, centred. It **fills the height under the header and the page itself never scrolls** at this width. Do it with flex/grid height (`height: 100%` chain or `100dvh` minus the header from a single shared CSS variable), **not** a hard-coded pixel offset; Memories line ~813 records the last time a hard-coded 160px offset brought a page scrollbar back. If the viewport is too short for the content (under ~720px tall), let the page scroll normally rather than squashing.
- **Left column:** two boxes with `grid-template-rows: 1fr 1fr`, gap 16px, so they are **always exactly the same height** whatever the data. Each box clips its own overflow; nothing in them may push the column taller.
  - **Find any client** (the existing `ClientSearch` hero, restyled smaller as in the mockup): title 24px, the one-line subtitle, the search field (50px tall, placeholder "Name, phone, city or carrier", "/" focuses it as today; the results dropdown is unchanged). City now matches too (P724 added `client_city`). Under it, **"Recently booked"**: the agent's 3 most recently created bookings (any status, newest first, from the rows `useAgentBookings` already loads), each a row with the avatar in its status colour, name, "City, ST · Carrier" (just the carrier if no city) and a status pill. Clicking one opens that client exactly like a search pick does (`?open=<id>&stage=<tab>`). If the agent has no bookings, show "Nobody booked yet" with a Book a call link instead of the list.
  - **Your pipeline** (`PipelineTabs`'s summary part): "Your pipeline", the big total + "· N cancelled", the range switch (This week / This month / All time, unchanged behaviour), the proportional bar (unchanged), then **a 2×2 grid of small tiles**, one per status: dot + name, count, and its share of the total as a % (0% when the total is 0; round so it reads cleanly). At the bottom, separated by a hairline: **"Next Fulfillment call"**: the soonest booked call still in the future (same rule as P723's `ComingUpCard`: `stageOf === 'booked'` and a future `scheduled_call_at`), as a date tile + "Name · time" (client time zone, P724's `callWhen`/`tz` rules) and an "Open" link to that client. If there isn't one: "No calls booked" + a Book a call link. The range switch changes the total, bar and tiles as it changes the counts today; the next call ignores the range.
- **Right column: one list box** filling the full height.
  - **Top of the box: the four status tabs in a row** (`grid-template-columns: repeat(4, 1fr)`, gap 10px, 16px padding, hairline under them). Same look and behaviour as P717's tabs: dot, name, sub-line, count; selected = status tint gradient + edge border + name in the status colour; a zero count is dimmed; arrow keys move between them; `?stage=` still wins on load; the page still opens on Booked. Sub-lines: Booked "Waiting for Fulfillment", No answer "Fulfillment will try again", Needs attention "**N to confirm · N to call**" (or "All caught up" at 0), Cancelled "Old policy cancelled".
  - **Under the tabs: the list for the selected tab**, in a body that **scrolls inside the box** (`overflow-y: auto`, `scrollbar-gutter: stable`, thin scrollbar as in the mockup) with the column header row sticky at the top of that scroll area. The box never changes size when the tab or the number of rows changes.
  - **Columns** (5-column grid, `minmax(0,1.5fr) minmax(0,1fr) 210px minmax(0,1fr) 150px`): keep each tab's current data and wording from P717 + P724 (client with "📍 City, ST · phone", carrier, the date tile + client-time call, status text, the chevron or action). The mockup's column titles are the guide: Booked "Client / Carrier they're leaving / Fulfillment call / Status"; No answer "Client / Carrier they're leaving / Next try / Status" (use whatever the No answer rows show today for the next try / recovery phase; don't invent data); Cancelled "Client / Carrier cancelled / Cancelled / Status". The separate "Booked · Waiting for Fulfillment · 5 clients" heading above the old list goes away (the selected tab says it).
  - Cancelled paging ("Show N more") stays as is, inside the scroll area.
  - **Empty states** sit centred in the same box (it does not shrink). Needs attention empty: green check tile, **"Nothing needs your attention"**, "When a number needs confirming or a client needs a call from you, they'll show up here." Other tabs keep their current empty copy, centred the same way.
- The client drawer, scrim, reschedule / re-book / confirm-number flows inside it are unchanged.

### 2. Needs attention: two groups inside the list

The Needs attention tab shows its rows in **two groups**, each with a small header band (amber 3.5% tint, 30px amber icon tile, bold title + count in amber, one grey line under it). Only show a group that has rows.

1. **Confirm the number** (phone icon). Line: "Fulfillment couldn't get through. Check the number with the client and it goes back to No answer for more tries." Rows: the P696 recovery phase `number_check`. Column 3 "What happened" = the existing phase text for it (e.g. "The number didn't connect"). Action: the existing **Confirm number** button (solid amber), same handler as today.
2. **Call and rebook** (calendar icon). Line: "Texts and a retry call didn't reach them. Call them on your own time and book a new call." Rows: **everything else that lands on the needs tab today** (`tabOf(...) === 'needs'`, i.e. `call_directly` plus any non-recovery rows that already sit there for opted-out agents). Column 3 = the existing phase / reason text. Action: the existing **Rebook** button (amber ghost style), same handler as today (opens the drawer with `rebook=1`).

The column header row for this tab reads "Client / Carrier they're leaving / What happened". No change to how a client moves between statuses; this is only how the tab is shown. If the mapping of rows to the two groups isn't as clean as above in the real code, pick the closest honest split and note it in the ship log.

### 3. Stop the twitch on every page

Add `scrollbar-gutter: stable` to whichever element is the app's page scroller (check whether that's `html` or DashboardLayout's main; put it on that one only so there's no double gutter). Check it on a page that scrolls (Activity) and one that doesn't (Overview): no sideways shift between them, and no visible empty strip in either theme. That fixes the jump on every page, not just this one.

### 4. Narrower screens

- **1024–1279px:** the two left boxes sit side by side in a row above the list box (`grid-template-columns: 1fr 1fr`, same equal height), the list box below them; the page scrolls normally here (the list doesn't need its own scroll). Tabs stay 4 across if they fit, else 2×2 (P717's rule).
- **Below 1024px / phones:** keep P717's behaviour: stacked boxes, the tabs as scrolling chips (44px touch targets), rows as stacked cards, the drawer as a full-screen sheet. Recently booked shows 3 rows; the 2×2 tiles stay 2×2. No horizontal scroll at 390px.

### 5. "Needs you" → "Needs attention" everywhere an agent sees it

`grep -rn -i "need you\|needs you" src/` and change every **agent-facing** string: My Pipeline tab + empty state, the P722 header pill ("3 need you" → "3 need attention", "1 needs attention"), the sidebar badge's tooltip / aria-label, global search status pill / meta, the drawer's status pill / note, the Overview box if any copy still says "need you" (P723's box already reads "Needs your attention"; leave that). Keep the internal key `needs` and every `?stage=` value (`needs`, `needsAttention`, `confirmNumber`) working. Don't touch Fulfillment or admin wording unless it's the same shared string. Update [[DESIGN]] v16's P717 line (the label and the new layout) and add a "P726 — My Pipeline layout" line.

### 6. Files and rules

- Expect `src/pages/agent/Clients.jsx`, `src/components/agent/AgentUI.jsx` (`ClientSearch`, `PipelineTabs`, `StatusList`, new small pieces for Recently booked / status tiles / next call / the needs groups), `src/lib/agentBookings.js` (labels), `src/index.css`, the header/search/sidebar files for the copy only, `DashboardLayout.jsx` only if the height chain or the scrollbar-gutter needs it. No migration, no new hooks, no new dependencies.
- Design tokens only (no hard-coded colours outside the existing `--ov-*` / status tokens; add tokens if one is missing). Light mode must work.
- Don't touch Fulfillment's Pipeline page or `Pipeline.jsx`.

### 7. Verify and log

- `vite build` + eslint clean on touched files. Throwaway Vite harness with mocked hooks and sample rows (delete it, never commit), Playwright + local Chrome:
  - 1920×930 and 1440×900, dark and light: click every tab, including an **empty** Needs attention, and **measure that the list box's and the left boxes' bounding rects don't change by a single pixel** and that the page has no scrollbar. Both left boxes the same height (measure).
  - A long Booked list (20+ rows): scrolls inside the box, header row stays put, the page doesn't scroll.
  - Needs attention with both groups, only one group, and none.
  - 1100px (two left boxes side by side) and 390px phone (no horizontal scroll, chips, cards, sheet).
  - Recently booked click and the Next call "Open" land on the right client's drawer and tab; empty versions of both.
  - The scrollbar-gutter check from section 3.
  - `grep` the rendered agent pages for "need you" / "Needs you": zero hits.
- Ship note in [[Memories]]: say plainly it wasn't seen logged in. Brayden checks: (1) switching between every status on My Pipeline, nothing on the page moves; (2) the two left boxes are the same size; (3) Needs attention shows "Confirm the number" and "Call and rebook" with the right buttons; (4) a long list scrolls inside the box; (5) no "Needs you" anywhere; (6) dark, light and his phone.
