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

## Delivery Model — Client Portal & Provisioning

> Decided 2026-08-27 (live conversation with Brayden). Until now, `restorix-portal` was purely the internal sales CRM — setters/closers/admin selling the Stack. This is the missing other half: what a client actually gets once they buy.

**The flow:** the Closer Survey (adaptive tree, see [[Restorix Closer Survey]]) qualifies a prospect into a recommended Stack — one front-runner + however many sub-agents fit. On the call, the closer can adjust that recommendation live (drop a sub-agent, swap the front-runner) before the prospect agrees. The moment the closer **confirms** the final, specific package, the system should auto-provision that client's own login and dashboard — no manual setup step, no separate "start onboarding" action.

**Where it lives:** a **new `client` role inside the existing `restorix-portal` app** — a 4th value alongside `setter`/`closer`/`admin`, not a separate application. Chosen over a standalone app because it reuses the auth/invite/RLS patterns already built rather than duplicating them.

**What "confirm" actually needs to capture (a real, current gap):** today, closing a lead just sets `closer_outcome = 'closed'` plus freeform `closer_notes` and two fee numbers (`deal_setup_fee`/`deal_first_month_fee`) — there's no structured record of *which* front-runner and *which* sub-agents were actually agreed to. That structured selection is the thing provisioning actually needs to build the right dashboard shell, so it has to be captured at confirm time, not reconstructed later from notes.

**MVP scope — a shared component catalog, not per-client custom builds.** Every agent Restorix can sell (every front-runner, every sub-agent) gets built exactly once, as a generic reusable module in a shared catalog — never rebuilt or forked per client. "Provisioning" a client means composing/activating the specific subset of already-built catalog modules that match what they actually bought — two clients with completely different Stacks get two different-looking dashboards, assembled from the same underlying catalog, not two separate implementations. "Incremental" refers to the catalog growing one agent type at a time (build the first front-runner for real, everything else stays an inactive placeholder entry until its turn) — not each client's dashboard being separately built out over time. The client's own side of it: they log in and connect whatever their active modules need (e.g. their phone number, for a voice agent) — "plug in what they need and it starts working."

**Voice-agent engine: not yet decided.** Retell AI is bookmarked in Brayden's browser but he confirmed it isn't a settled choice — treat the actual conversational-AI backend as its own open research question, separate from the dashboard/provisioning work, so the client-portal architecture doesn't get built assuming a specific vendor prematurely.

## Reference Site

**regenix.io** — starting point only, not the final look. Brayden originally wanted the marketing site's structure AND visual caliber to match closely (**corrected 2026-08-14, Prompt 427:** it's a light sage/mint theme, `#e5ecea` bg, near-black text, teal accent `#07775f`/`#2fd6b4`/`#055c49`, Space Grotesk + Manrope + JetBrains Mono, soft radial glow blobs, pill buttons — not the dark/neon theme originally assumed). **Updated 2026-08-16, Prompt 430:** Brayden then had it deliberately differentiated so it doesn't read as a copy — accent shifted to cornflower blue (`#3a63d6`/`#7c9eff`/`#24469e`), animation timing/easing reworked, and every section's layout/composition rebuilt (not just restyled) while keeping the same content. Regenix is now a structural/quality reference only, not a visual match target.

## Current Focus

See [[Restorix LIVE_STATE]] "Next Up for CC" for the live build queue.

## Related

- [[Restorix LIVE_STATE]] — current state + build queue
- [[Restorix Memories]] — session log
- [[ohvara_legacy_setter_pipeline_dead]] — Ohvara's dead pre-pivot setter pipeline. **Updated 2026-08-17:** this isn't just a shape-reference anymore — Ohvara's original pre-pivot product (general AI-automation agency) is what Restorix now *is*, in this niche. Its old lead-batch/pipeline logic is being ported and rebuilt live inside Restorix's own Supabase project (see [[Restorix LIVE_STATE]] Prompt 437), and its pre-pivot dashboard (via git history, not current live Ohvara) is the reference for portal features current Ohvara doesn't have anymore (Activity, Commission, etc. — current Ohvara is insurance-only and stripped down).
