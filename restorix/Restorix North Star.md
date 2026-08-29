---
date: 2026-08-14
description: "Restorix — AI infrastructure for behavioral health treatment centers. Living goals document, read at the start of every Restorix session."
tags:
  - restorix
  - north-star
aliases:
  - Restorix Goals
  - Restorix Focus
---

# Restorix North Star

> Read this file first, every Restorix session. It grounds every decision. This is a completely separate business from Ohvara ([[North Star]]) — same operator (Brayden), same Atlas vault for shared memory tooling, otherwise unconnected.

## Who We Are

**Restorix** (working name, may change) — AI infrastructure for behavioral health treatment centers: substance use detox & residential rehab, IOP/PHP outpatient programs, dual-diagnosis/co-occurring disorder centers, eating disorder treatment centers, and psychiatric/specialty mental health (incl. ketamine/TMS).

- **Brayden** — operations, builds, strategy (same as Ohvara)

## The Pitch

Treatment centers lose admissions to slow/missed intake response. Restorix installs AI infrastructure that captures, triages, and books admission inquiries so front-desk/intake staff aren't the bottleneck.

**Researched stats (sourced 2026-08, use these — don't fabricate placeholders):**
- 60–75% of admission inquiries arrive by phone
- Leads contacted within 5 minutes convert 9–21x more often than leads contacted after 30 minutes
- The average treatment facility converts under 20% of inbound calls to admissions
- Click-to-call converts at 18.5% vs. 2.8% for form fills

**Tone note:** this population is crisis-sensitive — copy should never read as "shop for a clinic." Handle with care throughout, distinct from Ohvara's direct-response sales tone.

## The Stack

The actual AI infrastructure Restorix installs per client — same model Ohvara originally used (1-2 front-runner agents that solve the core problem + supporting sub-agents), not a fixed package. Confirmed with Brayden 2026-08-17. **Restructured 2026-08-18** after Brayden caught a real redundancy (full-answering Intake agent + a "missed-call" recovery agent for a business that isn't missing calls anymore) — audited the rest of the stack for the same failure mode at the same time.

**Front-runners — one or the other, not both, decided by the client's automation readiness (a survey question in [[Restorix Closer Survey]], not a default):**
- **Inbound Intake & Triage agent** — for a client ready to let AI answer every call/form/text live. Does level-of-care and insurance pre-screening, books or routes to a human. **Always includes mandatory after-hours crisis-language detection and live-human bailout as a core, non-optional safety feature** — never sold or priced as a separate add-on a client could decline, this niche can't afford that gap.
- **Missed-Call Recovery agent** — for a client not ready to hand off live answering (keeps human staff primary). A lighter safety net: only activates on what humans actually miss, auto text/call-back within minutes. Redundant *alongside* Intake & Triage for the same client (nothing to recover if nothing's missed) — pitch whichever one fits, not both.

**Sub-agents:**
- **Insurance/payer verification** — the deeper, real-time eligibility/benefits check with the payer. Distinct from the front-runner's own lighter conversational pre-screen ("what insurance do you have?") — that distinction matters, don't conflate the two when pitching.
- Follow-up & nurture sequence for leads that don't convert same-day (common in this niche — decision often isn't immediate).
- Bed/program availability sync before booking an intake appointment.
- **Appointment Reminder & No-Show Prevention** (added 2026-08-18, a real gap Brayden's redundancy question surfaced) — automated reminders in the lead-up to a booked intake, re-engagement if the person doesn't confirm. A booked appointment only has value if they show up; nothing in the stack covered that leak point before this.
- Referral-source reporting for the facility's business development side.

~~After-hours crisis-language routing as a standalone sub-agent~~ — folded into Intake & Triage as a mandatory core feature (see above), no longer its own line item.

## Niche Branding — Restorix Sustain & the Bail Bonds Brand

> Decided 2026-08-28 (live conversation with Brayden). Confirmed the name itself was always behavioral-health-coded — the "Who We Are" section above still literally called "Restorix" a working name that may change, and the whole pitch (restoration, crisis-sensitive tone) only makes sense for a treatment center. That doesn't map onto bail bonds at all — different buyer, different urgency, different emotional register.

**Structure: a house of brands, not one name stretched across both niches.** The underlying engine — the tech, the CRM, the closer/setter team, the actual infrastructure — stays one shared thing. What needs to be genuinely separate is the market-facing identity per niche: brand name, marketing site/domain, and the sales script/pitch (setters and closers need to represent themselves under the right name on a call — Prompt 539's cold-call script was written specifically for behavioral health facilities and won't work for a bail bondsman).

**Behavioral health brand — locked in: "Restorix Sustain."**

**Bail bonds brand — locked in: "Suretix."** Decided 2026-08-29. Naming pass ruled out a long list of collisions first (SwiftBond/InstantBond/Sentry-anything/Vouch/Beacon Bail/Anchor Bail/Ironclad/BondLine/Bondix/Assura/Certis/Suredge/Suretly/SurePulse/SureFlow/SureLink/SureGrid/SureNode/SureRelease all already belong to real bail bondsmen, insurance brands, or funded tech companies) before landing on Suretix — coined, rooted in "surety bond" (the actual legal/regulatory category bail bonds sits inside, per state Departments of Insurance licensing bail agents as surety agents), matches Restorix's own invented-word brand DNA, fully independent with no visible "Restorix" root (per Brayden's own call — Restorix itself doesn't conceptually fit bail bonds, and the swap-button logo change needs to read as a genuinely different company). No live business, trademark, or software product found under this exact name. **Domain resolved: `suretix.co`.** `suretix.com` was already parked/for sale by a domainer, so Brayden is going the alternate-TLD route instead — `suretix.co` is in his GoDaddy cart as of 2026-08-29 (not yet checked out).

**Umbrella framing, mirroring "behavioral health" for Restorix Sustain**: Suretix's conceptual scope is "surety bonds," not narrowly "bail bonds" — bail bonds is one licensed category of surety bond among several (court bonds, contractor/license bonds, immigration bonds, notary/fidelity bonds), all sold by the same kind of small agency living on fast response to urgent inbound calls. Launch messaging/sales targets bail bonds specifically (the real first customer), but the brand itself isn't boxed in if Brayden ever wants to sell the same infra into adjacent surety-bond agencies later.

**Settled 2026-08-29 — architecture: one shared codebase/deployment, branding driven by which domain it's loaded from** (not two separately-built/deployed copies). Confirmed via a real check of `restorix-portal`'s current code: no brand-config concept exists yet at all — logo is one hardcoded static file, "Restorix" is baked directly into `Layout.jsx`. Going with a single Vercel deployment that reads `window.location.hostname` at runtime and swaps logo/name/colors accordingly, rather than maintaining two builds that can drift apart. This is purely a backend-plumbing choice — it does not affect setter crossover at all (setters are still locked to one niche's login/domain by their account/role, same as always) or which domains exist (both niches still get their own real domain either way).

**Settled 2026-08-28 — real separate domains, not a same-portal toggle.** Brayden confirmed both niches need a genuinely independent, look-up-able domain regardless (a bail-bonds prospect needs to be able to find and recognize the company on its own), and wants that same distinctness inside the portal itself — the closer's "Swap" should visibly change the logo/branding, not just filter data under one shared shell. So each niche gets its own full deployment: its own marketing site *and* its own portal domain (e.g. `portal.restorix.co` stays behavioral health / Restorix Sustain; bail bonds gets its own domain end to end once it's named).

**Who gets the Swap button, and how it behaves:**
- **Setters get a dedicated, single-niche portal** — no Swap button at all. A behavioral-health setter only ever has an account on the Restorix Sustain domain; a bail-bonds setter (if/when that's staffed) only ever has one on the bail-bonds domain. Matches Brayden's own framing: setters "just sit on either" one.
- **Closers get the Swap button** (between the existing Report Bug and phone buttons) — they work both niches (My Leads' niche tabs, Prompt 547), so they need to move between the two branded portals. Messages and account Settings are meant to read as identical either side (same person, same login); operational views (leads/pipeline/stats) scope to whichever niche's portal they're currently on. **Settled 2026-08-29: My Pipeline scopes per-niche on swap**, overriding Prompt 547's original "stays one combined list" answer — a closer on the Suretix portal sees only bail-bonds leads in My Pipeline, swap back and it's only behavioral-health leads. Matches the whole point of the swap being a genuinely different portal.
- **Session hand-off: confirmed to build a real seamless SSO, not a re-login.** Since the two portals are genuinely separate domains, a browser won't carry a login session across them on its own — confirmed with Brayden this needs real engineering (a short-lived hand-off token minted on Swap, consumed by the other domain to establish a session automatically) rather than making a closer re-enter their password every time they swap.

**Real technical consequence worth flagging when this gets built**: the setter New-pool refill logic (`_do_setter_day_end`, Prompt 547) is currently hard-scoped to `niche = 'behavioral_health'` — a deliberate call Eagle made when bail-bonds inventory first became real, on the assumption setters only ever worked behavioral health. If bail-bonds setters ever get staffed on their own dedicated portal (per the model above), that function needs to become niche-aware per-setter rather than hardcoded — not urgent while no bail-bonds setters exist, but a real landmine to remember before hiring one.

**Naming and domain are both resolved (Suretix / suretix.co, pending checkout) — and Brayden correctly flagged the checkout itself isn't a build dependency.** The portal/marketing-site/Swap-button work below can start now; DNS just needs to point at the real domain once it's live, same as any project. Ready to queue for real.

## Delivery Model — Client Portal & Provisioning

> Decided 2026-08-27 (live conversation with Brayden). Until now, `restorix-portal` was purely the internal sales CRM — setters/closers/admin selling the Stack. This is the missing other half: what a client actually gets once they buy.

**The flow:** the Closer Survey (adaptive tree, see [[Restorix Closer Survey]]) qualifies a prospect into a recommended Stack — one front-runner + however many sub-agents fit. On the call, the closer can adjust that recommendation live (drop a sub-agent, swap the front-runner) before the prospect agrees. The moment the closer **confirms** the final, specific package, the system should auto-provision that client's own login and dashboard — no manual setup step, no separate "start onboarding" action.

**Where it lives:** a **new `client` role inside the existing `restorix-portal` app** — a 4th value alongside `setter`/`closer`/`admin`, not a separate application. Chosen over a standalone app because it reuses the auth/invite/RLS patterns already built rather than duplicating them.

**What "confirm" actually needs to capture (a real, current gap):** today, closing a lead just sets `closer_outcome = 'closed'` plus freeform `closer_notes` and two fee numbers (`deal_setup_fee`/`deal_first_month_fee`) — there's no structured record of *which* front-runner and *which* sub-agents were actually agreed to. That structured selection is the thing provisioning actually needs to build the right dashboard shell, so it has to be captured at confirm time, not reconstructed later from notes.

**MVP scope — a shared component catalog, not per-client custom builds.** Every agent Restorix can sell (every front-runner, every sub-agent) gets built exactly once, as a generic reusable module in a shared catalog — never rebuilt or forked per client. "Provisioning" a client means composing/activating the specific subset of already-built catalog modules that match what they actually bought — two clients with completely different Stacks get two different-looking dashboards, assembled from the same underlying catalog, not two separate implementations. "Incremental" refers to the catalog growing one agent type at a time (build the first front-runner for real, everything else stays an inactive placeholder entry until its turn) — not each client's dashboard being separately built out over time. The client's own side of it: they log in and connect whatever their active modules need (e.g. their phone number, for a voice agent) — "plug in what they need and it starts working."

**Voice-agent engine: not yet decided.** Retell AI is bookmarked in Brayden's browser but he confirmed it isn't a settled choice — treat the actual conversational-AI backend as its own open research question, separate from the dashboard/provisioning work, so the client-portal architecture doesn't get built assuming a specific vendor prematurely.

**Settled 2026-08-27, after [[Prompt 545 — Client Portal Scoping Doc]]'s open questions:** account creation is an invite link (reusing the existing setter/closer invite system, client sets their own username+password) delivered by SMS now and email once a provider is chosen (same open gap Prompt 533 already flagged); one deal per client account for MVP, no multi-deal design needed yet; provisioning fires the instant a closer confirms the deal, no admin review step; client messaging is out of v1; and a client sees an honest "Coming soon" card for anything they bought that isn't built in the catalog yet, rather than it being hidden.

## Reference Site

**regenix.io** — starting point only, not the final look. Brayden originally wanted the marketing site's structure AND visual caliber to match closely (**corrected 2026-08-14, Prompt 427:** it's a light sage/mint theme, `#e5ecea` bg, near-black text, teal accent `#07775f`/`#2fd6b4`/`#055c49`, Space Grotesk + Manrope + JetBrains Mono, soft radial glow blobs, pill buttons — not the dark/neon theme originally assumed). **Updated 2026-08-16, Prompt 430:** Brayden then had it deliberately differentiated so it doesn't read as a copy — accent shifted to cornflower blue (`#3a63d6`/`#7c9eff`/`#24469e`), animation timing/easing reworked, and every section's layout/composition rebuilt (not just restyled) while keeping the same content. Regenix is now a structural/quality reference only, not a visual match target.

## Current Focus

See [[Restorix LIVE_STATE]] "Next Up for CC" for the live build queue.

## Related

- [[Restorix LIVE_STATE]] — current state + build queue
- [[Restorix Memories]] — session log
- [[ohvara_legacy_setter_pipeline_dead]] — Ohvara's dead pre-pivot setter pipeline. **Updated 2026-08-17:** this isn't just a shape-reference anymore — Ohvara's original pre-pivot product (general AI-automation agency) is what Restorix now *is*, in this niche. Its old lead-batch/pipeline logic is being ported and rebuilt live inside Restorix's own Supabase project (see [[Restorix LIVE_STATE]] Prompt 437), and its pre-pivot dashboard (via git history, not current live Ohvara) is the reference for portal features current Ohvara doesn't have anymore (Activity, Commission, etc. — current Ohvara is insurance-only and stripped down).
