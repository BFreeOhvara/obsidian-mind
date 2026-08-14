---
date: 2026-08-14
description: "Single current-state doc for all Restorix sessions — overwritten on update, never appended. Restorix's own vertical, independent of Ohvara's brain/LIVE_STATE.md."
tags:
  - restorix
  - live-state
---

# Restorix LIVE_STATE

> **This is the ONE file any Restorix session reads to become fully operational.** It is a CURRENT-STATE document — overwritten on every update, not appended to. [[Restorix Memories]] is the historical append-only log; this file is "what is true right now." Mirrors the shape of Ohvara's [[LIVE_STATE]] but is fully independent — a Restorix session never needs to read Ohvara's state, and vice versa.

## Next Up for CC

> CC reads this section FIRST. Execute top to bottom, log each completion to [[Restorix Memories]], delete each item once done.

### Prompt 427 — Restorix marketing site (Regenix-style, futuristic — not default AI-generated look)

Brand: **Restorix** — AI infrastructure for behavioral health treatment centers (addiction, dual-diagnosis, eating disorder, psychiatric/mental health). Reference site: **regenix.io** — Brayden wants the page structure AND the visual execution/caliber to match it closely (not the wording — this is a different niche with different content), explicitly **not** a generic/default AI-page-builder look. Actually load regenix.io yourself and study its real visual design (dark theme, gradient accents, big bold type, scroll-triggered section reveals, custom iconography/glow effects) before building — don't guess at "futuristic" from the word alone.

**Page structure, mirroring Regenix's exact section flow:**
1. Hero — "More booked patients, none of the manual work" equivalent, but for treatment centers: something like "More admissions booked. None of the manual intake work." CTA: "Book a Strategy Call."
2. **The Leak** — same 4-stage framing Regenix uses (missed call → slow follow-up → cold lead → buried front desk), rewritten for behavioral health, backed by REAL researched stats (already sourced this session, use these, don't fabricate placeholders):
   - 60–75% of admission inquiries arrive by phone
   - Leads contacted within 5 minutes convert 9–21x more often than leads contacted after 30 minutes
   - The average treatment facility converts under 20% of inbound calls to admissions
   - Click-to-call converts at 18.5% vs. 2.8% for form fills
3. **The System** (branded as "RestorixCORE" or similar) — 5 capabilities, adapted from Regenix's 5: lead capture & qualification, missed-call recovery (text-back within seconds), a voice agent that can triage by level of care/insurance, structured intake written straight to the facility's system, and follow-up/nurture sequences appropriate for a crisis-sensitive population (not pushy — this population needs a different tone than "shop for a clinic," handle with care in the copy).
4. **Process** — same 4-step shape: Consult (audit their real intake funnel) → Architect (blueprint, they approve before anything ships) → Install (build + supervised launch) → Optimize (weekly conversation QA + conversion tuning).
5. **Who it's for** — 5 segments, already scoped this session: substance use detox & residential rehab, IOP/PHP outpatient programs, dual-diagnosis/co-occurring disorder centers, eating disorder treatment centers, psychiatric & specialty mental health (incl. ketamine/TMS).
6. **Outcomes** — real aggregate-style stat callouts (format like Regenix's, content will be genuine/TBD once there are real clients — use honest placeholder framing like "early client results" rather than inventing fake numbers for a brand-new company).
7. Testimonials — placeholder/empty state until there are real clients, don't fabricate quotes.
8. Final CTA — "Book a Strategy Call."

New, fully separate project — new repo, new Vercel project, own domain once picked. Doesn't need Supabase/a real backend for an MVP marketing site; the "Book a Strategy Call" CTA can go to a simple form or an external scheduler link for now — flag to Brayden if he wants a real booking backend built instead.

Verify with screenshots of every section, and confirm it does NOT look like a default component-library site — that's the one hard requirement Brayden called out explicitly.

---

### Prompt 428 — Restorix setter portal (MVP)

MVP dialer/prospecting portal for setters cold-calling behavioral health facility owners/admissions directors to book Strategy Calls (the same CTA the marketing site drives to). This is conceptually similar to Ohvara's own old rep/setter pipeline (lead → call → book appointment → hand to closer) — that's a fine reference for the shape of the workflow, but this is a **brand-new build in Restorix's own new project**, not a revival of Ohvara's dead `leads`/`appointments` tables (see [[ohvara_legacy_setter_pipeline_dead]] memory — don't touch that code, it's unrelated and stays dead).

MVP scope: a queue/list of target facilities (name, contact, phone, notes — manually entered or CSV-imported for v1, no scraper needed yet), a call-logging action (outcome: booked / no answer / not interested / callback later), and a booking step that captures a Strategy Call date/time once someone says yes. Keep this genuinely minimal — the goal is setters can start dialing and booking, not a full CRM. Ask Brayden directly if anything here is ambiguous when you get to it rather than over-building.

Verify with screenshots of the queue, a logged call, and a booked Strategy Call.

---

*(Seeded 2026-08-14 during the Prompt 426 vault split — moved verbatim from [[LIVE_STATE|Ohvara's LIVE_STATE.md]] where they originally lived, no wording changed.)*

## CURRENT STATE

*(Nothing shipped yet — Restorix is a fresh vertical as of 2026-08-14. This section fills in as Prompts 427/428 ship.)*

## Related

- [[Restorix North Star]]
- [[Restorix Memories]]
