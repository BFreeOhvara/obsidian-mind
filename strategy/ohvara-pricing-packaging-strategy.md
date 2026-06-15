# Ohvara — Problem-First Packaging & Pricing Strategy

*Living doc. Last major revision: 2026-06-14, session 2 — niche decision
revised (dental → vet) following HIPAA/single-closer findings, plus
multi-niche model, comp structure (partial), and several Phase 1 build
requirements identified.*

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
cluster). Reasoning below. Additional niches for setters #2-7 are open —
each candidate niche needs the same two checks vet passed: (a) viable
Indeed volume (low-thousands+ nationally is the rough bar vet cleared), and
(b) HIPAA-clean (see below). Candidates not yet checked: trades/HVAC
(original default, known-clean, lower volume), legal-office receptionist,
real estate, auto repair, salons.

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
- **Phase 4**: hire 5-7 appointment setters, each assigned one niche (vet
  first; additional niches TBD per the volume/HIPAA bar above).

## Admin board: niche performance tracking (future item)

Per-niche conversion-by-stage tracking (new/recycling, answered-pending,
booked, closed-won, closed-lost), trended over time. Now more directly
useful under the multi-niche model — this is how additional niches (for
setters #2-7) get validated/prioritized with real data rather than
estimates. Not yet scoped — Phase 3.

## Open questions / things to nail down

- **Comp structure** (see above): PENDING Nate clarification on the 10%
  proposal — one-time vs. ongoing, departure handling.
- **`closer_notes` field**: confirm whether repurposable for the AI-generated
  pre-call brief, or whether a new field/table is needed.
- **Additional niches for setters #2-7**: which ones, checked against the
  vet bar (volume + HIPAA-clean). Candidates: trades/HVAC, legal-office
  receptionist, real estate, auto repair, salons.
- **No-answer routing**: strict original-caller vs. any-same-niche-setter —
  decide at build time.
- **Real pool-size query** (vet, and any additional niches): still a
  "nice to have before scaling hiring," not blocking.
- **Rep specialization rollout / niche assignment**: leads already have a
  `niche` field (per Phase 1 recon) but no per-rep niche assignment or
  filtering yet — needed for the multi-niche model.
