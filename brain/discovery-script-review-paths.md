---
date: 2026-07-06
description: "Eagle-built checklist of every distinct path through discoveryScript.js, deduplicated so no path is walked twice for the same content — built from brain/discovery-script-current-mirror.md (Prompt 243). Brayden walks each path in the live ScriptWalk tool and calls out changes per path; Eagle queues confirmed changes as CC prompts."
tags:
  - brain
  - discovery-script
  - review
---

# Discovery Script — Path-by-Path Review Checklist

> **How this works:** 32 paths below cover every fork option in the current script exactly once. Walk each one in the live ScriptWalk tool (Training Center → Practice, or a real/test call), then tell me either "no changes" or exactly what to change. I'll log each answer and queue the confirmed changes as CC prompts once you're done with a section (or the whole list) — nothing gets built without you signing off on it first, per your instruction.
>
> **Why only 32, not 60+:** the Opener section's back half is duplicated wholesale in two places in the actual code (the "No" branch's "Yes" sub-path is byte-for-byte identical to the main "Yeah/speaking" path once you're past the first couple lines). Rather than making you re-walk and re-approve identical content twice, I collapsed those into one full review + a quick "does it reconnect right" spot-check. Every fork option in the file is still hit at least once — nothing is skipped, just not duplicated.
>
> Source: `brain/discovery-script-current-mirror.md`, mirrored from `ohvara-dashboard` commit `4be0da9`.

---

## Section 1 — Opener (11 paths)

- [ ] **O-1.** Opener → "Yeah/speaking" → "That's me" → "Yeah" (qualifier) → *lands on Vitals*
      The core happy path. Covers the opening line, the confirm fork, the Indeed-listing hook, the "how do they respond" fork's "That's me" option, and the qualifier question's "Yeah" option.
- [ ] **O-2.** Same as O-1 but pick **"Kind of / it's part of it"** at the qualifier fork → *lands on Vitals*
- [ ] **O-3.** Same as O-1 but pick **"No, we've got it covered, just growing"** → then **"answers, any gap surfaces"** → *lands on Vitals*
- [ ] **O-4.** Same as O-3 but at the gap-check, pick **"Genuinely solid, no gap"** → *Not Interested* (terminal)
- [ ] **O-5.** Opener → "Yeah/speaking" → **"Transferring"** → (re-intro hook) → "Yeah" → *lands on Vitals*
      Only reviewing the re-intro hook line itself here — the qualifier fork after it is identical to O-1/O-2/O-3/O-4, already covered.
- [ ] **O-6.** Opener → "Yeah/speaking" → **"They're not here right now / I'll leave a message"** → *Follow-Up* (terminal)
- [ ] **O-7.** Opener → "Yeah/speaking" → **"What's this about? / pushback"** → "Engages" → "Yeah" → *lands on Vitals*
      Reviewing the disarm line + engage fork; the qualifier fork after "Engages" is identical to O-1–O-4, already covered.
- [ ] **O-8.** Same as O-7 but pick **"Still shuts it down"** → *Not Interested* (terminal)
- [ ] **O-9.** Opener → **"No"** → "were you hiring for [job title]?" → "Confirms/engages" → "Are you actively looking?" → **"Yes"** → *reconnects to the same hook as O-1*
      Spot-check only — confirm it reconnects to the identical subtree already reviewed above. No need to re-walk That's me/Transferring/etc. again from here.
- [ ] **O-10.** Opener → "No" → "were you hiring" → "Confirms" → "actively looking" → **"No, not interested"** → *Not Interested* (terminal)
- [ ] **O-11.** Opener → "No" → **"Genuinely wrong number/business"** → *Not Interested* (terminal)

## Section 2 — Vitals (no forks, one path)

Vitals is linear — 3 questions (monthly call volume, daily misses, ticket value), always routes straight to Pain. Any Opener path above that lands on Vitals already exercises it; no separate path needed, just confirm the 3 questions read right and the two number-captures (missed calls/day, avg ticket) work.

## Section 3 — Pain Amplification (6 paths)

- [ ] **P-1.** (from Vitals) → **"Engaged / yeah we should"** → *lands on Handoff*
- [ ] **P-2.** → **"Minimizes / we're fine"** → (the "what time do you close" trap) → "Engages" → *lands on Handoff*
- [ ] **P-3.** Same as P-2 but **"Still no"** → *Not Interested* (terminal)
- [ ] **P-4.** → **"Pushback, you're trying to sell me a service"** → "Re-engages" → *lands on Handoff*
- [ ] **P-5.** Same as P-4 but **"Still cold"** → (competition-framing question) → "Engages" → *lands on Handoff*
- [ ] **P-6.** Same as P-5 but **"Still no"** → *Not Interested* (terminal)

## Section 4 — Handoff & Book (15 paths)

This is the one section with no shortcuts — every objection line is genuinely different wording, so each gets its own full walk.

- [ ] **H-1.** (from Pain) → **"Good / shows interest"** → picks a time → *lands on Close* (the main happy path)
- [ ] **H-2.** Same as H-1 but **"Still hesitant"** → *Follow-Up* (terminal)
- [ ] **H-3.** → **"Just send me some info"** → "Okay, fair" → picks a time → *lands on Close*
- [ ] **H-4.** Same as H-3 but at the time-ask, **"Still hesitant"** → *Follow-Up (send info + placeholder)*
- [ ] **H-5.** → "Just send me some info" → **"Still wants info first"** → *Follow-Up (send info + placeholder)* (direct terminal, different line from H-4)
- [ ] **H-6.** → **"I don't have time this week"** → picks a day → *lands on Close*
- [ ] **H-7.** Same as H-6 but **"Those don't work either"** → *Follow-Up (log the week they gave)*
- [ ] **H-8.** → **"Who is this / what company?"** → "That's me" → picks a time → *lands on Close*
- [ ] **H-9.** Same as H-8 but **"Still hesitant"** → *Follow-Up (log pricing pushback, send info)*
- [ ] **H-10.** → "Who is this" → **"That's [owner]"** → "Gives a window" → *Follow-Up (log callback window)*
- [ ] **H-11.** Same as H-10 but **"Only reachable by email"** → *Follow-Up (logged email)*
- [ ] **H-12.** → **"How much does this cost?"** → "Okay" → picks a time → *lands on Close*
- [ ] **H-13.** Same as H-12 but **"Still hesitant"** → *Follow-Up (log pricing pushback, send info)*
- [ ] **H-14.** → "How much does this cost?" → **"Just need a ballpark"** → picks a time → *lands on Close*
- [ ] **H-15.** Same as H-14 but **"Still hesitant"** → *Follow-Up (log pricing pushback, send info)*

## Section 5 — Close (no forks, one path)

Linear — confirm day/time, get their number, wrap-up line, sets status Appointment Booked. Any Handoff path ending "lands on Close" above (H-1, H-3, H-6, H-8, H-12, H-14) already exercises it.

---

## Related

- [[discovery-script-current-mirror]] — the exact source this checklist was built from
- [[setter-script-v3-camden-style]] — the script's shipped-changes history
- [[LIVE_STATE]] — current queue
