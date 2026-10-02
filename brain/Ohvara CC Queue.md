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
> - **Committing this file:** CC's Ohvara session has standing `git add`/`commit`/`push` permission as of 2026-10-01 (added after the Prompt 664 blocker), so CC's own next ship sweeps up and commits whatever's sitting here uncommitted — a manager chat queuing an item does **not** need to separately commit/push it by hand. (Historical note: this rule originally asked for an immediate manual commit, after an uncommitted queue edit got wiped on 2026-09-30 — the real cause turned out to be the device-bridge connection itself dropping mid-write, not uncommitted git state, and a manual commit wouldn't have protected against that anyway. The re-read-to-verify rule above is the real safeguard.)

## Prompt 667 — Agent sign-in succeeds but the page doesn't react until reload

**Confirmed real bug, not a guess — evidence already gathered:**
- `auth.users.last_sign_in_at` for `testagent11` (id `3f2b2df7-40b1-4921-80e2-09981c819642`) updated to the exact moment Brayden clicked Sign In, reporting no visible reaction — so `supabase.auth.signInWithPassword()` is succeeding server-side. This is not a credentials, RLS, or `is_active` problem — all checked, all fine.
- Closing and reopening the login page immediately lands him on the right dashboard — so the persisted session + a cold-load profile fetch + redirect chain all work correctly.
- The break is specifically between "the sign-in call resolves" and "the UI reacts" — no error shown, no visible "Signing in…" state Brayden noticed, no navigation.
- **Not a Prompt 665 regression.** 665's own ship note says this path was never live-tested (mock harness only, explicitly flagged: "Brayden should click through as testagent11 for real") and the sign-in/redirect mechanics themselves weren't touched by 665 beyond the post-login target path changing. This looks pre-existing, just never actually hit until now.

**Relevant code:** `src/pages/Login.jsx` (`handleSubmit`, the `useEffect` that calls `navigate()` once `profile` is set), `src/hooks/useAuth.jsx` (the `onAuthStateChange` listener, `fetchProfile`, the `profileUserId.current === session.user.id` dedupe guard).

**Don't guess at a fix — reproduce for real first** with actual console/network output (login as `testagent11` / `nate44@ohvara.internal`). Leading hypothesis to check, not assume: a race where `fetchProfile`'s `profiles` query runs immediately after `signInWithPassword` resolves, before the new session's JWT is fully usable by RLS — failing silently (only `console.error`, nothing surfaces to the `error` state) and leaving `profile` null forever since nothing retries it, versus a cold reload where `getSession()` + `fetchProfile` only run once the session is already fully established. Also check whether this reproduces on admin/fulfillment logins too, or only this account/role — Brayden's only hit it on `testagent11` so far.

Fix the actual root cause. If, after real investigation, a forced reload-after-sign-in genuinely turns out to be the honest fix rather than a bandaid over an unhandled error, say so and why in the ship note.

## Prompt 668 — Security: `profiles_update_self` lets any signed-in user grant themselves admin

Carried over verbatim from Prompt 666's ship note, flagged there as a real finding, not yet fixed: the `profiles_update_self` RLS policy (`auth.uid() = id`, no column restriction) combined with table-wide UPDATE grants lets **any signed-in user** run the equivalent of `update profiles set role = 'admin' where id = auth.uid()` on their own row. That's a live privilege escalation — any agent or fulfillment account (including the test accounts) can currently make themselves admin.

Fix it the same way migration 108 (Prompt 666) protected the new caller-ID columns: a `BEFORE UPDATE` trigger that freezes `role` (and audit for other sensitive columns while in there — `is_active`, `username` if it's used for login resolution, anything else self-writable that shouldn't be) unless `auth.role() = 'service_role'`. Verify in a rolled-back transaction as a non-admin: confirm `role` can't be self-escalated, and confirm an actual admin-performed role change (via the existing admin user-management edge functions / service role) still works end to end.

This is a security fix — prioritize it over cosmetic work, same standard as every other data-integrity prompt in this vault.
