---
date: 2026-07-03
description: "Complete branching setter script — pure say-this lines, no meta text, no closer name. Every node is something the setter reads out loud. v3: near-verbatim Camden Cash adaptation per Prompt 205, replacing the v2 transcript-research script. Source of truth mirrored in discoveryScript.js."
tags:
  - brain
  - setter
  - sales-script
---

# Setter Script v3 — Camden Cash, Near-Verbatim (shipped Prompt 205)

> **This overwrites the v2 (S1–S5 transcript-research) script per Brayden's approval — see [[setter-script-v3-camden-style]] for the full source spec with `[from: "..."]` quote attribution and the "why this had to diverge from pure verbatim" notes. This note is the DSL-translated version that mirrors `discoveryScript.js` exactly — read the v3 spec note for the reasoning, read this one for the exact shipped tree.**
>
> **Rules for implementation (unchanged since v2):**
> - Every `say` node = exact words the setter reads out loud. Nothing else.
> - No instructional text, no "do this," no coach notes on screen.
> - No closer name. Use "our team" / "we" / "they."
> - Branches = what the prospect said. Setter clicks what they heard → next say node.
> - `[Business Name]`, `[niche]` = dynamic tokens filled from the lead.
> - `[their number]` = raw daily missed-call count (the setter's own typed number, no math). `[monthly]`/`[annual]` = computed live (`weekly_missed × 4.33 × ticket`, weekly_missed itself the ×7'd daily figure — same weeks/month constant the real pricing formula uses). `[$ticket]` = dollar-formatted ticket value. All computed in `ScriptWalk.jsx`'s `renderText()`.
> - **Response categories:** every sentiment fork option is tagged `[GOOD]`/`[HESITANT]`/`[BAD]` → colored via `CATEGORY_COLORS` (Prompt 204). Pure routing forks (who picked up, which objection) are left untagged.

---

## SECTION 1 — Opener
*id: opener | color: var(--accent) | kind: opener*

**Node: intro** *(routing, no tags)*
SAY: "Hey, is this [Business Name]?"
→ "Yeah / speaking" → **node: indeed-hook**
→ "Transferred" → **node: transferred**

**Node: indeed-hook**
SAY: "Hey — I saw y'all had an Indeed listing up for a [receptionist / dispatcher / front desk]. I was wondering who I should speak to about that."
→ `[GOOD]` "That's me" → **node: qualifier**
→ `[BAD]` "What's this about?" / pushback → **node: disarm-early**

**Node: transferred** *(routing, no tags)*
SAY: "Hey [Name] — yeah, I saw your Indeed listing for a [receptionist]. I don't want to waste your time, seriously — got a sec?"
→ "Engages" → **node: qualifier**
→ "Pushback" → **node: disarm-early**

**Node: disarm-early** *(reached from both indeed-hook's BAD path and transferred's pushback — repeated inline in discoveryScript.js, same as v2's shared-node convention)*
SAY: "Nah, there's nothing to sell you, man — genuinely just a real quick question."
→ `[GOOD]` "Engages" → **node: qualifier**
→ `[BAD]` "Still shuts it down" → ▸ Set status Not Interested.

**Node: qualifier** — the binary yes/no move (reached from indeed-hook/GOOD, transferred/engages, and disarm-early/GOOD — repeated inline in each place)
SAY: "Do you want to stop missing calls — yes or no?"
→ `[GOOD]` "Yeah" → SECTION 2 (Vitals)
→ `[HESITANT]` "Depends" → SECTION 2 (Vitals)
→ `[BAD]` "No, we've got it covered / pretty on top of it" → **node: on-top-of-it-check**

**Node: on-top-of-it-check**
SAY: "You're pretty on top of it, I got you — is it more that calls just aren't the bottleneck right now, or you've got someone dedicated catching every one?"
→ `[HESITANT]` "Answers, any gap surfaces" → SECTION 2 (Vitals)
→ `[BAD]` "Genuinely solid, no gap" → **node: clean-exit-no-pain**

**Node: clean-exit-no-pain**
SAY: "Okay, well, that's a different story then. Okay man, well have a good day, good luck to you."
→ ▸ Set status Not Interested.

---

## SECTION 2 — Vitals
*id: vitals | color: var(--accent) | kind: branch — capture nodes, no forks*

**Node: volume** *(rapport warm-up, not captured)*
SAY: "Out of curiosity — don't mind the question, it'll make sense in a second, and you can hang up if this sounds irrelevant — how many calls do you think you get in a month?"
→ answer → **node: missed**

**Node: missed** *(direct daily-miss capture — `capture.multiplier: 7`, `rawField: calls_missed_per_day`. Setter types the raw daily number; the app silently converts ×7 into `calls_missed_per_week`, the real DB column the pricing formula reads. The raw daily number is what `[their number]` displays later.)*
SAY: "Ballpark, how many do you think you're missing a day?"
→ answer → **node: ticket**

**Node: ticket** *(capture: `avg_ticket`)*
SAY: "And what do you charge a client typically — like [$250] bucks?"
→ answer → SECTION 3 (Pain)

---

## SECTION 3 — Pain
*id: pain | color: var(--warning) | kind: branch*

**Node: do-the-math** *(auto-advance, no fork)*
SAY: "So check me out — you're potentially leaving what, like $[monthly] on the table every month. That's, I mean, $[annual] on the table every year from something like [their number] missed calls a day."
→ [auto-advance] → **node: reflection**

**Node: reflection**
SAY: "Is that something you're doing anything about, or not really important to you?"
→ `[GOOD]` "Engaged / yeah we should" → SECTION 4 (Handoff)
→ `[HESITANT]` "Minimizes / we're fine" → **node: name-pain**
→ `[BAD]` "Pushback, you're trying to sell me a service" → **node: disarm-2**

**Node: name-pain**
SAY: "So if I called you — what time do you close at? [time]. If I called you at [time+1hr] and you're not able to get to the phone, why would I go to you versus somebody that can answer the phone?"
→ `[GOOD]` "Engages" → SECTION 4 (Handoff)
→ `[BAD]` "Still no" → **node: clean-exit-no-pain** (Pain-local — same wording as opener's, ▸ Set status Not Interested.)

**Node: disarm-2**
SAY: "Yeah, no, there's nothing to buy, man — I just happen to see you guys. I mean, $[annual] every year — is that like anything you're doing anything about, or not important?"
→ `[GOOD]` "Re-engages" → SECTION 4 (Handoff)
→ `[BAD]` "Still cold" → **node: compete-check**

**Node: compete-check** — labeling move
SAY: "My question for you is — if you're leaving that much money on the table and not doing anything about it, how's that going to affect your ability to compete with everybody else in your area?"
→ `[GOOD]` "Engages" → SECTION 4 (Handoff)
→ `[BAD]` "Still no" → **node: clean-exit-no-pain** (Pain-local)

---

## SECTION 4 — Handoff
*id: handoff | color: var(--success) | kind: branch*

**Node: handoff-bridge** *(auto-advance)*
SAY: "I don't want to waste your time here. I have a team that works with [niche] businesses, and I do this based on you and your pain — if you're missing [their number] calls a day and your average client's worth [$ticket], that's $[annual] you're leaving on the table every year from calls that just don't get picked up."
→ [auto-advance] → **node: pitch-receptionist**

**Node: pitch-receptionist** *(auto-advance — the product description, near-verbatim)*
SAY: "It'd be like an AI receptionist. Not some robot press-one thing — a real human, we can even make it your voice — and it funnels the calls you'd otherwise miss straight through. It can also do missed-call text-back. It answers questions and books appointments straight to your calendar, so all you have to do is show up to the meeting."
→ [auto-advance] → **node: time-ask**

**Node: time-ask** *(only "picks a time" is tagged — the other 4 are routing into which objection got raised, not a sentiment fork)*
SAY: "Take 15 minutes. Worst case scenario, you get to see what it looks like and stop wasting your time. Best case scenario, our team shows you exactly how you're leaving money on the table and how to fix it. How's that sound? [Tuesday morning] or [Wednesday afternoon]?"
→ `[GOOD]` "Picks a time" → SECTION 6 (Close)
→ "Just send me some info" → SECTION 5 (obj-send-info)
→ "I don't have time this week" → SECTION 5 (obj-no-time)
→ "Who is this / what company?" → SECTION 5 (obj-who-is-this)
→ "How much does this cost?" → SECTION 5 (obj-how-much)

---

## SECTION 5 — Booking Objections
*id: objections | color: var(--danger) | kind: branch*

**Node: entry-chooser** *(added for the DSL — same convention v2 used: the app routes generically to "Objections," so the setter picks which objection actually came up from a top-level fork. Untagged — pure routing.)*
SAY: BRANCH — "What's the objection?"
→ "Too busy / on a job" → **node: obj-too-busy**
→ "Just send me some info / want to see something first" → **node: obj-send-info**
→ "Who is this / what company?" → **node: obj-who-is-this**
→ "I don't have time this week" → **node: obj-no-time**
→ "How much does this cost?" → **node: obj-how-much**

**Node: obj-too-busy** — the "why are you on the phone" callout
SAY: "Okay, well, if you're that busy, why are you on the phone with me and not on the job or taking care of something more important?"
→ `[GOOD]` "Re-engages" → restates time-ask's line ("Take 15 minutes...") → SECTION 6 (Close)
→ `[BAD]` "Genuinely a real 'we don't want more clients right now'" → "All right, man — you have a good one, take care." → ▸ Set status Not Interested. **(deliberate departure from v2 — a real capacity objection gets a clean exit, not a push)**

**Node: obj-send-info**
SAY: "I could send that over, but honestly — when was the last time an email did more for you than an actual conversation? Let's hop on a quick call instead, [time] tomorrow — I'll show you, there's nothing to buy."
→ `[GOOD]` "Okay, fair" → "Does [Tuesday morning] or [Wednesday afternoon] work better for you?" → SECTION 6 (Close)
→ `[HESITANT]` "Still wants info first" → **node: obj-send-info-2**

**Node: obj-send-info-2** *(single path)*
SAY: "Fair enough — I'll send it over today. And I'm going to drop a 15-minute placeholder on your calendar for [day]. If you read it and it's not worth your time, just decline, no hard feelings. If it's interesting, we're already set."
→ "Okay" → ▸ Set status Follow-Up (send info + placeholder).

**Node: obj-who-is-this** *(routing, no tags)*
SAY: "Who would be responsible for looking at any possible hidden gaps in your call flow system that could be causing you guys to miss out on thousands of dollars every month? Is that you?"
→ "That's me" → SECTION 2 (Vitals) **(simplified from the v3 spec's "→ qualifier" — by this point they're mid-conversation about the real pain, re-asking the yes/no gate doesn't add anything; qualifier's own GOOD path is "go to Vitals" anyway, so this skips straight there)**
→ "That's [owner]" → **node: gatekeeper-timing**

**Node: gatekeeper-timing** *(routing, no tags)*
SAY: "No worries — do you know a good time [owner] is usually in later this week?"
→ "Gives a window" → ▸ Set status Follow-Up (log the callback window).
→ "Only reachable by email" → **node: gatekeeper-email**

**Node: gatekeeper-email** *(single path)*
SAY: "No worries — what's the best email?"
→ "Gives email" → ▸ Set status Follow-Up (logged email, thanked and exited).

**Node: obj-no-time**
SAY: "No problem — what works better, [Tuesday next week] or [Wednesday next week]?"
→ `[GOOD]` "Picks a day" → SECTION 6 (Close)
→ `[BAD]` "Those don't work either" → **node: obj-no-time-2**

**Node: obj-no-time-2** *(single path)*
SAY: "Got it — what's a better week for you?"
→ "Gives a week" → ▸ Set status Follow-Up (log the week they gave).

**Node: obj-how-much**
SAY: "Honestly depends on your call volume and setup — which is exactly what our team figures out on the call. Didn't want to guess at a number before they've seen your actual situation."
→ `[GOOD]` "Okay" → "Does [Tuesday morning] or [Wednesday afternoon] work better for you?" → SECTION 6 (Close)
→ `[HESITANT]` "Just need a ballpark" → **node: obj-how-much-2**

**Node: obj-how-much-2** *(single path)*
SAY: "The range is wide depending on what you need, which is exactly why the call is worth 15 minutes — they'll give you a real number based on what you just told me."
→ "Does [Tuesday morning] or [Wednesday afternoon] work better for you?" → SECTION 6 (Close)

---

## SECTION 6 — Close
*id: close | color: var(--accent) | kind: close*

**Node: confirm-number** *(v3 collapses v2's separate "morning or afternoon" ask into this one line, since time-ask's own two options are already AM/PM-qualified)*
SAY: "[Day] at [time] — I'm going to see what I can do for you. There's nothing, you don't got to buy anything. What's the best number so I can send you a quick text right now to confirm?"
→ gives number → **node: close-confirm**

**Node: close-confirm** *(terminal)*
SAY: "Got it. Our team will have everything you told me today in front of them before the call — you won't have to re-explain anything."
→ ▸ Set status Appointment Booked. Log the time and number.

---

## Where this diverges from pure Camden verbatim

See [[setter-script-v3-camden-style]] for the full source-attributed rationale. Summary: no "ring a bell" name-drop (no public rep brand), no client-count/CEO framing (setter isn't the closer — "our team"), Indeed listing replaces his generic hook, setter always books the 15-minute call rather than closing on the spot.

## Token Reference

| Token | Source |
|-------|--------|
| `[Business Name]` | Lead business name |
| `[niche]` | Lead niche |
| `[receptionist / dispatcher / front desk]` | Lead job posting type |
| `[Name]` / `[owner]` | Setter fills in verbally during the call |
| `[day]` / `[time]` / `[time+1hr]` | What the prospect picked |
| `[Tuesday morning]` / `[Wednesday afternoon]` / `[Tuesday next week]` / `[Wednesday next week]` | Current week + 1 |
| `[their number]` | Computed — raw daily missed-call count as the setter typed it |
| `[$ticket]` | Computed — dollar-formatted `avg_ticket` |
| `[monthly]` / `[annual]` | Computed — `weekly_missed × 4.33 × ticket`, `× 12` for annual |

**Known open item (flagged for Brayden, not blocking):** the monthly/annual pain numbers run noticeably larger than Camden's own anecdotal example, because his was calls-missed-*per-month* and this script asks calls-missed-*per-day* (an intentional Ohvara adaptation per the v3 spec) — worth a gut-check against real call data once a few of these run live.

[[setter-script-v3-camden-style]] · [[setter-transcripts-camden-cash]] · [[ohvara-setter-discovery-script]] · [[LIVE_STATE]] · [[North Star]]
