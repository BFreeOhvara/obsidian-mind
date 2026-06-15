# Ohvara — Problem-First Packaging & Pricing Strategy

*Living doc. Last major revision: 2026-06-15 — final 7-setter niche lineup
locked (vet + 6 trades), HIPAA/medical re-examined from ~6 angles
(conclusion unchanged: excluded), future candidate niches recorded (legal,
real estate), warm-not-cold training framing added, vet TAM sized, and the
INDEED_MCP_TOKEN given a measurable definition of done. Builds on the
2026-06-14 session-2 revision (dental → vet, multi-niche model, partial
comp structure, Phase 1 build requirements).*

## Core thesis

The underlying product is mostly the same regardless of framing — a voice
agent that answers/books calls. What changes per niche is positioning, not
the build. "Niche" = an Indeed job-category cluster (e.g., Receptionist /
Client Care Coordinator / CSR — all the same underlying problem).

## Problem focus

**Problem #1 — missed inbound calls & scheduling** is the current and only
active focus ("receptionist/AI-answering stacks"). Problems #2 (outbound
follow-up) and a healthcare-adjacent #3 candidate remain documented
possibilities for future expansion but are not active.

## Niche model: DECIDED — multi-niche, one per setter

Each appointment setter specializes in **one niche** (for lead-pool
allocation and lingo-depth), but all setters sell the **same problem**
(#1). This is the "doctor" framing: Nate (closer) diagnoses and prescribes
the fix regardless of which "patient" (niche) it came from — his side of
the pipeline is uniform.

**Two-axis model**:
- **Niche** = setter axis. Per-setter, for lead-pool allocation. Not a
  training/content axis (see Training below).
- **Problem-type** = closer axis. Currently just #1, uniform for Nate.
  Nate's capacity isn't capped by niche — adding niches for new setters
  doesn't add closer-side complexity, as long as problem-type stays #1.

**First validated niche: veterinary** (receptionist/client-care-coordinator
cluster). Reasoning below.

### FINAL niche lineup — LOCKED (7 setters, 2026-06-15)

**vet** (setter #1) + **HVAC, electrical, roofing, landscaping, pressure
washing, tow truck** (setters #2-7). All seven pass the two checks vet set:
viable Indeed volume + HIPAA-clean (non-healthcare).

**Tow truck — verified, NOT dropped.** 523 national "Tow Truck Dispatcher"
postings + 292 remote, and the job content is genuinely customer-facing:
"receive and respond to incoming calls from drivers in need of towing
services… dispatch… promptly." Arguably the *purest* "answer every call"
example found. "Immediate dispatch" vs. "scheduled appointment" is a
framing nuance for training content, not a fit problem.

**Considered and dropped / excluded (record so they aren't re-suggested):**
- **Oilfield services** — considered (530 national "Oil Field Dispatcher"
  postings, decent raw volume) but **DROPPED**: job content is internal
  fleet/crew dispatch (GPS routing, rig-up/rig-down scheduling, 12hr
  shifts), not customer-facing scheduling — doesn't match the Problem #1
  pitch despite the volume.
- **Plumbing, auto repair, salon, restaurant** — excluded: Maps-only in
  the current seed data (12 each), not Indeed-exclusive.
- **Pest control, pool service** — excluded: 0 unassigned (fully assigned
  already).

### Why vet (and why not dental/healthcare)

Two findings drove this, both from 2026-06-14 session 2:

**HIPAA is real and binary at the infrastructure level.** Every dental
AI-receptionist competitor (Arini, Dentina, etc.) markets a signed Business
Associate Agreement as "non-negotiable" / "table stakes" — introducing an
AI receptionist into a healthcare practice's phone workflow makes the
vendor a HIPAA business associate. This isn't a per-client cost that scales
down with fewer healthcare clients — on shared infrastructure, BAA
compliance is effectively all-or-nothing for the whole stack (Retell,
Supabase, every sub-processor). Decision: avoid healthcare niches entirely,
not just minimize them.

**The single-closer constraint reinforces this.** With one closer (Nate)
handling all deals, a healthcare niche would mean *every* close involves a
BAA/compliance conversation — exactly the "different sales process"
complexity the model is designed to avoid. Non-healthcare niches keep
Nate's side uniform regardless of how many niches setters cover.

**Vet passed both checks vet was checked against:**
- Volume: "Veterinary Client Care Coordinator" ~1,826 nationally, "Front
  Desk & Veterinary Receptionist" ~2,018 nationally — roughly half of
  dental's pool (~6,700) but 5-8x HVAC's (~360). Texas alone: ~774 openings
  for vet receptionist roles. Same job-title cluster pattern as dental
  (Receptionist / Client Care Coordinator / CSR).
- HIPAA: animal health records are not PHI under HIPAA — vet clinics are
  not covered entities. Zero exposure, for Ohvara's infrastructure and for
  Nate's sales conversations.
- Minor honest tradeoff vs. dental: pet insurance is less universal than
  human health insurance, so the "insurance verification bundled into the
  stack" bonus that dental had is weaker for vet (lighter, not absent).

**One-month volume check (vet)**: pool ~2,000-3,500 nationally, ~30-day
posting lifespan implies ~70-120 new postings/day → ~2,100-3,600/month —
comparable to the entire current snapshot pool. Combined with the
already-implemented recycling lifecycle (below), a month's runway is
comfortable even if the pool estimate is off by 30-40%.

### HIPAA / medical — re-examined from ~6 angles, conclusion UNCHANGED (excluded)

This resurfaced repeatedly in the 2026-06-15 session. Reasoning recorded
clearly so it does not get re-litigated without *genuinely new*
information:

- **Why "Receptionist" keeps surfacing healthcare:** 84% of all US
  receptionist jobs are healthcare — offices of physicians 32.4%,
  hospitals 31.3%, outpatient care centers 20.2% (BLS / DataUSA). The
  category is structurally dominated by healthcare, which is *why* it kept
  appearing in searches — not a signal that healthcare is the right niche.
- **"Scoped AI (booking only) + live-transfer for medical questions"
  does NOT avoid PHI.** Identity + appointment-time + provider-name **is**
  PHI under HIPAA's definition, regardless of clinical content. Holds even
  for "name / phone / time-slot only, zero clinical detail."
- **Market-structure check fails too.** "HIPAA-fear keeps competitors away,
  market is open" does **not** hold — dental AI-receptionist competitors
  (Arini, Dentina) already operate with BAA-included as standard /
  table-stakes. HIPAA likely filters out the *weaker* competitors, leaving
  better-resourced ones — the opposite of open space for a small entrant.
- **"Medical broadly, not just dental" changes nothing.** Same binary
  infrastructure cost regardless of which / how-many healthcare niches are
  served, and healthcare AI is one of the hottest VC categories — likely
  *more* competition, not less.

Net: the binary infra-level BAA cost (established session 2) plus all four
checks above keep healthcare **excluded entirely**, not minimized.

## Future candidate niches (not in the current 7; strong if more slots open)

- **Legal / law-firm intake & receptionist** — the biggest non-vet,
  non-healthcare find this session: ~345-408 in Texas alone for "Legal /
  Law Firm Receptionist"; "Entry Level Legal Assistant" showing 466 in
  Houston alone. Excellent fit — "intake" is literally call-capture,
  personal-injury / family-law cases are high-value, and repeated
  bilingual-staffing asks suggest real understaffing pain. **Not** a HIPAA
  covered entity — no BAA / infrastructure issue, only a lighter "sensitive
  personal info" consideration (divorce / injury details). Flagged as the
  strongest candidate for a *second* branded product later (see Vet TAM).
- **Real estate / leasing-office receptionist** — ~324 in TX, ~231-417
  nationally depending on phrasing. Solid, but some postings skew toward
  larger property-management / leasing-office operations (more corporate)
  vs. small brokerages.

## Lead lifecycle & recycling — CONFIRMED IMPLEMENTED (not conceptual)

Phase 1 recon (2026-06-14) confirmed this is real, not aspirational:
`leads.status` tracks New → No Answer → Follow-Up → Appointment Booked →
Not Interested, backed by `no_answer_queue`/follow-up queue tables and
hourly/daily crons (migrations 019-026). My Leads passed an e2e test using
this flow.

**New Phase 1 requirement — niche-aware no-answer routing**: under the
multi-niche model, a No-Answer lead currently gets redistributed (hourly)
to *whoever's* in rotation — but a vet lead redistributed to a setter who
covers trades/legal-receptionist loses the original caller's
niche-accumulated context. Fix: niche-specific leads on No-Answer should
route back to the original caller (or another same-niche setter), not the
general redistribution pool. Implementation detail (strict
"original-caller-only" vs. "any same-niche setter") TBD at build time —
either way, the routing needs to become niche-aware, not pure round-robin.

## Training: universal, not per-niche

Clarified 2026-06-14 session 2: all setters learn the **same** product
training (pitch, missed-calls problem, objection handling, working an
Indeed lead) regardless of niche. Niche-specific knowledge a setter picks
up is organic/incidental — not something Ohvara builds curriculum for. This
**simplifies** Phase 1's Training Center scope back to **one rewrite**, not
N parallel niche-specific tracks.

**Implication for AI Roleplay**: the current scenario (Mike, HVAC owner,
Dallas) is industry-specific, which doesn't match "same skills, different
niche." A generic small-business-owner persona (not tied to one industry)
fits better than a like-for-like HVAC→vet swap.

**"Warm, not cold" — concrete confidence-building fact for setter training
(NEW 2026-06-15).** Ties into the Training Center rewrite item. Indeed
leads are **not** cold calls: the business already self-identified the
missed-call / understaffing problem by posting the job. This belongs in
setter training as a *factual* confidence builder ("they told you they have
this problem"), not just motivational framing.

## Pre-call brief (Nate) — NEW SPEC

When a setter's discovery call results in a booked appointment, the AI
should generate, before Nate's call:

- **Three-tier stack recommendation**: "perfect fit" / a scaled-down
  alternative / (third tier per original framing — likely an upsell tier).
  Each tier carries built-in *reasoning* — why this component is included,
  how it compounds with the core system (e.g., "we added X because it works
  with the AI system and saves/earns more") — functioning as pre-loaded
  objection handlers Nate can use verbatim.
- **Recommended price**: the AI's "maximum doable" setup-fee figure, with
  reasons justifying it (for holding firm) and separately, reasons it could
  go *higher* (for upselling).
- **Built from**: the setter's discovery-call findings (the questions
  asked, pain points surfaced) — and, once call recording exists (below),
  actual transcripts rather than manual outcome-log notes.

**Possible implementation home**: `appointments.closer_notes` (confirmed to
exist in schema by Phase 1 recon) — needs confirming whether this is
intended for Nate's own notes, or repurposable/extendable for an
AI-generated brief.

## Call recording — promoted from blocked to active

Phase 1 recon had flagged this as deprioritized/Twilio-gated ("no
click-to-call or call capture... blocks the 'record + AI-grade real calls'
idea"). Now active, for two reasons:

1. **QA/coaching**: extend Phoenix's grading (currently roleplay-only) to
   real calls — for setters (Phase 1) and Nate (Phase 2).
2. **Pre-call brief input**: real transcripts give the AI richer material
   for the stack/price recommendation than manual outcome-log notes.

**Practical considerations**: dialer/recording platforms (Twilio-type)
typically charge per-seat, so cost scales with headcount (5-7 setters +
Nate). Indeed-sourced leads span all-party-consent states (CA, FL, etc.) —
standard fix is an automated "this call may be recorded" disclosure at call
start, baked into the dialer config.

**Scope**: spans Phase 1 (setter-side recording + brief input) and Phase 2
(Nate's calls for QA).

## Compensation structure

**Setup fee** (one-time): AI-recommended "maximum doable" price; Nate can
negotiate higher.

**Original split** (as designed): setters get **20% of the setup fee**
only (one-time, tied to what they sourced). Monthly recurring split between
Brayden (ongoing profit/admin) and Nate (retention commission for managing
the client relationship month-over-month). Setters get nothing from
recurring — they never interact with the client again post-booking.

**Nate's counter-proposal** (relayed 2026-06-14, status: PENDING — not
decided): setters get **10% of "the whole deal"** = setup fee + monthly
payment. **Unresolved ambiguity**, needs a follow-up conversation with
Nate:
- Is the 10%-of-monthly component a **one-time calculation** (e.g., 10% of
  one month's recurring, paid once at close alongside the setup-fee cut —
  same payout *schedule* as the original model, different *formula*)? Or
  **ongoing/residual** (10% of recurring every month, for as long as the
  client stays)?
- If ongoing: does it survive a setter leaving the company? (Real long-term
  liability question if yes.)
- Whether 10% (setup+monthly-based) nets higher or lower than 20%
  (setup-only) depends entirely on the setup-to-recurring ratio for a
  typical deal — unknown without real figures.

**Do not build comp logic against this until resolved.**

## Stack expansion / SEO upsell (future, post-onboarding)

Once a client is in the portal — "part of their business runs through us"
— the AI-agent-team can build/offer *additional* agents (e.g., an SEO
agent, if discovery reveals a weak Google presence) as expansion revenue.
This is separate from the initial setter/closer pipeline — an
account-management/agent-team motion, not something setters pitch during
outreach. Feeds the "uncapped stack" pricing idea: the stack grows
additively over the client relationship.

## Vet TAM — for a future paid-ads / branded play ("Ohvara for Veterinary Clinics")

The à-la-Arini-for-dental branded product. **~28,000-32,000 total US vet
practices; ~15,000-22,500 independent / addressable** (corporate chains —
Banfield ~800 locations, VCA ~600 — likely run centralized systems, not a
per-clinic ad target). Smaller than dental's TAM (~200,000+) but big enough:
even low-single-digit-% capture = hundreds of clients = real recurring
revenue.

**Legal is the strongest candidate for a *second* branded product** (see
Future candidate niches) — to be spun up once a legal-niche setter generates
real conversation data the same way vet's setter #1 is expected to inform
"Ohvara for Veterinary Clinics" positioning / landing-page copy. Branded
products follow the setter data, not the other way around.

## Build roadmap (4 phases)

One platform (`ohvara-dashboard`), four roles via login: appointment
setter, closer, admin, client. Phase 1 recon confirmed closer (7 routes:
deals/revenue/reps/scraper/call-leads/pipeline) and admin roles already
exist/partially scaffolded. `ohvara-client-portal` merge into the "client"
role remains Phase 3/4.

- **Phase 1** (active): appointment-setter dashboard, fully functional.
  Recon complete (My Leads/Commissions/Activity all real and working).
  Remaining Phase 1 scope, as of this revision:
  - Add `posting_title`/`posting_snippet` (+`source_url`) to `leads`,
    populate from Indeed scraper, surface in My Leads (for the "I saw
    you're hiring for X" opener — confirmed gap).
  - Training Center rewrite — ONE universal rewrite (not per-niche),
    including a generic (non-industry-specific) AI Roleplay persona.
  - Niche-aware no-answer routing (see Lead lifecycle above).
  - Call recording (setter-side) + pre-call brief generation.
- **Phase 2**: closer dashboard + setter↔closer integration — delivering
  the pre-call brief to Nate, call recording for Nate's calls (QA).
- **Phase 3**: admin dashboard + integration across all three roles —
  niche-performance admin board (below), client-portal merge.
- **Phase 4**: hire 7 appointment setters, each assigned one niche — vet
  first, then HVAC, electrical, roofing, landscaping, pressure washing,
  tow truck (lineup LOCKED 2026-06-15, see Final niche lineup above).

## Admin board: niche performance tracking (future item)

Per-niche conversion-by-stage tracking (new/recycling, answered-pending,
booked, closed-won, closed-lost), trended over time. Now more directly
useful under the multi-niche model — this is how additional niches (for
setters #2-7) get validated/prioritized with real data rather than
estimates. Not yet scoped — Phase 3.

## Lead supply: INDEED_MCP_TOKEN — concrete definition of done

Still the **top infrastructure priority** (from the prior sync) — this gives
it a measurable target. **Definition of done: ~2 months of Indeed postings
per niche, ongoing — for all 7 niches** — not just "more leads eventually."
The current 12-14/niche seed batches are *starter* batches only: at 150
dials/day with recycling, that's days-to-low-weeks of runway, not 2 months.
Unblocking this token is what closes that gap across the whole lineup.

## Open questions / things to nail down

- **Comp structure** (see above): PENDING Nate clarification on the 10%
  proposal — one-time vs. ongoing, departure handling.
- **`closer_notes` field**: confirm whether repurposable for the AI-generated
  pre-call brief, or whether a new field/table is needed.
- ~~**Additional niches for setters #2-7**~~: RESOLVED 2026-06-15 — lineup
  LOCKED to vet + HVAC, electrical, roofing, landscaping, pressure washing,
  tow truck. Oilfield dropped (internal dispatch, not customer-facing).
  Legal + real estate parked as future candidates / branded-play seeds.
- **No-answer routing**: strict original-caller vs. any-same-niche-setter —
  decide at build time.
- **Real pool-size query** (vet, and any additional niches): still a
  "nice to have before scaling hiring," not blocking.
- **Rep specialization rollout / niche assignment**: leads already have a
  `niche` field (per Phase 1 recon) but no per-rep niche assignment or
  filtering yet — needed for the multi-niche model.
