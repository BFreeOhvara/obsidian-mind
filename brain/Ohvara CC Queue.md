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

---

## Prompt 746 — Bug: "Fulfillment" in the portal opens a completely blank page (`/fulfillment/desk`). Find why, fix it, and make a crashing page show a message instead of a black screen

> **CC note 2026-10-10 (found while running P745):** a likely root cause is already found and fixed in `ohvara-dashboard` `cf802d4`: the desk's local `TONE` in `FulfillmentQueue.jsx` had no `muted` key (P695 set `STAGE.noAnswer.tone = 'muted'`), so any No answer pill threw an uncaught render error and the whole tree unmounted, a blank page (reproduced in a harness). **Still to do here:** sections 3 (error boundaries + chunk-load recovery) and 4 (verify, including the production build and both roles); confirm the cause in the ship note rather than assuming it.

> **✅ Reported by Brayden 2026-10-10 22:17 CT (Falcon session), with a screenshot. Sonnet 5.5; self-flag as Opus-tier if the cause is in the auth / route-guard logic or still unclear after two honest attempts.** This is a live bug and goes **before P745** (Fulfillment Overview v2) in the queue; P745 builds on these routes.

**What Brayden sees.** He clicks **Fulfillment** in the portal and gets a **completely black page**: `portal.ohvara.com/fulfillment/desk`, Opera GX (a normal window, not private), **nothing rendered at all**: no sidebar, no header, no error text. Which account he was on isn't confirmed (Memories: the **admin** nav's "Fulfillment" link points at `/fulfillment/desk`, and the fulfillment rep's own nav "Fulfillment" does too, so **test both**). A page that renders nothing, not even the layout, means either an **uncaught render error that unmounted the whole React tree** (there is no error boundary), a **route guard that returns `null`** for that role, or a **lazy chunk that failed to load**.

### 1. Find the cause (don't guess; reproduce)

- Throwaway harness with mocked auth + data (as before; delete it, never commit), then the **production build** too (`vite build` + `vite preview`, because a minified build or a split chunk can fail where dev doesn't). Load `/fulfillment/desk`, `/fulfillment`, `/fulfillment/pipeline`, `/fulfillment/messages`, `/fulfillment/settings` as **(a) a fulfillment rep and (b) an admin**, fresh load **and** client-side navigation from the sidebar link. Capture `pageerror` and console errors for each. Report which routes go blank.
- **Check these first**, in order of suspicion:
  1. **Something shared changed since the desk last worked.** P741, P742, P743 and P744 shipped today and touched shared files (`AgentUI.jsx` / `OvSelect`, `Sidebar.jsx` collapsed state, `DashboardLayout.jsx`, `index.css`). The desk page or the fulfillment layout may import something that was renamed, removed or now needs a prop. `git log -p` on the files the desk imports, since `d16badb`.
  2. **Route guard / `RoleRedirect` / `ProtectedRoute`** returning `null` (or looping) for an admin on a `fulfillment` route, or for a rep whose profile hasn't loaded yet.
  3. **A stale lazy chunk:** if routes are `React.lazy`, a tab opened before a deploy asks for a chunk hash that no longer exists, the dynamic import rejects, and with no boundary the screen goes blank. P744 shipped at 21:41 CT and he reported this at 22:17, so this is a live possibility. Look at how the route components are loaded and what Vercel serves for a missing `/assets/*.js` (an HTML fallback served as a script is the classic symptom).
  4. A CSP or blocked-script problem (check `vercel.json` / `index.html`).
- Say in the ship note **which one it was**, with the console line that proves it.

### 2. Fix the cause

Fix what step 1 finds, in the smallest way. If it is the stale-chunk case, the fix is section 3(b), not a cache setting.

### 3. Make this never be a blank screen again (small, do it in this item)

- **(a) Error boundaries.** One around the **routed content inside the layout** (so the sidebar and header stay and the agent can click elsewhere) and one **outermost**, around the whole app (so even a layout crash shows something). The fallback is a centred `.ov-card` in the v16 look: a warning icon, **"This page ran into a problem."**, one line "Reload to try again.", a primary **Reload** button, and a ghost **Go to Overview** (the role's own Overview). Log the error with `console.error` (route + message) so it shows up in the console; no stack trace on screen. Reset the boundary when the route changes. Light and dark; works at 390.
- **(b) Chunk-load recovery.** If a dynamic import of a route fails (`ChunkLoadError`, "Failed to fetch dynamically imported module", "Importing a module script failed"), **reload the page once** automatically (guard with a `sessionStorage` flag keyed to the failed URL so it can never loop; wrap the storage calls in try/catch); if it fails again, show the boundary fallback from (a).
- Don't touch Login, the data hooks or any role's pages beyond what the fix in section 2 needs.

### 4. Verify and log

- `vite build` + eslint clean on touched files. Playwright + local Chrome against the harness **and the production build**, dark and light, 1440 and 390: every route in step 1 for both roles renders its page (no blank, no console error); the sidebar "Fulfillment" link from the admin and from the rep lands on the desk; a hard refresh on `/fulfillment/desk` works; browser Back / Forward work. **Prove the boundaries:** temporarily force a throw in one page (don't commit it) and see the fallback with the sidebar intact, then click Reload and Go to Overview; simulate a missing chunk (block one `/assets/*.js`) and see one automatic reload and then the fallback, not a loop. Agent routes (`/agent`, `/agent/billing`, `/agent/clients`) still render.
- Ship note in [[Memories]]: the root cause, the console line, which roles / routes were affected, what was verified against the harness vs the production build, and that it **wasn't seen logged in on the live site**. Brayden checks: (1) click **Fulfillment** as the account he used and the desk opens; (2) the Fulfillment rep's own sidebar link opens it too; (3) he can reload and navigate normally. If it is still blank on his machine, CC asks for the console error (F12, Console) before changing anything else.
