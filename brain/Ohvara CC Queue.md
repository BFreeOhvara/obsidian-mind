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
> - **Numbering:** next prompt number = one past the highest referenced anywhere in the vault — the counter is shared across Ohvara AND Restorix. Check [[LIVE_STATE]] + [[Memories]] AND [[Restorix LIVE_STATE]] + [[Restorix Memories]] + [[Restorix CC Queue]] before assigning a number.
> - One `## Prompt NNN — <title>` heading per item. Put the full spec inline. Order = execution order.
> - **git commit + push this file right after editing it, don't leave it as an uncommitted local change** — an uncommitted queue edit sitting next to CC's own uncommitted state edits in the same repo is exactly what let a queued item get wiped out on 2026-09-30, before this file existed.

## Prompt 662 — Ohvara Dashboard: remove the service worker entirely (keep the installable icon)

Context for CC: Brayden hit the exact Prompt-420 symptom again on Prompt 661's deploy — shipped, Vercel confirmed READY/production on the right commit, domain alias confirmed pointing at that exact deployment (checked from the Eagle/Cowork side, not guessed), and his own browser still rendered the pre-661 sidebar after a hard refresh. Root cause both times is the same piece of infrastructure: `vite-plugin-pwa`'s `generateSW` strategy (added for installability) binds every navigation to whatever it precached at the service worker's last check-in — including on a manual hard refresh — until the SW notices a new deploy on its own. Prompt 420 already hardened this once (`registerType: 'autoUpdate'`, an explicit 30-minute `updateSW()` poll, a `controllerchange` listener that force-reloads once) and it still recurred. Two confirmed occurrences of the same class of bug against a one-person build cadence is enough to call the mitigation insufficient rather than keep patching it a third time.

Compare `restorix-portal` (same Vercel team, same Brayden, same deploy cadence): Prompt 528 gave it a real installable `manifest.json` + full icon set ("Add to Home Screen" produces a proper app icon/name) with **no service worker at all** — the comment in its `index.html` says so explicitly: offline caching was a deliberately separate, unrequested piece of scope. Restorix has never shown this symptom, because nothing intercepts navigation — every load just hits the network. That's the working pattern to copy.

**Ask:** Remove `vite-plugin-pwa` and the generated service worker from `ohvara-dashboard` entirely. Delete the `VitePWA()` plugin block from `vite.config.js` and the service-worker registration block from `main.jsx` (the `registerSW`/`updateSW`/`controllerchange` logic — all of it, not just the polling). Keep a plain `manifest.json` (or let the plugin removal regenerate an equivalent static one) plus the existing icon set so "Add to Home Screen" still produces a real icon, matching Restorix's own Prompt 528 approach. This is a removal, not a new workaround — nothing in the current feature set (agent Submissions + the Cancellations queue) needs offline support, so there's no real capability being traded away right now. If genuine offline use ever becomes a real requirement, that's a deliberate future prompt, not a default to build around.

One thing to flag back to Brayden once shipped, not something to solve in code: anyone with the app already open from before this deploy is still running the OLD, currently-stuck service worker — the new deploy removes the SW going forward, but an already-registered old SW doesn't uninstall itself. Whoever hits this needs one manual unregister (DevTools → Application → Service Workers → Unregister → reload, or fully close the tab/installed app and reopen) to shed it for good. Worth a one-line heads-up in the completion note so it isn't mistaken for the fix not working.
