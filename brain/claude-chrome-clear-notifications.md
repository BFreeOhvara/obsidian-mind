Clear out Brayden's own preview notification rows from the Ohvara Supabase database (these are sample/test rows from a notification-type review pass, not real data — safe to delete).

**Step 1 — go to the Supabase dashboard.** Navigate to `https://app.supabase.com`, open the project **ohvara-dashboard** (project ref `jjextitmbptoaolacocs`).

**Step 2 — open the SQL Editor.** In the left sidebar, click "SQL Editor."

**Step 3 — paste and run this exact query:**

```sql
delete from notifications where profile_id = '5164aa43-e803-41c5-b96f-1663a53c7404';
```

**Step 4 — report back.** Confirm the query ran successfully and tell Brayden how many rows were deleted.

Nothing else to click through, no other tables to touch, no settings to change — just this one query.
