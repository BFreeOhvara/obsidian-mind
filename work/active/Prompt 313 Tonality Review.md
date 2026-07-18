---
date: 2026-07-18
description: "Line-by-line tonality/wording review of discoveryScript.js — 7 flagged issues with suggested rewrites, no code touched pending Brayden's call"
tags:
  - work-note
  - script
quarter: Q3-2026
status: active
---

# Prompt 313 — discoveryScript.js Tonality/Wording Review

Review-and-report only, per the prompt's own scope note — **no wording or routing changed in `src/lib/discoveryScript.js`**. Read the full 692-line file directly (post-Prompt-312, commit `6af3a25`). Most of the tree reads like real phone talk and was left alone — flagging only what's actually off, not padding this with "sounds fine" notes.

## Findings

### 1. Missing "has" — grammatically broken, repeated 8×
`"...Anything been kind of a headache, or does it feel pretty dialed in?"` — lines 88, 97, 110, 121, 138, 147, 160, 171 (same line, copy-pasted at every opener nesting depth per the established no-cross-reference pattern).

"Anything been" is missing its auxiliary verb — reads like a dropped word, not natural casual speech. Highest-leverage fix in the file since it's the single most-repeated line (8 sites) — one wording fix cleans all 8.

**Suggested rewrite:** `"Quick question — how's it going handling calls day-to-day? Is anything kind of a headache, or does it feel pretty dialed in?"`

### 2. Register mismatch — one exit line is notably more formal than every other
`"My apologies for the mix-up — have a good one."` — line 184.

Every other exit line in the file is casual/Southern-inflected ("man," "no worries," "yeah 100%," "Okay man, well have a good day"). "My apologies for the mix-up" is the one place the voice shifts to formal-polite, and it stands out on a read-through of the whole tree.

**Suggested rewrite:** `"Ah, my bad — wrong number. Have a good one."`

### 3. Double "Okay" — same word opens two sentences back to back
`"Okay, well, that's a different story then. Okay man, well have a good day, good luck to you."` — lines 221, 229 (Pain Amplification's two "still no" exits).

Reads stuttery when spoken aloud — "Okay... Okay" landing twice in one breath.

**Suggested rewrite:** `"Okay, well, that's a different story then — have a good day, good luck to you."`

### 4. Doubled "anything...anything" — same question phrased worse the second time it's used
`"...is that like anything you're doing anything about, or not important?"` — line 223.

This is the second instance of the same underlying question that appears cleanly at line 215 (`"Is that something you're doing anything about, or not really important to you?"`). The re-ask (after the "trying to sell me a service" pushback) stacks "like anything...doing anything" and drops the parallel phrasing that made the first version work.

**Suggested rewrite:** `"...is that something you're doing anything about, or not important?"` (matches line 215's phrasing so the callback reads intentional, not garbled).

### 5. "Okay, yeah, no worries" — three casual openers stacked in one line
Line 288, the lone site that doesn't use the "No worries —" opener every other fallback in Handoff uses.

**Suggested rewrite:** `"No worries — what's a good time for ya?"` (matches the pattern used everywhere else in the section).

### 6. "situation" as a generic filler noun, reused across 4 sibling Handoff branches
Lines 245, 261, 317, 331 — "help your situation" / "benefit your situation" / "actual situation" / "exact situation," each in a different objection branch. Read individually each is fine; read as a set (which a rep does during training, jumping between branches) the word crutch is noticeable — four different objections all resolve to the same vague noun.

**Suggested rewrite (vary per branch, no code touched yet):**
- L245: "...how it'd actually help *what you're dealing with*."
- L261: "...how this can *actually help you*."
- L317: "...before they've seen *your actual setup*."
- L331 already says "exact situation" right after "what you need" two words earlier in the same line — tightest fix here is just cutting the repeat: "...an accurate number based on what you need. You can decide from there."

### 7. Mixed metaphor in the Handoff pitch (lower confidence — may be intentional)
Line 241, the single longest line in the file: "...that's money slipping through the cracks... Best case, we get that money hole plugged..." — two different physical images ("cracks" vs. "hole") for the same "missed calls = lost money" idea, back to back in one breath.

**Suggested rewrite:** keep one image throughout — either stay on "slipping through the cracks" (drop "hole plugged," e.g. "...you're not leaving any more on the table") or switch entirely to "hole" and drop "cracks" earlier. Flagging as lower-confidence since the file header notes this script is a near-verbatim lift from a real Camden Cash cold-call transcript — if this line is verbatim source material, it may be deliberately kept as-is rather than smoothed.

## Not flagged (reviewed, left alone)

- The Pain Amplification numbers line (214) and its stammering "what, like... That's, I mean..." — this is *good* natural phone speech, not a defect.
- "you don't strike me as the type of person that wants to lose money, right?" (line 293) — reads slightly negging/salesy in isolation but is plausibly verbatim source-transcript language (same caveat as #7); not touching without Brayden's read on whether it's source-faithful.
- All the reused objection-handling motifs from Prompt 312 ("what's kind of holding you back," "no pressure, no commitment... no hard feelings," "All good, man") — these are intentional callback phrases repeated *within* a single call flow, not tonal drift.
- Every fork/branch/route structural line — out of scope per the prompt (text/tone only, no logic changes).

## Next step

Nothing in `discoveryScript.js` changed yet — items 1–7 above are proposed rewrites, not applied fixes. Waiting on Brayden to confirm which of these to actually ship (same judgment-call-needs-signoff pattern as [[Prompt 312]]'s Follow-Up classification, since this is subjective sales-language editing, not a bug).

## Related

- [[ohvara-dashboard]]
