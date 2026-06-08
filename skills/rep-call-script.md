---
date: 2026-06-07
description: "Generate niche-aware, question-based call scripts for reps before they dial an Indeed lead — surface pain, book discovery call"
tags:
  - skill
  - ai
  - sales
status: planned
---

# Skill: Rep Call Script Generation

**Category:** AI
**Created:** 2026-06-07
**Last used:** 2026-06-07

## What This Skill Does

Generates a niche-aware, question-based call script for reps before they dial an Indeed lead.
Goal of the script: **surface pain, not pitch**. Book a discovery call — nothing else.

## When to Use This Skill

- Rep clicks "Call Now" on any lead in their queue
- Script must be generated before the call, displayed in a slide-out panel

## Claude API Call

```typescript
const systemPrompt = `You are a script writer for Ohvara, an AI automation company.
Write a short, conversational cold call script for an appointment setter calling a business that posted a job on Indeed for a ${jobTitle}.

Rules:
- The rep's ONLY goal is to book a 15-minute discovery call. Nothing else.
- Never explain the product in detail on this call.
- Script must be question-based — uncover pain, don't pitch.
- Tone: friendly, curious, peer-to-peer. Not salesy.
- Keep it under 200 words.
- Include: opener, 2-3 pain discovery questions, objection handling for "not interested", booking ask.
- End with a clear ask to book a specific time.`

const userPrompt = `Business: ${businessName}
Niche: ${niche}
Job they posted: ${jobTitle}
Location: ${location}
Estimated monthly cost of hiring: $${monthlyCost}/mo`
```

## Pain Discovery Questions by Niche

### Transportation (hotshot, tow truck, 18-wheeler, owner-operators)

- "How are you handling dispatch calls when you're on the road?"
- "What happens when a load comes in after hours and nobody picks up?"
- "How many calls do you think you're missing right now in a given week?"

### HVAC / Roofing / Electrical

- "How are you handling inbound calls when your techs are out on jobs?"
- "What happens to leads that call after hours?"
- "Are you losing jobs because nobody answered?"

### General (any niche)

- "How's the search for a receptionist going — finding good candidates?"
- "What's been the biggest headache with coverage?"
- "What does it cost you when a call goes unanswered?"

## Output Format

```
OPENER:
[opening line]

QUESTIONS:
1. [pain question 1]
2. [pain question 2]
3. [pain question 3]

IF THEY SAY NOT INTERESTED:
[objection response]

BOOKING ASK:
[close for discovery call]
```

## Key Rules

- Script is question-based ONLY — reps do not pitch the product
- Rep books the 15-min discovery call, nothing else
- Closer handles the pitch and close on the second call
- Training is optional — reps can start calling immediately with this script

## Related

- [[North Star]] — two-call close sales process
- [[rep-call-script]] links to [[stripe-payment-links]] downstream (closer flow)
- [[ohvara-dashboard]] — slide-out panel UI implementation

## Verified Working

Not yet — to be implemented in dashboard overhaul session
