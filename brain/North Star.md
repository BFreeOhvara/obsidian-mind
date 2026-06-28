---
date: 2026-06-07
description: "Ohvara two-vertical SMB automation business — who we are, what phase we're in, what success looks like"
tags:
  - brain
  - north-star
aliases:
  - Goals
  - Focus
---

# North Star

> Read this file first, every session. It grounds every decision.

## Who We Are

**Ohvara** — a two-vertical SMB automation business.

- **Brayden** — operations, builds, strategy
- **Nate** — sales, closing
- **Jahandad** — rep recruitment

**Status: Pre-revenue. Phase 1 is the only focus.**

---

## The Two Businesses

### Vertical 1 — AI Receptionist / Dispatcher

Sell AI phone agents to small businesses as a recurring monthly subscription.
Replace the receptionist or dispatcher they're actively trying to hire.

> **Core insight:** Indeed leads are warm leads. They are already problem-aware and actively trying to solve it by hiring. We are a faster, cheaper solution to the exact problem they just posted about.

**Target niches (locked lineup, 2026-06-17):** Veterinary, HVAC, Electrical, Roofing, Landscaping, Pressure Washing. 7th slot open (plumbing leading, pest control alternative — unconfirmed). Concrete, Hotshot Trucking, Towing, Oilfield Services, and Transportation were all considered and dropped (see [[LIVE_STATE]] Open Thread #2a + niche distill). Veterinary replaced dental as the HIPAA-safe medical-adjacent niche — all other healthcare/medical niches remain excluded entirely.
**Geographic market:** Anywhere in the US
**Lead source:** Businesses hiring receptionists/dispatchers on Indeed and Google Maps

### Vertical 2 — Web Agency

Single-file HTML/CSS/JS websites for small businesses.
Lead source: Google Maps businesses with no website, fewer than 50 reviews.
Bundled into the Elite package or standalone.

---

## Stack Pricing (SUPERSEDED 2026-06-25 — standard stack, not custom-generated; see correction below)

**No fixed packages.** Every client gets a custom-named automation stack and a custom price, generated from their specific discovery answers — not picked off a menu.

- **Setup fee: `$297` flat, one-time** (was `$497` — lowered with the pivot to formula pricing).
- **Monthly: formula-priced, value-based.** `callsMissedPerWeek × 4.33 × avgTicket × 0.15` = estimated monthly value lost to missed calls; that becomes the price. Floor `$399/mo`, ceiling `$1,999/mo`.
- **🔒 Monthly always ends in 99** — $399, $599, $899, $1,299, $1,999, etc. Setup fee is $297 flat and does NOT follow this convention — it stays $297 forever.
- **Target average deal: ~`$1,200/mo`.**
- ~~**Automations are AI-generated per lead as a tiered stack** (Prompt 10, 2026-06-20)...~~ **Superseded — see correction directly below.**

### ⚠️ CORRECTION 2026-06-25 (Brayden, via Eagle) — same stack for everyone, not custom-generated

Brayden decided **not** to do a custom AI-generated stack per lead. Instead: **everyone gets the same standard stack**, sold as the appeal layered on top of the actual headline product — the AI receptionist (since current lead source is Indeed businesses actively hiring a receptionist). The stack is a **checklist of what we've actually built**, not invented per call.

- **Same stack, every client.** No more "AI invents whatever the lead's situation calls for" — that's gone.
- **Still structured as main agent(s) + sub-agents — just fixed now, not AI-generated.** Brayden confirmed (2026-06-25) the front-runner/sub-agent structure itself stays (he and Falcon had already discussed this): **1-2 main/front-runner agents** (the headline — currently AI Receptionist, given Indeed receptionist-hiring lead source) **+ a fixed set of sub-agents** that complement it. The only thing that changed is the sub-agents are no longer invented per lead — they're the same fixed list for every client.
  - **CORRECTION (2026-06-25, Brayden) — Missed Call Text Back is OUT, replaced with Appointment Cancellation handling.** Reasoning: voice AI (Retell) handles concurrent calls, unlike a human receptionist — once AI Receptionist is live for a client, there's no real "missed call" gap left for Missed Call Text Back to cover; redundant for this lead source.
  - **🔒 LOCKED 2026-06-25 (Brayden) — final sub-agent list: Review Generation, Lead Follow-Up, Appointment Reminders, Appointment Cancellation, SMS Marketing.** Brayden confirmed he likes this stack and confirmed everyone gets it. `automation-stack-builder.md` updated to reflect this (Missed Call Text Back still needs removing from that doc's text — flag for next pass).
  - **Appointment Cancellation — locked behavior (2026-06-25):** on cancellation, re-engage the canceller first to try to rebook them. If that fails, text the next several upcoming-appointment customers: "An earlier appointment slot just opened up — first come, first served, reply YES to grab it." First to reply YES locks the slot. Everyone else who replies after it's taken gets an immediate auto-reply ("spot's taken") so nobody wastes time waiting on a dead offer.
  - **Lead Follow-Up — "quiet lead" threshold not yet formally defined**, Brayden's working read: ~24–48hrs non-response after last contact for a standard quote/follow-up; shorter (same-day/few hours) if it's a missed-call scenario; longer (2-3 days) for a bigger-ticket quote decision. Not locked, just a working default — confirm before building.
- **Website + chatbot are part of the standard stack by default — not an exclusion, an inclusion that scales down.** CORRECTION (2026-06-25, Brayden): website/chatbot aren't "the one thing they might already have that gets excluded" — they're a default-included stack item with exactly two checkbox questions in discovery: (1) Do they have a website? (2) Does that website have an AI chatbot? Logic:
  - No website + no chatbot → both get added (full web piece + chatbot).
  - Website but no chatbot → chatbot gets added, website is excluded (they already have it).
  - Website + chatbot already → both excluded — this is the ONLY case where nothing web-related gets added.
  - There's no "no website but has chatbot" case.
  - This is the only exclusion check in the whole stack — every other stack item (main + sub-agents) is assumed not-already-owned and just gets sold as-is. Exact discount math for the exclusion cases still not defined — flag to Brayden when building pricing logic.
- **Pricing formula itself is UNCHANGED** for now (`callsMissedPerWeek × 4.33 × avgTicket × 0.15`, floor/ceiling as above) — only the stack COMPOSITION logic changed, not the price formula. Confirm with Brayden if/when the exclusion discount needs to be formalized into the formula.
- **Found candidate for "the stack":** `strategy/automation-stack-builder.md` (2026-06-20) lists the automation catalog already built/planned: AI Receptionist, AI Dispatcher, Missed Call Text Back, Review Generation, Lead Follow-Up, Appointment Reminders, SMS Marketing, plus Website (Vertical 2). This is likely what Brayden means by "the stack" — confirm with him directly before treating it as final, since that doc predates this correction and was written for the now-superseded custom-per-lead model, not the standard-stack-for-everyone model.

### ROI Anchor (use in every close)

Always anchor to the cost of a human hire, not to competitors or fixed tiers — typically `$2,800`–`$6,000+/mo` depending on scope (receptionist alone vs. full front-office automation).

---

## Current Team Structure

### Closer

- **Nate** — only confirmed closer, handles all Profile A appointments
- **Jordan** — on standby, added when confirmed

### Profile Assignment

**All reps and Nate work Profile A only until second closer is confirmed.**

Profile A — Trades & Field Services:
- HVAC, Electrical, Roofing, Landscaping, Pressure Washing (+ 7th slot TBD)
- Tone: direct, no-nonsense, peer-to-peer
- Key pain: missing calls while on job sites, losing jobs to competitors who answer
- Opening question: "How many calls do you think you're missing while your guys are out on jobs?"

> **Veterinary** is the niche correction for the former medical/dental slot (HIPAA-safe). It doesn't fit the Profile A trades framing above — runs the same universal question-based discovery script, just without the job-site framing. As of the 2026-06-16 distill, the script is niche-agnostic across all 6+ niches anyway (leads pooled, not siloed per setter), so Profile A's tone description is closer's-context flavor, not a hard script branch.

### Rep Commission

- Recruited via Facebook groups (posts + DMs) via Jahandad
- 3–5 reps working Profile A simultaneously

---

## Commission Structure (FINAL — updated 2026-06-19, formula applied 2026-06-20)

**Setter gets 10% of the whole deal (setup fee + first month's recurring, combined) as a one-time payment.** The remaining 90% of that combined first-deal amount splits 50/50 between Nate and Brayden. From month 2 onward (no more setter cut), the monthly recurring splits 50/50 between Nate and Brayden, forever.

- Setter only paid on **closed deals** — not just bookings, and only once (no residual)
- Nate owns client relationship from close forward — handles all client questions and issues
- Brayden owns all tech
- **Percentages are fixed; the dollar amount is whatever the deal actually closed at** (custom formula price, or Nate's override price if he set one) — there's no fixed-package lookup table anymore. Apply 10% / 45% / 45% to the real `setup + month-1` total, and 50% / 50% to the real monthly from month 2 on.

### Worked Example — at the target average deal (`$297` setup + `$1,200/mo`)

| | Combined Setup+M1 | Setter (10%, one-time) | Nate (45%) | Brayden (45%) |
|---|---|---|---|---|
| First deal | `$1,497` | `$149.70` | `$673.65` | `$673.65` |

| | Monthly (month 2+) | Brayden (50%) | Nate (50%) |
|---|---|---|---|
| Recurring | `$1,200` | `$600` | `$600` |

A deal that closes higher or lower than the `$1,200` target scales proportionally — same percentages, different base number.

### At Scale — 20 clients @ `$1,200/mo` average (steady state, month 2+)

- Brayden MRR: `$12,000/mo`
- Nate MRR: `$12,000/mo` + 45% of setup+M1 on new closes
- Setter at 3 closes/week (~12/mo @ target average): ~`$1,796/mo`

---

## Sales Process

**Two-call close. Reps gather pain only — they never pitch.**

### Rep Call (Call 1)

- Rep's only goal: book a 15-minute discovery call. Nothing else.
- Script is question-based and pain-surfacing — never a pitch
- Rep does NOT explain the product or mention pricing
- Rep asks pain discovery questions, surfaces the cost of the problem, books the call

### Closer Call (Call 2)

- Nate handles the pitch and close
- Reviews the pain gathered by the rep
- Gets AI briefing + stack recommendation for the business
- Stripe payment link (setup fee + monthly) auto-generated the moment a tier is recommended — send immediately

### Rep Onboarding Flow

```
Admin creates account → Rep logs in → 150 leads already loaded → Rep starts calling immediately
```

Target: rep is calling within 60 seconds of first login.

- Training is optional — available anytime, not required before calling

### Dialer

TBD — do not hardcode any dialer assumption anywhere in the codebase.

---

## Current Focus

**Phase 1 — Get the outreach machine running at full capacity.**

> **#1 priority: the dashboard must be able to onboard a rep in 60 seconds.**

- [ ] Ohvara dashboard fully functional (all 3 roles)
- [ ] Rep onboarding: account → login → 150 leads → calling in 60 seconds
- [ ] Indeed scraper pulling 150+ leads/day
- [ ] Google Maps scraper as fallback
- [ ] Reps working 150 leads/day each
- [ ] Target: 3–5 appointments per rep per day
- [ ] Target: 30%+ close rate

## Goals

### 90-Day Target

- `10+` active reps booking consistently
- `50+` appointments/week
- `15+` clients on recurring plans
- `$7,500`–`$12,000` MRR

### Medium-term (This Half)

- Proven rep onboarding playbook
- Second closer confirmed → unlock Profile B/C/D
- Expand to Phase 2: larger AI automation deals (`$5K`–`$15K`)

### Long-term (This Year+)

- Phase 3: Oil and gas operators (`$25K+`)
- Systematized rep onboarding and training

## Anti-goals

- Do not over-engineer tooling before the sales machine is running
- Do not hire before outreach is proven at scale
- Do not hardcode any dialer assumption
- **Do not onboard additional appointment setters until client fulfillment is proven end-to-end (2026-06-20, Brayden).** Today `build-agent` only provisions one generic voice agent on close — it doesn't build the actual sold stack (front-runners + sub-agents). Scaling lead volume/setters before this works means selling deals we can't actually deliver. Gate: at least one close → real client → every sold automation actually provisioned (or a manual fallback Brayden is comfortable running at small scale) before adding setter headcount beyond the current bench.
- **UPDATE (2026-06-20, Brayden) — automation-stack-builder is UN-PARKED, building ahead of a real close.** Original plan was to wait for a real client to test against; Brayden's call: build the per-automation fulfillment registry now, so the moment a deal closes, fulfillment is just "fill in the info" rather than a fresh manual build. Reasoning: this IS the business — if AI can build the sold stack and the only manual step left is collecting each agent's required info from the client, that's the product. The setter-headcount gate above still holds (don't scale setters until fulfillment is proven), but the build itself no longer waits on a real close to start. See [[automation-stack-builder]] — status updated to building.

---

## Active Infrastructure

| Tool | Purpose |
|------|---------|
| Retell AI | AI phone agents |
| Supabase | Database + auth (`jjextitmbptoaolacocs.supabase.co`) |
| Vercel | Dashboard (`ohvara-dashboard.vercel.app`) |
| Twilio | SMS reminders |
| Anthropic Claude API | AI briefings, rep scripts, stack recommendations |
| Stripe | Two payment links per close (setup fee + monthly subscription) |
| Indeed MCP | Lead scraping (primary) |
| Google Maps | Lead scraping (fallback) |
| GitHub: BFreeOhvara | All repos |
| Dialer | TBD |

---

## Rules Claude Always Follows

1. Read [[Memories]] before every session
2. Read [[DESIGN]] before touching any UI
3. Append to [[Memories]] after every session
4. Never ask Brayden to run commands manually
5. Never hardcode colors — use design tokens
6. Never duplicate leads in the database
7. Rep dashboard: exactly 150 leads/day per rep, ready on first login
8. All monetary values in mono font
9. When blocked, state blocker + two options
10. Log every mistake — mistakes written down don't repeat
11. Never hardcode any dialer assumption
12. Generate TWO Stripe links on close (setup fee + monthly) — never deferred
13. AI scripts are question-based and pain-surfacing — never a pitch
14. All reps and Nate on Profile A only until second closer confirmed
15. Setup fee (`$297`) always presented as one-time, separate from monthly
16. **Never drive Claude in Chrome / browser actions directly from a Cowork (Eagle/Falcon) session.** Brayden runs his own Claude Chrome session with everything already logged in. Any task needing a browser (Supabase SQL editor, GitHub, live site verification, etc.) gets written up as a self-contained prompt file artifact in the Ohvara folder and handed to Brayden to paste into Claude Chrome himself — never attempted directly via the `Claude_in_Chrome` MCP tools from Eagle/Falcon.

---

## Shifts Log

| Date | Shift | Reason |
|------|-------|--------|
| 2026-06-07 | Initialized North Star | Ohvara vault setup |
| 2026-06-07 | Full business context upgrade | Added sales process detail, warm lead insight, rep onboarding flow, commission, dialer TBD, geo market, Stripe auto-link rule, training optional |
| 2026-06-07 | Packages, team structure, niche profiles locked | Finalized 4 packages with setup fee, confirmed Nate as sole closer, Profile A only, ROI anchors |
| 2026-06-19 | Hard refresh: niche lineup + commission structure corrected | Niche list updated to the real locked 6 (vet, HVAC, electrical, roofing, landscaping, pressure washing, 7th TBD) — was listing 4 dropped niches and missing vet entirely. Commission changed: setter now 10% of (setup+month-1 combined) one-time, Nate/Brayden split the rest 45/45 on the first deal and 50/50 on month-2+ recurring (was 50% of setup only, 0% recurring). |
| 2026-06-22 | New standing rule #16: Cowork sessions never drive Claude in Chrome directly | Brayden's Claude Chrome already has everything logged in and he prefers to run it himself. Eagle/Falcon now write a self-contained prompt artifact (saved to the Ohvara folder) for any browser-dependent task instead of attempting it via the `Claude_in_Chrome` MCP tools. |
