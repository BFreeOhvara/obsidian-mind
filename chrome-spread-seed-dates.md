Navigate to: https://supabase.com/dashboard/project/jjextitmbptoaolacocs/sql/new

Paste and run the following SQL:

```sql
WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM appointments
  WHERE outcome = 'closed'
    AND closer_id = '3f2b2df7-40b1-4921-80e2-09981c819642'
)
UPDATE appointments
SET
  created_at = CASE ranked.rn
    WHEN 1  THEN '2025-11-08 10:30:00+00'
    WHEN 2  THEN '2025-12-03 14:00:00+00'
    WHEN 3  THEN '2026-01-12 11:00:00+00'
    WHEN 4  THEN '2026-01-27 09:30:00+00'
    WHEN 5  THEN '2026-02-14 13:00:00+00'
    WHEN 6  THEN '2026-03-06 10:00:00+00'
    WHEN 7  THEN '2026-03-21 15:30:00+00'
    WHEN 8  THEN '2026-04-09 11:00:00+00'
    WHEN 9  THEN '2026-04-24 14:00:00+00'
    WHEN 10 THEN '2026-05-07 10:30:00+00'
    WHEN 11 THEN '2026-05-22 09:00:00+00'
    WHEN 12 THEN '2026-06-04 13:00:00+00'
    WHEN 13 THEN '2026-06-17 11:30:00+00'
    WHEN 14 THEN '2026-06-26 10:00:00+00'
  END,
  updated_at = CASE ranked.rn
    WHEN 1  THEN '2025-11-08 10:30:00+00'
    WHEN 2  THEN '2025-12-03 14:00:00+00'
    WHEN 3  THEN '2026-01-12 11:00:00+00'
    WHEN 4  THEN '2026-01-27 09:30:00+00'
    WHEN 5  THEN '2026-02-14 13:00:00+00'
    WHEN 6  THEN '2026-03-06 10:00:00+00'
    WHEN 7  THEN '2026-03-21 15:30:00+00'
    WHEN 8  THEN '2026-04-09 11:00:00+00'
    WHEN 9  THEN '2026-04-24 14:00:00+00'
    WHEN 10 THEN '2026-05-07 10:30:00+00'
    WHEN 11 THEN '2026-05-22 09:00:00+00'
    WHEN 12 THEN '2026-06-04 13:00:00+00'
    WHEN 13 THEN '2026-06-17 11:30:00+00'
    WHEN 14 THEN '2026-06-26 10:00:00+00'
  END
FROM ranked
WHERE appointments.id = ranked.id;
```

Expected: 14 rows updated. Report how many rows were updated and confirm no errors.
