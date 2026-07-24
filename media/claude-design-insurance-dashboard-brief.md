Build a complete, fully click-through mockup of Ohvara's pivoted dashboard — every page navigable, populated with realistic sample data throughout. **Nothing needs to actually work or connect to a real backend** — this is pure UI/UX exploration to react to before any real system gets built. Creative freedom on layout, exact panel design, and visual details within the design system below — this brief tells you what needs to exist, not how to arrange it.

**Business context.** Ohvara pivoted 2026-07-21 from selling AI receptionists to small businesses, to running its own inbound insurance operation on the same platform. The funnel: Google Ads → a landing page → a prospect calls in → an AI receptionist answers and qualifies the caller → live transfer to an available closer → the closer closes the policy on that same call. A separate app (not part of this) handles post-sale policy management for the client — not in scope here.

**This needs the full shape of a real, already-built product, not a couple of sample screens.** Ohvara already has a working dashboard for its old business — same overall structure (sidebar navigation, multiple full pages per role, notification bell, header) is expected here, just repurposed for the new roles and business. Two roles only: **Closer** and **Admin** — no setter/rep role anymore.

**The lists below are a floor, not a ceiling.** Think through everything a closer actually needs in order to run their entire workday from this one dashboard and nothing else — every prospect they've ever talked to and where things stand with each of them (still needs a follow-up, quote pending, closed, not interested, whatever a real pipeline of insurance prospects looks like — this is more than a call log, it's the closer's whole book of business), not just what's listed here. Same for admin — full operational oversight of the business, add whatever that actually requires beyond this list. If you can think of something a real closer or a real admin would need day to day that isn't listed, include it.

**Closer side — pages to build, all with sample data:**
- A home/overview page — today's snapshot for that closer
- **Live call / duty status** — some way for the closer to mark themselves available for transfers, and a view of what happens when a call connects (caller info + whatever an AI receptionist would have gathered before handing off — insurance type, current provider, that kind of context)
- **My Calls** — call history/log, same spirit as an existing call-log page, adapted to inbound transferred calls instead of outbound dials
- **My Pipeline** — every prospect the closer has ever taken a transfer from, and where each one stands (closed, quoted and waiting, needs a follow-up call, not interested, whatever the real states of an insurance sales pipeline are) — this is the closer's whole book of business, not just today's calls
- **Activity Feed** — a running feed of the closer's recent activity
- **Training Center** — this should feel like a real onboarding system: training videos, a script/reference section (sample insurance-qualifying/objection-handling content — invented sample content is fine, doesn't need to be real), a quiz or knowledge check, and some kind of practice/roleplay mode
- **Commissions/Payouts** — a page showing what the closer has earned, sample numbers
- **Settings** — build this out in depth, multiple sections/tabs, not a single page: profile, notification preferences, regional/timezone, and an appearance section with a working light mode / dark mode toggle

**Admin side — pages to build, all with sample data:**
- An overview/reporting dashboard — inbound call volume, transfers, closes, conversion rate, that kind of thing
- **Call pipeline** — some way to see inbound calls/leads moving through stages (came in → AI receptionist → transferred → closed/not closed)
- Closer roster/management — who's active, who's available right now
- Commissions overview — what's owed across all closers
- Users/account management
- Reporting on the Google Ads / landing page lead source (calls generated, conversion)
- **Settings** — same depth as the closer side: multiple sections, profile, notifications, regional, and appearance with a light mode / dark mode toggle

**Sidebar navigation, header with notification bell, the general chrome of a real SaaS dashboard.** Build this genuinely in-depth — a real multi-tab sidebar for both roles, not a stripped-down handful of links. This is meant to feel like a full, mature product, not a landing page or a single screen.

**Tech context — build this to plausibly become the real app later.** The existing dashboard (`ohvara-dashboard` repo) is a React + Vite app on Supabase + Vercel. Real React components/pages with routing between them, not a flat single-file mockup — once this direction is approved, real data wiring gets built on top of this same structure.

**Design system — this is a real product's existing visual language, match it:**
```css
--bg-base:       #0A0A0F
--bg-surface:    #13131A
--bg-elevated:   #1C1C26
--accent:        #6C63FF
--accent-hover:  #7C74FF
--text-primary:  #F0F0F5
--text-secondary:#8888AA
--border:        #2A2A3A
--success:       #22C55E
--warning:       #F59E0B
--danger:        #EF4444
```
Font: Geist or Inter for UI, JetBrains Mono for all numbers/money/data. Font weights: 400 and 500 only — never 600 or 700. No `box-shadow`, no gradients, no `border-radius` over `10px`, no zebra striping on tables.

**Light mode doesn't exist yet in the real product — those tokens above are dark mode only.** Since this mockup needs a working light/dark toggle, invent a light-mode palette that follows the same anti-rules and feels like the same product, just inverted — this is a real design decision Claude Design should make, not something to guess at halfway.

**Still undecided, use reasonable sample placeholders, don't treat as final:** the exact commission model. Don't bake in anything that looks permanently locked-in.

---

## Round 2 — corrections + real-product enrichment (post-build refinement, not a restart)

You already built this once and the direction/design was liked. This is a refinement pass on that same build — apply these as corrections and additions, don't start over.

**1. Life insurance only.** Drop "mix of lines" entirely — every sample prospect, policy, and quote in this mockup is life insurance. No auto/home fields, copy, or sample data anywhere.

**2. These are policy-replacement leads, not new-to-insurance — make sure this landed.** Every prospect already has an existing life insurance policy with another carrier; the close is switching them to a new one. There's a required step after closing: cancelling the old policy, which only happens via a live 3-way call — closer, client, and the old carrier all on the line together. This needs its own tracked pipeline stage (closed → cancellation pending → cancellation scheduled → cancelled), not a binary closed/not-closed state.

**3. Real terminology and page structure to fold in** — pulled from a real, live life-insurance agent portal (Eterna), not invented:
- Use real insurance metrics instead of generic placeholders: **Annualized Premium (AP)** — Active AP, Submitted AP, Cancelled AP, Net AP; **Effectuated AP/Policies** (once a policy goes active); **Placed Rate**; **Apps Submitted in Underwriting**; **Persistency rates** at 30-day, 3-month, 6-month, and 12-month intervals (rolling vs. all-time) — these measure whether a policy stays active or lapses, directly relevant given how central cancellations are to this business.
- **My Pipeline / Policies page** — model columns after: Policy Number, Customer Name, Carrier, AP, Date Reported, Status, Details. Status values should include our cancellation-specific stages (closed → cancellation pending → cancellation scheduled → cancelled) alongside standard ones (quoted, submitted, effectuated, lapsed).
- **A dedicated "Action Needed" worklist** — separate from the full pipeline, this is a filtered "what needs my attention right now" view: a policy needing its 3-way cancellation call scheduled, a submission stuck in underwriting, etc.
- **Cancellation Breakdown** — bucket cancellations by how long they took to resolve (0-7 days, 8-30, 31-90, 90+ days), as both a table (count/%/$AP) and a chart. Directly relevant to our own cancellation workflow.
- **Commissions** — model as balance + reserve tracking (Commission Balance, Reserve Balance, Last Commission date, a transaction ledger: Processed At, Policy #, Carrier, Product, Commission Type, Gross, Commission) rather than a flat "amount owed" number. Include the concept of a commission chargeback if a policy cancels early — real in this industry, and especially relevant since every deal here involves cancelling an old policy.
- **Leaderboard** — ranks closers by submitted AP/premium, daily and monthly views, a top-3 spotlight plus a standings table below. Fun addition, not critical.
- **My Calls** — frame entries with a transcript/recording concept (e.g. only generated for calls over some minimum length), tying back to the AI receptionist + closer call being recorded.

**4. Explicitly do NOT bring over from Eterna:** its agent hierarchy/downline org chart, multi-tier commission-by-recruiting-tier grid, or its separate agent-recruiting/contracting/onboarding workflow (state licensing, carrier appointments, change-request forms). Ohvara has a flat closer + admin team, not a recruiting downline — none of that structure applies here.

---

## Round 3 — the build is good overall, two real problems to fix (refinement, not a restart)

The overall build and direction is liked — this is a targeted fix on top of it, not a redo.

**1. Everything feels too crowded/bunched together — this is two separate problems, fix both:**
- **Too much crammed into single views** — the actual content needs better filtering/pagination (see #2 below), not just squeezed onto one screen.
- **The visual spacing and hierarchy itself is too tight**, independent of content volume — loosen up whitespace, breathing room between grouped elements, and visual hierarchy generally across every page, not just the ones getting the filtering fix in #2.

**2. Replace the "All" tab / flat infinite list on any genuinely chronological event-log page with a day-scoped view.** This applies to **My Calls, Activity Feed, and the Commissions transaction ledger** — anywhere the list is a running log of things that happened over time.

The pattern: the page defaults to **today only** — just the calls/activity/transactions that happened today, nothing else. Navigation is **previous/next day arrows plus a jump-to-a-specific-date option** (a small calendar picker is fine for the jump, doesn't need to be the primary daily navigation). If a given day has nothing on it, show a plain empty state — "No calls today" / "No activity today" / etc. — instead of an empty table. Within a given day, keep lightweight status filters (e.g. Today / Closed / Follow-ups / Missed on My Calls) so a busy day can still be narrowed down, but the day-scoping is the primary mechanism, not a secondary one.

**My Policies / Pipeline is different — don't apply day-scoping there as the primary filter.** A prospect can sit in one stage (Quoted, Cancellation Pending, etc.) for days or weeks, so this page is a current-state view across all time, not a daily log. Keep its primary filtering by stage/status; a "date entered this stage" filter can exist as a secondary option if it's useful, but status is what matters here, not the day.

**3. Keep the click-to-open-detail-popup pattern exactly as it is.** Clicking a row (a call, a pipeline item, an action-needed item) opens a popup/modal showing what it is and what needs to happen — that part is working and liked, don't change the interaction model, just the surrounding density/filtering around it.

---

## Round 4 — Overview page needs its own purpose, plus a clock (refinement, not a restart)

Reviewed the built Overview page. The build quality is solid — this is a scope problem, not a craftsmanship problem.

**1. Add a live clock to the header**, alongside the date.

**2. Overview currently reads as a compressed summary of every other page bundled onto one screen** — a slice of Action Needed, a slice of Activity Feed, a slice of My Policies' full pipeline breakdown, all stacked together. That's not what an overview page is for — each of those already has its own dedicated page to hold that depth. Overview needs its own distinct purpose instead: a fast "where do things stand for me, right now" glance for a closer starting their day — current duty/availability status, this-moment priority items, and a small set of headline numbers. It shouldn't try to be a shrunk-down preview of every other page's full content. Trim toward the smallest set of information a closer actually needs before diving into their first task of the day, and let the full detail live only on its own page, one click away.

**3. Same crowding/spacing note as Round 3 applies here specifically** — this page in particular feels tightly bundled together; once the content above is trimmed down, give what remains real breathing room.

---

## Round 5 — trimmed content now leaves the page top-heavy and unbalanced (refinement, not a restart)

The scope trim from Round 4 worked — clock's in, and the page no longer mirrors every other page. New problem, opposite direction: everything is now stacked and anchored to the top of the screen, with a large, unstructured empty area below and no real presence lower or to the sides. This isn't "too much whitespace" — generous whitespace is fine and was asked for in Round 3. The actual issue is that the page reads as top-heavy and unfinished, like content ran out partway down rather than the layout being deliberately composed for the full viewport.

Fix this by making the existing content (duty status, the KPI numbers, the attention-needed list) actually own the space it has — sized and proportioned for the whole screen, not just however much room they need at a compact size. Don't solve this by adding back content that Round 4 correctly removed. If it's useful, a small amount of genuinely new, at-a-glance, non-duplicative content can be considered to help balance the page (something that doesn't already have its own dedicated page), but the primary fix should be giving the current content real visual weight and a composition that fills the screen intentionally, not a longer list.

---

## Round 6 — restructure the KPI/attention section into stacked full-width rows (refinement, not a restart)

The duty-status hero and the general rebalance from Round 5 worked well — keep that. Two changes to the section below it:

**1. The four KPI numbers (Submitted AP, Apps in Underwriting, Pending Cancellations, Net AP) should sit together in one continuous full-width row, side by side by side by side** — not boxed together in a separate labeled panel that sits next to the attention list.

**2. "Needs your attention" should be its own full-width row underneath the KPI row** — not a side-by-side column matched to the KPI panel's height. These two should stack vertically, each spanning the full width, not sit next to each other.

**3. Drop the "Today at a glance" label** on the KPI row — it doesn't read well; the numbers can stand on their own without that heading.

---

## Round 7 — reprioritize Overview around headline numbers, shrink duty status, add a Hierarchy page, move the clock (refinement, not a restart)

**1. Numbers are the primary content of Overview — duty status is not.** Right now "Available for transfers" is the biggest, most prominent element on the page. That's the wrong priority: a closer already sees duty/queue status in the persistent sidebar widget and has a dedicated Live Call page for it — showing it again as the page's hero is redundant. Like any real dashboard overview, the headline content should be the numbers. Shrink duty status down to a small status indicator — still present, just not the largest or first thing on the page.

**2. Expand the headline metrics.** The numbers section — now the page's primary content — should include the real KPIs a closer wants at a glance: Active AP, Submitted AP (this month), Policies Active, Persistency at 30-day/3-month/6-month/12-month intervals, and Average Premium, alongside the existing set. This is the first, most prominent thing on the page.

**3. New "Hierarchy" page, its own tab in the sidebar — not part of Overview.** Confirmed 2026-07-22: closers can recruit other closers into a downline, with tiered commission overrides. Build this as its own dedicated sidebar page — an org-chart-style view showing who reports to whom and each closer's program/tier, in the spirit of a real recruiting-based agency portal (reference: Eterna's Hierarchies page — interactive org chart, expand/collapse, program tags, tier values, per [[eterna-portal-recon]] section 4). Sample data only — exact tier/commission math is still undecided, this is UI exploration.

**4. Move the clock out of the sidebar.** Put it in the top-right of the Overview page's main header, next to "Good morning, Jordan" — showing date and time. Make it easy to read at a glance, a clear digital display, not small text folded in with other elements.

---

## Round 8 — time-period scoping, Hierarchy visibility, duty status, attention items, and a real color rebrand (refinement, not a restart)

**1. The headline metrics need a time-period scope, not just one fixed window.** A closer should be able to switch what period the numbers reflect — this month vs. year-to-date at minimum. For a closer who has recruited a downline (see Hierarchy below), they should also be able to switch scope between their own individual numbers and their team's total. Exact control style is your call — the requirement is that both the time window and (where applicable) the individual-vs-team scope are switchable, not hardcoded to one fixed view.

**2. The Hierarchy tab should only appear for closers who actually have a downline.** A closer with no recruits doesn't need it in their sidebar. For this mockup, just make sure the sample closer being shown has a team, so Hierarchy has a reason to be visible — don't show it universally regardless of whether the closer has recruited anyone.

**3. Duty status still needs to shrink further.** Even at its current reduced size it's more than it needs to be — this should read as essentially just an on/off toggle (available for transfers or not), not a bar with supporting text and a separate "Open live call view" button. The Live Call page already exists in the sidebar for the fuller experience; the Overview version just needs to communicate current on/off status at a glance.

**4. "Needs your attention" items should open their detail popup directly on click** — a closer shouldn't have to go through "Open worklist" first to act on one of the handful of items already shown on Overview. Keep "Open worklist" as the link to the full page, but make each individual item on Overview independently clickable too, consistent with the click-to-popup pattern used everywhere else.

**5. Real color rebrand — this replaces the placeholder design tokens used so far.** The dashboard currently leans on generic dark-purple accents and gray secondary text everywhere, which reads flat and doesn't feel like Ohvara's actual brand. Use the real brand colors instead, pulled directly from the logo: a deep navy background (`#0A1F44`) and teal as the accent (`#00BFA6`), white primary text. Pull back on plain gray for secondary text/labels — lean on the brand teal (and its tonal variants) more where it makes sense (labels, active states, highlights), so the page doesn't read as gray-on-gray throughout.

**6. Fix light mode — right now everything reads as flat white with no layering.** In dark mode, the sidebar, page background, and cards are each a visibly distinct tone, which is what gives it depth. Light mode currently loses that entirely. Rebuild light mode so it has the same kind of real tonal separation between sidebar, page background, and cards, using the brand's navy hue as a tint rather than plain gray — reference token values: page background `#F3F4F6`, sidebar `#E9EBEE`, card/elevated surfaces `#FBFCFC`, border `#D8DBE1`, primary text `#081A3A`, secondary text `#606D85`, with teal `#00BFA6` as accent (`#02A797` where teal is used as text/icon color directly on a light background, for contrast).

---

## Round 9 — the rebrand went in, but both modes overcorrected (refinement, not a restart)

Both modes now use the real brand colors, but neither is right yet.

**1. Dark mode is too uniformly blue.** Right now the page background and the card fills are basically the same navy, so everything blends into one flat blue field. Fix: keep the card/box fills exactly as they are — that navy is right. Push the page background (and the sidebar) down to a near-black, much darker than the cards, so the boxes actually pop against the canvas instead of blending into it. Reference value: `#01011C` (the same near-black already used for the splash/loading screen, for brand consistency) for the page background and sidebar; card fills unchanged.

**2. Light mode needs to be bolder, not just tonally layered.** Go further than subtle gray-navy tints: fill the cards/boxes with the solid brand teal (`#00BFA6`), with dark text on top (this combination measures a strong 7.38:1 contrast). Fill the sidebar with a deepened teal (`#008674`) specifically so it can carry **white** lettering — raw brand teal only measures 2.33:1 with white text, which fails basic legibility, but this deepened value hits 4.5:1 (the accessibility minimum), so the sidebar text needs to actually switch to white in light mode, unlike everywhere else on the light-mode page where text stays dark. The page canvas around the teal boxes stays light.

**3. Heads up on existing status colors against the new light-mode teal card fill:** things like the orange/red "Cancel Call"/"Overdue" badges need to still read clearly sitting on top of a solid teal card background — worth double-checking those specific combinations for legibility once the teal fill is in, adjusting the badge treatment (outline, deeper background, etc.) if needed rather than assuming the existing badge styles will still pop.

---

## Round 10 — dark mode confirmed working; light mode flips card fill back to white, plus Overview scope simplification (refinement, not a restart)

**Dark mode is confirmed correct as of the last round — no further changes there.**

**1. Light mode's solid-teal card fill was too much.** Keep the sidebar exactly as it is (solid deepened teal, white lettering — that part is right). But flip the cards/boxes back to a white/light fill, and use teal for the text and the border/divider lines inside them instead of dark navy. Contrast matters here too: the teal used for card text and lines needs to be the same deepened value already used for the sidebar (`#008674`), not the raw brand teal — raw teal on white only measures 2.33:1 and even a lighter deepened attempt (`#02A797`) only reaches 3.01:1, both too low for normal-sized text at 4.5:1. `#008674` clears that bar, so it's the one teal value for all text/line use inside light-mode cards.

**2. Simplify Overview back down — drop the You/Team and MTD/YTD scope controls from Overview entirely.** Overview should show a single, fixed view: this month only, the closer's own individual numbers, no toggle. Move the full scope-switching experience (You vs. Team, MTD vs. YTD) to its own separate page instead, and move the persistency breakdown (30-day/3-month/6-month/12-month) there too — none of that belongs on Overview anymore. Overview keeps just the plain this-month snapshot: Active AP, Submitted AP, Policies Active, Average Premium. The new page is where a closer goes to actually dig into scoped/historical/team performance and persistency — you have creative freedom on where it lives in the sidebar and what it's called.

---

## Round 11 — light mode confirmed close, needs more visual weight/presence (refinement, not a restart)

Light mode direction is confirmed right — white card fill, teal text/lines, sidebar unchanged. This round is about giving it more presence, not changing the structure.

**1. The design system's font-weight cap is lifted (confirmed 2026-07-22) — 600/700 are now allowed, not just 400/500.** Use real bold weight on text that needs to read with more presence: labels, values, and sidebar nav text in particular. The large metric numbers already read well — match that same sense of weight/presence elsewhere, not just there.

**2. The teal border/divider lines inside cards need to be thicker, and they need to actually connect at intersections** — right now they read as thin and, where a grid divides into rows and columns, the lines don't fully meet up into a continuous grid. Make them bolder and make sure horizontal and vertical dividers properly join where they cross.

**3. Sidebar text needs to read as true, fully-opaque white — right now it reads muted/grayish, not the crisp white it's supposed to be.** Check for any reduced opacity or a gray tint being applied to the sidebar labels and fix so it pops the way the rest of the teal sidebar does.

**4. Apply all of the above consistently across every page, not just Overview** — bolder text, thicker/connected teal lines, and true-white sidebar text should be the standard everywhere in light mode, same colors as already established, just with more visual weight and presence throughout.

---

## Round 12 — light mode confirmed strong overall; remove duty status from Overview, header cleanup, extend boldness to fine print, sidebar chrome fixes (refinement, not a restart)

Light mode is confirmed working well as of this round — dark mode isn't being reviewed right now, leave it as-is.

**1. Remove "Available for transfers" from Overview entirely.** It's not earning its space there — it still exists in the persistent sidebar widget and on the Live Call page, so nothing is lost by dropping it from Overview.

**2. Clean up the Overview header.** Drop the date from the "Wednesday, July 22, 2026 · your day at a glance" line next to the page title — the clock in the top-right already covers date and time, so it's redundant here. Leave the "your day at a glance" tagline in place.

**3. The bold-text pass from last round missed the smallest tier of text — extend it there too.** Fine-print/caption-level text (the small subtext under a KPI number like "Book average, all active policies," or the detail line under an attention item like "Book the 3-way cancel call — 3 days idle") still reads thin. Every text tier needs the same bolder treatment, not just labels/values/nav. Push the border/divider line thickness a bit further as well.

**4. Sidebar chrome cleanup:**
- Add a collapse/expand control at the very top of the sidebar.
- Remove the settings gear icon next to the profile at the bottom — Settings already has its own entry in the nav, so the icon is redundant.
- Replace the small icon-only sign-out control with a full, clearly-labeled "Sign out" button/row beneath the profile block.
- Clicking the profile name/avatar at the bottom should navigate straight to the profile section of Settings.

---

## Round 13 — refine which Overview metrics use which time scope, and add real drill-down to the Performance page (refinement, not a restart)

**1. Overview's four metrics don't all share the same time scope.** Active AP, Policies Active, and Average Premium should be month-to-date figures. Submitted AP is different — change it from a month-to-date figure to a **today** figure (submitted today), since it's naturally a daily activity number rather than a running monthly total. So on Overview: three MTD state metrics, one today activity metric.

**2. The Performance page (or wherever persistency/AP history ended up living — your call whether that's the existing page or a new one) needs real drill-down, not just the four fixed rolling windows already there:**
- **AP:** a closer should be able to pick a specific single day and see the AP submitted on that day — real day-level granularity, not just rolling/aggregate totals.
- **Persistency:** keep the rolling trailing windows (12-month, 6-month, 3-month, 1-month), and add the ability to select an individual calendar month and see that specific month's persistency value — both the rolling view and a pick-a-specific-month view should be available, not just one or the other.

---

## Round 14 — lock in "this month" labeling, sidebar header restructure, and a trend sparkline on each Overview tile (refinement, not a restart)

**1. Active AP, Policies Active, and Average Premium need to explicitly read as this-month figures, even though the underlying numbers are running totals, not resettable monthly flows.** Label/frame each of these three as a current, this-month snapshot — make this unambiguous in the UI itself (not just implied), since it didn't come through clearly in the last pass. Submitted AP stays as a "today" figure, already correct.

**2. Sidebar header restructure.** Move the "Ohvara / Closer Portal" branding block back to the very top of the sidebar. Put the collapse/expand control in that same row, next to the branding — not in a separate row/box above it. Use a hamburger-style three-line icon for the collapse control instead of an arrow.

**3. Add a small trend sparkline to each of the four Overview KPI tiles** — each tile shows its own recent movement (last several days) as a lightweight visual, not a number/label. No goal, target, or progress framing anywhere — this is purely a glance-level trend indicator, distinct from the Performance page's full interactive drill-down. Apply the same sparkline treatment consistently across all four tiles, not just one.

With this round, Overview is considered feature-complete for now — no further content additions planned unless real feedback on the built version says otherwise.

---

## Round 15 — the "this month" labels weren't matched by real filtering, and the sparkline didn't communicate anything (refinement, not a restart)

**1. Active AP, Policies Active, and Average Premium need to be real this-month values, not the lifetime/all-time totals with a relabeled header.** Specifically: Active AP should reflect only AP that went active this month (not the whole book's running total); Policies Active should be the count of policies that went active this month specifically (not the count of all active policies, e.g. not the full 312); Average Premium should be the average for this month's activity, not the whole book's average. The full lifetime/all-time totals belong on the Performance page instead, not Overview — Overview is strictly "what happened this month," Performance is the complete picture. Submitted AP (today) was already correct and is the pattern to match — same idea, one month wide instead of one day wide.

**2. Remove the trend sparkline added last round.** As built it had no axis, tooltip, or value attached to it, so it didn't actually communicate anything — dropping it rather than building it out further.

---

## Round 16 — single-row KPI layout, reorder, capitalization fix (refinement, not a restart)

**1. "Today at a glance" is taking up more vertical space than it needs to.** Change the four KPI tiles from a 2×2 grid to a single row of four, side by side.

**2. Reorder the tiles** to: Submitted AP (Today) first, then Active AP (This Month), then Policies Active (This Month), then Average Premium (This Month).

**3. Capitalization fix:** the Overview header tagline currently reads "your day at a glance" — capitalize to "Your day at a glance," matching the capitalization convention used for the equivalent subtitle line on other pages.

---

## Round 17 — add a Today's Schedule to Overview, plus two new sidebar pages: Quoter and Submissions (refinement, not a restart)

**1. Add a Today's Schedule section to Overview.** A compact, time-ordered list of what's actually on the calendar today — a 3-way cancellation call at a specific time, a scheduled UW exam, etc. This is distinct from "Needs your attention" (which is an action/overdue worklist, not a timeline) and isn't duplicated by any other page — it's the missing piece that makes Overview feel like a real day-at-a-glance page again now that duty status and the sparkline are gone.

**2. New "Quoter" page, its own sidebar tab.** A quoting toolkit where a closer enters a prospect's basic info/numbers and gets back comparative quotes across carriers — this is a standard, real category of tool in the life insurance industry (multi-carrier instant-quoting engines like iPipeline's LifeSpeed, Hexure's Life Quotes API, or Ebix's EbixLife are real examples of what this kind of tool looks like — useful as a style/functionality reference, not a mandate to actually integrate one of these specific products). For this mockup: a real input form (client basics, coverage amount, health category, etc.) and a sample results view showing quotes from a handful of sample carriers — sample data only, no real integration.

**3. New "Submissions" page, its own sidebar tab.** A place to start a new business submission: a form, and a list of carriers (reuse the real carrier names already established elsewhere in this brief/recon — Mutual of Omaha, TransAmerica, Ethos, F&G, Foresters, NLG, Corebridge, Fidelity Life, SBLI, Augustar, North American, American Amicable), each with an "Open Portal" action that would, in a real build, deep-link out to that carrier's actual submission portal. Sample data / non-functional link for this mockup. **Confirmed flow (2026-07-23):** the closer submits the actual application on the carrier's own portal, then comes back to this page's "New Submission" form and manually enters the resulting policy details (policy #, name, AP, product, carrier, state, age) so Ohvara's own system has a record — this is deliberate duplicate entry for now, not an oversight. An eventual "just enter the policy number and auto-fill the rest" version would require a real carrier/aggregator data integration and is out of scope here — the form should be a plain manual-entry form, not imply auto-fill exists.

---

## Round 18 — spacing and weight polish; Overview is done (refinement, not a restart)

**1. In "Today at a glance," the vertical divider lines between tiles sit too close to the adjacent text.** Give more breathing room around each divider so the row doesn't feel cramped along those lines.

**2. Make "Open worklist" (bottom-right of "Needs your attention") bolder** — it should match the same weight/presence the rest of the bolded text on this page already has.

**Overview is done as of this round.** Numbers, Today's Schedule, and Needs your attention together cover current state, today's agenda, and urgent action items without repeating any other page — no further content planned here unless real feedback on the built version says otherwise.

---

## Round 19 — light mode sidebar weight fix; dark mode moves to outlined cards instead of filled cards (refinement, not a restart)

**1. Light mode: revert the sidebar nav text to its original, non-bold weight.** Everything else that picked up the bolder treatment stays bold — this is specifically the sidebar navigation labels reverting back.

**2. Dark mode: invert how the navy is used, applying the same "outlined card" approach already working in light mode.** Right now dark-mode cards are solid-navy-filled, sitting on a near-black page. Instead: the navy that currently fills the cards should become the sidebar's background color, and the cards should no longer have a distinct fill — their interior should match the near-black page canvas, defined only by a navy border/line instead of a solid fill. Same logic as light mode's white-fill/teal-line cards (which read as open, not solid-filled), just applied to dark mode's palette: page canvas stays near-black, sidebar becomes navy, cards become outlined instead of filled.

---

## Round 20 — dark mode confirmed working well; three polish fixes (refinement, not a restart)

**1. Sidebar nav text should always be the same bright white** — right now only the active item (e.g. "Overview") gets the bright white treatment, while the rest sit in a dimmer/muted color. All nav items should use that same bright white all the time, active or not.

**2. Secondary/detail text is too muted to read comfortably** — things like the detail line under a Today's Schedule entry ("Quote follow-up — payday Friday") or under an attention item. Lighten this text noticeably. (For context, this isn't a contrast failure — the current color already passes accessibility contrast comfortably — it's a straightforward legibility/style preference, worth doing regardless.)

**3. Border/divider line thickness in dark mode should match the thicker treatment already applied in light mode** — right now dark mode's lines read thinner than light mode's.

---

## Round 21 — experiment: bring back a filled card, but keep the border this time (try it and reassess, not a locked decision)

**Cards go back to a navy fill** (the same navy used before the outlined-card change a couple rounds ago), **but this time keep a visible border around them too** — not fill-only, not outline-only, both together. Since the fill and the previous border color are the same navy, the border needs to use a different, lighter shade to actually read as a visible edge against its own fill — use the lighter navy already established for modals/popovers (`#2A3C5C`) as the border color here. Keep the border thickness from the last round. This is explicitly an experiment to look at and react to, not a final call either way.

---

## Round 22 — the filled-card-plus-border experiment is confirmed; two more dark mode fixes (refinement, not a restart)

**1. Secondary/detail text is still too dark/muted — just make it plain white, not another gray tier.** Drop the separate lighter-gray shade entirely; the detail line under a Today's Schedule entry (like "Quote follow-up — payday Friday") and anywhere else using that same muted color should just use the same bright white as the rest of the primary text.

**2. Change the card/box border lines from navy to the brand teal** (`#00BFA6`, the same teal in the logo) — matching the same teal-line approach already used in light mode. Checked for visibility: teal against the navy card fill measures a comfortable 5.94:1 contrast, so it'll read clearly.

---

## Round 23 — unbold dark mode's sidebar to match light mode, and thin dark mode's borders back down (try it and reassess, not a locked decision)

**1. Unbold the sidebar nav text in dark mode, matching the same reversion already done in light mode.** Keep the bright white color, just drop it back to normal (non-bold) weight — this applies to dark mode's sidebar the same way it already applies to light mode's.

**2. Thin the card/divider border lines back down in dark mode, back to how they were before the thickness increase a few rounds ago.** Light mode keeps its thicker lines exactly as they are — this is a dark-mode-only change. Explicitly experimental, want to see it before deciding.

---

## Round 24 — dark mode: drop the card fill again but keep it thick and teal; Overview section reorder, schedule rename and table layout (refinement, not a restart)

**Dark mode color/border changes:**
1. Remove the navy fill from cards again — card interiors should match the near-black page canvas, no distinct fill. Sidebar stays navy, unchanged.
2. Keep the border teal (from the last round), but make it bold/thick again — reversing the thin-it-down experiment from the round before, dark-mode only. Light mode's lines are unaffected.

**Overview changes:**
3. **Reorder sections:** "Needs your attention" moves above "Today's Schedule." Final order: Today at a glance, then Needs your attention, then Today's Schedule.
4. **Rename "Today's Schedule"** to something simpler and more conversational — "What's on today's schedule" is the preferred direction.
5. **Restructure Today's Schedule from single-line rows into a proper table/column layout** — separate columns for time, type, name, detail, and policy number (adjust exact columns as makes sense), with noticeably larger text in each cell. The reason this section's text felt small before wasn't really solved by bolding it — the real fix is giving it more room via real columns and larger type, using the available horizontal space properly instead of cramming everything into one dense line per row.

---

## Round 25 — dark mode card border: reuse the sidebar's own hover color instead of teal (refinement, not a restart)

**Change the card/box border color again.** Teal isn't working — instead, reuse whatever color the sidebar navigation already uses for its active/hover item state (visible when hovering "Overview" in the sidebar — a distinct, slightly lighter navy highlight against the sidebar's base navy). Don't invent a new value — pull the exact existing color already used for that sidebar hover/active state and apply it to the card borders too, so the two are visually tied together. Keep the border thickness as-is (bold/thick).

---

## Round 26 — dark mode: full revert to the version right after the original fix, before all the outline/fill/border-color experimentation (refinement, not a restart)

**Dark mode has drifted too far from the simplicity that makes light mode work — revert it, structurally, back to how it looked right after the very first dark-mode fix** (near-black page background, before any of the outlined-card, no-fill, teal-border, or sidebar-hover-border experimentation that followed). Specifically:
- No separate sidebar background color — sidebar matches the near-black page canvas, unified, like it originally did.
- Cards are filled with solid navy again (not outlined, not fill-less).
- Border color goes back to a plain, unemphasized navy-gray — not teal, not a reused hover color.
- Secondary/detail text goes back to its original, more muted tone rather than the brightened/retired version from later rounds.
- No dark-mode-specific bold/unbold or thick/thin border exceptions — dark mode should just follow whatever the general text-weight and border rules land on, with no special-casing layered on top the way there has been for the last several rounds.

Light mode is unaffected by this — it's confirmed working and stays exactly as it is.

---

## Round 27 — dark mode's page background and card fill switch from navy-tinted to neutral, matching the real live app (refinement, not a restart)

**Change the page background and card fill from navy-tinted to neutral near-black/dark-gray** — reference values `#0A0A0F` for the page canvas and `#13131A` for card fills (these are the real, currently-live `ohvara-dashboard` app's actual dark-theme colors, pulled directly from it, not a new guess). **The sidebar explicitly stays navy for now** (`#192C4F`) — this round only changes the page canvas and card fill, not the sidebar. Border color is unchanged for now, but flag if the existing navy-gray border reads oddly against the new neutral card fill — may need a follow-up adjustment once seen.

---

## Round 28 — border color also switches to neutral gray (refinement, not a restart)

**Change the card/divider border color from navy-gray to a plain neutral gray** — `#2A2A3A`, matching the subtle divider lines visible in the old admin dashboard's "Recent Bookings" list (same real-app reference as the last round, not a new guess). This replaces the navy-gray border that was flagged as reading oddly against the now-neutral card fill.

---

## Round 29 — dark mode: hover color, accent color, clock/date restructure, Overview section swap (refinement, not a restart)

**1. Main-page hover/click highlight changes from blue to light neutral gray** — this applies only to hover states on the main content area (buttons, clickable rows, etc.), not the sidebar's own active-item highlight, which is unaffected.

**2. Drop the teal accent for dark mode specifically** — light mode keeps teal, dark mode does not. Replace it with a blue derived from the sidebar's own hue: `#4B79CE` (checked for contrast — the literal sidebar navy itself is too dark to use directly as an accent, so this is a brightened version of the same hue, not a new unrelated color). This applies everywhere teal was being used as an accent in dark mode — icons, links like "Open worklist," badges, etc.

**3. Clock restructure:** put the date to the left of the time (currently below it) — "Thursday, July 23" in white, no timezone abbreviation. Give the time itself a filled box/pill around it to make it pop more, similar to how the sidebar's active nav item gets a fill to stand out.

**4. Remove "Needs your attention" from Overview** — it was found to be redundant with "What's on today's schedule," since the same items show up in both. Move the "Open worklist" link to "What's on today's schedule" instead, so that access point isn't lost.

---

## Round 30 — add a second KPI row to Overview: today's and this month's call activity (refinement, not a restart)

**Add a second row of four KPI tiles below "Today at a glance"** (same tile style/treatment as the existing row) — this one focused on call activity rather than AP/policy numbers: **Calls Taken (Today)**, **Close Rate (Today)**, **Calls Taken (This Month)**, **Close Rate (This Month)**, in that order. This fills the space left by removing "Needs your attention" with something genuinely different from the first row — that one is about deals/policies, this one is about today's and this month's call activity, which fits naturally on a page centered around duty status and live transfers.

---

## Round 31 — Hierarchy page: real enrollment/visibility mechanics, not just a generic org chart (refinement, not a restart)

The Hierarchy page needs to reflect how this actually works, confirmed 2026-07-23 — not just be a generic org-chart visual.

**1. Invite-based enrollment.** The page needs a way to generate/copy an invite link — this is how a closer's downline actually grows (someone accepts the link and becomes their direct recruit). Manual adjustment of the tree within the page itself should also be possible, not only via invite chains.

**2. Visibility is strictly scoped per closer — this is the important part, don't build a full company-wide tree for the Closer role.** A closer viewing this page only ever sees their own direct upline (who's above them) and their own downline (who's below them) — never siblings, never other branches, never anyone outside their own direct chain. If a closer has no recruits, the page just shows them and their upline, not an empty state pretending there's nothing to show. The sample data for the Closer view should reflect this scoped shape (a single chain: upline → the sample closer → downline), not a sprawling company-wide org chart.

**3. Admin's version of this page is different — full, unrestricted, company-wide view.** Admin should see the entire hierarchy across every team, not the scoped upline/downline-only view closers get. If Hierarchy isn't already on the Admin page list, add it there with this distinct scope.

**4. Commission override on downline deals is still unconfirmed — don't imply one exists.** Whatever this page shows should stick to structure/relationships (who reports to whom), not invented override percentages or commission flow from downline deals.

---

## Round 32 — remove Action Needed as its own page, clean up My Policies, move the search bar (refinement, not a restart)

**1. Remove "Action Needed" as its own sidebar page.** The status filters already on My Policies (All / Quoted / Submitted / Cancellation Pending / etc.) cover the same "what needs attention" purpose — a separate worklist page for it is redundant.

**2. My Policies feels too dense — clean it up:**
- **Make each row noticeably larger/more spacious** — the current density is too tight to read comfortably.
- **Replace the permanent row of status pills at the top with a real filter system instead.** A closer should click into a "Filters" control to filter by status, product, carrier, date, and state (add whichever other fields make sense) — rather than every status shown as an always-visible pill row. The filtering capability itself doesn't go away, it just moves behind a proper filter interaction instead of being permanently displayed.

**3. Remove the search bar from the global header** (the one currently next to the notification bell, present on every page) — it isn't earning its place there. **Add a dedicated search bar directly on the My Policies page instead**, and apply the same judgment to any other page that genuinely needs its own search — search should live on the pages where it's actually useful, not float unused in the global chrome.

---

## Round 33 — real-launch bare minimum, grounded in a real competitor dashboard (Liberated Financial), plus two new coming-soon pages

Real team confirmed for launch (2026-07-23): Nate (team owner, gets his login from Brayden), Jordan, and a third agent Nate has named Rego. Nate invites Jordan and Rego himself via the Hierarchy page's invite link — Admin doesn't create their accounts individually.

**Bare-minimum reasoning, confirmed 2026-07-23:** leads/calls are already flowing to Ohvara's number and are being handled outside the app (the Steve arrangement) — so in-app live-call handling is not launch-blocking. The actual bare minimum is tracking the business (pipeline/policies) so every agent can see everything they need to see about their own book.

Brayden shared 10 screenshots of a real dashboard (Liberated Financial, portal.liberatedfinanciallife.com — a prior dashboard Nate actually used) as the literal definition of the bare-minimum feature set. Reconciled against the existing brief:

**Real/functional for launch:** Overview, My Policies, Quoter, Submissions (carrier-portal grid + New Submission form + Cancellation Calendar), Hierarchy, Settings.

**"Coming soon" placeholder pages for now** (page stays in the sidebar, clicking it shows a simple "Coming soon" state instead of a fully built-out page): Live Call, My Calls, Activity Feed, Training Center, Commissions, Leaderboard, Performance.

**Two new pages, confirmed as "coming soon" only — not needed for real launch, not skipped entirely:**
- **Underwriting** — an AI-assistant chat tool where the agent describes a client's health conditions and gets back a provisional carrier-placement ranking. Distinct from Quoter, which only handles price. Add as its own sidebar page.
- **Contracting Submission** — a new-agent carrier-contracting request form (NPN, license state, carrier debt/appointment history). Add as a third tab on the Submissions page, alongside New Submission and Cancellation Calendar — not its own sidebar page.

**New Submission form — field list refined from a real reference form, not invented:** Policy Sold Date, Agent Name, Policy #, Lead Status, Client First Name, Client Last Name, Client Phone, Insurance Provider (dropdown), Product Type, Insurance Type, Effective Date, Monthly Premium, and an auto-computed Annual/Target Premium (Monthly × 12, calculated automatically, not manually entered).

**Cancellation Calendar confirmed as its own tab on Submissions** (alongside New Submission and Contracting Submission) — a calendar/time-slot booker for scheduling the 3-way cancellation call, matching the existing cancellation workflow already in this brief.

---

## Round 34 — dark mode notification panel color, sidebar divider fixes, collapse icon (refinement, not a restart)

**1. Notification panel is currently rendering in the blue accent color — change it to the neutral elevated-surface tone already defined in the design system** (`--bg-elevated`, `#1C1C26`), not blue, not the same as the page background, and not the same as card fills — a genuinely distinct third tone, sitting between the near-black page background and the card fill. Reference: a real competitor dashboard's notification dropdown (screenshot shared directly) — its popover is a subtly different shade from both the page background and the card fills, not a saturated accent color, and that's the read that's wanted here.

**2. Sidebar divider lines need their own color, distinct from the general border color used elsewhere.** The divider line directly below the "Ohvara / Closer Portal" header (above "TODAY") currently blends into the navy sidebar background — change sidebar-only divider lines to white. Everywhere else — dividers inside cards, on the near-black page background — keeps the existing neutral gray border color unchanged. This is a sidebar-specific override, not a global border-color change.

**3. Fix a misalignment in the sidebar:** the divider line below the header and the line beneath it currently don't line up — they read as slightly offset instead of one continuous straight line. Fix the alignment so they connect cleanly.

**4. Replace the hamburger icon used for the sidebar collapse control.** A generic hamburger/menu icon doesn't clearly communicate "this closes the sidebar." Use an icon that clearly signals collapse/expand instead — e.g. a chevron or arrow pointing toward the edge it collapses to — that flips or points the other direction when the sidebar is collapsed vs. expanded.

---

## Round 35 — commission tracking model (effectuation-gated, not submission-gated), plus fixes to unintended side effects from Round 34 (refinement, not a restart)

**1. Commission tracking mechanics, confirmed 2026-07-23 — this is a real business-logic decision, not just a UI note, mirror it into how the Commissions page frames numbers.** Carriers pay agents directly — there's no Ohvara-controlled payment rail (no Stripe, nothing) in this flow, so nothing can be pulled automatically. The model: at submission, the system can auto-calculate a *projected/estimated* commission from the already-captured carrier + product + AP (once real comp-grid rate data is loaded per carrier/product/contract-tier — not invented sample percentages). **That estimate does not count as real until the policy is confirmed active/effectuated — submission alone doesn't count the commission ("don't count chickens before they hatch").** Frame this in the UI: an estimated/projected commission tied to a submitted-but-not-yet-active policy should read visibly differently (e.g. "Projected," muted/pending styling) from a confirmed commission tied to an active policy. Also add a link-out to the carrier's own portal (same "Open Portal" pattern used elsewhere) so the agent can manually verify the real number against the carrier directly, since there's no live feed to trust blindly.

**2. Revert two unintended side effects from the Round 34 sidebar-border change — these should not have been touched:**
- The sidebar nav item **hover color** changed as a side effect of the last round's edits — revert it back to what it was before Round 34.
- The **"Available for transfers" toggle color** also changed as a side effect — revert it back to what it was before Round 34 too.

**3. The sidebar's white divider treatment from Round 34 went too far — it should only apply to two specific horizontal lines, not the sidebar's outer edge.** Currently there's also a vertical white line running down the right/outer edge of the sidebar (the boundary between the sidebar and the main content area) — that one should NOT be white, revert it back to whatever color it was before Round 34 (likely the same gray used on the page background side). **Keep white only on the two horizontal dividers**: the one directly below the "Ohvara" header/logo at the top, and the one directly above "Available for transfers" / the sign-out area at the bottom.

**4. The collapse chevron from Round 34 is barely noticeable — make it a more visually prominent icon.** Bigger, bolder, or higher-contrast — it needs to actually read as a clickable control at a glance, not blend into the sidebar.

---

## Round 36 — policy detail popup: centered modal, not a right-side panel, and fix its color (refinement, not a restart)

**1. The My Policies row-click detail is currently a right-side sliding panel — change it to a centered modal/popup instead.** This is the original click-to-open-detail-popup pattern from Round 3 (item 3) — a popup that opens centered on screen, not anchored to the right edge of the viewport.

**2. The popup is currently rendering in blue — change it to the same neutral elevated surface tone already established for the notification panel** (`--bg-elevated`, from Round 34/v13) — not the accent color, a distinct tone from both the page background and the card fills, same treatment, applied consistently everywhere a popup/modal appears (not just this one).

---

## Round 37 — modal orientation/scroll-lock, and "Coming soon" placeholder polish (refinement, not a restart)

**1. Change the policy detail modal from vertical to horizontal orientation** — wider than it is tall, instead of the current tall/narrow layout.

**2. Scroll-lock the background page whenever any modal/popup is open.** Right now the page behind a popup can still be scrolled — it shouldn't be, while the modal is open.

**3. "Coming soon" placeholder pages: move the placeholder content to the vertical center of the page** (it currently sits near the top) **and make it larger.**

**4. Remove "before launch" from every "Coming soon" page's copy** — e.g. "Live call handling and duty status will land here before launch." becomes just "Live call handling and duty status will land here." Apply this same trim to all of the coming-soon pages, not just Live Call.

---

## Round 38 — sidebar reorganization: merge Leaderboard into Performance, Activity Feed into My Calls, new Tools category (refinement, not a restart)

**1. Merge Leaderboard into Performance.** Leaderboard stops being its own sidebar entry — it becomes a view/tab inside the Performance page instead (Performance and Leaderboard as two switchable views on one page, both about stats). Consider renaming the page "Stats" now that it covers both.

**2. Merge Activity Feed into My Calls.** Activity Feed stops being its own sidebar entry — fold it into My Calls as a tab/section on that page instead.

**3. New "Tools" sidebar category, parallel to Sales/Growth.** Move Quoter, Underwriting, and Submissions out of Sales and into this new Tools category — these are all utilities a closer reaches for mid-work (quoting, carrier placement, submitting business), distinct from the pipeline-tracking pages that stay under Sales (My Calls, My Policies).

**4. Pull the carrier-portal grid out of the Submissions page into its own dedicated page/tab, also under Tools.** Submissions keeps New Submission, Cancellation Calendar, and Contracting Submission as its tabs; the carrier-portal directory (carrier name, phone numbers, "Open Portal" links) becomes its own separate page instead of a tab within Submissions.

**Best-effort interpretation flag:** this round was relayed verbally and is reconstructed from that — if any of the above doesn't match intent (e.g. whether Submissions itself belongs under Tools vs. staying in Sales), flag it back rather than guessing further.

---

## Round 39 — build out full UI for Underwriting and Stats specifically, not just a placeholder card (refinement, not a restart)

These two pages get the same full-build treatment as the rest of the app — populated with realistic sample data, matching the visual craft used everywhere else — instead of the simple "Coming soon" placeholder card currently shown. Still non-functional underneath (no real AI, no real production data feed) — this is UI polish only, ahead of real integration work that happens after public launch, not before. Every other "coming soon" page (Live Call, My Calls, Training Center, Commissions) stays as the simple placeholder card — this build-out applies only to these two.

**Underwriting:** build the actual chat-assistant interface — a message thread area, quick-prompt starter chips (sample health-condition scenarios, e.g. "62, type 2 diabetes on insulin," "COPD, still smoking," "Had a stent 2 years ago," "Stage 1 breast cancer, in remission"), a text input + send button, and at least one populated sample exchange showing what a response looks like (a provisional carrier-order ranking based on the described condition). Same visual/interaction shape as a real assistant chat UI, sample content only.

**Stats:** build out both tabs with real sample content. **Production:** the stats/drill-down content already spec'd for this page in earlier rounds — Active AP, Submitted AP, persistency at the rolling windows (30-day/3-month/6-month/12-month), day-level and month-level drill-down (Round 13). **Leaderboard:** top-3 spotlight plus a full standings table ranked by submitted AP, with a daily/monthly view toggle (original spec, Round 2).

---

## Round 40 — Stats/Production page: persistency as separate tiles, You/Team scope toggle, custom date-range picker (refinement, not a restart)

**1. Change Persistency from a single table with four rows into four separate boxes/tiles — one per window** (30-day, 3-month, 6-month, 12-month) — matching the tile treatment already used for Active AP / Submitted AP above it, instead of a table layout.

**2. Add the You / Team scope toggle to this page.** This is the individual-vs-team scope control that was originally pulled off Overview back in Round 10 and deferred to "its own separate page" — this Production/Stats page is that page. Every number on the page (AP, persistency, etc.) should switch between the closer's own individual numbers and their team's total.

**3. Add a custom date-range picker, alongside the existing Day/Month toggle** — letting a closer pick an arbitrary start and end date (e.g. July 9–18) and see AP written/submitted across that specific range, not just a single day or single month.

**4. Make sure the full metric set already established in earlier rounds is present here, in both individual and team scope** — Active AP, Submitted AP, persistency at all four windows, and anything else already spec'd for this page/Overview in earlier rounds — nothing should be dropped in this restructuring.

---

## Round 41 — Production tab: unified date-field calendar (drop the separate Range toggle), and the full metric set (refinement, not a restart)

**1. Drop the standalone "Range" toggle — merge single-date and range selection into the date field itself.** Right now Day/Month/Range are three separate toggle options. Instead: the date field is clickable and opens a calendar, matching how the calendar already works on Ohvara's existing (real, currently-live) dashboard — click a date to select it (defaults to viewing that single day/month), then either click the same date again to keep it single, or click a second, different date to turn it into a range spanning those two dates. One unified date-picker interaction, not a separate mode toggle.

**2. Expand the Production tab's tiles to the full metric set already established elsewhere in this brief** — right now it only shows Active AP, Submitted AP, and Persistency. Add: **Policies Active**, **Average Premium**, **Calls Taken**, and **Close Rate** (the same metrics already on Overview's two KPI rows, per Rounds 7 and 30) — this page is the closer's full stats destination, so it should carry the complete set, not a subset, all filterable by the same You/Team scope and date controls already on this page.

**3. Add "Issued AP" alongside the existing "Submitted AP," and a new "Approval Rate" tile.** Issued AP is the dollar total of applications that were actually approved and put in force by the carrier — distinct from Submitted AP, which is just what went in. Approval Rate is the percentage relationship between the two: of what a closer submits, how often it actually gets approved. (Explicitly decided against tracking "Net AP" or "Cancelled AP" as separate figures — Active AP already reflects the current book net of any losses, no separate loss-tracking number needed. Also explicitly decided "Apps in Underwriting" is a pipeline status that belongs on My Policies, not a Stats metric.)

**4. Add a Cancellation Breakdown section** — bucket cancellations by how long they took to resolve (0-7 days, 8-30, 31-90, 90+ days), as both a table (count/%/$AP) and a chart. This was originally spec'd back in Round 2 but never landed on a specific page — this Production tab is its home.

---

## Round 42 — Cancellation Breakdown: one box, not two, drop the bar chart (refinement, not a restart)

**Combine the "Cancellation breakdown" chart box and the "By the numbers" table box into a single box.** The only real difference between the two was the AP column — keep that. Drop the bar-chart visualization entirely — it isn't earning its place (there's no real value in a bar showing "5 is bigger than 2"). End state: one section, one table, columns Window / Count / % / AP, same data currently split across both boxes.

---

## Round 43 — replace the whole Cancellation Breakdown section with a single "Fall-off Rate" tile, precise definition (refinement, not a restart)

**Remove the Cancellation Breakdown table entirely (the box built in Round 42) — replace it with one tile: Fall-off Rate.** This is a specific, narrow definition, confirmed 2026-07-23 — get it exactly right, don't approximate with persistency math:

- **Counts:** a policy that was already issued/in force (first premium successfully collected, policy active) and *later* lapsed or cancelled — insufficient funds, client cancels, etc. — and was **not** subsequently recovered/reinstated.
- **Does NOT count:** a policy that was submitted but never actually went into effect (first premium never applied) — that's a submission that didn't convert, already reflected in Approval Rate/Issued AP, not a fall-off.
- **Does NOT count:** a policy that fell off but was later brought back onto the books (reinstated) — a recovered policy doesn't count against this rate.

Fall-off Rate = (issued policies that later lapsed and were never recovered) ÷ (total issued policies). One tile, one percentage — no breakdown table/chart needed.

**Also this round: add "Today" and "All time" alongside the existing "Month" toggle.** The time-scope control in the top right becomes three options — Today / Month / All time — plus the existing click-to-select date field for a specific day or custom range (from Round 41), unchanged.

---

## Round 44 — Production tab: unify date controls, independent Persistency period picker, Leaderboard podium layout, reset state on navigation (refinement, not a restart)

**1. Bug: Active AP (and the other scope-filtered tiles) don't actually respond to the Today/Month/All-time selection.** Fix this — every tile on the page needs to actually recompute based on whichever time scope is selected, not stay static.

**2. Merge the Today/Month/All-time toggle into the date control itself, instead of two separate controls sitting next to each other.** Right now there's a redundancy: a "Today" button, and a calendar date field where clicking today's actual date does the exact same thing. Fix: one unified control — a date/period display with left/right arrows to step to the previous/next day or month (whichever granularity is active; the right arrow disables once it would go into the future), and clicking the display opens a calendar popover with Today / This Month / All Time as quick-select options at the top, plus the calendar grid below for picking a specific day or a custom range. One control, not two overlapping ones.

**3. Persistency needs its own independent period control, separate from the rest of the page's filters.** Persistency shouldn't follow the page-level Today/Month/All-time filter — give it its own month-based picker: view a specific month (this month so far, last month, any past month), or select a range/group of months (e.g. a 3-month span) and see persistency for that group. This sits alongside the existing rolling-window tiles (30-day/3-month/6-month/12-month), not a replacement for them — reconfirms/extends the original drill-down spec from Round 13.

**4. Leaderboard: podium layout for the top 3.** #1 in the middle, #2 on the left, #3 on the right — all three cards sit on the same baseline, but #1's card is taller, rising above the other two like a physical podium. Add a crown icon on/hanging off the corner of the #1 card.

**5. Reset scope/tab state whenever navigating away from Stats and back.** Leaving Stats (e.g. going to Overview) and returning should always reset to the defaults — You (not Team), Today (not Month/All-time), and Production tab (not Leaderboard) — never preserve whatever was selected on the last visit.

---

## Round 45 — Overview clock: filled-button styling, both modes (refinement, not a restart)

**Fill the clock box with the accent color, matching the "Get Quotes" button's styling on the Quoter page** — solid accent-color fill, with the clock's text in the same white it already uses. Apply this in both modes, each using its own accent: dark mode's clock fills with dark mode's blue accent (same as dark mode's own Get Quotes/primary-button color); light mode's clock fills with light mode's teal accent (same as light mode's own Get Quotes/primary-button color). Reference the actual Get Quotes button in each mode for the exact treatment, not just the color value.

---

## Round 46 — My Policies: final status model, replacing every status used so far (refinement, not a restart)

Confirmed 2026-07-23 — this replaces every status value used on My Policies (filters, table badges, and the detail modal) up to this point, including "Quoted," "Cancellation Scheduled," and "Cancelled — Complete."

**Main status — five values: Follow-up, Not Interested, Submitted, In Effect, Undrafted.** Follow-up and Not Interested are pre-submission outcomes; Submitted, In Effect, and Undrafted are all post-submission.

**Build all five now, even though two aren't reachable yet.** Live-call handling isn't wired into the dashboard — calls happen on the closer's phone, outside the app. The only way a record enters My Policies today is the New Submission form, which only fires after a deal is already sold, so Follow-up and Not Interested have nothing populating them right now. That's intentional — build the full five-status filter/badge system anyway, so it's ready the moment live-call handling gets added later, with no rework needed then.

**Submitted → In Effect / Undrafted transition mechanism:** on or after the Effective Date already captured on the New Submission form, prompt the closer directly — "Did this policy go into effect?" Yes → In Effect. No → Undrafted.

**Cancellation status is its own separate field, not part of the main status list** — two values only: Cancellation Pending, Cancellation Complete. A record can show both a main status (e.g. In Effect) and a cancellation status at the same time, as two distinct attributes/badges, not merged into one list.
