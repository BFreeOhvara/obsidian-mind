---
date: 2026-09-01
description: "The live CC task queue for Restorix — open build items only, written by the manager/Cowork chat, emptied by CC on ship. The one file CC reads at session start."
tags:
  - restorix
  - cc-queue
---

# Restorix CC Queue

> **The live task queue for CC (the builder).** Manager/Cowork chats (Eagle/Falcon) **append** prompt specs here; CC executes top to bottom, **deletes each item the moment it ships**, and writes the full record to [[Restorix Memories]]. An empty queue below means there is nothing for CC to do.
>
> **Why this is its own file** (added 2026-09-01 after a stale-clone incident): keeps ownership clean — manager chats own this file, CC owns [[Restorix LIVE_STATE]] + [[Restorix Memories]] — and keeps it small enough to read whole, append to, and re-read to verify in seconds. See vault-root `CLAUDE.md` → "Reaching Atlas safely".
>
> **Rules for whoever writes here:**
> - Write into the **connected local vault folder** `C:\Users\freem\obsidian-mind`, never a clone. Confirm it's attached first.
> - After writing, **re-read this file from disk** and confirm your text is present before telling Brayden it's queued.
> - **Numbering:** next prompt number = one past the highest referenced in [[Restorix LIVE_STATE]] + [[Restorix Memories]]. Don't reserve numbers anywhere but here.
> - One `## Prompt NNN — <title>` heading per item. Put the full spec inline (or in a `<details>` block). Order = execution order.

---

## Prompt 566 — verify Prompt 558 (My Pipeline layout) is actually live before treating it as new work

**Not a build yet — a check.** Brayden has a screenshot of `/my-pipeline` that looks like the *old* layout (date in header, four stat tiles on the Setter tab, all six status pills). But Prompt 558 ("My Pipeline layout cleanup") shipped 2026-08-29 (`restorix-portal` `main` @ `ad7b031`) and all four of its changes are in current HEAD `f9751c1` — `CloserPipeline` in `src/pages/Overview.jsx` (rendered at `/my-pipeline` via `MyPipeline.jsx`): date removed (~line 494), count subtitle moved to the wrapper above the tab switcher (~line 497), `{!embedded && <TodayStrip/>}` (~line 333), `EMBEDDED_STATUS_KEYS = ['no_answer','follow_up','not_interested']` (~line 245). 558 was shipped **structurally verified only** — closer login was classifier-blocked every session it was worked, so it has never been eyeballed live.

**Do:** log in as a closer (`test_closer` — ask Brayden for the password; `test_client` login worked fine on 2026-08-31 so the classifier block may be lifted), open `/my-pipeline`, and report which layout actually renders in each sub-tab.
- **If the NEW layout renders** → 558 is fine, Brayden's screenshot was stale. Nothing to build. Delete this item.
- **If the OLD layout renders** → 558's changes aren't reaching production. Diagnose: stale Vercel deploy / CDN cache / a render path that bypasses `CloserPipeline` / an actual bug. Fix that — it's a regression, not new feature work.

Full context: [[Restorix Memories]] 2026-09-01 "'New' My Pipeline layout asks = already-shipped Prompt 558".
