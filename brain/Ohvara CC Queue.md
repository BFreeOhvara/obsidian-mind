---
date: 2026-09-30
description: "The live CC task queue for Ohvara — open build items only, written by the manager/Cowork chat, emptied by CC on ship. The one file CC reads at session start for \"run the next Ohvara task.\" Mirrors [[Restorix CC Queue]]'s same split."
tags:
  - ohvara
  - cc-queue
---

# Ohvara CC Queue

> **The live task queue for CC (the builder), Ohvara side.** Manager/Cowork chats (Eagle/Falcon) **append** prompt specs here; CC executes top to bottom, **deletes each item the moment it ships**, and writes the full record to [[Memories]]. An empty queue below means there is nothing for CC to do — check [[North Star]]'s Current Focus instead.
>
> **Why this is its own file** (added 2026-09-30, mirroring [[Restorix CC Queue]]'s own fix from 2026-09-01): keeps ownership clean — manager chats own this file, CC owns [[LIVE_STATE]] + [[Memories]] — and keeps it small enough to read whole, append to, and re-read to verify in seconds. Also closes a real gap Brayden hit the same day: Ohvara's queue used to live inside a "Next Up for CC" section of the combined [[LIVE_STATE]] file, and saying "run the next Ohvara task" had no file name of its own to point at the way "run the next Restorix task" does — genuinely easy to get confused with, or for a queued item to get lost in unrelated edits to the same shared file. Splitting it out gives Ohvara the same unambiguous queue file Restorix already had.
>
> **Rules for whoever writes here:**
> - Write into the **connected local vault folder** `C:\Users\freem\obsidian-mind`, never a clone. Confirm it's attached first.
> - After writing, **re-read this file from disk** and confirm your text is present before telling Brayden it's queued.
> - **CC: re-read this file from disk immediately before any write that removes a completed item — not just once at session start.** This file gets appended to by manager chats *while CC is still mid-task*, so a stale in-memory copy from session start can silently revert a newly-queued item when CC's own ship-sweep writes back "item shipped, remove it." This has already happened twice (Prompts 683 and 686 both vanished this way, had to be manually re-added after Brayden caught CC saying it couldn't find the next task). Re-reading right before every write that modifies this file — not just the first read of a session — is the actual fix.
> - **Numbering:** next prompt number = one past the highest referenced anywhere in the vault — the counter is shared across Ohvara AND Restorix. Check [[LIVE_STATE]] + [[Memories]] AND [[Restorix LIVE_STATE]] + [[Restorix Memories]] + [[Restorix CC Queue]] before assigning a number.
> - One `## Prompt NNN — <title>` heading per item. Put the full spec inline. Order = execution order.
> - **Committing this file:** CC's Ohvara session has standing `git add`/`commit`/`push` permission as of 2026-10-01 (added after the Prompt 664 blocker), so CC's own next ship sweeps up and commits whatever's sitting here uncommitted — a manager chat queuing an item does **not** need to separately commit/push it by hand. (Historical note: this rule originally asked for an immediate manual commit, after an uncommitted queue edit got wiped on 2026-09-30 — the real cause turned out to be the device-bridge connection itself dropping mid-write, not uncommitted git state, and a manual commit wouldn't have protected against that anyway. The re-read-to-verify rule above is the real safeguard.)

## Prompt 696 — No-answer recovery: text → text → one locked retry call → confirm number → morning+evening text next day → hand off to the agent

> **✅ BUILT 2026-10-04 (CC, `95c04b0`, migration 122) — everything up to the SMS blocker.** Texting is OFF (`recovery_config.sms_live = false`), so no lead enters the flow yet. **Remaining, waits on Brayden:** an SMS-capable Twilio number registered for A2P 10DLC, then flip "Texting live" in Settings → Text follow-up (admin card; it also shows whether the configured number is SMS-capable). Until then, CC skips this item. Detail: [[Memories]] 2026-10-04 "P696".

**Blocked on a real external step, same category as Stripe/Twilio-voice (Prompts 393/666/673): needs an SMS-capable Twilio number registered for A2P 10DLC before any SMS actually sends.** CC should build everything up to that point and stop there, flagged exactly like those — don't guess at a workaround.

**Sixth and final pass — supersedes the version just before this one in this file. Brayden confirmed this is the last open piece of the design.** Only change from the prior pass is pinning down exact Phase 2 timing.

**Phase 1 — the locked retry day (unchanged):**

1. Original booked call ends in **No answer.** Immediately, a text fires (agent must have the opt-in toggle on, per this prompt's first pass): acknowledges the missed call, says a retry is already locked for the same time tomorrow, gives the self-serve reschedule link (with an "ASAP" option, not just specific times). **If the client uses that link to pick a new date/time, the lead flips straight back to Booked — done, no further steps.**
2. At that same moment, the next-day retry slot is reserved for real in the actual assignment/booking system (Prompt 684's logic) — **must block double-booking.**
3. If no response by the next morning (~9:00–9:30 AM local, configurable): a second text fires, same reschedule link, reminding them of today's scheduled retry.
4. If still no reply: the locked retry call happens at the original time.
   - Resolves → Cancelled, done.
   - No answer again → stays status **No answer**. Full cap on Phase 1: one retry day, two texts, two calls total — not an open loop.

**Checkpoint: pause everything, require the agent to confirm the number.** After the second no-answer, stop all automated texting and stop auto-booking any further retry calls. The lead surfaces with an explicit "Confirm this is the right number for this client" action. Nothing further runs until the agent does that — and the agent can do this at any time of day, which is what this pass pins down.

**Phase 2 — post-confirmation, exactly one day, two texts, then hand off (this is the piece that changed):**

- The agent can confirm the number at any time of day — don't fire anything the moment they confirm. **Wait for the next fresh calendar day after confirmation**, then:
  - A **morning text** (~9:00–9:30 AM local, same default as Phase 1's reminder time), same reschedule link.
  - An **evening text** later that same day (default ~6:00–7:00 PM local — real latitude on the exact hour, Opus's/CC's call, just make it configurable rather than hardcoded) — same reschedule link.
- **If there's no response to either of those two texts by end of that day, the agent gets notified to call the client themselves and try to rebook.** This is the full and final cap on Phase 2 — exactly one day, two texts, no calendar slot reserved at any point in this phase, then a clean handoff to a human. Automation for this lead ends there.

**Surfacing, not a new status:** keep the attempt/phase visible on the No-answer badge wherever it shows (My Pipeline, Needs Attention) — e.g. "No answer · retry tomorrow," "No answer · needs number check," "No answer · follow-up (AM sent)," "No answer · follow-up (PM sent)," "No answer · call agent directly."

**What CC should build now, up to the blocker:**
- The Settings opt-in toggle (unchanged, default off, one-time consent).
- Per-lead attempt tracking: phase (1 or 2), both Phase-1 texts' sent/responded state, the retry call outcome, confirmed-number flag + timestamp, Phase-2's AM/PM text sent/responded state.
- Text 1 (immediate) + the self-serve reschedule link with specific-time and ASAP options, parsed only through that link flow — not freeform reply parsing.
- The real, slot-blocking next-day retry booking — reuse Prompt 684's assignment/slot logic, must prevent double-booking.
- Text 2 (next-morning reminder, ~9 AM default, configurable).
- The hard pause + "confirm the number" agent action after the second no-answer — confirmable at any time, doesn't trigger anything until the next calendar day.
- Phase 2: the next-day AM + PM texts, same reschedule-link mechanism, no calendar slot reserved.
- The final handoff notification to the agent ("call this client yourself and rebook") once both Phase 2 texts are exhausted with no resolution — this ends the automated flow for that lead.
- **Stop at:** a real SMS-capable Twilio number + completed A2P 10DLC registration. Check first whether the existing `CALLER_ID_TWILIO_FROM_NUMBER` is already SMS-capable before assuming a second number is needed. Flag exactly what Brayden needs to go do, mirroring how Prompt 393/666/673's blockers are written, and build/verify everything that doesn't depend on it in the meantime.

Scope note: still layers on top of Prompt 695's No answer status/color/layout work, which stands as-is — this prompt is the automated recovery behavior running underneath that same status.

## Prompt 775 — Phone apps: iPhone + Android store builds, account deletion, push, QR code

**Model: Opus 5.5** (logins, account deletion, push, build/signing setup)

**Goal:** put the portal (all 3 roles, using the P772/P773/P774 phone layouts) in the App Store and Google Play as one app, **"Ohvara"**, without Brayden owning a Mac. Brayden's Apple Developer membership (Individual, Brayden Freeman) is **active as of 2026-10-17**. The Google Play account is not made yet ($25, personal). Build everything that doesn't need his accounts, then stop at the account steps and hand him a checklist.

**1. App shell: Capacitor** (free, open source) in the dashboard repo.
- App id `com.ohvara.portal` (confirm it's free in Identifiers, or flag), name "Ohvara", icon + splash from the existing Ohvara logo, dark splash.
- **Updates without resubmitting:** bundle the Vite build in the app **plus** an over-the-air web update channel (e.g. the open-source `@capgo/capacitor-updater` self-hosted on our own storage, or an equal free option. Research, pick, and say why). Ship JS/HTML/CSS updates OTA, which Apple allows when the app's purpose doesn't change. Native changes still need a store build. **Don't** ship with `server.url` pointed at the live site (Capacitor's docs say that's for dev only, and it's a rejection risk).
- Phone-native polish: safe areas (notch/home bar), status bar color by theme, keyboard doesn't cover inputs, Android back button closes sheets first, pull-to-refresh on Home/Today, an offline screen instead of a blank page. `tel:` opens the dialer. Outside links and **Stripe pages (Connect onboarding, billing portal) open in the system browser sheet**, never inside the app webview.
- **Fulfillment calls inside the app:** Twilio Voice runs in the webview. Add the mic permission text (iOS `NSMicrophoneUsageDescription`, Android `RECORD_AUDIO`). Keep the screen awake during a call, and test what happens when the phone locks or the app goes to the background mid-call. If calls drop, **flag it clearly** with options (keep-awake + warning, or native CallKit later). Don't hide it.

**2. Apple's must-haves**
- **Delete my account** in More (all roles), in-app. Apple guideline 5.1.1(v) requires it. Confirm screen ("type DELETE"). A server-side, security-definer path that: cancels the agent's Stripe subscription, removes login + personal data, and **keeps** the records we're legally required to keep (pay records for 1099s, call recordings during their retention window), tied to an anonymized id. Admin gets an email. Brayden's own admin account can't delete itself from the app. Write down exactly what's deleted vs kept in `brain/Account Deletion.md`.
- **App Review test login:** a demo agent account (+ a demo fulfillment one) on **sample data only**. Bookings made by a demo account never reach the real Fulfillment desk, never place calls or texts, and never charge. Flag the accounts with something like `is_demo` and enforce it **server-side**. Put the logins in the checklist for Brayden to paste into App Store Connect (not in chat or git).
- **No payments in the app.** Inside the native app, billing screens say "Billing is managed on the Ohvara website" and hide plan buy/upgrade buttons. Check Apple's current US rules on outside purchase links at build time and follow them. When unsure, show no link.
- Privacy: a privacy policy URL (use the existing one, or flag if none) + a filled-in draft of Apple's "App Privacy" answers and Google's Data safety form in the checklist.

**3. Push notifications** (the "push later" part of `brain/Ohvara Notifications Plan.md`)
- Firebase Cloud Messaging for Android, APNs for iPhone, via Capacitor push. Store device tokens per user (new table, RLS: users see only their own). Remove a token on sign-out and on account deletion.
- Send push for the **same approved per-role lists** the bell + email use (P767). Same quiet hours (9 PM–8 AM, except money failures). Tapping a push opens the same page the bell row would.
- Settings → Notifications gets a Push on/off per user.
- **Stop at:** the APNs key (Brayden makes it in Certificates, IDs & Profiles → Keys) and the Firebase project. Build and test everything else with fakes.

**4. Cloud builds: Codemagic** (free tier, Mac in the cloud)
- `codemagic.yaml` with iOS and Android workflows: build, sign (automatic signing via an App Store Connect API key), upload to **TestFlight** and the **Play internal testing** track.
- **Stop at:** the App Store Connect API key (Brayden: Users and Access → Integrations → Keys, then add it in Codemagic) and the Google Play service account JSON. Never put keys in git.

**5. "Get the phone app" + QR code**
- One smart link `/app` on our domain: an iPhone opens the App Store link, Android opens Play, anything else shows a small page with both badges + the QR.
- In the portal: a "Get the phone app" row in More (all roles), an item in the desktop user menu, and a card with the QR code. Until store links exist, show "Coming soon".
- Admin can copy the link / download the QR as PNG to send to new people.

**6. Apple "Unlisted"** (invite-only, not searchable): in the checklist, the Unlisted App Distribution request form step. It's done after the first build is approved. Until then, testers use TestFlight links.

**7. Google personal-account rule:** new personal accounts need a **closed test with 12+ testers for 14 days** before going public. Put that in the checklist with a plan (agents + Fulfillment as testers via their Gmail).

**Deliver:** `brain/App Store Launch Checklist.md`. Brayden's steps in order, each with where to click, how long it takes, and what to paste where. Covers: Google Play sign-up ($25, ID check), Firebase project, APNs key, App Store Connect API key, Codemagic account + connecting the repo, creating the app records, screenshots (generate them from the phone layouts at the sizes Apple/Google require and save them in `media/app-store/`), privacy answers, demo logins, submit for review, Unlisted request, Play 12-tester closed test.

**Check before shipping:** build Android locally (debug APK) and run it in an emulator if one is available. Otherwise, a full web check of everything the app touches. Test with fakes: sign in for all 3 roles, the tab bar, sheets, the back button, offline screen, `tel:`, Stripe opening outside the app, account deletion end to end on a **test** user (verify what's gone and what's kept in the DB), demo account can't reach the real desk (try it server-side), push token saved/removed, quiet hours respected, QR link redirects by device. iOS can't build here, so the first Codemagic run is the iOS check: flag it as not checked. **No real calls, texts, charges or emails; never use Brayden's real admin login.**

**Not in this prompt:** CallKit/native calling (only if the background-call test says it's needed), App Store screenshots with marketing text, an LLC/D-U-N-S switch to an Organization account later.
