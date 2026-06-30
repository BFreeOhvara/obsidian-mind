Run the following SQL in the Supabase SQL editor for project `jjextitmbptoaolacocs` (ohvara-dashboard).

Navigate to: https://supabase.com/dashboard/project/jjextitmbptoaolacocs/sql/new

Paste and run:

```sql
UPDATE appointments
SET deal_value = deal_value - (deal_value % 100) + 96
WHERE closer_id = (SELECT id FROM profiles WHERE role = 'closer' LIMIT 1)
  AND outcome = 'closed';
```

This shifts all seeded deal values to end in 96, matching Ohvara's real deal math (setup fee $297 + monthly ending in 99 = total always ending in 96). For example: $1,199 → $1,196, $899 → $896, $2,199 → $2,196.

Expected result: rows updated, no errors. Report back how many rows were updated and confirm no errors.
