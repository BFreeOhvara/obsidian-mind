---
date: 2026-07-16
description: "Real phone-viewport screenshots of every main rep page, captured to turn Brayden's 'mobile doesn't look good' into a concrete punch list"
tags:
  - work-note
  - mobile
quarter: Q3-2026
status: active
---

# Prompt 292 — Mobile Screenshot Audit

Investigate-only per the queued prompt — no fixes were built off this note. Screenshots live in `work/active/prompt-292-screenshots/`. Captured with Playwright (already a dev dependency in `ohvara-dashboard`) against a throwaway harness — real page components mounted with a mocked auth context + pre-seeded react-query cache instead of a real login (credential entry is still hard-blocked for CC). All harness scaffolding (a temporary `AuthContext` export, a `QaHarness292.jsx` component, its `App.jsx` routes) was reverted before this note was written — `git status` on `ohvara-dashboard` is clean, nothing shipped from this prompt.

Viewport: iPhone 13 (390×844, real mobile UA) for everything except the Mobile App modal's QR view, which only exists on a desktop-width viewport (1280×800) — see note on image 12 below.

## Screenshots + observations

### 1. Login
![[prompt-292-screenshots/01-login.png]]
Clean. No issues.

### 2. My Leads
![[prompt-292-screenshots/02-my-leads.png]]
**Real issue, unaddressed by any shipped prompt:** the 4-card KPI row (Calls Today / Booked Today / Booking Rate / Follow-Ups Due Today) doesn't reflow at all below `md` — each card is too narrow for its own label and sub-text, so "FOLLOW-UPS DUE TODAY" and "Callbacks scheduled for today" wrap across 3-4 lines each, making the row very tall and cramped. The clock badge top-right also wraps to 2 lines ("1:38" / "PM"). The status filter tabs (New/Appointment Booked/Follow-Up/No Answer/Not Interested/All) are squeezed into a scrollable strip next to a fixed-200px-wide search box, so only "New 2" and a clipped "Appoint…" are visible before the tabs run out of room. Prompts 288-290 fixed the sidebar, CallModal, and the lead rows themselves — this KPI/filter header row was never in scope for any of them.

### 3-10. Training Center (all 5 tabs)
![[prompt-292-screenshots/03-training-script.png]]
Script tab: content stacks cleanly, script cards read fine. The tab bar itself (Script/Videos/Flashcards/Final Exam/AI Roleplay) does wrap onto 3 rows already, but it's sized `width: fit-content` — on a 390px phone that leaves a large dead-space gap to the right of the tab bar, looking unbalanced/half-empty rather than using the full width.

![[prompt-292-screenshots/07-training-videos.png]]
Videos tab: layout is fine, single-column video cards. One cosmetic thing: the video thumbnail image crops the top line of its own overlay text ("Set up your AI answering service in under 10 minutes" loses the "S" in "Set") — looks like a source-asset/aspect-ratio crop, not a layout bug, but flagging since it's visible on every video card at this width.

![[prompt-292-screenshots/08-training-flashcards.png]]
Flashcards tab: clean. Category filter pills wrap into a tidy 3-column grid, no overflow.

![[prompt-292-screenshots/09-training-final-exam.png]]
Final Exam tab: clean. The 3 stat boxes (Questions/To Pass/Videos Covered) wrap into a row that fits comfortably.

![[prompt-292-screenshots/10-training-roleplay.png]]
AI Roleplay tab: rendered its "Coming Soon" placeholder in this harness rather than the live roleplay flow — the `useCapability` feature flag wasn't set and a live voice call can't be exercised in a static harness anyway, so **this tab's real in-call UI is still unverified on mobile**. The placeholder itself lays out fine (centered, no overflow).

### 4. My Commissions
![[prompt-292-screenshots/04-my-commissions.png]]
**Real, visually broken bug:** the 3 KPI cards (Total Earned / Closed Deals / Avg Per Deal) don't wrap or shrink at all below `md` — the row is wide enough that the first card's value overflows directly into the second card's space. "$1,450" (Total Earned) and "3" (Closed Deals) render right next to each other with no visual separation, reading as "$1,4503" at a glance. This is the exact gap flagged as still-open in Prompt 290's log ("My Commissions' KPI row needs flexWrap") — now confirmed visually, and it's worse than a text-wrap annoyance, it's a genuine data-legibility bug.

### 5. Settings
![[prompt-292-screenshots/05-settings.png]]
Confirms Prompt 293 shipped correctly: Account section shows Full Name / Username / Email, no phone field. Two small things: the Email input's value clips at the box's right edge ("dana@example.cor" — cuts off ".com"'s last letter) since the box isn't wide enough for a typical email at this width; and the "Change password" button label wraps to 2 lines ("Change" / "password") because the button isn't sized to fit its own text on mobile.

### 6. Mobile App modal — instructions branch (mobile viewport)
![[prompt-292-screenshots/06-mobileapp-instructions.png]]
Confirms Prompt 291's issue #1: the modal surface is a translucent "glass" background, not fully opaque — the page's ambient background glow is faintly visible through/around the modal edges. Also a smaller new finding: in the iOS instructions, step 1 ("Tap the [Share icon] Share icon in Safari's toolbar") wraps awkwardly — the inline icon drops to its own line, splitting one sentence into 3 disjointed lines instead of flowing inline with the text around it.

### 12. Mobile App modal — QR branch (desktop viewport, 1280px)
![[prompt-292-screenshots/12-mobileapp-qr-desktop.png]]
Captured at desktop width deliberately — the QR branch only renders when `isMobileDevice()` is false, so it can't exist on a phone-width capture at all (the phone-viewport capture with a real mobile UA correctly showed the instructions branch instead, image 06 above). Confirms Prompt 291's issue #2 exactly: only the QR code and "Scan to install" text show, no install instructions alongside it.

### 11. Call Now / Script Walk modal
![[prompt-292-screenshots/11-callmodal-scriptwalk.png]]
This is Prompt 289's already-shipped fix holding up well on a real device viewport — contact info, status dropdown, "Say This" script line, and the Back/Start Over/Done footer all stack cleanly with zero overflow. One minor thing: a long business name ("Riverside Plumbing & Heating Co") truncates with an ellipsis in the header — expected/acceptable, just noting it's the one spot in this modal where text doesn't fully display.

## Summary — punch list for follow-up prompts

Ranked roughly by how broken it looks, not by build effort:

1. **My Commissions KPI row** — text overlap/collision, not just cramped. Already known-open from Prompt 290; this note adds visual proof.
2. **My Leads KPI row + filter/search row** — new finding, never in scope for Prompts 288-290. Cards need to reflow (stack or shrink), filter tabs need room or their own overflow pattern instead of fighting the search box for space.
3. **Mobile App modal** — both issues already queued as Prompt 291 (opaque background, QR view needs instructions). This note adds one more small finding (the wrapping Share-icon instruction line) worth folding into that same prompt.
4. **Settings** — Change Password button text-wrap, Email input clipping. Small, low-effort polish.
5. **Training Center tab bar** — `fit-content` width leaves dead space on mobile once wrapped to 3 rows. Cosmetic, low priority.
6. **AI Roleplay tab** — genuinely unverified on mobile (couldn't exercise the live flow in this harness). Needs a real device/session test before assuming it's fine, separate from a code fix.
7. **Video thumbnail crop** — likely a source-asset issue, not a layout bug. Lowest priority, may not be worth a prompt at all.

## Related
[[North Star]] · [[Memories]]
