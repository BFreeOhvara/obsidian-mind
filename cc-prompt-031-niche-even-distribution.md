---
date: 2026-06-21
description: "CC prompt — apply migration 031: niche-even lead distribution. Removes per-rep niche filter; distributes each niche bucket evenly across all setters."
tags:
  - cc-prompt
  - ohvara
status: active
---

# CC Prompt: Migration 031 — Niche-Even Lead Distribution

## Context

Brayden decision (2026-06-21): no more one-niche-per-setter. All unassigned leads go into one shared pool. assign_daily_batches must distribute each niche bucket evenly across ALL active setters. 10 roofing leads + 5 setters = 2 roofing each; no setter gets 3 while another gets 1.

The SQL is already written and saved at `ohvara-dashboard/supabase/migrations/031_niche_even_distribution.sql`. If it doesn't exist in the repo yet, copy it from the workspace file `C:\Users\freem\Claude\Projects\Ohvara (1)\031_niche_even_distribution.sql`.

## Steps

### 1. Recon — confirm current live function

Read the live function definition from the DB:

```
SELECT pg_get_functiondef(oid)
FROM pg_proc
WHERE proname = 'assign_daily_batches';
```

Confirm it contains the 030 round-robin markers (CROSS-REP or niche filter `rep.niche IS NULL OR`). If it does NOT (already on a later version), stop and report back.

### 2. Run inline test BEFORE applying (BEGIN...ROLLBACK — zero prod residue)

Run this inside a transaction that rolls back so no data is permanently changed:

```sql
BEGIN;

-- Create 5 test reps
INSERT INTO profiles (id, role, is_active, full_name, email)
VALUES
  ('11111111-0000-0000-0000-000000000001'::uuid, 'rep', true, 'Test Rep 1', 'r1@test.local'),
  ('11111111-0000-0000-0000-000000000002'::uuid, 'rep', true, 'Test Rep 2', 'r2@test.local'),
  ('11111111-0000-0000-0000-000000000003'::uuid, 'rep', true, 'Test Rep 3', 'r3@test.local'),
  ('11111111-0000-0000-0000-000000000004'::uuid, 'rep', true, 'Test Rep 4', 'r4@test.local'),
  ('11111111-0000-0000-0000-000000000005'::uuid, 'rep', true, 'Test Rep 5', 'r5@test.local');

-- Seed 10 roofing leads in the unassigned pool
INSERT INTO leads (id, business_name, niche, status, assigned_rep_id, batch_date, created_at)
SELECT
  ('aaaaaaaa-0000-0000-0000-' || lpad(i::text, 12, '0'))::uuid,
  'Roofing Co ' || i,
  'roofing',
  'New',
  NULL,
  NULL,
  NOW() - (i || ' minutes')::interval
FROM generate_series(1, 10) i;

-- Apply the NEW function definition (paste the CREATE OR REPLACE block here)
-- [paste 031_niche_even_distribution.sql body here]

-- Run the function
SELECT * FROM assign_daily_batches(150);

-- Verify: each test rep should have exactly 2 roofing leads
SELECT assigned_rep_id, COUNT(*) AS lead_count, array_agg(niche) AS niches
FROM leads
WHERE assigned_rep_id IN (
  '11111111-0000-0000-0000-000000000001'::uuid,
  '11111111-0000-0000-0000-000000000002'::uuid,
  '11111111-0000-0000-0000-000000000003'::uuid,
  '11111111-0000-0000-0000-000000000004'::uuid,
  '11111111-0000-0000-0000-000000000005'::uuid
)
AND batch_date = CURRENT_DATE
GROUP BY assigned_rep_id
ORDER BY assigned_rep_id;
-- Expected: 5 rows, each with lead_count=2

ROLLBACK;
```

Report: does each rep have exactly 2? If yes, proceed to step 3. If not, stop and report the actual counts.

### 3. Apply the migration

Use the Management API one-off edge fn pattern (same as migrations 028, 030):
1. Copy `031_niche_even_distribution.sql` into a one-off edge fn that runs it via the injected `SUPABASE_DB_URL`.
2. `supabase functions deploy apply-mig-031 --no-verify-jwt --project-ref jjextitmbptoaolacocs`
3. Invoke it with the anon key.
4. Verify: `SELECT pg_get_functiondef(oid) FROM pg_proc WHERE proname = 'assign_daily_batches'` — confirm it now contains `NICHE-PARTITIONED` or the `IS NOT DISTINCT FROM v_niche` marker.
5. Delete the edge fn + local files.

No leads are moved by this — it only updates the function definition. Leads move on the next cron run (00:05 UTC) or manual invocation.

### 4. Commit the migration file to ohvara-dashboard

```bash
cd ohvara-dashboard
# If migration file is in supabase/migrations/:
git add supabase/migrations/031_niche_even_distribution.sql
git commit -m "migration 031: niche-even distribution across all setters"
git push origin master
```

### 5. Verify prod (single-rep sanity check)

With only apex11 in prod (null niche, niche=hvac set previously):

```sql
SELECT niche, lower(niche), COUNT(*) FROM leads
WHERE batch_date = CURRENT_DATE AND assigned_rep_id IS NOT NULL
GROUP BY niche, lower(niche);
```

Apex11 should still see its full HVAC batch (the niche=hvac scope from migration 028 is now bypassed by migration 031 — apex11 now gets ALL niches on the next run). This is correct behavior per Prompt 22.

### 6. Log and clear queue

- Append `[CC | 2026-06-21 HH:MM] — Migration 031 applied: niche-even distribution...` to `brain/Memories.md`
- In `brain/LIVE_STATE.md`, delete the "Prompt 22" queue block (lines starting `### Prompt 22`)
- Update the CURRENT STATE migrations line: `migrations 001–031 applied`
- Commit + push obsidian-mind

## Done means

Migration 031 is live, the 5-rep/10-roofing test returned 2 leads per rep, and LIVE_STATE is updated.
