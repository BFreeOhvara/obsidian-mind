---
date: 2026-08-29
description: "Adaptive, branching qualification survey for Suretix closers — mirrors [[Restorix Closer Survey]]'s structure exactly, rebuilt for surety/bail bond agencies rather than a find-and-replace. Live-call tool that maps prospect answers to Stack components and captures pricing inputs. Not a fixed script."
tags:
  - restorix
  - suretix
  - sales
  - closer-tools
aliases:
  - Closer Survey (Suretix)
  - Suretix Stack Qualification Survey
---

# Suretix Closer Survey — Adaptive Stack Qualification

> Built 2026-08-29 per Brayden's request — same tool, same philosophy as [[Restorix Closer Survey]], rebuilt for surety bond agencies (bail bonds is the live vertical; Suretix's scope is surety bonds broadly, per [[Restorix North Star]]'s branding section). Confirmed with Brayden directly rather than a blind find-and-replace — one sub-agent (court-date/check-in compliance) is a genuine rebuild, not a reskin, since bond forfeiture is a materially different risk than a behavioral-health no-show.

## Purpose

Same as Restorix's: not a fixed 30-question form, a tree. A handful of questions every prospect gets, and each answer decides whether the next question is relevant. Question-based, pain-surfacing, never a pitch. By the end, the closer (and the portal) knows which Stack components fit and has the raw inputs to price the deal.

## The Stack

**Front-runners — one or the other, decided by Q0, not both:**
- **Inbound Intake & Dispatch agent** — full live AI answering for every call, 24/7, screens charge/bond amount/jurisdiction/collateral, books/dispatches an agent directly or routes to a human. **Mandatory built-in, never priced separately**: careful handling of a scared or distressed caller (a family member calling about someone who was just arrested is a genuinely high-emotion call) with a live-human bailout — same reasoning as Restorix's mandatory crisis-language detection, different trigger.
- **Missed-Call Recovery agent** — lighter safety net for an agency keeping human staff as primary answerers; only activates on what humans actually miss.

**Sub-agents** (0–4, only the ones that fit):
- **Collateral & co-signer verification** — real-time verification of collateral documentation and co-signer/indemnitor eligibility, distinct from the front-runner's own lighter conversational pre-screen.
- **Follow-up & nurture** sequence for callers who didn't commit to a bondsman same-call.
- **Jail & jurisdiction coverage sync** — keeps the AI's view of which jails/counties the agency actually covers in sync with reality.
- **Court-date & check-in compliance** — genuinely rebuilt, not adapted. Restorix's equivalent is appointment-reminder/no-show prevention; for bail, a client skipping court isn't a missed appointment, it's a forfeited bond — the agency's single biggest financial risk. Reminders plus required check-in tracking while someone's out on bond, flags skip risk early.
- **Referral-source reporting** — which channels (attorneys, past clients, search) actually convert to bonds written.

## How to read this tree

Same as Restorix's: Q0 decides the front-runner path, ask it first, always. Every other section has a root question every prospect gets; a "yes, this hurts" answer digs deeper and confirms the sub-agent, a "no, we're fine" answer skips ahead. Every deep-dive answer that captures a number is a pricing input, flagged as such.

---

### Q0 — Automation readiness (decides the front-runner, ask first)

**Q0 (root, always ask, before anything else):** "If we could have AI answer every single bail inquiry call live, 24/7, dispatch-capable — is that something you'd want, or would you rather keep your own staff answering live and have AI catch what they miss?"
- **"We'd want AI answering live"** → **Inbound Intake & Dispatch** is the front-runner. Skip Section 1 entirely — go to Section 2.
- **"We'd rather keep our staff primary"** → **Missed-Call Recovery** is the front-runner. Continue to Section 1. Still ask Q2.1 alone in Section 2 — after-hours gaps are exactly what Missed-Call Recovery is meant to catch.

---

### Section 1 — Missed calls (→ Missed-Call Recovery agent path only, primary pricing input)

*Skip this whole section if Q0 came back "AI answering live."*

**Q1.1 (root):** "About how many bail inquiry calls does your agency get in a typical week?"
→ *Pricing input: baseline call volume.*

**Q1.2 (root):** "Of those, roughly how many go unanswered — after hours, line's busy, weekends?"
- **"Hardly any, we catch almost everything"** → weak fit even for the recovery path, note it, move on.
- **"Some" / "A lot"** → continue:
  - **Q1.2a:** "What happens to those calls right now — does anyone call them back, and how fast?"
    - *"We're usually back to them within the hour"* → smaller gap, light-touch fit.
    - *"Sometimes next day, sometimes not at all"* → **strong signal**. *Pricing input: missed calls/week, response-time gap.*
  - **Q1.2b:** "Any sense of how many of those missed calls end up going to another bondsman instead?" *(they may not know — still useful context for the pitch: cite the 9–21x speed-to-lead stat.)*

---

### Section 2 — After-hours coverage

*If Q0 = "AI answering live": confirms the after-hours gap Intake & Dispatch closes — high-emotion-caller handling is already included regardless, don't gate it. If Q0 = "keep staff primary": second missed-call-recovery signal, ask Q2.1 only.*

**Q2.1 (root, always ask):** "Is anyone answering calls after hours or weekends right now?"
- **"No, goes to voicemail"** → strong signal, whichever front-runner path.
- **"Yes, on-call staff"** → continue:
  - **Q2.1a:** "How often does that on-call person actually get reached quickly?" — slow/unreliable is still a real gap either path.

---

### Section 3 — Collateral & co-signer verification

*Note when pitching: on the Intake & Dispatch path, they already get a quick conversational pre-screen built in. This section qualifies for the deeper add-on — real-time verification, not just asking the question.*

**Q3.1 (root, always ask):** "When someone calls asking what collateral or co-signer they'll need to post bond, how does that get answered — on the spot, or do you have to check and call back?"
- **"On the spot, we have someone dedicated"** → deprioritize. Skip to Section 4.
- **"We usually have to check and call back"** → continue:
  - **Q3.1a:** "How long does that callback usually take?" *(minutes vs. hours vs. days — the longer the gap, the stronger the fit.)*

---

### Section 4 — Lead follow-through (→ Follow-up & Nurture sub-agent)

**Q4.1 (root, always ask):** "For people who call but don't commit to a bondsman same-call, what's the process for following up with them?"
- **"We have a real follow-up process, we stay on it"** → deprioritize. Skip to Section 5.
- **"Not really, it kind of falls through the cracks"** → **strong signal**, continue:
  - **Q4.1a:** "Any rough sense of how many inquiries a week don't convert same-call?" *(pricing/volume input — families comparing bondsmen or waiting on more information isn't a same-call decision every time.)*

---

### Section 5 — Jail & jurisdiction coverage (→ Jail & Jurisdiction Coverage Sync sub-agent)

**Q5.1 (root, always ask):** "When someone's checking whether you can post bond at a specific jail or county, is that instant, or does someone have to check first?"
- **"Instant, we already know our coverage cold"** → deprioritize.
- **"Manual, has to check"** → continue:
  - **Q5.1a:** "How often does that delay end up losing the inquiry — they've already called somewhere else by the time you get back to them?"

---

### Section 6 — Court-date & check-in compliance (→ Court-Date & Check-In Compliance sub-agent)

**Q6.1 (root, always ask):** "Once someone's out on bond, what happens to make sure they show up to court and complete any required check-ins?"
- **"Yes, we have a solid reminder/check-in process"** → deprioritize. Skip to Section 7.
- **"Not really, we just hope they show"** → **strong signal**, continue:
  - **Q6.1a:** "Any sense of your current skip or forfeiture rate?" *(pricing/severity input — a bond is only worth what actually gets exonerated, not forfeited; a real forfeiture number makes this an easy, concrete pitch.)*

---

### Section 7 — Referral-source reporting (→ Referral-source reporting sub-agent)

**Q7.1 (root, always ask):** "Do you currently know which channels — attorneys, past clients, online search — are actually turning into bonds written?"
- **"Yes, we track that well"** → deprioritize.
- **"No / not really, it's a guess"** → continue:
  - **Q7.1a:** "Is that something ownership cares about, or is call speed the bigger priority right now?" *(more nice-to-have than pain point for most prospects — use this to gauge whether it's worth including to keep the deal focused.)*

---

## Output at the end of the tree

For every closer, the tool should surface: **which single front-runner Q0 selected** (Intake & Dispatch or Missed-Call Recovery — never both), **whether high-emotion-caller handling applies** (automatic/included if Intake & Dispatch was selected, not a separate line to qualify), which sub-agents scored as real fits (Sections 3–7, "strong signal" branches only), and every captured pricing input (missed calls/week, response-time gaps, forfeiture rate, weekly inquiry volume that doesn't convert same-call, etc.).

## Open item — pricing formula not yet defined for Suretix

Same open item as [[Restorix Closer Survey]]: this survey captures the *inputs*, not a locked dollar figure. No decision yet on whether Suretix mirrors Ohvara's formula shape (multiplier/floor/ceiling) or stays qualification-and-talk-track with the closer setting price by judgment, same as Restorix. Worth Brayden's call before anyone builds an auto-pricing engine.

## Content for the results screen — what each item is / what it does for their business

**Inbound Intake & Dispatch**
*What it is:* An AI agent that answers every call the moment it comes in — 24/7, no wait, no voicemail. It talks to the caller like a real dispatcher would: gets the charge, the jail or county, the bond amount, and what collateral or co-signer they have, then either dispatches an agent directly or routes them to a live person. Careful handling of a scared or upset caller is built in automatically — if the conversation shows real distress, it immediately hands off to a live person instead of continuing on autopilot.
*What it does for their business:* Almost every bail inquiry starts as a phone call, often in the middle of the night, often from someone who's never done this before — and the agency that answers first is usually the one that gets the bond. This closes that gap completely: nothing goes to voicemail, nothing waits until morning, and the agency stops needing someone physically by the phone around the clock just to catch every call.

**Missed-Call Recovery**
*What it is:* A lighter safety net for an agency that wants to keep its own staff answering calls live, but doesn't want anything missed to just disappear. The moment a call goes unanswered — after hours, line's busy, mid-transport — it automatically fires off a text and a callback within minutes, no one has to remember to do it.
*What it does for their business:* Staff stays the primary point of contact, nothing changes about how the agency operates day to day — but every call that used to just vanish into a missed-call log now gets a real shot at coming back before it goes to the next bondsman.

**Collateral & co-signer verification**
*What it is:* Real-time verification of collateral documentation and co-signer/indemnitor eligibility, not just asking the question — confirmed while the caller's still engaged, instead of someone having to call back later.
*What it does for their business:* Collateral and co-signer uncertainty is one of the most common points a bail inquiry goes cold — someone calls, gets told "we'll check and call you back," and by the time anyone does, they've already called the next name on the list. Verifying it live keeps the conversation moving instead of creating a gap for them to lose interest.

**Follow-up & nurture**
*What it is:* An automated sequence that keeps reaching out to anyone who called in but didn't commit to a bondsman the same call — texts, calls, spaced out over the following hours and days.
*What it does for their business:* Family members calling around often aren't deciding on the first call — they're comparing a few bondsmen, or waiting on more information from the jail. Without a real process, those inquiries just fall through the cracks. This keeps every one of them warm until they actually decide, without relying on staff remembering to circle back.

**Jail & jurisdiction coverage sync**
*What it is:* Keeps the AI's view of which jails and counties the agency actually covers in sync with reality, so it's never promising a dispatch somewhere the agency can't actually go, or making someone wait while staff manually checks.
*What it does for their business:* A delay here is a common reason an inquiry gets lost — by the time someone gets back to the caller with an answer, they've already called someone else. Instant, accurate coverage keeps the call moving toward a dispatched agent instead of creating a hold-and-lose moment.

**Court-date & check-in compliance**
*What it is:* Automated reminders in the lead-up to every court date, plus tracking for any required check-ins while someone's out on bond — with re-engagement if a check-in gets missed.
*What it does for their business:* A defendant skipping court isn't just a missed appointment — it's a forfeited bond, real money the agency is on the hook for. Most agencies don't have a real reminder or check-in process in place today. This closes that gap without adding staff workload, and catches skip risk early instead of finding out the hard way on the court date.

**Referral-source reporting**
*What it is:* Tracking that shows which channels — attorney referrals, past clients, online search — are actually turning into bonds written, not just inquiries.
*What it does for their business:* Most agencies are guessing which channels are worth the spend. This gives ownership a clear, accurate picture of what's actually working, so marketing dollars go toward what's proven instead of what feels like it's working.

## Related

- [[Restorix Closer Survey]] — the original this mirrors
- [[Restorix North Star]]
- [[Restorix LIVE_STATE]]
