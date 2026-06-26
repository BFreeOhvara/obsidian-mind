---
date: 2026-06-26
description: "Eagle's rewrite of the closer script — bullet-point talking points instead of verbatim lines, consultative/problem-solving framing"
tags:
  - brain
  - closer-script
---

# Closer Script — Rewrite (Bullet-Point Talking Points)

> Replaces the verbatim-sentence version in `closer-script-current-export.md`. Brayden's two notes driving this rewrite: (1) shouldn't feel like explaining the product, should feel like solving their problem — needs client engagement, not a monologue. (2) Nate's a strong salesman, so bullet-point talking points (not word-for-word lines) suit him better — gives him the structure and the key phrase to land, but he delivers it in his own words.
>
> **Format change:** each "line" below is a talking point, not a sentence to read verbatim. Quoted phrases inside a bullet are the one thing that should land close to as-written (an anchor phrase or exact number) — everything else is Nate's own delivery. Questions are marked **[ASK]** — these are non-negotiable, they're what makes it consultative instead of a pitch.

---

## Section 1 — Opener (Reconnect & Confirm Pain)

*Trigger: Start here — every Call 2*

1. Reconnect warmly — drop [Rep Name]'s name, reference that they had a good conversation.
2. **[ASK]** "Sounds like missed calls and stuff falling through the cracks was the big one — is that still the main thing, or has anything changed since you talked to [Rep Name]?"
3. Let them answer fully. Don't jump in. This is the only information you need before the rest of the call.
4. Reflect back specifically what they just said — in their words, not yours — before moving on. ("So really it's [their specific situation] that's costing you the most right now.")
5. If something's changed since the rep call: **[ASK]** "What's shifted?" — then bridge: most of what we built still applies, here's why.

---

## Section 2 — Stack (Problem → Fix, Not Feature Tour)

*Trigger: After pain is confirmed and reflected back*

1. Bridge line: "Based on exactly what you just told me, here's what we'd build for you" — not "here's our stack."
2. Name the core problem in their words again, then introduce AI Receptionist as the direct fix for that named problem — not as a feature list. ("You said calls go to voicemail when your guys are on a job — that's the exact gap this closes: it answers every call, qualifies them, books it on your calendar, day or night.")
3. **[ASK]** "Does that match what you're dealing with, or is there more to it?"
4. If multi-crew/dispatch-heavy: pivot to AI Dispatcher as the lead instead — same fix, but routes to the right tech/driver automatically.
5. **[ASK]** "Does your site have a chatbot or live chat on it right now?" — branch based on answer (already covered / needs chatbot / needs site + chatbot), per the locked exclusion logic.
6. Frame each of the five sub-agents as solving a specific named problem the client already confirmed or obviously has — not as a feature dump. One at a time, with the problem first:
   - "Jobs finish and nobody asks for a review → most clients see 3–5x more reviews in 30 days once this runs automatically."
   - **[ASK]** "How many people would you say call or message and just never book?" → then: "That's what Lead Follow-Up catches — it keeps after them till they do or tell us no."
   - "No-shows costing you a wasted slot? → reminders at 24hr and 1hr cut that in half."
   - "Someone cancels and that slot just sits empty → it auto-offers the spot to your next few upcoming customers, first to say yes gets it."
   - "Quarterly text blast to past customers, zero effort from you, usually books 5-10 jobs a quarter on its own."
3. Close the section: "So none of this is extra software for you to manage — it's just the stuff that's currently costing you money, running in the background instead."
4. **[ASK]** "Anything in there that doesn't fit how you operate, or does it all track?"

---

## Section 3 — Close (Cost of Inaction → Price → Stripe)

*Trigger: After stack is confirmed as a fit*

1. **[ASK]** "Just so I'm clear — what's it actually costing you right now, the calls and jobs that slip through? Even a rough number." — let them say it themselves before you anchor anything.
2. Bridge: "That's exactly the number this is built to fix." Then price: one-time $297 setup, monthly formula-based on what they just told the rep (missed calls/week × avg ticket).
3. State their specific monthly number, tied directly to what they told the rep.
4. Anchor against a hire, not a competitor: "A part-time receptionist alone runs $2,800–$4,000/month. This never calls in sick, never misses a call, and runs five other automations on top." Tie back to the number they gave you in step 1 — show it pays for itself.
5. **[ASK]** "Does that number make sense against what you told me it's costing you right now?"
6. Close: "I'll send two links right now — setup and monthly, 60 seconds to handle both. We start building within the week."
7. If hesitation: **[ASK]** "What's the main thing holding you back — the investment, the timing, or something else?" — handle the real objection, don't re-pitch.
8. If not closing today: lock a specific reconnect time before hanging up.

---

## Implementation Notes for CC

- This replaces the line arrays inside `closerScript.js`'s three sections (Opener / Stack / Close) — same section structure, same `buildCloserScriptFlow` export, just new content per line.
- Lines marked **[ASK]** should render distinctly in the SAY THIS UI if easy to do (e.g. a small "ASK" tag or different accent) — not required, just nice-to-have, don't block shipping the content change on it.
- Bracketed placeholders ([Rep Name], [their specific situation], etc.) work the same way they did in the old script — Nate fills them in live, no new templating needed.
- Keep this as flattened single-line array items per the Prompt 100 format (one bullet = one array entry) so the existing stepper UI keeps working with zero markup changes.

[[LIVE_STATE]] · [[Memories]] · [[closer-script-current-export]]
