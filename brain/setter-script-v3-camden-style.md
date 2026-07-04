---
date: 2026-07-03
description: "Setter script v3 — SHIPPED live 2026-07-03 (Prompt 205, `b4d9cf3`). v3.1 warm-lead opener patch (Section 1) SHIPPED 2026-07-03 (Prompt 209, `8df9bfa`). v3.2 pain-math/job-title/hedge patch SHIPPED 2026-07-04 (Prompt 210, `a21cd6b`)."
tags:
  - brain
  - setter
  - sales-script
  - shipped
---

# Setter Script v3 — Camden Cash, Near-Verbatim

> **Status: SHIPPED live in `discoveryScript.js` (Prompt 205, `b4d9cf3`).** Source: [[setter-transcripts-camden-cash]] (full transcript — no second Camden video available). Every SAY line has a `[from: "..."]` tag showing its exact source quote. Fork options are tagged `[GOOD]` / `[HESITANT]` / `[BAD]` matching `CATEGORY_COLORS` in `discoveryScript.js`.
>
> **✅ v3.1 PATCH SHIPPED 2026-07-03 (Prompt 209, `8df9bfa`).** Brayden's 07-03 follow-up: the opener still read like a blind cold call ("just happened to notice, nothing to sell you"), but Ohvara's setters aren't cold-calling — the business already told the world it has a coverage gap by posting the job. Camden has no equivalent video (no cold-caller targets businesses actively hiring for the exact role being pitched), so this section departs from pure verbatim on purpose. Confirmed specifically via the qualifier line — Brayden wanted the binary yes/no kept but felt "Do you want to stop missing calls — yes or no?" was pushy; this patch's qualifier ("Are missed calls part of why you're posting for this role? Yes or no?") resolves that too. See "v3.1 — Warm-Lead Opener" below; Sections 2-5 are unchanged. **One shipped deviation from this doc:** the hook's self-introduction uses the existing `[Rep Name]` token, not this doc's `[First Name]` — `[First Name]` was never wired into `discoveryScript.js`'s `fillTokens()`, so using it verbatim would have shipped a literal unfilled placeholder into a live script.

**Tagging rule applied below:** sentiment forks (how the prospect responded to a question) get `[GOOD]`/`[HESITANT]`/`[BAD]` tags. Pure routing forks (who picked up the phone, was it transferred) are left untagged — they're not a sentiment signal, just a path split.

---

## ✅ v3.2 PATCH SHIPPED 2026-07-04 (Prompt 210, `a21cd6b`) — pain-math formula change, job-title token, trimmed vitals hedge

Three changes from Brayden's live-review-with-a-real-lead session, all shipped.

**1. Pain-math formula changed.** `[monthly]`/`[annual]` in `ScriptWalk.jsx`'s `renderText()` now compute as `monthly = daily_missed × 5 × 4 × ticket`, `annual = monthly × 12` — replacing the old `weekly_missed(×7) × 4.33 × ticket`. Verified: 3 missed/day × $250 ticket → $15,000/mo, $180,000/yr exactly.

**Still open, not shipped — needs Brayden's explicit confirmation:** `calls_missed_per_week` (still `daily_missed × 7`) feeds the REAL client-pricing formula in `recommend-stack` (`callsMissedPerWeek × 4.33 × avgTicket × 0.15`) — the price Nate actually quotes on close calls. This was deliberately left untouched since it changes real recommended pricing on every lead, not just script copy. Decision pending — see [[Memories]] 2026-07-04 entry.

**2. `[job title]` token shipped**, replacing the `[receptionist / dispatcher / front desk]` placeholder-list. Confirmed field: `leads.posting_title` (migration 027, populated by the `indeed-scraper` edge function from the real Indeed posting headline) — not `job_title` (migration 003, a separate field used for `stackRecommendation.js` labor-cost math). Falls back to "front desk role" for leads with no posting (Maps-sourced). **Still open, not resolved:** Maps-sourced leads have no real hiring signal at all — the whole warm-lead opener premise (v3.1) doesn't strictly apply to them. Worth a future pass to check current lead-source mix and possibly branch the opener by source.

**3. Vitals opener hedge trimmed** to: *"Out of curiosity — how many calls do you think you get in a month?"*

[[setter-transcripts-camden-cash]] · [[setter-script-v2-flow]] · [[ohvara-setter-discovery-script]] · [[LIVE_STATE]]

---

## Where this HAD to diverge from pure verbatim, and why

Four unavoidable adaptations — everything else is his actual wording:

1. **"Ring a bell?"** (Camden's name-drop swagger) only works because he's a known personal brand people can look up. An Ohvara setter has no public reputation to lean on, so this becomes a plain, confident name-state with no "ring a bell" bit.
2. **No client-count/CEO framing.** Camden says "I have over 37 clients," "I'm CEO," and personally closes his own calls — he IS the business owner. An Ohvara setter is not the closer and can't credibly claim those things. Replaced with "our team" framing, matching the standing no-closer-name rule.
3. **Indeed listing instead of "I saw your website/reviews."** Camden's hook is generic (blind Google Maps dial, no real reason to call). Ohvara setters have a genuinely better hook — the business is actively hiring for the exact role this fixes — so the Indeed listing replaces his generic opener. Everything downstream is otherwise his.
4. **No on-the-spot close/payment.** Camden sometimes negotiates price and collects money himself. Ohvara setters always book the 15-minute call — same close mechanic Camden uses for his second-tier prospects, just always the endpoint here.

---

## SECTION 1 — Opener (v3 as originally shipped Prompt 205 — SUPERSEDED live by the v3.1 patch below, Prompt 209)
*id: opener | color: var(--accent) | kind: opener*

**Node: intro** *(routing, no color tags)*
SAY: "Hey, is this [Business Name]?"
`[from: "Hey, is this [Business Name]?"]`
→ "Yeah / speaking" → **node: indeed-hook**
→ transferred → **node: transferred**

**Node: indeed-hook**
SAY: "Hey — I saw y'all had an Indeed listing up for a [receptionist / dispatcher / front desk]. I was wondering who I should speak to about that."
`[from: "Hey, no boss, I was just looking, like, do you guys have a Facebook or a Yelp or maybe a website, I could see your guys' stuff" — swapped his generic hook for Ohvara's real one, same "just looking/wondering" framing]`
→ `[GOOD]` "That's me" → **node: qualifier**
→ `[BAD]` "What's this about?" / pushback → **node: disarm-early**

**Node: transferred** *(routing, no color tags)*
SAY: "Hey [Name] — yeah, I saw your Indeed listing for a [receptionist]. I don't want to waste your time, seriously — got a sec?"
`[from: "I don't want to waste your time, seriously" + "bro like how many calls do you think you get a month"]`
→ engages → **node: qualifier**
→ pushback → **node: disarm-early**

**Node: disarm-early**
SAY: "Nah, there's nothing to sell you, man — genuinely just a real quick question."
`[from: "Yeah, no, there's nothing to buy, man, I just happen to see you guys."]`
→ `[GOOD]` engages → **node: qualifier**
→ `[BAD]` still shuts it down → END (clean exit)

**Node: qualifier** — Camden's binary yes/no move
SAY: "Do you want to stop missing calls — yes or no?"
`[from: "Do you want to add three to five more clients a week? Yes or no?"]`
→ `[GOOD]` "Yeah" → SECTION 2
→ `[HESITANT]` "Depends" → SECTION 2
→ `[BAD]` "No, we've got it covered / pretty on top of it" → **node: on-top-of-it-check**

---

## v3.1 — Warm-Lead Opener (SHIPPED PATCH, Section 1 only — Prompt 209, `8df9bfa`)

**Why this changes:** the shipped opener above still plays it coy — "just happened to notice," disarm the sales-pushback like the prospect might reasonably wonder why a stranger is asking about their call volume. But an Indeed-sourced lead already told us they're understaffed by posting the job. Pretending not to know why we're calling wastes the one advantage Ohvara has that Camden's blind cold-calls don't: **we already know they're hiring for the exact problem we solve.** No source video exists for this angle — Camden never targets businesses mid-hire for the role his pitch replaces — so this section is written fresh rather than adapted from a transcript line.

**What changes:** the hook states the real reason for the call up front instead of a vague "wondering who to talk to," the disarm reframes around "before you spend time/money hiring" instead of "I just happened to notice," and the qualifier's yes/no question is repointed at the actual premise (missed calls being *why* they're hiring) instead of a generic aspirational hook. Sections 2-5 (Vitals/Pain/Handoff/Objections) are unaffected — the math chain, reflection line, and pitch already work regardless of how the call opened. One line is added to Handoff's `pitch-receptionist` node tying the pitch back to the hire itself.

**Node: intro** *(unchanged)*
SAY: "Hey, is this [Business Name]?"
→ "Yeah / speaking" → **node: indeed-hook**
→ transferred → **node: transferred**

**Node: indeed-hook** *(REVISED)*
SAY: "This is [First Name] — I saw you're hiring for a [receptionist / dispatcher / front desk]. That usually means calls are slipping somewhere, or your team's stretched thin. Got a quick minute before you go through the whole hiring process?"
→ `[GOOD]` "Sure / yeah" → **node: qualifier**
→ `[BAD]` "What's this about?" / pushback → **node: disarm-early**

**Node: transferred** *(REVISED, matches new hook's diagnostic framing)*
SAY: "Hey [Name] — I saw your Indeed listing for a [receptionist]. That's usually a sign calls are slipping somewhere — got a quick sec?"
→ engages → **node: qualifier**
→ pushback → **node: disarm-early**

**Node: disarm-early** *(REVISED — disarms around the hiring spend, not a coy "just noticed")*
SAY: "Nothing to sell you here yet — genuinely just want to see if it's actually calls slipping, or something else, before you spend time and money hiring for it."
→ `[GOOD]` engages → **node: qualifier**
→ `[BAD]` still shuts it down → END (clean exit)

**Node: qualifier** *(REVISED — same binary yes/no mechanic, now honest about the premise)*
SAY: "Quick question — are missed calls part of why you're posting for this role? Yes or no?"
→ `[GOOD]` "Yeah" → SECTION 2
→ `[HESITANT]` "Kind of / it's part of it" → SECTION 2
→ `[BAD]` "No, we've got it covered, just growing" → **node: on-top-of-it-check**

**Handoff patch:** append one line to the end of the existing `pitch-receptionist` node (Section 4, unchanged otherwise): *"...and it means you might not even need to finish out this hire the way you'd planned."* — turns the job posting itself into the closing hook instead of just the opening one.

**Node: on-top-of-it-check**
SAY: "You're pretty on top of it, I got you — is it more that calls just aren't the bottleneck right now, or you've got someone dedicated catching every one?"
`[from: "You're pretty on top of it, I got you, so it's more of like a—"]`
→ `[HESITANT]` answers, any gap surfaces → SECTION 2
→ `[BAD]` genuinely solid, no gap → **node: clean-exit-no-pain**

**Node: clean-exit-no-pain**
SAY: "Okay, well, that's a different story then. Okay man, well have a good day, good luck to you."
`[from: "You're allergic. Okay well that that's a different story then. Okay man well have a good day, good luck to you man."]`
→ END

---

## SECTION 2 — Vitals
*id: vitals | color: var(--accent) | kind: branch — capture nodes, no forks/no color tags*

**Node: volume**
SAY: "Out of curiosity — don't mind the question, it'll make sense in a second, and you can hang up if this sounds irrelevant — how many calls do you think you get in a month?"
`[from: "Out of curiosity, don't mind the question, it'll make sense in a second and you can hang up if this sounds like relevant, I guess. How many calls do you think you get in a month?"]`
→ answer → **node: missed**

**Node: missed** *(direct daily-miss capture — feeds `capture.multiplier` ×7, per Prompt 204's shipped mechanism, so the setter never converts units)*
SAY: "Ballpark, how many do you think you're missing a day?"
`[from: "Ballpark, how many do you think you miss?" — asked per-day instead of per-week/month]`
→ answer → **node: ticket**

**Node: ticket**
SAY: "And what do you charge a client typically — like [$250] bucks?"
`[from: "And what like, okay, what do you charge a client typically? Like 250 bucks?"]`
→ answer → SECTION 3

---

## SECTION 3 — Pain
*id: pain | color: var(--accent) | kind: branch*

**Node: do-the-math** *(auto-advance, no fork)*
SAY: "So check me out — you're potentially leaving what, like $[monthly] on the table every month. That's, I mean, $[annual] on the table every year from something like [their number] missed calls a day."
`[from: "So check me out — you're potentially leaving what, like 3K on the table every month. That's I mean, 32,000 on the table every year from something like nine missed phone calls a month."]`
→ [auto-advance] → **node: reflection**

**Node: reflection** — the exact line, unchanged
SAY: "Is that something you're doing anything about, or not really important to you?"
`[from: "Is that like something you're doing anything about or or not really important to you?"]`
→ `[GOOD]` engaged / "yeah we should" → SECTION 4
→ `[HESITANT]` minimizes / "we're fine" → **node: name-pain**
→ `[BAD]` pushback, "you're trying to sell me a service" → **node: disarm-2**

**Node: disarm-2**
SAY: "Yeah, no, there's nothing to buy, man — I just happen to see you guys. I mean, $[annual] every year — is that like anything you're doing anything about, or not important?"
`[from: "Yeah. No, there's nothing to buy, man, I'm I just happen to see you guys. I mean, $32,000 every year — is that like anything you're doing anything about or not not important?"]`
→ `[GOOD]` re-engages → SECTION 4
→ `[BAD]` still cold → **node: compete-check**

**Node: compete-check** — labeling move
SAY: "My question for you is — if you're leaving that much money on the table and not doing anything about it, how's that going to affect your ability to compete with everybody else in your area?"
`[from: "My question for you is like if you are leaving that much money on the table and not doing anything about it, I mean, how is that going to affect your ability to compete with the... 300 competitors in your area?"]`
→ `[GOOD]` engages → SECTION 4
→ `[BAD]` still no → **node: clean-exit-no-pain**

**Node: name-pain**
SAY: "So if I called you — what time do you close at? [time]. If I called you at [time+1hr] and you're not able to get to the phone, why would I go to you versus somebody that can answer the phone?"
`[from: "So if I called you — at what time do you close at? 8 p.m. If I called you at 9:00 and you're not able to get to the phone, why would I go to you versus somebody that can answer the phone?"]`
→ `[GOOD]` engages → SECTION 4
→ `[BAD]` still no → **node: clean-exit-no-pain**

---

## SECTION 4 — Handoff
*id: handoff | color: var(--accent) | kind: branch*

**Node: handoff-bridge** *(auto-advance)*
SAY: "I don't want to waste your time here. I have a team that works with [niche] businesses, and I do this based on you and your pain — if you're missing [their number] calls a day and your average client's worth [$ticket], that's $[annual] you're leaving on the table every year from calls that just don't get picked up."
`[from: "I I kind of do it based on you and your pain, so like if if you were to miss 10 calls a month and your average client value was 500, that's $60,000 you're leaving on the table every year from 10 missed phone calls a month."]`
→ [auto-advance] → **node: pitch-receptionist**

**Node: pitch-receptionist** *(auto-advance, the actual product description, near-verbatim)*
SAY: "It'd be like an AI receptionist. Not some robot press-one thing — a real human, we can even make it your voice — and it funnels the calls you'd otherwise miss straight through. It can also do missed-call text-back. It answers questions and books appointments straight to your calendar, so all you have to do is show up to the meeting."
`[from: "It would have like an AI reception. It's not some robot [ __ ] like press one. It be like a real human. You could... even make it be your voice... It could also do like miss call text back as well but the AI receptionist would answer any questions. It could book appointments straight to your calendar. That way all you have to do is get meetings booked on your calendar."]`
→ [auto-advance] → **node: time-ask**

**Node: time-ask** *(routing into a specific objection, not a sentiment fork — options are literal responses, not GOOD/HESITANT/BAD)*
SAY: "Take 15 minutes. Worst case scenario, you get to see what it looks like and stop wasting your time. Best case scenario, our team shows you exactly how you're leaving money on the table and how to fix it. How's that sound? [Tuesday morning] or [Wednesday afternoon]?"
`[from: "Take 15 minutes. Worst case scenario, you get to kind of see what it looks like... And best case scenario, you pay me a little bit of money, you make more money in return, save more time. How's that sound?" — dropped the "you pay me" clause since the setter isn't closing]`
→ `[GOOD]` picks a time → **node: confirm-number**
→ "Just send me some info" → SECTION 5 (obj-send-info)
→ "I don't have time this week" → SECTION 5 (obj-no-time)
→ "Who is this / what company?" → SECTION 5 (obj-who-is-this)
→ "How much does this cost?" → SECTION 5 (obj-how-much)

**Node: confirm-number** *(auto-advance)*
SAY: "5:00 p.m. tomorrow — I'm going to see what I can do for you. There's nothing, you don't got to buy anything. What's the best number so I can send you a quick text right now to confirm?"
`[from: "5:00 p.m. tomorrow. I'm going to see what I can do for you. There's nothing. You don't got to buy anything, but let's hop on like a quick 10-minute meeting." + "I'll send you a quick text right now to confirm. What's the best number for that?"]`
→ gives number → **node: close-confirm**

**Node: close-confirm** *(auto-advance, terminal)*
SAY: "Got it. Our team will have everything you told me today in front of them before the call — you won't have to re-explain anything."
`[from: "Got it. Our team will have everything you told me today in front of them before the call — you won't have to re-explain anything."]`
→ END ✅

*(Process note, not a script line: Camden texts a confirmation immediately, schedules a same-morning reminder text, and calls ~2 hours before to re-confirm. Ohvara's SMS reminder pipeline is currently stubbed/deprioritized per [[LIVE_STATE]] — flagging the cadence for whenever that gets built, not requesting it now.)*

---

## SECTION 5 — Booking Objections
*id: objections | color: var(--accent) | kind: branch*

**Node: obj-too-busy** — the "why are you on the phone" callout
SAY: "Okay, well, if you're that busy, why are you on the phone with me and not on the job or taking care of something more important?"
`[from: "My question is why are you on the phone with me and not on a job or taking care of something more important?"]`
→ `[GOOD]` re-engages → **node: time-ask**
→ `[BAD]` genuinely a real "we don't want more clients right now" → END, no push
`[from Camden's clean exit with the booked-out roofer: "I don't want no more overhead, no more people... I'm not looking to make more money." → "All right man, well you have a good one and take care."]`

**Node: obj-send-info**
SAY: "I could send that over, but honestly — when was the last time an email did more for you than an actual conversation? Let's hop on a quick call instead, [time] tomorrow — I'll show you, there's nothing to buy."
`[from: "I can send you an email, but when was the last time you had an email that was better than a conversation? Let's do this — tomorrow, what time do you get off?"]`
→ `[GOOD]` "Okay, fair" → **node: time-ask**
→ `[HESITANT]` still wants info first → **node: obj-send-info-2**

**Node: obj-send-info-2** *(single acceptance path, no fork)*
SAY: "Fair enough — I'll send it over today. And I'm going to drop a 15-minute placeholder on your calendar for [day]. If you read it and it's not worth your time, just decline, no hard feelings. If it's interesting, we're already set."
`[from: "Okay — I'll send it over today. And I'm going to drop a 15-minute placeholder on your calendar for [day]. If you read it and it's not worth your time, just decline — no hard feelings. If it's interesting, we're already set."]`
→ "Okay" → END (send info + placeholder)

**Node: obj-who-is-this** *(routing, no color tags)*
SAY: "Who would be responsible for looking at any possible hidden gaps in your call flow system that could be causing you guys to miss out on thousands of dollars every month? Is that you?"
`[from the McKenna/gatekeeper call: "Who who would be responsible for looking at... any possible hidden gaps in your guys' like call flow system that could be causing you guys to miss out on like thousands of dollars every single month. Who would that normally fall under? Is that you?"]`
→ "That's me" → **node: qualifier**
→ "That's [owner]" → **node: gatekeeper-timing**

**Node: gatekeeper-timing** *(under 2 minutes, per Camden's own rule — routing, no color tags)*
SAY: "No worries — do you know a good time [owner] is usually in later this week?"
`[from: "Do you know like a good time she may be in later this week?"]`
→ gives a window → END (log callback, thank + exit)
→ "only reachable by email" → **node: gatekeeper-email**

**Node: gatekeeper-email** *(single path)*
SAY: "No worries — what's the best email?"
`[from: "What's going to be the best email?"]`
→ gives email → END (log + exit — thank them, don't oversell to someone who can't say yes)

**Node: obj-no-time**
SAY: "No problem — what works better, [Tuesday next week] or [Wednesday next week]?"
`[from: "No problem — what works better, [Tuesday of next week] or [Wednesday of next week]?"]`
→ `[GOOD]` picks a day → **node: confirm-number**
→ `[BAD]` "Those don't work either" → **node: obj-no-time-2**

**Node: obj-no-time-2** *(single path)*
SAY: "Got it — what's a better week for you?"
`[from: "Got it — what's a better week for you?"]`
→ gives a week → END (log callback)

**Node: obj-how-much**
SAY: "Honestly depends on your call volume and setup — which is exactly what our team figures out on the call. Didn't want to guess at a number before they've seen your actual situation."
`[from: "Honestly depends on your call volume and setup — which is exactly what our team figures out on the call. That's why I didn't want to guess at a number before they've seen your actual situation."]`
→ `[GOOD]` "Okay" → **node: time-ask**
→ `[HESITANT]` "Just need a ballpark" → **node: obj-how-much-2**

**Node: obj-how-much-2** *(single path)*
SAY: "The range is wide depending on what you need, which is exactly why the call is worth 15 minutes — they'll give you a real number based on what you just told me."
`[from: "The range is wide depending on what you need, which is exactly why the call is worth 15 minutes — they'll give you a real number based on what you just told me."]`
→ "Fine" → **node: time-ask**

---

## Review checklist for Brayden

- Every SAY line has its source quote right above it — flag any that drifted too far from the original wording.
- Section 4's `pitch-receptionist` node is the most direct lift (Camden's actual AI-receptionist description) — worth double-checking against Ohvara's real product claims (both true today per the shipped app, so no overclaim).
- `obj-too-busy`'s clean exit on a real "we don't want more clients" objection is new behavior vs. today's script (which pushes through most objections) — confirm you want setters to actually drop a lead on this specific objection rather than logging it as a callback.
- No second Camden video exists (he doesn't have another live-cold-call-for-AI-receptionist video) — this is built entirely from the one call plus his supporting commentary. If a different creator's example ever gets found, treat it as a v4 pass rather than trying to force it into this one.

**Status: both the base v3 script (Prompt 205, `b4d9cf3`) and the v3.1 warm-lead opener patch (Prompt 209, `8df9bfa`) are shipped live.** The Script tab's canvas view (the reason Prompt 206/208 existed) has since been replaced twice over — first with a text outline (Prompt 208), then with a direct Practice-mode landing (Prompt 209) — see [[LIVE_STATE]].

[[setter-transcripts-camden-cash]] · [[setter-script-v2-flow]] · [[ohvara-setter-discovery-script]] · [[LIVE_STATE]]
