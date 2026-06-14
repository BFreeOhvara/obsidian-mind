# Ohvara — Problem-First Packaging & Pricing Strategy (Draft)

*Working draft, captured from a brainstorm on 2026-06-14. This is a
starting framework, not a finalized model — open questions are flagged
throughout.*

## Core thesis

Right now the pitch is spread across too many angles. The proposal is to
narrow to a small set of core problems that AI can solve for small
trades/local businesses — "people are missing too many calls" being the
clearest example so far.

The key insight underneath this: **the underlying product is mostly the
same regardless of framing.** A "dispatcher" and a "receptionist" are, from
the AI agent's perspective, the same core capability with different
labeling depending on which role/problem the buyer relates to. The product
doesn't need to fragment — the *pitch* does, but the *build* doesn't.

**"Niche" = Indeed job-category.** A niche is defined by the cluster of job
titles a business posts when it has a given problem — e.g. Receptionist /
Dispatcher / Appointment Setter / CSR are all the *same* niche (same
underlying problem, different titles for it), not different niches.

## The three problems (working list)

**#1 — Missed inbound calls & scheduling (solid).** Job titles:
Receptionist, Dispatcher, Appointment Setter, Customer Service Rep / CSR.
The pain: the phone rings, nobody answers, the appointment doesn't get
booked. Voice agent answers calls. Currently the main focus — well
represented on Indeed across HVAC, plumbing, electrical, dental, and more.

**#2 — Outbound follow-up on leads/past customers (solid).** Job titles:
Telemarketer, SDR, Outbound Sales Rep, Lead Generation Specialist. The
pain: the business has a list of old quotes, leads, or past customers that
nobody is calling back — lead leakage. Same voice agent, but making calls
instead of taking them. Common Indeed category across home services,
insurance, real estate, solar.

**#3 — TBD.** Candidate: Insurance Verification Specialist (dental, chiro,
med spa, physical therapy — "we're on hold with insurance companies for
hours" pain). Real Indeed signal, but healthcare-leaning and narrower than
#1/#2. Alternative: leave this slot open and fill it once #1 and #2 have
traction and real conversion data (see Admin Board below) suggests what's
missing.

**On industry lingo:** each problem-niche naturally clusters into a related
set of industries — #1's dispatcher postings cluster around HVAC/plumbing/
electrical; #2's SDR/lead-gen postings cluster around home services/
insurance/real estate. A rep specializing in one niche ends up learning
lingo for a *bounded* industry cluster through repetition, rather than
needing to cover everything. This resolves the lingo question as a side
effect of the niche split — no separate training track needed for it.

## Lead lifecycle & recycling

Confirmed lifecycle: a lead keeps getting dialed/recycled until it reaches
a terminal outcome.

- **New** → dialed
- **No answer** → recycled for follow-up, repeats until answered
- **Answered** → either:
  - **Booked** → proceeds toward closed-won
  - **Said no** → closed-lost

This loop is what makes a high daily-dial number sustainable from a modest
lead pool — most dials are re-attempts within this loop, not first
contacts.

## Lead volume & feasibility

Spot-checked Indeed posting counts (2026-06-14 snapshot; narrow query
phrasings, so likely an undercount of the true universe of relevant
titles): "HVAC Receptionist" ~360 openings nationally, "HVAC Dispatcher"
~616, "Plumbing/HVAC Receptionist" ~559, "Plumbing Receptionist" ~259,
"Receptionist HVAC" in Dallas alone ~43. Order of magnitude: low-thousands
of active postings nationally across HVAC/plumbing/electrical
receptionist-dispatcher-type titles, likely more once broader title
variants (Office Manager, Service Coordinator, Front Desk, etc.) are
included.

**Why this is enough:** because of the recycling lifecycle above, a working
list doesn't need hundreds of fresh postings appearing every single day to
support several reps at high daily-dial volume — most dials are
follow-ups on an existing list. A pool in the low-thousands, refreshed
weekly as postings expire and new ones appear, comfortably feeds multiple
reps' working lists.

If precise current numbers matter for planning, a small script against the
actual target title/geography set (could extend the existing Scraper infra)
would give a live, ongoing count — flagged as a possible future build item,
not done yet.

## Phase 1 niche selection: DECIDED — dental & adjacent appointment-based healthcare

**Decision**: Problem #1 (missed inbound calls & scheduling), targeting
dental and adjacent appointment-based healthcare (chiro, med spa, PT, vet,
optometry — all post the same Receptionist/Scheduling Coordinator/Front
Desk cluster for the same pain), sourced via Indeed.

**Why**: dental-front-desk Indeed volume dwarfs HVAC by roughly 15-20x
("Dental Receptionist" ~6,698 openings nationally vs. "HVAC Receptionist"
~360), and widening to adjacent appointment-based healthcare extends that
pool further — directly addressing the "5-7 reps for a prolonged period"
concern. Indeed-sourcing self-filters toward practices that haven't adopted
an AI receptionist yet (they're still posting to hire a human), so the
crowded-competitor concern matters less here than it would for paid ads.
Dental postings frequently bundle insurance verification with scheduling —
naturally folding the Problem #3 candidate into this niche's stack rather
than needing it as a separate problem. Lingo holds together across these
adjacent specialties as one niche (patient/appointment/insurance/provider).

**Two concrete Phase 1 requirements this creates**:
- Training Center content (scripts, flashcards, quiz, AI Roleplay scenario)
  needs a rewrite from HVAC/Mike to dental/healthcare-adjacent.
- The highest-leverage opener identified: reference the business's own job
  posting directly ("I saw you're hiring for a [Front Desk Coordinator]...")
  plus a low-commitment ask (a free 15-minute call to see if AI could handle
  it instead of hiring) and 1-2 objection-handlers. For this to work, **My
  Leads needs to surface the specific job-posting title/snippet** that
  generated the lead — a data requirement for the Phase 1 recon to confirm
  (does the lead record carry this today, or does it need adding).

**Not yet verified, recommended before scaling to 5-7 hires**: a real
pool-size count for dental+adjacent-healthcare titles/geography — everything
so far is estimates stacked on estimates. Not blocking the dashboard recon,
but worth doing before committing to hiring against this.

## Pricing signal from Indeed postings

Leads are sourced from Indeed job postings. The framing: if a business is
actively posting for a role (receptionist, dispatcher, etc.), that's a
double signal —

1. **They have the problem** (they're trying to solve it by hiring a human
   for it).
2. **They've already told you what they're willing to pay** — the posted
   salary/wage is a real, business-stated number for the cost of solving
   that problem with a human.

That salary figure becomes the anchor for the pricing conversation: the AI
solution is framed relative to what they're already budgeting for a human
to do the job.

## Indeed vs. Maps/no-website leads: complementary, not competing

Indeed-sourced leads carry two signals Maps/no-website leads don't: the
business has told you it has the problem (posting to hire for it), and it's
told you what it's willing to pay (the posted wage). That should make them
close more easily — pitching a fix to a problem they're already trying to
solve — regardless of how crowded the AI-vendor *paid-ads* space is for
that niche, since a warm pitch to a known pain point isn't the same motion
as competing for ad placement.

Maps/no-website leads are the opposite profile: no explicit signal, a
colder pitch — but also likely the lowest competitive exposure of any lead
source discussed, since AI-vendor competitors mostly find prospects via
ads/SEO/content, channels a no-website business essentially doesn't appear
in.

These aren't really substitutes — Indeed gives priced/warm leads at a cost
that scales with the niche's visibility; Maps gives cold leads with minimal
competitive exposure regardless of niche.

## Modular delivery — the "stack"

The core agent stays the same, but each client gets a **custom stack** —
the specific set of integrations/features relevant to their business. The
stack is shaped by what the appointment-setter learns during discovery
(the qualifying questions on the initial call), so it reflects the actual
issue the business has, not a generic template.

## Pricing model

- **Setup fee**: keep the existing **$497 one-time** setup fee — unchanged.
- **Recurring**: move to a **custom monthly price per client**, not a fixed
  tier. Priced based on:
  - The Indeed-sourced salary signal (what they're already paying/willing
    to pay a human for this role).
  - The specific stack being delivered (more integrations/complexity →
    higher price).
- **Uncapped**: no fixed ceiling — pricing should scale with the client's
  willingness-to-pay rather than being capped by a tier structure.

## Rep specialization by problem

Instead of every rep being able to pitch every angle, each rep owns **one
problem-niche** and becomes the specialist for it:

- Deeper pattern recognition — they hear the same objections repeatedly and
  get sharper at handling them.
- No context-switching between pitches mid-day.
- Easier onboarding/training per rep, since training content can be scoped
  to one problem instead of the full breadth.
- Industry lingo is naturally bounded per niche (see above) — no extra
  training burden.

This has a direct tie-in to the rep dashboard's Training Center — if this
model goes forward, training content (scripts, flashcards, quiz questions,
AI Roleplay scenarios) would eventually need to be organized **per
problem-niche**, not just generically.

## Growth model: Indeed as bootstrap capital → reinvestment

Indeed-sourced revenue in Phase 1 is treated as **temporary, bootstrap
capital** — 100% reinvested into Phase 2 (inbound/paid ads, or an
agency-partnership motion) rather than kept as ongoing lead-gen
indefinitely.

**Open structural question**: does Phase 2 reinvestment target the *same*
niche the Indeed revenue came from, or a *different* one? If that niche's
paid-ads landscape turns out to be crowded (as the dental case suggests it
could be for a high-volume niche), there's an argument for decoupling — use
a high-volume niche as a pure cash engine via Indeed, but direct the
durable paid-ads investment toward a less-crowded niche. Not resolved yet.

### Phase 2 candidates (gated, not current)

Both ideas below are explicitly gated on Phase 2 being viable (paid ads
working, or a partnership motion in place) — not pursued now, but worth
capturing:

- **Marketing agencies** (likely as a channel/reseller, not end-user):
  partner with agencies that already manage many small-business clients —
  one relationship gives access to a whole client roster, white-labeled or
  bundled as an add-on to the agency's existing services. A distribution
  multiplier rather than one-business-at-a-time.
- **Oil & gas / oilfield services** (Texas-relevant): oilfield service
  companies (well servicing, equipment hauling, drilling support) are
  dispatch-heavy — same Problem #1 shape — but higher contract value and a
  more enterprise-y sales motion than a small HVAC shop.

## Build roadmap (4 phases)

One platform (`ohvara-dashboard`), four roles via login: appointment
setter, closer, admin, client. Closer and admin roles reportedly already
exist (different logins) but aren't yet fully built out — confirming this
is part of the pending Phase 1 recon. `ohvara-client-portal` is intended to
eventually be absorbed into `ohvara-dashboard` as the "client" role rather
than living separately — not yet scoped, Phase 3/4 territory.

- **Phase 1** (current/active): appointment-setter dashboard, fully
  functional. Recon prompt ready/pending.
- **Phase 2**: closer dashboard + appointment-setter↔closer integration
  (booking handoff — what happens to a booked appointment, who picks it up).
- **Phase 3**: admin dashboard + integration across all three roles —
  includes the niche-performance admin board concept above, and the
  client-portal merge.
- **Phase 4**: onboard real appointment setters (5-7 hires) against the
  decided niche (dental & adjacent healthcare).

## Admin board: niche performance tracking (future item)

An admin-only view (different login, same platform — an admin role already
exists in `ohvara-dashboard`, not yet examined by CC) that shows, **per
niche**:

- What share of total leads belong to this niche.
- What % of this niche's leads currently sit in each lifecycle stage
  (new/recycling, answered-pending, booked, closed-won, closed-lost).
- How those percentages trend over time.

This is the data source that would tell you which niche(s) actually convert
best — directly informs where to put more reps, and validates (or
invalidates) the #3 problem choice empirically instead of by guesswork.

Not yet scoped as a build — CC hasn't looked at the existing admin view or
the lead-data schema yet.

## Open questions / things to nail down

- **Phase 2 reinvestment target**: same niche as Phase 1's Indeed revenue,
  or a different (less-crowded) one for the paid-ads/agency push?
- **Problem #3 (insurance verification)**: now largely folded into Phase 1's
  niche as a stack component (see decision above) rather than a separate
  problem to choose — revisit only if #1/#2 traction + admin-board data
  suggests a genuinely separate #3 is still needed.
- **Admin board build**: needs CC recon on the existing admin view + lead
  data schema before it can be scoped.
- **AI Roleplay randomization** (separate idea, parked): "roll" a random
  persona/scenario per practice call instead of the fixed Mike/HVAC
  scenario. Related to the per-niche training content idea above, but needs
  its own scoping (persona pool design, grading-rubric generalization)
  before it's CC-ready.
- **Indeed → lead → price pipeline**: is the salary-signal lookup manual per
  lead, or could Scraper-style infra help automate it?
- **Stack → price translation**: pricing framework/rubric for reps to quote
  confidently in real time, or case-by-case with manager sign-off?
- **Rep specialization rollout**: how does this affect current rep
  assignments / dashboard (profile, lead filtering by niche)?
- **Training content restructuring**: per-problem-niche organization for
  Training Center content (scripts/flashcards/quiz/roleplay) — future build
  item, not urgent yet.
