---
date: 2026-06-07
updated: 2026-07-21
description: "Ohvara — pivoted 2026-07-21 to an inbound insurance operation (Google Ads → AI receptionist → live transfer → closer). Pre-pivot SMB automation business archived below for history."
tags:
  - brain
  - north-star
aliases:
  - Goals
  - Focus
---

# North Star

> Read this file first, every session. It grounds every decision.

## ⚠️ PIVOT 2026-07-21 — read this before anything else

Ohvara is switching businesses. **Full pivot, not an add-on** — the SMB/trades outbound cold-calling business (setters, Indeed/Maps lead scraping, the two-call close) is winding down. Same underlying platform/dashboard, completely different purpose. See the Shifts Log at the bottom for the decision record; see **Archived — pre-pivot business (through 2026-07-21)** at the bottom for everything that used to be true here — kept for history, not current direction.

---

## Who We Are

**Ohvara** — inbound insurance operation.

- **Brayden** — operations, builds, strategy
- **Nate** — closer
- **Jordan** — building the separate client-facing policy dashboard (out of scope for this codebase); whether Jordan also closes here is **unconfirmed — flag to Brayden**
- **Jahandad** — role under the old business was setter recruitment; with the setter role gone, his role in the new structure is **unconfirmed — flag to Brayden**, don't assume he's off the project
- **Steve** — outside contact (via Nate/Jordan), already running his own inbound lead generation (ads → calls) for insurance prospects. The plan: Steve routes every call that would've gone to his own agents to one number instead — Ohvara's AI receptionist — which warms/qualifies the caller, then live-transfers into Ohvara's closer system (this dashboard). Zero ad spend on Ohvara's side for this lead flow; it's Steve's existing traffic, just rerouted. Confirmed 2026-07-22.
- **Rego** — third agent on Nate's real launch team, alongside Nate and Jordan. Confirmed 2026-07-23.

**Real launch team, confirmed 2026-07-23:** Nate (team owner), Jordan, Rego. Admin creates Nate's account only; Nate invites Jordan and Rego himself via the Hierarchy page's invite link.

**Status: Pivoting. Building the inbound calling infrastructure is Phase 1.**

---

## The Business — Inbound Insurance

**Same Ohvara platform, flipped purpose.** Instead of Ohvara selling AI receptionists to other small businesses, Ohvara now runs its own insurance operation using the same kind of AI-receptionist tech internally.

**The funnel (full funnel is in scope for this codebase — landing page through close):**

1. **Google Ads** drives clicks to a **landing page** (net new build).
2. Prospect calls the business line (click-to-call or a listed number).
3. An **AI receptionist answers first** — qualifies the caller (insurance type, current provider, basic details), same category of tech Ohvara used to sell to clients, now used internally.
4. **Live transfer** to an available closer — real-time handoff, not a callback or a scheduled appointment.
5. **Closer closes** the policy on that same call.
6. **Cancellation of the old policy — a required post-close step, not optional.** These are policy-replacement leads, not new-to-insurance leads: every Google Ads prospect already has an existing policy with another carrier ("policy help" is the framing), and the close is switching them to a new one. The old policy can only be cancelled via a **live 3-way call — closer, client, and the old carrier, all on the line together.** A deal isn't actually done at "closed" — it needs its own tracked stage and its own telephony requirement (3-way calling, not just closer↔client). This is new information (2026-07-21) and needs to be reflected in both the data model and the closer's pipeline UI. **Cancellation status simplified 2026-07-23** to just two values (Cancellation Pending, Cancellation Complete) — see Pipeline Status Model below.

**Pipeline Status Model, confirmed 2026-07-23 — this is the final version, replacing every status value used in the Claude Design mockup up to this point:**
- **Main status, five values:** Follow-up, Not Interested, Submitted, In Effect, Undrafted. Follow-up and Not Interested are pre-submission outcomes (a call that didn't result in a sale); Submitted, In Effect, and Undrafted are all post-submission.
- **Not all five are reachable yet, and that's intentional.** Live-call handling isn't wired into the dashboard (calls happen on the closer's own phone, outside the app — confirmed launch scope). The only way a record currently enters My Policies is the New Submission form, which only fires after a deal is already sold — so Follow-up and Not Interested have no path to populate today. Built anyway, deliberately, so that when live-call handling gets integrated later, these two statuses start working immediately with no further status-model rework. No manual "Add Lead" workaround for this gap — leave it unreachable until the real integration lands.
- **Submitted → In Effect / Undrafted transition:** on or after the Effective Date already captured on the New Submission form, the dashboard prompts the closer directly — "Did this policy go into effect?" Yes → In Effect. No → Undrafted (didn't draft, for any reason — not necessarily permanent).
- **Cancellation status is a separate field, not part of the main status list.** It applies independently to the old policy being replaced, with just two values: Cancellation Pending, Cancellation Complete. A single record carries both a main status (e.g. In Effect) and a cancellation status at the same time — two different attributes, not one combined list.
7. Client gets their own policy-management dashboard — **Jordan is building this separately, not part of this codebase.** This codebase's job stops at "the deal closed" (and now-cancelled) — the ongoing policy itself lives in Jordan's app. **Purpose confirmed 2026-07-22: retention.** The client gets an invite to the Ohvara client app on close (same pattern as the old model's client-facing app), so any future policy question or change (beneficiary, etc.) sends them to their own app instead of searching externally. Currently scoped to clients that Jordan and Nate actually close through this system, not a universal add-on — this bundle (closer/admin dashboard + client retention app) is also the package Ohvara intends to eventually resell to other insurance agencies (see Goals).

**What's explicitly in scope for this codebase:** the landing page, lead capture, the AI receptionist + live-transfer telephony system (net-new build — nothing like real-time inbound call answering/routing exists in the platform yet), the closer-facing live-call experience, the post-close cancellation workflow (including 3-way calling), and all tracking/reporting around inbound calls, transfers, closes, and cancellations.

**What's explicitly out of scope:** the post-sale client policy portal (Jordan's build).

**Not yet defined — don't guess, ask Brayden before building:**
- Specific insurance line(s) sold (auto/home/life/other) and which carriers/underwriting flow applies
- Whether there's still a "setter" function anywhere in the new model, or if closers handle 100% of a live-transferred call solo
- Commission **split/percentage** structure for the new model (the old 10% setter / 45% Nate / 45% Brayden split was built around the two-call setter+closer flow — that math doesn't map cleanly onto a single-call live-transfer close; needs a real redefinition, not an assumption) — the **tracking mechanics** below are confirmed, the split percentages are not.

**Commission tracking mechanics, confirmed 2026-07-23.** Carriers pay agents directly (direct deposit set up between agent and carrier) — no Stripe or any Ohvara-controlled payment rail touches this money, so there's no transaction feed to pull automatically. Real-world mechanics:
- **Estimated, at submission:** the moment a policy is submitted (via the Submissions page's New Submission form), the system can auto-calculate a *projected* commission using the carrier + product + AP already captured, applied against that carrier/product/contract-tier's real commission rate — but only once Ohvara has the actual comp-grid rate data loaded per carrier/product/contract-tier (real data entry, not invented placeholder percentages).
- **"Don't count chickens before they hatch"** — the estimated commission is clearly a projection, not a counted/real number. A commission only counts as real once the policy is confirmed **active/effectuated**, not merely submitted — submission and effectuation are different pipeline stages (see Round 2's cancellation-stage note above; the same "submitted ≠ confirmed" gap applies to effectuation, not just cancellation).
- **Manual fallback:** since there's no live carrier payment feed, provide a link out to the carrier's own portal (same "Open Portal" pattern already used elsewhere for carrier links) so the agent can check/verify the real number directly if the auto-calculated estimate doesn't match what's actually paid.
- This is a UI-exploration decision for the mockup for now (Commissions page ships as "coming soon," see Round 33) — real backend math (real comp-grid data, real effectuation-triggered state change) is build work for later, not something to fake with sample data claiming to be live.

---

## Roles — Closer + Admin, with closer recruiting/downline (confirmed 2026-07-22)

**No setter/rep role in the new model.** The existing setter-facing code (Training Center, cold-call scripts, the daily lead-batch-assignment system) is being **repurposed for closers**, not deleted and not left dormant — per Brayden's explicit call (2026-07-21). Concretely: script content becomes closer-facing insurance objection-handling / qualifying material, Training Center becomes closer onboarding, and the batch-assignment plumbing likely has no direct equivalent in a live-transfer model (there's no "daily batch of leads to dial" anymore — leads arrive as live calls in real time) — CC should evaluate case by case what actually transfers over versus what's structurally obsolete given the model change, and flag anything that doesn't have a clean repurpose target rather than forcing one.

- **Closer** — handles live-transferred calls, closes policies. Nate confirmed; Jordan unconfirmed (see above).
- **Admin** — Brayden. Owns tech, infrastructure, oversees the funnel end to end.

**Closer recruiting/downline structure — confirmed 2026-07-22, structural detail still TBD.** This reverses the earlier "flat team, no hierarchy" read of the pivot. Closers can now recruit other closers into a downline, similar in spirit to Eterna's agent-hierarchy model (see [[eterna-portal-recon]] section 4/8), with tiered commission overrides across the downline. **Not yet defined — flag and ask, don't invent:** number of tiers, override percentages, whether recruiting is open to every closer or gated, how this interacts with the per-deal 3-way-cancellation commission/chargeback math already documented under Commission Structure, and whether Admin sits above the hierarchy or outside it.

**Enrollment/visibility mechanics — confirmed 2026-07-23.** Admin creates accounts directly only for team owners (near-term: just Nate gets a real account — Jordan still unconfirmed). A team owner generates an invite link; whoever accepts it becomes their direct recruit, and that's the primary way the hierarchy tree actually grows (structure can also be adjusted manually within the Hierarchy page itself, not only via invite chains). **Visibility is strictly scoped per person:** a closer can only ever see their own direct upline (who's above them) and their own downline (who's below them) — never siblings, never other branches, never anyone outside their own direct chain. If they have no recruits, their Hierarchy view just shows themselves and their upline. **Admin gets the full, unrestricted, company-wide view** — this scoped view is specifically the Closer-level experience.

**Why this matters beyond the current build:** this isn't just serving Nate/Jordan today — self-service invite-based enrollment is necessary infrastructure for the long-term goal (see Goals below) of reselling this whole system to other insurance agencies, since each agency's own owner will need to onboard their own team without Ohvara admin managing it for them.

Until override percentages/tiers are confirmed, this shows up in the dashboard as a UI-exploration page (real page, sample data, non-functional) — not as real commission math anywhere in the codebase.

---

## Current Focus

**Real launch bare minimum, confirmed 2026-07-23.** Leads/calls are already flowing to Ohvara's number and are handled outside the app (Steve arrangement) — so in-app live-call handling is NOT launch-blocking. The actual bare minimum is tracking the business (pipeline/policies) so each of the three real agents (Nate, Jordan, Rego) can see everything they need about their own book. Grounded in a real reference dashboard Nate previously used (Liberated Financial, portal.liberatedfinanciallife.com) — its full page set is treated as the literal bare-minimum definition. Real for launch: Overview, My Policies, Quoter, Submissions, Hierarchy, Settings. Everything else in the existing Claude Design brief ships as a "coming soon" placeholder page for now (stays in the sidebar, not deleted). Two new pages surfaced by the reference — an AI **Underwriting** carrier-placement assistant, and a **Contracting Submission** new-agent onboarding form — are confirmed in-scope for the mockup but coming-soon-only, not needed for real launch. Full reconciliation: [[claude-design-insurance-dashboard-brief]] Round 33.

**Build philosophy, reaffirmed 2026-07-23 — this is not a from-scratch rebuild.** The insurance pivot is not a side project or an experiment sitting next to the old business — it's what Ohvara is now, full stop, and the old setter/SMB model is fully scrapped (not paused, not parallel). But the underlying platform — infrastructure, URLs, auth, and existing systems like the invite-link mechanism already built for the old model — carries forward and gets repurposed, not rebuilt from zero. **Before CC scopes any piece of the real build as net-new work, audit what already exists in the current `ohvara-dashboard` codebase and reuse/repurpose it first** — this specifically applies to the Hierarchy invite-link flow, which Brayden confirmed already exists in some form from the old system and should be adapted, not rebuilt. Don't assume "new dashboard" means "new infrastructure."

**New feature idea, scope TBD 2026-07-23:** in-system messaging (internal chat between team members inside the dashboard itself). Brayden wants this added — not yet decided whether it's real for launch or a coming-soon placeholder like Underwriting/Contracting Submission. Ask before building either way.

**Real launch confirmed live, 2026-07-24.** Nate is set up as Closer, Brayden as Admin, both real accounts working on the actual live app. Quoter's toolkit blocker resolved same day — confirmed: InsuranceToolkits.com (the same real tool the Liberated Financial reference embedded), to be embedded directly into the Closer Quoter page. Still open: real Carrier Portals data, Cancellation Calendar routing contact, in-system messaging scope, the three missing Claude Design export files. Also in progress: cleaning up all leftover test/legacy accounts (`apex11`, etc.) and legacy SMB dashboard remnants — real deletion, confirm the exact list with Brayden before executing.

**Mockup phase considered essentially closed, 2026-07-23.** Once Underwriting and Stats (Production/Leaderboard) have their UI polished/locked, Brayden confirmed that's everything needed from the Claude Design mockup before going public — both ship with finished-looking UI but no real functionality behind them at initial launch (same "coming soon"/non-live treatment as the rest of that list), with real integration work (real AI underwriting logic, real production/leaderboard data) happening after public launch, not before. This closes out the UI-exploration phase and hands off to the real build.

**Phase 1 — Build the inbound calling infrastructure.**

- [ ] Landing page + Google Ads lead capture (net new)
- [ ] AI receptionist: answers inbound calls, qualifies the caller (net new — no existing inbound telephony system to build on)
- [ ] Live transfer: AI receptionist → available closer, real-time handoff (net new)
- [ ] Closer-facing live-call UI: caller info + AI-gathered qualifying notes surfaced the moment a transfer connects
- [ ] Admin-facing inbound call tracking: live call queue, closer roster/availability, conversion reporting
- [ ] Repurpose existing setter scripts/Training Center content for closer-facing insurance material
- [ ] Cancellation workflow: 3-way calling (closer + client + old carrier) and a tracked pipeline stage from closed → cancellation pending/scheduled → cancelled
- [ ] Decide + build closer availability/duty-status system (a closer needs to be markable "available for transfer" vs not)

## Goals

Exact numeric targets not yet set — the old 90-day/medium-term/long-term targets in the archive below were built around SMB rep-count and MRR math that doesn't apply here. Real numbers (expected call volume, target close rate, target policy value) still need to come from Brayden. Qualitative trajectory confirmed 2026-07-22, though:

- **Near-term:** get this dashboard live using Steve's free inbound leads (see Who We Are) and start generating real revenue — "build capital" before anything else.
- **Long-term:** once proven out on Ohvara's own book, package the same system — closer/admin dashboard, AI receptionist, live-transfer/lead-routing, and the client retention app — and sell it as its own product to other insurance agencies. A second revenue line on top of running Ohvara's own operation, re-aiming the original "sell automation systems to SMBs" model specifically at insurance agencies instead of arbitrary small businesses.

## Anti-goals

- Don't build the client policy dashboard — that's Jordan's, stay out of it
- Don't invent commission percentages, insurance verticals, or a setter-equivalent role that hasn't been confirmed — flag and ask
- Don't discard the existing setter code — repurpose it per Brayden's explicit instruction, and flag anything that has no clean repurpose target instead of silently deleting it

---

## Active Infrastructure

| Tool | Purpose |
|------|---------|
| Retell AI | Was outbound AI-receptionist product for clients; now needs to also cover **inbound** answer + live transfer for Ohvara's own line — confirm whether Retell supports this natively or a different telephony layer (Twilio, Vapi) is needed |
| Supabase | Database + auth (`jjextitmbptoaolacocs.supabase.co`) |
| Vercel | Dashboard (`app.ohvara.com`) |
| Twilio | Was SMS reminders only — likely needs a bigger role now (inbound call routing) if Retell alone doesn't cover live transfer |
| Anthropic Claude API | AI briefings, scripts |
| Stripe | Payment links — policy/premium payment flow needs redefining for insurance, not carried over as-is from the setup-fee+subscription model |
| Google Ads | **New** — inbound lead source, replaces Indeed/Maps scraping |
| Landing page | **New** — net-new build, no existing equivalent |
| GitHub: BFreeOhvara | All repos |

---

## Rules Claude Always Follows

1. Read [[Memories]] before every session
2. Read [[DESIGN]] before touching any UI
3. Append to [[Memories]] after every session
4. Never ask Brayden to run commands manually
5. Never hardcode colors — use design tokens
6. Never duplicate leads in the database
7. All monetary values in mono font
8. When blocked, state blocker + two options
9. Log every mistake — mistakes written down don't repeat
10. **Never drive Claude in Chrome / browser actions directly from a Cowork (Eagle/Falcon) session.** Brayden runs his own Claude Chrome session with everything already logged in. Any task needing a browser (Supabase SQL editor, GitHub, live site verification, etc.) gets written up as a self-contained prompt file artifact in the Ohvara folder and handed to Brayden to paste into Claude Chrome himself — never attempted directly via the `Claude_in_Chrome` MCP tools from Eagle/Falcon.
11. **Standing push authorization (2026-07-06):** once local build/verification passes on any repo (`ohvara-dashboard`, `Scraper`, `obsidian-mind`), push to `origin` automatically — don't wait for a per-prompt "push it." Still hold on genuinely destructive/irreversible git ops (force-push, reset --hard, history rewrite) — this only covers normal forward commits.
12. **Never attempt `git add`/`commit`/`push` on `obsidian-mind` from a Cowork (Eagle/Falcon) session (2026-07-15).** The Cowork FUSE bridge blocks file deletion, so git's own lock-file cleanup silently fails and orphans `.git/index.lock`/`.git/HEAD.lock` for every session after it. Cowork sessions write file content only (Read/Write/Edit); CC's native sessions own all vault git operations, `git pull`-ing at the start of every run to pick up whatever Cowork left uncommitted on disk. **Violated once already (2026-07-21, Falcon) — self-healed because CC's next session found and removed the stale lock, but don't rely on that.**

---

## Shifts Log

| Date | Shift | Reason |
|------|-------|--------|
| 2026-06-07 | Initialized North Star | Ohvara vault setup |
| 2026-06-07 | Full business context upgrade | Added sales process detail, warm lead insight, rep onboarding flow, commission, dialer TBD, geo market, Stripe auto-link rule, training optional |
| 2026-06-07 | Packages, team structure, niche profiles locked | Finalized 4 packages with setup fee, confirmed Nate as sole closer, Profile A only, ROI anchors |
| 2026-06-19 | Hard refresh: niche lineup + commission structure corrected | Niche list updated to the real locked 6, commission changed to setter 10% one-time / Nate+Brayden 45/45 first deal / 50/50 recurring |
| 2026-06-22 | New standing rule: Cowork sessions never drive Claude in Chrome directly | Brayden's Claude Chrome already has everything logged in and he prefers to run it himself |
| **2026-07-21** | **Full pivot: SMB two-vertical automation business → inbound insurance operation** | Brayden's call, relayed via Falcon. Same platform, entirely different business: Google Ads → landing page → inbound call → AI receptionist → live transfer → closer close. Setter role and portal removed (closer + admin only); existing setter scripts/Training Center repurposed for closers rather than discarded. Full funnel (landing page + lead capture + telephony + tracking) confirmed in scope. AI receptionist live-transfer system confirmed as a net-new build, not a repurpose of existing infra. Commission structure, specific insurance vertical, and Jordan/Jahandad's exact roles in the new model are open — not yet defined, do not guess. |
| **2026-07-22** | **Closer recruiting/downline structure confirmed** | Brayden's call, relayed via Falcon, during dashboard review. Reverses the flat-team read of the 2026-07-21 pivot — closers can now recruit sub-closers into a downline, tiered commission overrides confirmed as a concept (Eterna-style). Exact tiers/percentages/gating not yet defined. Added a "Hierarchy" tab to the Claude Design dashboard brief as sample-data UI exploration ahead of real backend work. |
| **2026-07-22** | **Free lead source (Steve) + resale trajectory confirmed** | Brayden's call, relayed via Falcon. Steve (outside contact via Nate/Jordan) already runs his own inbound insurance lead gen — plan is he routes those calls to one number (Ohvara's AI receptionist) instead of his own agents, Ohvara's closer system takes it from there, zero ad spend for Ohvara on this lead flow. Near-term goal: get this dashboard live on Steve's leads to generate real revenue. Long-term: resell the whole system (dashboard + AI receptionist + client retention app) to other insurance agencies as a second revenue line. Client app's purpose confirmed as retention (policy questions/changes), scoped to Jordan/Nate's own closes for now — still Jordan's build, out of scope here. |
| **2026-07-23** | **Hierarchy enrollment/visibility mechanics confirmed** | Brayden's call, relayed via Falcon, during dashboard review. Admin creates accounts only for team owners (near-term: just Nate); owners self-service invite their own recruits via an invite link, which is the primary way the downline tree grows (manual adjustment in the Hierarchy page also possible). Visibility strictly scoped per closer — only their own upline + downline, never other branches. Admin gets the full unrestricted company-wide view. Override commission on downline deals still unconfirmed — do not assume it exists or invent a number. |
| **2026-07-23** | **Real launch team + bare-minimum scope confirmed** | Brayden's call, relayed via Falcon. Real launch team is Nate, Jordan, Rego — Nate invites the other two via the Hierarchy invite link. Calls/leads already flow to Ohvara's number and are handled outside the app, so live-call handling isn't launch-blocking; the real bare minimum is pipeline/policy tracking. Brayden shared a real reference dashboard (Liberated Financial) as the literal bare-minimum page set — reconciled against the existing Claude Design brief in Round 33. Two new page concepts surfaced (AI Underwriting assistant, Contracting Submission form) added as coming-soon-only, not real for launch. |

---

## Archived — pre-pivot business (through 2026-07-21)

> Everything below this line describes the **old** SMB automation business. Kept for history and in case any of it needs to be referenced while repurposing setter code — **not current direction.**

### Who We Were

**Ohvara** — a two-vertical SMB automation business.

- **Brayden** — operations, builds, strategy
- **Nate** — sales, closing
- **Jahandad** — rep recruitment

### The Two Businesses (archived)

**Vertical 1 — AI Receptionist / Dispatcher.** Sell AI phone agents to small businesses as a recurring monthly subscription, replacing the receptionist/dispatcher they're actively trying to hire. Target niches: Veterinary, HVAC, Electrical, Roofing, Landscaping, Pressure Washing (+7th slot open). Lead source: Indeed + Google Maps.

**Vertical 2 — Web Agency.** Single-file HTML/CSS/JS websites for small businesses, bundled into the Elite package or standalone. Lead source: Google Maps businesses with no website, fewer than 50 reviews.

### Stack Pricing (archived, superseded 2026-06-25 then fully retired 2026-07-21)

Setup fee `$297` flat, monthly formula-priced (`callsMissedPerWeek × 4.33 × avgTicket × 0.15`, floor `$399`, ceiling `$1,999`, ends in 99). Standard stack for every client (not custom-generated): AI Receptionist as the front-runner + fixed sub-agents (Review Generation, Lead Follow-Up, Appointment Reminders, Appointment Cancellation, SMS Marketing). Website+chatbot included by default with an ownership-exclusion check. ROI anchor: cost of a human hire (`$2,800`–`$6,000+/mo`).

### Team Structure (archived)

**Closer:** Nate (only confirmed closer, all Profile A appointments), Jordan (on standby).
**Profile Assignment:** All reps and Nate worked Profile A only until a second closer was confirmed. Profile A = Trades & Field Services (HVAC, Electrical, Roofing, Landscaping, Pressure Washing, +7th TBD) — direct, no-nonsense, peer-to-peer tone; opening question "How many calls do you think you're missing while your guys are out on jobs?" Veterinary ran the same script without the job-site framing.
**Rep Commission:** Recruited via Facebook groups via Jahandad, 3–5 reps working Profile A simultaneously.

### Commission Structure (archived, FINAL as of 2026-06-19 for the old model)

Setter got 10% of the whole deal (setup fee + first month's recurring) as a one-time payment. Remaining 90% split 50/50 between Nate and Brayden on the first deal. From month 2 onward, monthly recurring split 50/50 between Nate and Brayden. Setter only paid on closed deals, no residual. Nate owned client relationship from close forward; Brayden owned all tech.

Worked example at target average deal (`$297` setup + `$1,200/mo`): first deal `$1,497` combined → setter `$149.70`, Nate `$673.65`, Brayden `$673.65`. Recurring month 2+: `$1,200` → Brayden `$600`, Nate `$600`.

### Sales Process (archived)

**Two-call close. Reps gathered pain only — never pitched.**

Rep Call (Call 1): rep's only goal was booking a 15-minute discovery call, question-based and pain-surfacing, no product explanation or pricing.

Closer Call (Call 2): Nate handled the pitch and close, reviewed pain gathered by the rep, got an AI briefing + stack recommendation, Stripe payment link (setup fee + monthly) auto-generated the moment a tier was recommended.

Rep Onboarding Flow: `Admin creates account → Rep logs in → 150 leads already loaded → Rep starts calling immediately`. Target: rep calling within 60 seconds of first login. Training required before leads unlock (flashcards at `/rep/training`).

Dialer: never finalized, never hardcoded — this open item carries forward, still relevant to the new AI-receptionist telephony build.

### Old Goals (archived, superseded)

**90-Day Target:** 10+ active reps booking consistently, 50+ appointments/week, 15+ clients on recurring plans, `$7,500`–`$12,000` MRR.
**Medium-term:** Proven rep onboarding playbook, second closer confirmed → unlock Profile B/C/D, expand to Phase 2 (`$5K`–`$15K` deals).
**Long-term:** Phase 3 oil and gas operators (`$25K+`), systematized rep onboarding/training.

### Old Anti-goals (archived)

Do not over-engineer tooling before the sales machine is running. Do not hire before outreach is proven at scale. Do not hardcode any dialer assumption. Do not onboard additional appointment setters until client fulfillment is proven end-to-end. `automation-stack-builder` was un-parked 2026-06-20 to build the per-automation fulfillment registry ahead of a real close.

### Old Active Infrastructure (archived)

Retell AI (outbound AI phone agents), Supabase, Vercel (`ohvara-dashboard.vercel.app` — now `app.ohvara.com`), Twilio (SMS reminders), Anthropic Claude API, Stripe (two payment links per close), Indeed MCP (primary lead scraping), Google Maps (fallback scraping), GitHub: BFreeOhvara, Dialer (TBD).

### Old Rules retired with the pivot

Rep dashboard exactly 150 leads/day per rep (no rep role anymore), never hardcode dialer assumption (carries forward conceptually to the new telephony build), generate two Stripe links on close (payment model needs redefining for insurance), AI scripts question-based/pain-surfacing never a pitch (may still apply to the AI receptionist's qualifying flow — worth re-confirming, not assumed), all reps and Nate on Profile A only (no Profile A concept anymore), setup fee always one-time separate from monthly (no setup fee in the new model as currently understood — unconfirmed).
