---
date: 2026-08-21
description: "Prompt 515's full design + ready-to-run SQL for the lead-rotation redesign — blocked mid-session by the DDL classifier, not implemented. Run manually or resume once DDL access works."
tags:
  - restorix
  - work-note
  - blocked
quarter: Q3-2026
---

# Prompt 515 — Lead Rotation Redesign

> Blocked before any DDL landed. **Zero schema/function/RLS/cron changes were applied** — the Supabase project (`avgvmzshujwphneykuvu`, `restorix-portal`) is in exactly the same state as before this session. See [[Restorix LIVE_STATE]] for the pointer back to this doc.

## Why blocked

Every DDL call this session — `apply_migration` and `execute_sql` alike — was refused by the Claude Code auto-mode classifier: `"Blocked by classifier"`. Confirmed it's DDL specifically, not a broader Supabase lockout:
- `CREATE OR REPLACE FUNCTION public.assign_setter_batches(...)` → blocked
- `ALTER TABLE public.profiles ADD COLUMN ...` → blocked
- `UPDATE profiles SET full_name = full_name WHERE id = '00000000-...'` (a no-op DML probe) → **went through fine**
- `SELECT 1` → went through fine

So reads and plain data writes work; anything that changes schema, functions, RLS policies, or cron jobs does not, this session. Per this project's standing precedent (Prompt 488's `auth.users` delete, Prompt 506's seed-data block), the right move is to stop and surface it rather than hunt for a workaround — done here.

**Options for Brayden**, same shape as Prompt 506's blocked-write entry:
1. **Run the SQL below directly** in the Supabase SQL editor (dashboard, not this pane) — every migration is copy-paste ready, in dependency order.
2. **Retry from a session where DDL isn't classifier-blocked** — if a fresh CC session doesn't hit this, hand it this doc; the SQL is complete and the frontend plan at the bottom tells it exactly what to build afterward.

Nothing below has been executed against the live database except the read-only investigation queries used to design it (schema/RLS/function/cron inspection, and the count query confirming `test_setter` sits at 151).

---

## Part 1 — the confirmed bug

`test_setter` has **151** leads with `assigned_setter` set (and all 151 are `status = 'new'`) against a cap of 150. Root cause, confirmed by reading `assign_setter_batches()`: it reads `needed = pool_size - count(*)` in one statement, then updates up to `needed` rows in a separate statement. Under READ COMMITTED, two concurrent invocations (the 15-min cron overlapping any manual/admin-triggered call to the same function, e.g. during dev/testing) can both read a stale count before either commits, so both proceed to top up — the classic Postgres `UPDATE ... WHERE id IN (SELECT ...)` TOCTOU race, since the subquery's row set is fixed before the outer UPDATE's lock/re-check, and the re-check only re-evaluates `id IN (...)`, not `assigned_setter IS NULL` again. `request_closer_leads()` has the identical read-then-update shape and is exposed to the same race.

**Fix:** serialize per-person via `pg_advisory_xact_lock(hashtext('assign_setter:' || id::text))` at the top of both functions — two concurrent calls for the *same* setter/closer can no longer interleave their read and their update; calls for *different* people never block each other.

## Part 2 — the full redesign

Read `assign_setter_batches`, `redistribute_no_answers`, `process_follow_up_returns`, `handle_lead_pipeline`, `request_closer_leads`, the `leads`/`profiles`/`no_answer_queue`/`follow_up_queue` schemas, the `leads` RLS policies, and the existing cron schedule before designing this — extending the existing architecture, not a parallel system, per the prompt's own instruction.

### Key design decisions (each resolves a real tension in the existing code — flagging the reasoning, not re-litigating it)

1. **No Answer stays assigned until day-end.** Today, `handle_lead_pipeline` nulls `assigned_setter` and inserts into `no_answer_queue` the instant a call is logged as No Answer — so it vanishes from the setter's own view immediately. The new spec explicitly wants it to *stay visible* until day-end. Fix: the `no_answer` branch of the trigger now leaves `assigned_setter` untouched; the queue-insert + null-out moves into the new day-end function.

2. **Follow-Up Due is computed live, not a stored state.** The existing `process_follow_up_returns` hourly cron auto-flips a due follow-up's `status` to `'new'` and re-sets `assigned_setter` — which is exactly the New/Follow-Up-Due conflation the prompt says to avoid. Rather than add a new `lead_status` enum value (an `ALTER TYPE ... ADD VALUE` can't even run in the same transaction as its use — another DDL wrinkle), Follow-Up Due stays `status = 'follow_up'`, `assigned_setter IS NULL` in the DB, exactly like a future follow-up — "due" vs "not due" is purely `follow_up_at`'s date compared against the setter's own local today, computed live wherever it's queried (frontend `useMyFollowUps`, and SQL's day-end refill count). This means **`process_follow_up_returns`'s cron must be unscheduled** — left running, it would silently undo the whole point of a distinct Follow-Up Due tab within the hour. The function itself is left defined (unscheduled, not dropped) in case it's ever wanted again.

3. **A setter can act on a Follow-Up-Due lead even though `assigned_setter` is null for it.** Two knock-on fixes this requires:
   - **RLS**: `leads_update_setter_admin`'s setter branch currently requires `assigned_setter = auth.uid()`. Extended with an `OR EXISTS (... follow_up_queue ... setter_id = auth.uid() AND completed_at IS NULL)` clause so a setter can log an outcome on their own due-or-future follow-up. (Not date-gated in SQL — the frontend gates *which* tab opens the modal; RLS here only needs to prevent cross-setter access, matching this app's existing trust level for a 5-person internal tool.)
   - **Trigger actor resolution**: `handle_lead_pipeline` used `old.assigned_setter` as `last_action_by` everywhere — null for a Follow-Up-Due lead. Now resolves `v_actor := coalesce(old.assigned_setter, (SELECT setter_id FROM follow_up_queue WHERE lead_id = old.id AND completed_at IS NULL ORDER BY follow_up_at DESC LIMIT 1))` once at the top and uses `v_actor` throughout. Also: whenever `old.status = 'follow_up'` and the status is changing away from it (the due lead is finally being worked, in *any* direction — no-answer, not-interested, booked, or rescheduled further out), the old `follow_up_queue` row gets `completed_at = now()` so it stops counting as due/future.

4. **Refill moves from a continuous 15-min cron to a day-end-only step.** Item 5 of the prompt is explicit that day-end "pulls exactly [N] fresh leads... The existing `assign_setter_batches`-style logic is the right place to adapt this from, not a parallel system" — i.e. the refill logic is *relocated* into day-end, not left running in parallel. Keeping both would double-refill and defeat the "bounded day" premise of the whole redesign. So: **`assign-setter-batches`'s 15-min cron is unscheduled** (the function itself stays, callable manually — see bootstrap note below); a new `process-setter-day-ends` cron (`*/15 * * * *`, matching the old cadence) replaces it.

5. **New-setter bootstrap, without a separate signup hook.** With the continuous cron gone, a brand-new setter needs their initial 150-lead pool from *something*. Rather than touch `handle_new_user` (out of this prompt's stated scope), `profiles.last_day_end_date` defaults to `current_date - 1` (yesterday) — so the very first `process-setter-day-ends` tick after signup (within 15 min) sees their local date has "advanced" past that default and runs day-end for them immediately, which (with zero no-answers and zero New leads yet) reduces to exactly the refill step: pull 150 fresh leads. One mechanism serves both bootstrap and steady-state rollover. **Existing** setters get backfilled to `last_day_end_date = current_date` (today) in the same migration, specifically so this doesn't fire an unwanted immediate rollover against their already-seeded, in-progress pool the moment the migration lands.

6. **Idempotency is the same mechanism for both trigger paths.** "Finish Day" (button, calls `run_setter_day_end()` for `auth.uid()`) and the passive midnight path (`process_all_setter_day_ends()`, cron, loops every active setter) both bottom out in the same private `_do_setter_day_end(p_setter_id)`, which no-ops if `last_day_end_date >= today` in that setter's own timezone. Clicking Finish Day mid-afternoon sets `last_day_end_date` to today immediately, so the passive cron won't double-process later that same day, and vice versa — genuinely "the same rotation logic," not two paths that happen to agree.

### Migrations, in order

```sql
-- ============================================================
-- 1. prompt515_fix_assign_batch_race
-- Root-cause fix for the 151-in-150 bug (see Part 1 above).
-- ============================================================

create or replace function public.assign_setter_batches(pool_size integer DEFAULT 150)
 returns TABLE(setter_id uuid, assigned_count integer)
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  s record;
  needed int;
begin
  for s in select id from profiles where role = 'setter' and is_active = true loop
    perform pg_advisory_xact_lock(hashtext('assign_setter:' || s.id::text));

    select pool_size - count(*) into needed from leads where assigned_setter = s.id;

    if needed > 0 then
      update leads set assigned_setter = s.id
      where id in (
        select id from leads
        where assigned_setter is null and status = 'new'
        order by created_at
        limit needed
      );
    end if;

    setter_id := s.id;
    select count(*) into assigned_count from leads where assigned_setter = s.id;
    return next;
  end loop;
end;
$function$;

create or replace function public.request_closer_leads(p_count integer)
 returns integer
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  caller_role user_role;
  current_count int;
  room int;
  actual_count int;
begin
  select role into caller_role from profiles where id = auth.uid();
  if caller_role is distinct from 'closer' then
    raise exception 'Only closers can request leads this way';
  end if;

  if p_count < 0 then
    raise exception 'Count must be non-negative';
  end if;

  perform pg_advisory_xact_lock(hashtext('assign_setter:' || auth.uid()::text));

  select count(*) into current_count from leads where assigned_setter = auth.uid() and status = 'new';
  room := greatest(0, 150 - current_count);
  actual_count := least(p_count, room);

  if actual_count > 0 then
    update leads set assigned_setter = auth.uid()
    where id in (
      select id from leads
      where assigned_setter is null and status = 'new'
      order by created_at
      limit actual_count
    );
  end if;

  return actual_count;
end;
$function$;


-- ============================================================
-- 2. prompt515_trim_setter_overflow  (data fix, run once)
-- Generic — trims ANY setter currently over 150 back to exactly
-- 150 by unassigning their most-recently-created excess leads
-- back to the unassigned pool. Verify afterward with the query
-- below the migration block.
-- ============================================================

with overflow as (
  select l.id,
         row_number() over (partition by l.assigned_setter order by l.created_at desc) as rn,
         count(*) over (partition by l.assigned_setter) as total
  from leads l
  join profiles p on p.id = l.assigned_setter and p.role = 'setter'
  where l.assigned_setter is not null
)
update leads set assigned_setter = null
where id in (
  select id from overflow where total > 150 and rn <= (total - 150)
);

-- Verify: should return zero rows.
-- select assigned_setter, count(*) from leads
-- where assigned_setter is not null group by assigned_setter having count(*) > 150;


-- ============================================================
-- 3. prompt515_no_answer_stays_visible_and_actor_fix
-- See design decisions 1 and 3 above.
-- ============================================================

create or replace function public.handle_lead_pipeline()
 returns trigger
 language plpgsql
 set search_path to 'public'
as $function$
declare
  next_closer uuid;
  v_actor uuid;
begin
  if new.status is distinct from old.status then
    v_actor := coalesce(old.assigned_setter, (
      select fq.setter_id from follow_up_queue fq
      where fq.lead_id = old.id and fq.completed_at is null
      order by fq.follow_up_at desc limit 1
    ));

    if old.status = 'follow_up' then
      update follow_up_queue set completed_at = now()
      where lead_id = old.id and completed_at is null;
    end if;

    if new.status = 'no_answer' then
      new.no_answer_at := now();
      new.last_action_by := v_actor;
      new.last_action_status := 'no_answer';
      new.last_action_at := now();
      -- Prompt 515: stays assigned/visible in the setter's active pool —
      -- no_answer_queue insertion + unassignment now happens at day-end,
      -- not immediately (previously vanished from the setter's own view
      -- the instant it was logged).

    elsif new.status = 'follow_up' then
      if new.follow_up_at is null then
        raise exception 'follow_up_at is required when setting status to follow_up';
      end if;
      new.last_action_by := v_actor;
      new.last_action_status := 'follow_up';
      new.last_action_at := now();
      insert into follow_up_queue (lead_id, setter_id, follow_up_at)
      values (new.id, v_actor, new.follow_up_at);
      new.assigned_setter := null;

    elsif new.status = 'not_interested' then
      new.last_action_by := v_actor;
      new.last_action_status := 'not_interested';
      new.last_action_at := now();
      new.assigned_setter := null;

    elsif new.status = 'appointment_booked' then
      new.last_action_by := v_actor;
      new.last_action_status := 'appointment_booked';
      new.last_action_at := now();
      new.assigned_setter := null;
      new.closer_outcome := 'pending';

      select id into next_closer
      from profiles
      where role = 'closer' and is_active = true
      order by last_closer_assignment_at asc nulls first
      limit 1;

      if next_closer is not null then
        new.assigned_closer := next_closer;
        update profiles set last_closer_assignment_at = now() where id = next_closer;
      end if;
    end if;
  end if;
  return new;
end;
$function$;


-- ============================================================
-- 4. prompt515_add_day_end_tracking
-- See design decision 5 (bootstrap default vs existing-setter backfill).
-- ============================================================

alter table public.profiles
  add column if not exists last_day_end_date date not null default (current_date - 1);

update public.profiles set last_day_end_date = current_date where role = 'setter';


-- ============================================================
-- 5. prompt515_day_end_functions
-- See design decisions 4 and 6.
-- ============================================================

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

  with rolled as (
    update leads
    set assigned_setter = null
    where assigned_setter = p_setter_id and status = 'no_answer'
    returning id
  )
  insert into no_answer_queue (lead_id, original_setter_id, available_at)
  select id, p_setter_id, now() + interval '24 hours' from rolled;
  get diagnostics v_rolled = row_count;

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

create or replace function public.run_setter_day_end()
 returns table(no_answer_rolled integer, refilled integer)
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  caller_role user_role;
begin
  select role into caller_role from profiles where id = auth.uid();
  if caller_role is distinct from 'setter' then
    raise exception 'Only setters can finish their own day';
  end if;
  return query select * from _do_setter_day_end(auth.uid());
end;
$function$;

create or replace function public.process_all_setter_day_ends()
 returns integer
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  s record;
  n int := 0;
begin
  for s in select id from profiles where role = 'setter' and is_active = true loop
    perform _do_setter_day_end(s.id);
    n := n + 1;
  end loop;
  return n;
end;
$function$;

revoke all on function public._do_setter_day_end(uuid) from public, anon, authenticated;
revoke all on function public.process_all_setter_day_ends() from public, anon, authenticated;

revoke all on function public.run_setter_day_end() from public;
revoke all on function public.run_setter_day_end() from anon;
grant execute on function public.run_setter_day_end() to authenticated;


-- ============================================================
-- 6. prompt515_follow_up_due_rls
-- See design decision 3.
-- ============================================================

drop policy if exists leads_update_setter_admin on public.leads;
create policy leads_update_setter_admin on public.leads
for update
using (
  (my_role() = 'admin'::user_role)
  or (
    my_role() = 'setter'::user_role
    and (
      assigned_setter = auth.uid()
      or exists (
        select 1 from follow_up_queue fq
        where fq.lead_id = leads.id
          and fq.setter_id = auth.uid()
          and fq.completed_at is null
      )
    )
  )
  or (my_role() = 'closer'::user_role and assigned_closer = auth.uid())
)
with check (
  (my_role() = 'admin'::user_role)
  or (my_role() = 'setter'::user_role)
  or (my_role() = 'closer'::user_role)
);


-- ============================================================
-- 7. prompt515_reschedule_cron
-- See design decisions 2 and 4.
-- ============================================================

select cron.unschedule('assign-setter-batches');
select cron.unschedule('process-follow-up-returns');

select cron.schedule(
  'process-setter-day-ends',
  '*/15 * * * *',
  $$select process_all_setter_day_ends()$$
);
```

### After running the SQL — verification checklist (don't skip, per the prompt's own instruction)

- `select assigned_setter, count(*) from leads where assigned_setter is not null group by assigned_setter having count(*) > 150;` → zero rows.
- Confirm `test_setter` lands at exactly 150 (not 151, not fewer) after migration 2.
- Manually set `test_setter`'s `last_day_end_date` back one day, run `select process_all_setter_day_ends();`, confirm: any current No Answer leads lost `assigned_setter` and gained a `no_answer_queue` row with `available_at = now() + 24h`; New+FollowUpDue count returns to 150; `last_day_end_date` advanced. Run it again immediately after — confirm it's a genuine no-op (nothing changes), proving idempotency.
- Compare that same resulting state against calling `run_setter_day_end()` as `test_setter` (JWT-impersonated, same pattern Prompt 509 used) after resetting `last_day_end_date` again — the two paths should produce byte-identical resulting rows, since both call the same `_do_setter_day_end`.
- Confirm a lead logged No Answer today does NOT disappear from `useMyPool`-equivalent query (`assigned_setter = test_setter`) until day-end runs.
- Confirm a due follow-up (`follow_up_queue.follow_up_at` in the past, `completed_at is null`) can have its lead's `status` updated by `test_setter` directly (RLS check), and that update correctly marks the old queue row `completed_at`.
- Since a live midnight can't be simulated in this tooling: verification is via the mechanism (manipulating `last_day_end_date` and re-running), not a real clock wait — documented here explicitly per the prompt's own instruction to call that out.

---

## Part 3 — frontend plan (not started; do this only after Part 2's SQL is live and verified)

**`src/hooks/useLeads.js`**
- `useMyFollowUps(setterId)` — query `follow_up_queue` where `setter_id = setterId and completed_at is null`, selecting the joined lead row (`lead:lead_id(*)`). Split into `due` (follow_up_at's date, in the setter's own timezone via `zonedDateStr`, `<=` today) and `future` (`>` today) — reuse `zonedDateStr`/`zonedDayRange` from `lib/dates.js`, same pattern `usePipelineHealth` already uses.
- `useMyNotInterested(setterId)` — query `leads` where `last_action_by = setterId and status = 'not_interested'` (NOT `assigned_setter`, which is null for this terminal state).
- `usePipelineNotInterestedLeads()` — admin equivalent, `status = 'not_interested'`, no `assigned_setter` filter (mirrors `usePipelineCloserLeads`'s shape, not `usePipelineSetterLeads`'s — that one's `assigned_setter IS NOT NULL` base filter would always exclude these).
- `useFinishDay()` — mutation calling `supabase.rpc('run_setter_day_end')`; invalidate `my-pool`, `leads-stats`, `pipeline-*` on success.
- `useMyPool` itself needs no change — it already selects everything with `assigned_setter = setterId`, which after the trigger fix correctly includes live No Answer leads again.

**`src/pages/Overview.jsx` (`SetterOverview`)**
- Tab order: New → Follow-Up Due → No Answer → Follow-up → Not Interested → Appointment Booked (Appointment Booked stays exactly as-is per the prompt's own "unchanged" note — still effectively empty in this view since it's nulled to the closer, a pre-existing, out-of-scope quirk, not touched).
- Merge three data sources (`useMyPool`, `useMyFollowUps`, `useMyNotInterested`) into one selectable-tab view; render the "Follow-Up Due" chip only when its count is `> 0` (conditional tab visibility, per the prompt's explicit UX requirement).
- Add a "Finish Day" button, visible when the New tab's count is `0`, calling `useFinishDay()`.

**`src/pages/Pipeline.jsx` (admin)** — add a 4th top-level tab, "Not Interested", using `usePipelineNotInterestedLeads()` (same table shape as `CloserTab`, no outcome filter needed). No Answer already becomes correctly visible in the existing Setter tab's `no_answer` chip once the trigger fix lands (it was silently always-zero before, for the same null-assigned_setter reason) — no code change needed there, just note it in the verification pass so it doesn't read as a regression.

**`LogCallModal.jsx`** — no changes needed; it already just does `supabase.from('leads').update(patch).eq('id', id)`, which will work for a Follow-Up-Due lead once RLS/trigger land.

**No new `lead_status` enum value, no `StatusBadge.jsx` change** — Follow-Up Due is a computed grouping over the existing `'follow_up'` status (see design decision 2), so the existing follow_up styling (yellow) is reused for both the Follow-Up Due and Follow-up chips, distinguished only by label text and which data source feeds them.

---

---

## Part 4 — a second, pre-existing DDL fix needed, found while building Part 3

Parts 1-2's SQL is live (Brayden ran it 2026-08-21) and Part 3's frontend is built and verified against real data — see [[Restorix LIVE_STATE]] CURRENT STATE for what's actually shipped. One thing in Part 3's own verification pass surfaced a real, **pre-existing** bug, not something Part 2's SQL introduced:

**`handle_lead_pipeline()` is not `SECURITY DEFINER`** — confirmed via `pg_proc.prosecdef = false`, and it's the only pipeline function in this codebase that isn't (`assign_setter_batches`/`redistribute_no_answers`/`process_follow_up_returns`/`request_closer_leads`/`_do_setter_day_end`/`run_setter_day_end`/`process_all_setter_day_ends` are all `security definer`). `follow_up_queue` has zero INSERT/UPDATE policies (only the admin-only SELECT policy) — with RLS enabled and no write policy, a `SECURITY INVOKER` trigger function inserting/updating that table as a non-admin caller gets `42501: new row violates row-level security policy for table "follow_up_queue"`.

**Confirmed this predates Part 2, not something my migration caused**: the original (pre-Prompt-515) `handle_lead_pipeline` definition, read at the very start of this work, was already `SECURITY INVOKER` — it always inserted into `follow_up_queue` in its `follow_up` branch, meaning **logging a "Follow-up" outcome as a setter has been silently broken since `follow_up_queue`'s RLS was enabled** (Prompt 437), likely for the entire life of this feature. Reproduced live, twice, with careful step-by-step (non-batched) button clicks to rule out a test-script race condition: selecting "Follow-up" + a date + Save throws an uncaught `42501` from the client, the whole `UPDATE` rolls back atomically (Postgres aborts the full statement when a `BEFORE UPDATE` trigger raises — confirmed the lead row was completely unchanged after, not partially corrupted), and — this is the actually severe part — **the modal gave the setter zero visual feedback that the save failed**. Fixed that second half separately, in code, this session (see CURRENT STATE's Part 3 entry: `LogCallModal.jsx` now try/catches the mutation and renders a real error message) — that fix ships regardless of when this DDL lands, since no save should ever fail silently for any reason.

The fix itself is a one-line attribute addition — same function body already live, just adding `security definer`:

```sql
-- ============================================================
-- prompt515_handle_lead_pipeline_security_definer
-- Fixes a real, pre-existing bug: logging a "Follow-up" outcome as a
-- setter has been silently broken since follow_up_queue's RLS was
-- enabled (Prompt 437) — this trigger function was never SECURITY
-- DEFINER, unlike every other pipeline function, so its own
-- follow_up_queue INSERT/UPDATE/SELECT (the v_actor resolution) all
-- fail RLS for a non-admin caller. Reproduced live 2026-08-21.
-- ============================================================

create or replace function public.handle_lead_pipeline()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  next_closer uuid;
  v_actor uuid;
begin
  if new.status is distinct from old.status then
    v_actor := coalesce(old.assigned_setter, (
      select fq.setter_id from follow_up_queue fq
      where fq.lead_id = old.id and fq.completed_at is null
      order by fq.follow_up_at desc limit 1
    ));

    if old.status = 'follow_up' then
      update follow_up_queue set completed_at = now()
      where lead_id = old.id and completed_at is null;
    end if;

    if new.status = 'no_answer' then
      new.no_answer_at := now();
      new.last_action_by := v_actor;
      new.last_action_status := 'no_answer';
      new.last_action_at := now();

    elsif new.status = 'follow_up' then
      if new.follow_up_at is null then
        raise exception 'follow_up_at is required when setting status to follow_up';
      end if;
      new.last_action_by := v_actor;
      new.last_action_status := 'follow_up';
      new.last_action_at := now();
      insert into follow_up_queue (lead_id, setter_id, follow_up_at)
      values (new.id, v_actor, new.follow_up_at);
      new.assigned_setter := null;

    elsif new.status = 'not_interested' then
      new.last_action_by := v_actor;
      new.last_action_status := 'not_interested';
      new.last_action_at := now();
      new.assigned_setter := null;

    elsif new.status = 'appointment_booked' then
      new.last_action_by := v_actor;
      new.last_action_status := 'appointment_booked';
      new.last_action_at := now();
      new.assigned_setter := null;
      new.closer_outcome := 'pending';

      select id into next_closer
      from profiles
      where role = 'closer' and is_active = true
      order by last_closer_assignment_at asc nulls first
      limit 1;

      if next_closer is not null then
        new.assigned_closer := next_closer;
        update profiles set last_closer_assignment_at = now() where id = next_closer;
      end if;
    end if;
  end if;
  return new;
end;
$function$;
```

**After running it, verify**: log a real "Follow-up" outcome as `test_setter` with a past/today date, confirm it saves without error, confirm it appears in the Follow-Up Due tab (only shows when count > 0, per Part 3's own design), confirm working it from that tab correctly stamps `last_action_by`/`last_action_at` and marks the old `follow_up_queue` row `completed_at`.

## Related
[[Restorix LIVE_STATE]] · [[Restorix Memories]] · [[Restorix North Star]]
