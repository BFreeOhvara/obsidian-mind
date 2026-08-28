---
date: 2026-08-25
description: "Prompt 535's ready-to-run SQL for No Answer leads rotating straight back to the shared pool at day-end, replacing the old no_answer_queue+24h-redistribute mechanism. Blocked mid-session by the DDL classifier, not implemented. Run manually or resume once DDL access works."
tags:
  - restorix
  - work-note
  - blocked
quarter: Q3-2026
---

# Prompt 535 — No Answer Rotation (Blocked, SQL Ready)

> Blocked before any DDL landed. **Zero schema/function/cron changes were applied** — the Supabase project (`avgvmzshujwphneykuvu`, `restorix-portal`) is in exactly the same state as before this session, for the database side only. The frontend half of Prompt 535 (Pipeline page restructure) is fully shipped — see [[Restorix LIVE_STATE]] CURRENT STATE.

## Why blocked

`apply_migration` was refused twice, identical error both times: `"Blocked by classifier."` Same class of block [[Prompt 515 — Lead Rotation Redesign (Blocked, SQL Ready)]] hit in an earlier session (that one confirmed it was DDL specifically, not a broader Supabase lockout — plain reads and data-only writes went through fine that session; this one didn't retest that distinction since the pattern already matched). Per this project's standing precedent, the right move is to stop and surface it rather than hunt for a workaround.

**Options for Brayden**, same shape as the Prompt 515 doc:
1. **Run the SQL below directly** in the Supabase SQL editor (dashboard, not this pane) — copy-paste ready.
2. **Retry from a session where DDL isn't classifier-blocked** — hand it this doc.

Note: earlier this same session, `deploy_edge_function` hit an identical-looking block and then succeeded on the exact same call after Brayden said "you deploy it" directly in chat — worth trying that first (just ask CC to retry) before falling back to running the SQL by hand, in case this is the same kind of block.

---

## What this fixes

**Current behavior (still live)**: when a setter's day ends, `_do_setter_day_end` moves their No Answer leads into `no_answer_queue` with `available_at = now() + 24 hours`. A separate cron, `redistribute-no-answers` (every 5 min), later hands each of those leads to a **random other setter** — never back to the shared unassigned pool, never to a closer.

**Brayden's ask (Prompt 535 item 5, explicitly the same mechanism as Prompt 534's closer-side rule)**: a No Answer lead should rotate straight back into the genuinely-unassigned pool at the day-end boundary — visible in the admin Pipeline's Unassigned tab, available to anyone (setter refill or closer on-demand request) — not held in a 24h limbo and then privately hand-picked to one specific other setter.

**This is also the shared piece Prompt 534's closer-side day-end rotation needs** — per Brayden's own instruction to define this once and have both prompts reuse it, `_rotate_no_answer_to_pool(p_person_id uuid)` below is written generically (works for a setter's id or a closer's id) so Prompt 534's future `_do_closer_day_end` can call the exact same function rather than growing a parallel copy.

## The SQL

```sql
-- ============================================================
-- prompt535_no_answer_rotates_to_pool
-- Replaces the old no_answer_queue + 24h-later redistribute_no_answers()
-- two-stage handoff with an immediate return to the unassigned pool.
-- _rotate_no_answer_to_pool is deliberately person-agnostic (works for a
-- setter OR a closer's own id) so Prompt 534's closer-side day-end
-- function can call this exact same helper.
-- ============================================================

create or replace function public._rotate_no_answer_to_pool(p_person_id uuid)
 returns integer
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_count int;
begin
  update leads
  set assigned_setter = null, status = 'new', no_answer_at = null
  where assigned_setter = p_person_id and status = 'no_answer';
  get diagnostics v_count = row_count;
  return v_count;
end;
$function$;

revoke all on function public._rotate_no_answer_to_pool(uuid) from public, anon, authenticated;

create or replace function public._do_setter_day_end(p_setter_id uuid)
 returns table(no_answer_rolled integer, refilled integer)
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_tz text;
  v_local_date date;
  v_last date;
  v_new_count int;
  v_due_count int;
  v_needed int;
  v_rolled int := 0;
  v_refilled int := 0;
begin
  perform pg_advisory_xact_lock(hashtext('day_end:' || p_setter_id::text));

  select timezone, last_day_end_date into v_tz, v_last from profiles where id = p_setter_id;
  v_tz := coalesce(v_tz, 'America/Chicago');
  v_local_date := (now() at time zone v_tz)::date;

  if v_last is not null and v_last >= v_local_date then
    no_answer_rolled := 0;
    refilled := 0;
    return next;
    return;
  end if;

  v_rolled := _rotate_no_answer_to_pool(p_setter_id);

  select count(*) into v_new_count from leads where assigned_setter = p_setter_id and status = 'new';
  select count(*) into v_due_count
    from follow_up_queue fq
    where fq.setter_id = p_setter_id and fq.completed_at is null
      and (fq.follow_up_at at time zone v_tz)::date <= v_local_date;

  v_needed := greatest(0, 150 - v_new_count - v_due_count);
  if v_needed > 0 then
    update leads set assigned_setter = p_setter_id
    where id in (
      select id from leads
      where assigned_setter is null and status = 'new'
      order by created_at
      limit v_needed
    );
    get diagnostics v_refilled = row_count;
  end if;

  update profiles set last_day_end_date = v_local_date where id = p_setter_id;

  no_answer_rolled := v_rolled;
  refilled := v_refilled;
  return next;
end;
$function$;

-- redistribute_no_answers() itself is left defined, unscheduled not
-- dropped, matching Prompt 515's own "unschedule, don't delete" convention
-- for retired mechanisms.
select cron.unschedule('redistribute-no-answers');
```

### After running the SQL — verification checklist

- Manually set a test account's `last_day_end_date` back one day and give it a real No Answer lead, then run `select process_all_setter_day_ends();` (or `run_setter_day_end()` JWT-impersonated as that account) — confirm the lead now has `assigned_setter IS NULL, status = 'new', no_answer_at IS NULL`, and shows up in the admin Pipeline's **Unassigned** tab immediately (not 24 hours later).
- Confirm `no_answer_queue` gets zero new rows after this lands (it's dead code now, not deleted).
- Confirm `redistribute-no-answers` no longer appears active in `select * from cron.job where jobname = 'redistribute-no-answers'` (or shows `active = false`, depending on how `cron.unschedule` reports it).
- **Update `FinishDayCard`'s result copy in `Overview.jsx`** (currently reverted back to "moved to 24h hold" specifically because this SQL wasn't live — see the comment left there) to "returned to the unassigned pool" once this migration is confirmed live. One-line change, already written and reverted in commit `1a62c55` on `restorix-portal`.

## What else this round shipped (frontend, no DB dependency)

Already live, independent of the SQL above — see [[Restorix LIVE_STATE]] CURRENT STATE for full detail:
- Admin Pipeline's Unassigned tab now filters `status = 'new'` explicitly and labels its badge "Unassigned."
- Setter tab restructured to exactly 4 sub-tabs (New, No Answer, Not Interested, Follow-up), no "All."
- A real, confirmed-live bug fixed along the way: Follow-up's old sub-tab query was structurally identical to Not Interested's old bug (both null `assigned_setter` by design) — it always returned zero rows. Fixed with a new `last_action_by`-scoped hook, `usePipelineFollowUpLeads`.
- Closer tab completely untouched, per Brayden's explicit instruction.

## Related
[[Restorix LIVE_STATE]] · [[Restorix Memories]] · [[Prompt 515 — Lead Rotation Redesign (Blocked, SQL Ready)]] · [[Prompt 534 — Closer My Leads UI + Rotation Scoping Doc]]
