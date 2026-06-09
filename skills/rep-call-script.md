---
date: 2026-06-07
description: "Generate Profile A niche-aware, question-based call scripts for reps — surface pain, book 15-min discovery call, never pitch"
tags:
  - skill
  - ai
  - sales
status: active
---

# Skill: Rep Call Script Generation

**Category:** AI
**Created:** 2026-06-07
**Last used:** 2026-06-07

## What This Skill Does

Generates Profile A niche-aware, question-based call scripts for reps before they dial.
Goal: surface pain, book 15-min discovery call. Never pitch on this call.
All scripts default to Profile A tone — direct, peer-to-peer, no-nonsense.

## Profile A — Trades & Field Services

Niches: Roofing, HVAC, Electrical, Landscaping, Concrete, Pressure Washing, Hotshot, Tow Truck
Tone: Direct. Like talking to another guy who runs a business. No corporate speak.
Key pain: Missing calls on job sites. Losing jobs to competitors who answer.

## Claude API System Prompt

```typescript
const systemPrompt = `You are a script writer for Ohvara, an AI automation company.

Write a short conversational cold call script for an appointment setter calling a ${niche} business that posted a job on Indeed for a ${jobTitle}.

PROFILE: Trades & Field Services
TONE: Direct, peer-to-peer, no-nonsense. Like talking to another business owner. Never salesy.
GOAL: Book a 15-minute discovery call ONLY. Never pitch or explain the product in detail.
STYLE: Question-based — uncover pain, don't pitch. Get them talking about missed calls and lost jobs.

RULES:
- Under 200 words
- Opener references their Indeed job post naturally
- 2-3 pain discovery questions specific to their trade
- Handle "not interested" objection
- End with a specific ask to book a time
- Never mention price on this call
- Never say "AI" or "automation" until they ask

PAIN QUESTIONS BY NICHE:
Roofing/Electrical/HVAC: "How are you handling calls when your guys are out on jobs?"
Hotshot/Tow Truck: "How many loads do you think you're missing when nobody picks up?"
Landscaping/Concrete: "What happens to leads that call after hours — are those going to voicemail?"
General: "What does it cost you when a call goes unanswered?"

OUTPUT FORMAT:
OPENER: [first line]
QUESTIONS: [2-3 pain questions]
OBJECTION: [handle not interested]
CLOSE: [book the call]`

const userPrompt = `Business: ${businessName}
Niche: ${niche}
Job they posted: ${jobTitle}
Location: ${location}
Estimated monthly cost of hiring: $${monthlyCost}/mo`
```

## Monthly Cost Context (show in script panel)

Always display alongside the script:

- Their estimated monthly hire cost vs our Basic at `$497/mo`
- Example: "They're about to spend `$3,200/mo` on a hire. We start at `$497`."

## Key Rules

- Script is question-based ONLY — reps do not pitch the product
- Rep books the 15-min discovery call, nothing else
- Nate handles the pitch and close on the second call
- Training is optional — reps can start calling immediately with this script
- Profile A only until second closer confirmed

## Related

- [[North Star]] — two-call close sales process, Profile A definition
- [[stripe-payments]] — downstream closer flow after rep books the call
- [[ohvara-dashboard]] — slide-out script panel UI implementation

## Verified Working

2026-06-07 — Profile A scripts, all trades niches
