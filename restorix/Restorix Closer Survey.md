---
date: 2026-08-18
description: "Adaptive, branching qualification survey for Restorix closers — live-call tool that maps prospect answers to Stack components (front-runners/sub-agents) and captures the inputs needed to price the deal. Not a fixed script."
tags:
  - restorix
  - sales
  - closer-tools
aliases:
  - Closer Survey
  - Stack Qualification Survey
---

# Restorix Closer Survey — Adaptive Stack Qualification

> Built 2026-08-18 per Brayden's request: packages aren't fixed, so closers need a live tool, not a script. This is content to build the interactive version from — see [[Restorix LIVE_STATE]] Prompt 469 for the build task.

## Purpose

This isn't a 30-question form everyone gets. It's a tree: a handful of questions every prospect gets asked, and the answer to each one decides whether the next question is even relevant. The point is the same as Ohvara's own rep philosophy — question-based, pain-surfacing, never a pitch — applied to this niche. By the end, the closer (and the portal) knows which Stack components actually fit and has the raw inputs to price the deal.

## The Stack (recap, from [[Restorix North Star]] — restructured 2026-08-18)

**Front-runners — one or the other, decided by Q0 below, not both:**
- **Inbound Intake & Triage agent** — full live AI answering for every call/form/text, level-of-care and insurance pre-screening, books or routes to a human. **Always includes mandatory after-hours crisis-language detection + live-human bailout, non-optional, never priced separately.**
- **Missed-Call Recovery agent** — lighter safety net for a client keeping human staff as primary answerers; only activates on what humans actually miss.

**Sub-agents** (0-4, only the ones that fit):
- Insurance/payer verification — the deeper real-time eligibility/benefits check (distinct from the front-runner's own lighter conversational pre-screen).
- Follow-up & nurture sequence for non-same-day converts.
- Bed/program availability sync before booking.
- Appointment Reminder & No-Show Prevention — reminders leading up to a booked intake, re-engagement if unconfirmed.
- Referral-source reporting for business development.

*(After-hours crisis-language routing is no longer a separate optional sub-agent — folded into Intake & Triage as a mandatory core feature. Don't ask a qualifying question about it; it's just always included whenever that front-runner is sold.)*

## How to read this tree

**Q0 decides which front-runner path the rest of the survey follows — ask it first, always.** After that, each remaining section has a root question every prospect gets; answers branch — a "yes, this hurts" answer digs deeper and confirms/strengthens that sub-agent, a "no, we're fine" answer skips the follow-ups and moves on. Every deep-dive answer that captures a number is a pricing input, flagged as such.

---

### Q0 — Automation readiness (decides the front-runner, ask first)

**Q0 (root, always ask, before anything else):** "If we could have AI answer every single inquiry call live, 24/7, book-capable — is that something you'd want, or would you rather keep your own staff answering live and have AI catch what they miss?"
- **"We'd want AI answering live"** → **Inbound Intake & Triage** is the front-runner. Skip Section 1 entirely (nothing will be missed, so missed-call recovery doesn't apply) — go to Section 2.
- **"We'd rather keep our staff primary"** → **Missed-Call Recovery** is the front-runner. Continue to Section 1. Skip Section 2's after-hours-coverage questions about full AI answering (not relevant to this path) — still worth asking Q2.1 alone, since after-hours gaps are exactly what Missed-Call Recovery is meant to catch.

---

### Section 1 — Missed calls (→ Missed-Call Recovery agent path only, primary pricing input)

*Skip this whole section if Q0 came back "AI answering live" — there's nothing to recover.*

**Q1.1 (root):** "About how many admission inquiry calls does your front desk get in a typical week?"
→ *Pricing input: baseline call volume.*

**Q1.2 (root):** "Of those, roughly how many go unanswered — after hours, line's busy, weekends?"
- **"Hardly any, we catch almost everything"** → weak fit even for the recovery path, note it, move on.
- **"Some" / "A lot"** → continue:
  - **Q1.2a:** "What happens to those calls right now — does anyone call them back, and how fast?"
    - *"We're usually back to them within the hour"* → smaller gap, note as light-touch fit.
    - *"Sometimes next day, sometimes not at all"* → **strong signal**. *Pricing input: missed calls/week, response-time gap.*
  - **Q1.2b:** "Any sense of how many of those missed calls end up going to another facility instead?" *(they may not know — that's fine, still useful context for the pitch: cite the 9–21x speed-to-lead stat.)*

---

### Section 2 — After-hours coverage

*If Q0 = "AI answering live": this just confirms the after-hours gap Intake & Triage closes — crisis-routing is already included regardless of the answer here, don't gate it. If Q0 = "keep staff primary": this is a second missed-call-recovery signal, ask Q2.1 only.*

**Q2.1 (root, always ask):** "Is anyone answering calls after hours or weekends right now?"
- **"No, goes to voicemail"** → strong signal the client needs real after-hours coverage, whichever front-runner path they're on.
- **"Yes, on-call staff"** → continue:
  - **Q2.1a:** "How often does that on-call person actually get reached quickly?" — if slow/unreliable, still a real gap either path.

*(No separate crisis-language question needed here anymore — if they end up on the Intake & Triage path, that protection is already included by default, not something to qualify for or sell separately.)*

---

### Section 3 — Insurance verification (→ Insurance/payer verification sub-agent)

*Note the distinction when pitching: if the client is on the Intake & Triage path, they already get a quick conversational pre-screen ("what insurance do you have?") built in. This section qualifies for the deeper add-on — a real-time eligibility/benefits check with the actual payer, not just asking the question.*

**Q3.1 (root, always ask):** "When someone calls asking if you take their insurance, how does that get answered — on the spot, or do you have to check and call back?"
- **"On the spot, we have someone dedicated"** → deprioritize. Skip to Section 4.
- **"We usually have to check and call back"** → continue:
  - **Q3.1a:** "How long does that callback usually take?" *(minutes vs. hours vs. days — the longer the gap, the stronger the fit, since payer-status uncertainty is a known point where inquiries go cold.)*

---

### Section 4 — Lead follow-through (→ Follow-up & Nurture sub-agent)

**Q4.1 (root, always ask):** "For people who call but don't book same-day, what's the process for following up with them?"
- **"We have a real nurture process, we stay on it"** → deprioritize. Skip to Section 5.
- **"Not really, it kind of falls through the cracks"** → **strong signal**, continue:
  - **Q4.1a:** "Any rough sense of how many inquiries a month don't convert same-day?" *(pricing/volume input, and a good stat to pair with the "decision often isn't immediate" pitch note.)*

---

### Section 5 — Bed/program availability (→ Bed/program Availability Sync sub-agent)

**Q5.1 (root, always ask):** "When intake is checking whether there's an open bed or program slot, is that instant, or does someone have to check with clinical/ops first?"
- **"Instant, we already have that automated"** → deprioritize.
- **"Manual, has to check"** → continue:
  - **Q5.1a:** "How often does that delay end up losing the inquiry — they've already called somewhere else by the time you get back to them?"

---

### Section 6 — Appointment follow-through (→ Appointment Reminder & No-Show Prevention sub-agent)

**Q6.1 (root, always ask):** "Once someone's actually booked an intake appointment, what happens to make sure they show up — any reminders, confirmations?"
- **"Yes, we have a solid reminder process"** → deprioritize. Skip to Section 7.
- **"Not really, we just hope they show"** → **strong signal**, continue:
  - **Q6.1a:** "Any sense of your current no-show rate for booked intakes?" *(pricing/severity input — a real no-show number makes this an easy, concrete pitch: a booked appointment is only worth what actually walks through the door.)*

---

### Section 7 — Referral-source reporting (→ Referral-source reporting sub-agent)

**Q7.1 (root, always ask):** "Do you currently know which marketing channels or referral sources are actually turning into real admissions?"
- **"Yes, we track that well"** → deprioritize.
- **"No / not really, it's a guess"** → continue:
  - **Q7.1a:** "Is that something your ownership/BD side cares about, or is intake speed the bigger priority right now?" *(this sub-agent is more of a nice-to-have than a pain point for most prospects — use this to gauge whether it's worth including in the package or better left out to keep the deal focused and the price tighter.)*

---

## Output at the end of the tree

For every closer, the tool should surface: **which single front-runner Q0 selected** (Intake & Triage or Missed-Call Recovery — never both), **whether after-hours crisis-routing applies** (automatic/included if Intake & Triage was selected, not a separate line to qualify), which sub-agents scored as real fits (Sections 3, 4, 5, 6, 7 — "strong signal" branches only, don't include a sub-agent just because it was asked about, only if the prospect's own answer confirmed the pain), and every captured pricing input (missed calls/week, response-time gaps, no-show rate, monthly inquiry volume that goes cold, etc.).

## Open item — pricing formula not yet defined for Restorix

This survey captures the *inputs* (missed calls/week, response-time gaps, volume) but Restorix doesn't have a locked formula converting those into a dollar figure the way Ohvara does (`callsMissedPerWeek × 4.33 × avgTicket × 0.15`, floor $399/ceiling $1,999). Two things worth deciding before or alongside the build: (1) whether Restorix should mirror that same formula shape with its own multiplier/floor/ceiling tuned to average admission value in this niche, and (2) per tonight's separate Commissions conversation ([[Restorix LIVE_STATE]] Prompt 468), closers manually enter the actual setup fee + first month at close time regardless — so this survey's real job may end up being *qualification and talk track*, with the closer setting the final number by judgment rather than the tool computing it automatically. Worth Brayden's call before CC builds an auto-pricing engine that might not match how deals actually get priced in practice.

## Content for the results screen — what each item is / what it does for their business

Added 2026-08-18 per Brayden: closers need enough to actually explain the value on a live call, not just a component name. Real copy for both front-runners (only one shows per run, depending on Q0) and all 5 sub-agents — see [[Restorix LIVE_STATE]] Prompt 470 for how this renders (click-to-expand in place, no popup).

**Inbound Intake & Triage**
*What it is:* An AI agent that answers every call, form, and text the moment it comes in — 24/7, no wait, no voicemail. It talks to the caller like a real intake coordinator would: asks what's going on, does a quick level-of-care read and insurance pre-screen, and either books the consult directly or routes them to a live person. After-hours crisis-language detection is built in automatically — if the conversation shows real risk language, it immediately hands off to a live human or on-call clinician instead of continuing on autopilot.
*What it does for their business:* Most admission inquiries come in by phone, and centers that respond within 5 minutes convert 9 to 21 times more often than ones that take 30+ minutes to call back — most facilities are losing beds they already paid to fill just because someone couldn't pick up in time. This closes that gap completely: nothing goes to voicemail, nothing waits until morning, and the facility stops needing to staff around the clock just to catch every inquiry.

**Missed-Call Recovery**
*What it is:* A lighter safety net for a facility that wants to keep its own staff answering calls live, but doesn't want anything missed to just disappear. The moment a call goes unanswered — after hours, line's busy, a slow morning — it automatically fires off a text and a callback within minutes, no human has to remember to do it.
*What it does for their business:* Their staff stays the primary point of contact, nothing changes about how they operate day to day — but every call that used to just vanish into a missed-call log now gets a real shot at coming back. Given how much faster response speed drives conversion, this alone recovers admissions that were previously lost the moment the phone rang out.

**Insurance/payer verification**
*What it is:* A real-time eligibility and benefits check with the actual payer, not just asking "what insurance do you have" — coverage gets confirmed while the person's still engaged, instead of someone having to call back later.
*What it does for their business:* Payer-status uncertainty is one of the most common points an inquiry goes cold — someone calls, gets told "we'll check and call you back," and by the time anyone does, they've already called somewhere else. Verifying it live keeps the conversation moving instead of creating a gap for them to lose interest.

**Follow-up & nurture**
*What it is:* An automated sequence that keeps reaching out to anyone who called in but didn't book the same day — texts, emails, calls, spaced out over the following days.
*What it does for their business:* Decisions to enter treatment often aren't made on the first call, especially when it's a worried family member calling instead of the patient. Without a real process, those inquiries just fall through the cracks. This keeps every one of them warm until they actually book, without relying on staff remembering to circle back.

**Bed/program availability sync**
*What it is:* Keeps the AI's view of open beds and program slots in sync with what's actually available, so intake isn't promising something that isn't there or making someone wait while staff manually checks with clinical/ops.
*What it does for their business:* A delay here is a common reason an inquiry gets lost — by the time someone gets back to the caller with an answer, they've already called another facility. Instant, accurate availability keeps the booking moving in the same conversation instead of creating a hold-and-lose moment.

**Appointment Reminder & No-Show Prevention**
*What it is:* Automated reminders in the lead-up to a booked intake appointment, with re-engagement if the person doesn't confirm they're still coming.
*What it does for their business:* A booked appointment is only worth what actually walks through the door — no-shows are a well-known leak point in this industry, and most facilities don't have a real reminder process in place. This closes that gap without adding staff workload.

**Referral-source reporting**
*What it is:* Tracking that shows which marketing channels or referral sources are actually turning into real admissions, not just inquiries.
*What it does for their business:* Most facilities are guessing which channels are worth the spend. This gives ownership/BD a clear, accurate picture of what's actually working, so marketing dollars go toward what's proven instead of what feels like it's working.

## Related

- [[Restorix North Star]]
- [[Restorix LIVE_STATE]]
