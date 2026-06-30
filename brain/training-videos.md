---
name: training-videos
description: The 8 approved training video topics for Ohvara appointment setters — Brayden picks the actual videos, transcribes them, sends transcripts to Eagle/Falcon to generate flashcards + quiz questions per video
metadata:
  type: project
---

# Appointment Setter Training Videos

8 topics locked 2026-06-22, **re-angled 2026-06-30** — every topic now anchored to selling AI receptionists/automation specifically (not generic telemarketing). Brayden finds the YouTube videos for each, transcribes them, and sends the transcript text to Eagle/Falcon who then generates:
- Flashcards tied to that video's content
- Quiz questions covering the material
- CC then wires them into the Training Center (unblocks the long-standing Task 2)

## The 8 Topics (in order)

1. **What an AI receptionist does** — plain-terms product knowledge: what it does, why a business owner should care, in 30 seconds
2. **Tonality & delivery** — sounding like a peer who found them a fix, not a telemarketer
3. **The discovery script** — why questions about missed calls beat pitching the AI upfront
4. **Getting past the gatekeeper** — reaching the owner without sounding like "another AI sales call"
5. **Handling objections** — "we already have a system," "AI feels impersonal," "send me an email"
6. **Qualifying the prospect** — missed calls/week × avg ticket = the math that proves the pain is real
7. **Booking & handoff** — framing Nate as the AI/automation specialist, not "the closer"
8. **Time management & call discipline** — structuring the 150-lead day in this specific niche

## YouTube Search Queries (2026-06-30)

1. `"AI receptionist" pitch small business` / `selling missed call text back to local business`
2. `cold call tonality SaaS sales` / `B2B cold call delivery confidence tone`
3. `discovery call questions before pitching SaaS` / `pain point questions cold call script`
4. `getting past the gatekeeper B2B cold call` / `reaching the owner cold call small business`
5. `cold call objection handling "send me an email"` / `SaaS cold call objections script`
6. `lead qualification framework B2B sales` / `qualifying questions before booking demo`
7. `setter to closer handoff script` / `booking the call B2B appointment setting`
8. `cold calling time management 150 calls a day` / `appointment setter daily structure SaaS`

## Candidate Videos Found (Falcon, 2026-06-30, REVISED)

**Brayden's call (2026-06-30):** these leads come from Indeed listings (a real intent signal — business is short-staffed/missing calls), but it's still cold calling by definition (no prior relationship, owner doesn't know the call is coming) — so general cold-call skill content is the right fit for topics 2–8, not AI-receptionist-specific content. The product-specific hook is already baked into the locked script opener, doesn't need its own video.

**Second revision:** also avoid "cold calling" in the title itself — general sales-skill videos preferred, even if cold calling comes up inside the video. Picks below all have clean titles.

1. **What an AI receptionist does** — "AI Receptionist Demo: 24/7 Clinic Booking in Real-Time: Never Miss Another Call" — https://www.youtube.com/watch?v=eqbEvpUBCSk — pure functional demo (AI agent handling real call scenarios, missed-call pain), no business model/pricing/sales talk
2. **Tonality & delivery** — "How To Master Your Tonality" — Sales School with Jordan Belfort — https://www.youtube.com/watch?v=MmvtvsZDKmw
3. **Discovery script** — "How To Ask Discovery Questions To Uncover Business Problems" (Sell Playbook) — https://www.youtube.com/watch?v=SThDd_7Y5Fw
4. **Gatekeeper** — "How To Get Past The Gatekeeper? (Sales Training)" — https://www.youtube.com/watch?v=krveop9O-ik
5. **Objections** — "How To Overcome Any Sales Objection | Best Objection Handling Techniques, Scripts & Psychology" — https://www.youtube.com/watch?v=fAnEnXBtOjU
6. **Qualifying** — "Genius Sales Qualifying Questions: Stop Wasting Time on Bad Leads" — https://www.youtube.com/watch?v=dj3J75I0GYQ
7. **Booking & handoff** — "Appointment Setter Training — 11 More Tips to Book Appointments" — https://www.youtube.com/watch?v=4mrM8GO6SS0
8. **Time management** — "Sales Training: The Exact Daily Schedule Top Reps Use" — https://www.youtube.com/watch?v=ga5_EizLwdw

**Status:** all 8 picked 2026-06-30. Next: Brayden watches/swaps as needed, transcribes, sends transcripts back for flashcard/quiz generation.

## Quiz Spec (locked 2026-06-30)

- **Per-video mini quiz:** 3–5 questions, appears after each video. Purely formative/non-gating — wrong answer shows "incorrect," highlights the correct choice, advances to next question regardless. Never blocks moving on.
- **Final quiz:** one combined 25–30 question quiz covering all 8 videos — this is the one that actually gates training completion (wired into the existing `training_completed` flag mechanism).

## Status
- [x] Brayden + Falcon pick all 8 videos (2026-06-30)
- [x] Prompt 174 queued in [[LIVE_STATE]] — CC wires videos + mini quiz + final quiz structure (placeholder questions, since transcripts aren't ready yet)
- [ ] Brayden transcribes all 8 videos, sends transcripts back
- [ ] Falcon/Eagle generates real flashcards + quiz questions per video from transcripts
- [ ] CC swaps placeholder quiz content for real content

**Why not voicemail strategy:** no-answer leads stay in the pipeline and get called back automatically — voicemail is low priority.
