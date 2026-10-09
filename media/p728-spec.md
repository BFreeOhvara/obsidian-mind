
## Prompt 728 — Book a call: carrier search with live suggestions, the carrier's open hours set the bookable times (looked up once, then cached)

> **✅ REQUESTED by Brayden 2026-10-09 (Falcon session).** CC: build this. **Run on Opus 5.5** (migration, new edge function calling the Anthropic API with web search, changes the booking-window rule everywhere a call can be booked). Builds on top of P724 + P727 (do those first).

**Why.** The Fulfillment call is the 3-way cancellation call: the client, Fulfillment **and the carrier they're leaving** must all be on the line. So the bookable times are **whenever that carrier is open**, not 9-4 on the client's clock. Brayden: *"it's up to the carrier... if the carrier is using Pacific time, then everyone, even the East Coast, will have to abide by those times."* Times still **show in the client's local time** (P724 rule; the agent never sees or picks a zone).

**Brayden's flow, in his words:** *"they type in M and then carriers like Mutual of Omaha or Midland National pop up... not just from a list, just... literally almost every life insurance carrier... the more letters, it cuts more and more off... then we automatically pull that carrier's hours. If we checked it once, then we already have it on deck. If we never have, then we just check it... once we got their hours, then they can select a time."* No dropdown: nothing shows on an empty click.

### 1. Data (next free migration number)

- **Reuse the existing `carriers` table** (admin-write / everyone-read RLS, used by `useCarriers()` and Carrier Portals). Audit it first; don't make a second carrier table. Add nullable columns: `aliases text[]` (other names people say, e.g. "United of Omaha", "AIG", "American General"), `service_phone text`, `hours jsonb` (per weekday `{ mon: { open: "08:30", close: "16:30" } | null, ... }`), `hours_tz text` (IANA, US zones only), `hours_source_url text`, `hours_status text` (`verified` / `ai` / `fallback` / `pending`), `hours_checked_at timestamptz`. Keep `portal_url` and everything existing.
- **Seed the names: "almost every life insurance carrier".** Build a seed of **every US life insurer an agent or client would plausibly name**: the big brands, final expense / mortgage protection / burial carriers, and the legal-entity names behind them as aliases (aim for **at least 250 brands**; use NAIC / state DOI company lists and your own knowledge; life insurers only, no P&C or health-only). Names only; hours fill in lazily. Don't duplicate rows that already exist in `carriers`; merge into them.
- **Seed the 20 researched carriers with hours** from `brain/carrier-hours.md` in the vault: status `verified` for the 16 confirmed on the carrier's own page, `ai` for Prudential (third-party source) and Mutual of Omaha (zone inferred CT), and **leave State Farm, Corebridge and TruStage with no hours** (they get looked up live on first use like any other).
- **Policies:** keep the existing carrier text column the booking already writes; add `policies.carrier_id` (nullable FK to `carriers`) so a booking points at the row whose hours it used.

### 2. The carrier field (Book a call step 1, and the My Pipeline drawer's Move / Re-book)

- **Required now** (was optional). Label "Carrier they're leaving". A plain text input, **no dropdown and no list on focus or empty click**.
- From the **first letter** typed: a suggestion list (max 6) under the field, ranked: name starts with the text > a word in the name starts with it > alias match; case- and punctuation-insensitive ("mutual of o", "omaha", "aig" all work). The top match also shows as **inline ghost completion** after the cursor. Tab / → / Enter accepts; ↑ / ↓ move; Esc closes. Each typed letter narrows the list.
- If what they typed matches nothing, they can still keep it: a last row "Use "<text>"" (and Enter on no match does the same). That creates a `carriers` row (status `pending`) so it gets looked up and is suggested to everyone next time.
- Picking / confirming a carrier **triggers the hours fetch** (section 3). The day + time picker stays dimmed until **city + state AND the carrier's hours** are known (extend P724's dimmed state; copy: "Add the client's city, state and carrier first…").

### 3. Getting a carrier's hours: cached, else looked up once

New edge function **`carrier-hours`** (verify_jwt on; agents and admins may call it). Input: carrier id (or the new name).
1. **Cached:** if the row has `hours` and `hours_checked_at` is under **180 days** old, return it at once. (Most picks after the first week hit this path.)
2. **Not cached:** do a live lookup **once**, with a row-level lock / `pending` claim so two agents picking the same new carrier at the same time trigger only one lookup (the second waits for the first). Call the **Anthropic Messages API with the server-side web search tool** (use the cheapest current model that gets it right in your tests; start with Haiku 5.5, step up to Sonnet 5.5 only if Haiku misses), asking for the carrier's **existing-policyholder customer service line** for **individual life insurance**: phone, open/close per weekday, time zone, and the **URL it read them from**. Force a JSON answer and validate it: a real US IANA zone, times parse, at least one weekday open, close after open, a source URL present. Save it with status `ai`, `hours_checked_at = now()`.
3. **If the lookup fails** (timeout **20 s**, bad JSON, nothing found, validation fails): save a **fallback** window **Mon–Fri 9:00 AM–5:00 PM ET** with status `fallback`, so booking is never blocked, and the carrier shows in the admin list (section 5) to fix.
4. **DEMO_MODE:** this function must **not** be stubbed by `DEMO_MODE=true` (still on for the other AI functions). A stubbed answer would put fake hours in the cache. Give it its own switch `CARRIER_LOOKUP_LIVE` (default on); when off, it behaves as "lookup failed" → fallback. Add the cost line to `brain/costs.md` (a few cents per *new* carrier, once; cached after).
- While it runs, step 2 shows "Checking <Carrier>'s hours…" (skeleton slots). The agent can keep typing other fields.

### 4. Which times can be booked (replaces P724's 9:00–4:00 client-clock window)

- A slot (every 30 min, as now) is bookable only if, **at that instant**, the carrier is open **and** the call starts **at least 1 hour before the carrier closes** (Brayden picked 1 hour so a 3-way call with hold time isn't cut off). First slot = carrier open time.
- Converted to the **client's** local clock for display (P724). Example: Pacific Life (6:00 AM–5:00 PM PT) for a client in Florida (ET): slots 9:00 AM–7:00 PM ET.
- **Plus a client-courtesy guard:** never earlier than **8:00 AM** or later than **8:00 PM** on the **client's** clock, so an ET carrier opening at 8 AM doesn't offer a 5 AM slot to a California client. (Falcon added this; Brayden can drop it.)
- Days the carrier is closed (weekends for all 20 researched; Fri half-days like Midland National's 12:30 PM close) just have fewer or no slots. A day card with no slots left is disabled, plain gray, no caption (same P727 style).
- Still enforced unchanged: the 30-minute notice cutoff and no two open bookings at the same instant (P724/P727), and Fulfillment's own slot-free check where it already applies.
- Under step 2, one quiet line: "<Carrier> takes calls Mon–Fri 8:30 AM–4:30 PM CT · times shown are <City>'s local time." If status is `fallback`: "We couldn't find <Carrier>'s hours, so we're using 9–5 Eastern. Fulfillment will confirm."
- **The same rules apply in the My Pipeline drawer's Move / Re-book picker**, using the booking's carrier. An older booking with no carrier: the drawer asks for the carrier first (same field), then shows times.

### 5. Admin: carrier hours

On the existing admin Carriers / Carrier Portals screen, add columns: phone, hours (compact, e.g. "Mon–Fri 8:30–4:30 CT"), status chip (Verified / Found by AI / Fallback / Checking), source link, checked date. Admins can **edit hours by hand** (saves as `verified`) and **"Look up again"** (re-runs the function). A filter "Needs review" = `fallback` + `ai`. Agents never see this page.

### 6. Files and rules

- Expect `BookCall.jsx`, the shared `SlotGrid` / slot logic in `lib/scheduling.js`, `AgentUI.jsx` (new `CarrierInput`), the My Pipeline drawer, `useCarriers` (+ a `useCarrierHours` hook), the admin carriers page, a new migration, the new `supabase/functions/carrier-hours`, `brain/costs.md`, `DESIGN.md`. Design tokens only; light mode; phones (the suggestion list is full width, 44px rows; no horizontal scroll at 390px).
- Never log or print the Anthropic key. Deploy the function with the project's usual command; if the CC classifier denies the deploy, surface it as a blocker for Brayden (same as 673).

### 7. Verify and log

- `vite build` + eslint clean. **Lookup quality check (real, not mocked):** run `carrier-hours` live against the 3 unknowns (State Farm, Corebridge, TruStage) plus 5 final-expense carriers not in the 20 (e.g. Aetna/CVS final expense, Foresters, Royal Neighbors of America, Colonial Penn, Gerber Life). Paste the results (hours, zone, source URL) into the ship note and **spot-check every one against its source page**. If more than 1 in 8 is wrong, stop and flag it to Brayden before turning the live lookup on.
- Throwaway harness (mocked hooks + mocked function, frozen clock; delete after): typing "m" shows Mutual of Omaha / Midland National / MassMutual…, more letters narrow it, ghost completion + Tab, nothing on empty focus, "Use "<text>"" creates a pending carrier; cached carrier = instant slots; uncached = "Checking…" then slots; fallback line; Pacific Life + Florida client = 9:00 AM–7:00 PM ET with the last start 1 h before close; an ET carrier + California client starts at 8:00 AM PT (courtesy guard); Midland National Friday ends 11:30 AM CT; weekend disabled; 30-min cutoff and same-instant blocking still work; drawer Move / Re-book with and without a carrier; admin edit + "Look up again"; dark, light, 390px.
- Ship note in [[Memories]]: say plainly what was and wasn't seen logged in, whether the migration was applied and the function deployed, and the lookup quality results. Update the P724 line in [[DESIGN]]. Brayden checks: (1) type "m" in the carrier box and see carriers pop up; (2) pick one we researched and the times appear at once in the client's time; (3) pick one we didn't, see "Checking…", then times; (4) the last slot is an hour before the carrier closes.
