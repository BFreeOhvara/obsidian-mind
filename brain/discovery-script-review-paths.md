---
date: 2026-07-06
description: "Eagle-built checklist of every distinct full call through discoveryScript.js — start (opener) to marked outcome (Not Interested / Follow-Up / Appointment Booked), deduplicated so no shared stretch gets walked twice. Built from brain/discovery-script-current-mirror.md (Prompt 243). Brayden walks each path in the live ScriptWalk tool, screenshots anything he wants changed, and tells Eagle either 'no changes' or exactly what to change. Eagle queues confirmed changes as CC prompts — nothing gets built without sign-off."
tags:
  - brain
  - discovery-script
  - review
---

# Discovery Script — Path-by-Path Review Checklist

> **What a "path" is:** a full call, start to finish — from the opening line all the way to whichever outcome gets marked (Not Interested / Follow-Up / Appointment Booked). Not a section-by-section stop. If a path "lands on Vitals" that's not the end of anything — you keep tapping Next through Vitals, Pain, Handoff, Close until a real outcome gets set.
>
> **Path 1 is the spine.** It's the main happy path — every other path below shares most of it and only forks off at one specific point. Each entry after Path 1 is described as: *diverges from Path 1 at [fork], picks [X], then either rejoins Path 1's remaining taps or hits its own ending.* You still have to physically tap through the shared stretch (the live tool has no skip button) — but you already reviewed that content, so nothing there needs a fresh screenshot. Only the diff is new.
>
> **Why 30 entries, not 60+:** every fork in the file gets exactly one entry. Path 1 itself already covers the Opener's O-1 choice, Pain's P-1 choice, and Handoff's H-1 choice in one walk, so those three don't get separate listings. The Opener's "No" branch's "Yes" sub-path (O-9) is byte-for-byte identical to the main "Yeah/speaking" subtree once you're a couple lines in — reviewed as a spot-check, not a full re-walk.
>
> Source: `brain/discovery-script-current-mirror.md`, mirrored from `ohvara-dashboard` commit `4be0da9`.

---

## Path 1 — the spine (main happy path)

- [ ] **Path 1.** Full call, no hesitation anywhere: *"Hey, is this [Business Name]?"* → **Yeah/speaking** → *"I saw you were hiring..."* → **That's me** → *"Are missed calls part of the reason..."* → **Yeah** → Vitals (3 questions, no fork) → Pain (*"you're leaving $[monthly]..."*) → **Engaged / "yeah we should"** → Handoff (*"we'll build you a system..."*) → **Good / shows interest** → *"does [Tuesday morning] or [Wednesday afternoon]..."* → **Picks a time** → Close (day/time confirm, get number, wrap-up) → **▸ Appointment Booked**

This is the one every other path below is described relative to.

---

## Opener forks (diverge early, rejoin the same tail unless noted)

Tail after each of these (unless marked terminal) = Vitals → Pain **Engaged** → Handoff **Good → picks a time** → Close → **Appointment Booked** (i.e., the rest of Path 1, unchanged).

- [ ] **O-2.** Diverges at the qualifier fork → **"Kind of / it's part of it"** instead of "Yeah" → rejoins Path 1's tail → Appointment Booked.
- [ ] **O-3.** Diverges at the qualifier fork → **"No, we've got it covered, just growing"** → then **"Answers, any gap surfaces"** → rejoins Path 1's tail → Appointment Booked.
- [ ] **O-4.** Same fork as O-3 but → **"Genuinely solid, no gap"** → own ending: *"Okay, well, that's a different story then..."* → **▸ Not Interested**. (Terminal — no tail.)
- [ ] **O-5.** Diverges one fork earlier → **"Transferring"** (different re-intro line) → then same qualifier fork as O-1, pick **"Yeah"** → rejoins Path 1's tail → Appointment Booked.
- [ ] **O-6.** Diverges at the "How do they respond?" fork → **"They're not here right now / I'll leave a message"** → own ending: *"No worries — is there a better time..."* → **▸ Follow-Up**. (Terminal — no tail.)
- [ ] **O-7.** Diverges at the "How do they respond?" fork → **"What's this about? / pushback"** → disarm line → **"Engages"** → then same qualifier fork, pick **"Yeah"** → rejoins Path 1's tail → Appointment Booked.
- [ ] **O-8.** Same fork as O-7 but → **"Still shuts it down"** → own ending: **▸ Not Interested** (no spoken line — straight to status). (Terminal — no tail.)
- [ ] **O-9.** Diverges at the very first fork → **"No"** → *"were you hiring for [job title]?"* → **"Confirms/engages"** → *"Are you actively looking?"* → **"Yes"** → reconnects to the identical "How do they respond?" subtree as O-1. Spot-check only: confirm it reconnects correctly — content from here is identical to O-1/O-5/O-7, already reviewed.
- [ ] **O-10.** Same branch as O-9 up to "actively looking" → **"No, not interested"** → own ending: **▸ Not Interested** (no spoken line). (Terminal — no tail.)
- [ ] **O-11.** Diverges at the very first fork → **"Genuinely wrong number/business"** → own ending: **▸ Not Interested** (no spoken line). (Terminal — no tail.)

## Pain forks (Path 1's Opener + Vitals already reviewed — pick up from the Pain fork)

Tail after each of these (unless marked terminal) = Handoff **Good → picks a time** → Close → **Appointment Booked**.

- [ ] **P-2.** At the Pain fork, pick **"Minimizes / we're fine"** → *"what time do you close..."* trap → **"Engages"** → rejoins Handoff/Close tail → Appointment Booked.
- [ ] **P-3.** Same fork as P-2 but → **"Still no"** → own ending: *"Okay, well, that's a different story then..."* → **▸ Not Interested**. (Terminal — no tail.)
- [ ] **P-4.** At the Pain fork, pick **"Pushback, you're trying to sell me a service"** → **"Re-engages"** → rejoins Handoff/Close tail → Appointment Booked.
- [ ] **P-5.** Same fork as P-4 but → **"Still cold"** → competition-framing line → **"Engages"** → rejoins Handoff/Close tail → Appointment Booked.
- [ ] **P-6.** Same fork as P-5 but → **"Still no"** → own ending: *"Okay, well, that's a different story then..."* (same line as O-4/P-3) → **▸ Not Interested**. (Terminal — no tail.)

## Handoff forks (Path 1's Opener + Vitals + Pain already reviewed — pick up from the Handoff fork)

- [ ] **H-2.** At the Handoff fork, **"Good/shows interest"** (same as Path 1) → then **"Still hesitant"** instead of picking a time → **▸ Follow-Up** (plain, no extra logged detail). (Terminal.)
- [ ] **H-3.** At the Handoff fork, pick **"Just send me some info"** → **"Okay, fair"** → picks a time → Close → Appointment Booked.
- [ ] **H-4.** Same as H-3 but at the time-ask, **"Still hesitant"** → *"I'll send it over today... 15-minute placeholder..."* → **▸ Follow-Up (send info + placeholder)**. (Terminal.)
- [ ] **H-5.** At the Handoff fork, "Just send me some info" → **"Still wants info first"** (skips the "okay fair" step) → *"Fair enough... placeholder... if it's interesting, we're already set."* → **▸ Follow-Up (send info + placeholder)** — different line from H-4. (Terminal.)
- [ ] **H-6.** At the Handoff fork, pick **"I don't have time this week"** → picks a day → Close → Appointment Booked.
- [ ] **H-7.** Same as H-6 but **"Those don't work either"** → *"what's a better week for you?"* → **▸ Follow-Up (log the week they gave)**. (Terminal.)
- [ ] **H-8.** At the Handoff fork, pick **"Who is this / what company?"** → **"That's me"** → picks a time → Close → Appointment Booked.
- [ ] **H-9.** Same as H-8 but **"Still hesitant"** → *"I'll send some info over, and if the numbers make sense..."* → **▸ Follow-Up (log pricing pushback, send info)**. (Terminal — this exact line/action repeats verbatim at H-13 and H-15 below.)
- [ ] **H-10.** At the Handoff fork, "Who is this" → **"That's [owner]"** → **"Gives a window"** → **▸ Follow-Up (log the callback window)**. (Terminal.)
- [ ] **H-11.** Same as H-10 but **"Only reachable by email"** → *"what's the best email?"* → **▸ Follow-Up (logged email, thanked and exited)**. (Terminal.)
- [ ] **H-12.** At the Handoff fork, pick **"How much does this cost?"** → **"Okay"** → picks a time → Close → Appointment Booked.
- [ ] **H-13.** Same as H-12 but **"Still hesitant"** → identical line/action to H-9 → **▸ Follow-Up (log pricing pushback, send info)**. Spot-check routing only — content already reviewed at H-9. (Terminal.)
- [ ] **H-14.** At the Handoff fork, "How much does this cost?" → **"Just need a ballpark"** → picks a time → Close → Appointment Booked.
- [ ] **H-15.** Same as H-14 but **"Still hesitant"** → identical line/action to H-9/H-13 → **▸ Follow-Up (log pricing pushback, send info)**. Spot-check routing only. (Terminal.)

---

## Endings Index — same idea, other direction

The path list above collapses stretches that **start** the same way. This is the same thing from the **ending** side: every path eventually hits one of 3 outcomes, and several hit the *exact same terminal wording*, not just the same status.

**Appointment Booked** — one true ending, reached 6 ways (Path 1, O-2/O-3/O-5/O-7 via their tails, H-3/H-6/H-8/H-12/H-14). Close is identical every time — reviewed once via Path 1.

**Not Interested — two flavors**
- *With a spoken exit line* ("Okay, well, that's a different story then..."): **O-4, P-3, P-6** — identical wording all three times.
- *Silent, straight to status*: **O-8, O-10, O-11** — no line at all before hanging up. Worth deciding during review whether that's intentional.

**Follow-Up — mostly distinct, one exact triplicate**
O-6, H-2, H-4, H-5, H-7, H-10, H-11 are all worded/logged differently — each needs its own look. But **H-9, H-13, H-15 are byte-for-byte identical** (same line, same logged detail) — review once at H-9.

---

## Related

- [[discovery-script-current-mirror]] — the exact source this checklist was built from
- [[setter-script-v3-camden-style]] — the script's shipped-changes history
- [[LIVE_STATE]] — current queue
