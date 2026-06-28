---
date: 2026-06-28
description: "Complete branching setter script — pure say-this lines, no meta text, no closer name. Every node is something the setter reads out loud. Built from transcript research (S1–S5). For CC to implement into discoveryScript.js."
tags:
  - brain
  - setter
  - sales-script
---

# Setter Script v2 — Full Branching Flow

> **Rules for implementation:**
> - Every `say` node = exact words the setter reads out loud. Nothing else.
> - No instructional text, no "do this," no coach notes on screen.
> - No closer name. Use "our team" / "we" / "they."
> - Branches = what the prospect said. Setter clicks what they heard → next say node.
> - `[First Name]`, `[Business Name]`, `[niche]` = dynamic tokens.

---

## SECTION 1 — Opener
*id: opener | color: var(--accent-blue) | kind: opener*

**Node: confirm**
SAY: "Hey, is this [Business Name]? Is [First Name] around?"
→ "Yes / speaking" → **node: indeed-open**
→ "They're not in / who's calling?" → **node: gatekeeper**

**Node: gatekeeper**
SAY: "No worries — do you know when they'd be back? I'll give them a call then."
→ Gets time → END (log callback)
→ "They don't take calls" → END

**Node: indeed-open**
SAY: "Hey [First Name] — saw you guys have a listing up for a [receptionist / dispatcher / front desk]. Quick question about how you're handling calls while that search is going — you got a minute?"
→ "Sure / yeah / go ahead" → **node: bridge**
→ "What's this about? / Who is this?" → **node: permission-frame**
→ "I'm busy / not a good time" → **node: permission-frame**

**Node: permission-frame**
SAY: "I know this is out of nowhere — you can totally tell me you're slammed and I'll let you go. Quick question first though: while you're looking for that person, who's catching the phones when your team's tied up?"
→ They engage → **node: bridge**
→ "Not interested / goodbye" → END

**Node: bridge**
SAY: "Quick question — while that search is going, what's actually happening right now when a call comes in and nobody's free to grab it?"
→ They answer → SECTION 2 (node: pov-opener)

---

## SECTION 2 — Vitals Check
*id: vitals | color: var(--accent-teal) | kind: branch*

**Node: pov-opener**
SAY: "Most [niche] owners I talk to, their crew's out on jobs and the calls are the thing that slips through the cracks the most — even after they've tried to fix it. Is that kind of the situation, or is it something different for you?"
→ "Yeah, exactly / pretty much" → **node: current-setup**
→ "A bit different for us..." → **node: current-setup**

**Node: current-setup**
SAY: "Walk me through what happens right now when a call comes in — who picks it up?"
→ They answer → **node: volume**

**Node: volume**
SAY: "On a normal day, how many calls are you getting in?"
→ They answer → **node: leakage**

**Node: leakage**
SAY: "And when nobody gets to it, where does it go — voicemail, a cell? Does it ever just not get picked up at all?"
→ They answer → **node: frequency**

**Node: frequency**
SAY: "How often does that happen — in a given week?"
→ They answer → **node: ticket**

**Node: ticket**
SAY: "Do you have a rough sense of what one of those calls is worth if it turns into a job?"
→ They answer → **node: monthly-gap**

**Node: monthly-gap**
SAY: "So if a handful of those are slipping through every week — what's that running you a month?"
→ They say a number → **node: previous-attempts**

**Node: previous-attempts**
SAY: "What's kept you from solving it before now — just the timing, or is it harder than it looks to find the right person?"
→ They answer → **node: why-now**

**Node: why-now**
SAY: "What made now the time to post for this — was there a specific moment, or has it just been building?"
→ They answer → SECTION 3 (temperature-check)

---

## SECTION 3 — Pain Amplification
*id: pain | color: var(--accent-orange) | kind: branch*

**Node: temperature-check**
SAY: "So on one side — what's been slipping. On the other — every call caught, every job booked. What does that gap actually look like?"
→ "They gave real numbers / engaged" → **node: consequence**
→ "Vague / not sure / minimizing" → **node: name-pain**
→ "We're fine / not a big deal" → SECTION 4 (node: handoff-bridge)

**Node: consequence**
SAY: "So just to make sure I've got this right — when it goes to voicemail, that's not just a missed call. That's probably a job that goes to whoever picks up next. Is that kind of what you're seeing?"
→ "Yeah, exactly" → **node: gap-build**
→ "Sometimes / kind of" → **node: gap-build**

**Node: name-pain**
SAY: "Most [niche] owners I talk to, even when they feel on top of it, are losing three to five jobs a week they never even know about. Does that resonate at all, or do you feel like you've got it covered?"
→ "Yeah, probably / fair" → **node: gap-build**
→ "We're pretty good honestly" → SECTION 4 (node: handoff-bridge)

**Node: gap-build**
SAY: "So on one side — [their number] calls a week going unanswered, [their estimate] per job. On the other side, every one of those gets picked up, every estimate gets booked. What does that gap look like over a month?"
→ They say a number → **node: year-out**

**Node: year-out**
SAY: "If nothing changed — same volume, same leakage — what does that add up to by this time next year?"
→ They answer → **node: flip**

**Node: flip**
SAY: "And if that gap closed — every call answered, no jobs slipping — what would that actually change for [Business Name] day to day?"
→ They answer → SECTION 4 (node: handoff-bridge)

---

## SECTION 4 — Handoff
*id: handoff | color: var(--accent-green) | kind: branch*

**Node: handoff-bridge**
SAY: "Okay — here's what I want to do. Everything you just told me — the volume, what's slipping, your typical job value — I'm going to pass all of that to our team, who works specifically with [niche] businesses on this exact problem."

→ [auto-advance] → **node: frame-call**

**Node: frame-call**
SAY: "They're going to review your situation before the call and put together what would actually make sense for [Business Name] — not some generic package. It's 15 minutes."

→ [auto-advance] → **node: time-ask**

**Node: time-ask**
SAY: "Does [Tuesday morning] or [Wednesday afternoon] work better for you?"
→ "Tuesday / morning works" → **node: lock-time**
→ "Neither / let me think" → SECTION 5 (node: obj-send-info)
→ "Just send me some info" → SECTION 5 (node: obj-send-info)
→ "I don't have time this week" → SECTION 5 (node: obj-no-time)
→ "Who is this / what company?" → SECTION 5 (node: obj-who-is-this)
→ "How much does this cost?" → SECTION 5 (node: obj-how-much)

**Node: lock-time**
SAY: "What time on [day] works — morning or afternoon?"
→ They give time → **node: confirm-number**

**Node: confirm-number**
SAY: "[Day] at [time] — perfect. I'll send you a quick text right now to confirm. What's the best number for that?"
→ They give number → **node: close-confirm**

**Node: close-confirm**
SAY: "Got it. Our team will have everything you told me today in front of them before the call — you won't have to re-explain anything."
→ END ✅

---

## SECTION 5 — Booking Objections
*id: objections | color: var(--accent-purple) | kind: branch*

**Node: obj-send-info**
SAY: "Yeah, totally — I can do that. The thing is, anything I send is going to be pretty generic. The stuff that actually matters is specific to what you just told me about your setup — that's exactly what our team would be working from. Easier to just grab 15 minutes and have them walk you through it directly."
→ "Okay, fair" → **node: time-ask** (back to handoff)
→ "I still want to see something first" → **node: obj-send-info-2**

**Node: obj-send-info-2**
SAY: "Can I ask — are you actually going to read it? Because I know how packed inboxes get, and I don't want to put something together that just disappears in there. That's why I'd rather get you 15 minutes with someone who can actually answer your questions."
→ "Okay fine" → **node: time-ask** (back to handoff)
→ "Yeah, still want it" → **node: obj-send-info-3**

**Node: obj-send-info-3**
SAY: "Okay — I'll send it over today. And I'm going to drop a 15-minute placeholder on your calendar for [day]. If you read it and it's not worth your time, just decline — no hard feelings. If it's interesting, we're already set."
→ "Okay" → END (send email + placeholder)

**Node: obj-no-time**
SAY: "No problem — what works better, [Tuesday of next week] or [Wednesday of next week]?"
→ Picks a day → **node: lock-time** (back to handoff)
→ "Those don't work either" → **node: obj-no-time-2**

**Node: obj-no-time-2**
SAY: "Got it — what's a better week for you?"
→ They give a week → END (log callback)

**Node: obj-who-is-this**
SAY: "We work with [niche] businesses specifically on the call-coverage issue we just walked through. Our team builds out what that looks like for your exact setup — that's the point of the call."
→ "Okay" → **node: time-ask** (back to handoff)

**Node: obj-how-much**
SAY: "Honestly depends on your call volume and setup — which is exactly what our team figures out on the call. That's why I didn't want to guess at a number before they've seen your actual situation."
→ "Okay" → **node: time-ask** (back to handoff)
→ "I just need a ballpark" → **node: obj-how-much-2**

**Node: obj-how-much-2**
SAY: "The range is wide depending on what you need, which is exactly why the call is worth 15 minutes — they'll give you a real number based on what you just told me."
→ "Fine" → **node: time-ask** (back to handoff)

**Node: obj-hard-stop**
SAY: "No problem — sounds like the timing just isn't right. When would be better — is [next month] more realistic, or closer to [later season]?"
→ They give a date → END (log callback)

---

## Token Reference

| Token | Filled from |
|-------|-------------|
| `[First Name]` | Lead first name |
| `[Business Name]` | Lead business name |
| `[niche]` | Lead niche |
| `[receptionist / dispatcher / front desk]` | Lead job posting type |
| `[their number]` | Setter fills in during call |
| `[their estimate]` | Setter fills in during call |
| `[Tuesday morning]` / `[Wednesday afternoon]` | Current week + 1 |
| `[day]` / `[time]` | What prospect picked |

[[ohvara-setter-discovery-script]] · [[LIVE_STATE]] · [[North Star]]
