---
date: 2026-06-21
description: "CC prompt — Prompt 23: admin can view rep usernames + passwords. Creates rep_credentials table, wires account creation to store plain-text password, adds reveal button in admin rep list."
tags:
  - cc-prompt
  - ohvara
status: active
---

# CC Prompt: Prompt 23 — Admin View Rep Credentials

## Context

Brayden decision (2026-06-21): Brayden wants to see every rep's login credentials from the admin dashboard — hidden by default, reveal on click, admin-only. Setter forgets login → Brayden looks it up instantly.

Supabase Auth hashes passwords (cannot retrieve after creation). Solution: at account creation, store the plain-text password in a separate `rep_credentials` table (admin-only RLS, not exposed to reps/closers).

Migration 032 SQL is already written at `C:\Users\freem\Claude\Projects\Ohvara (1)\032_rep_credentials.sql`.

## Recon first

Before writing any code, read:
1. The current "create rep account" edge function — find it (likely `create-rep` or `create-user` in `supabase/functions/`). Note its exact input shape (username/email, password, role, full_name, niche, etc.) and what it currently returns.
2. `AdminRepList.jsx` or wherever the admin rep list renders — the component that shows the list of reps to Brayden. Find the exact file and component name.
3. The hook or RPC that fetches the rep list for admin view (probably in `useProfiles.js` or similar).

Report back what you find (file paths, function names, current shape) before writing any code.

## Steps

### Step 1: Apply migration 032

Copy `032_rep_credentials.sql` into the dashboard repo at `supabase/migrations/032_rep_credentials.sql`.

Apply via the one-off edge fn pattern (same as migrations 028, 030, 031):
1. Deploy a one-off edge fn that runs the migration SQL against the injected SUPABASE_DB_URL.
2. Invoke it with the anon key.
3. Verify the table exists: `SELECT table_name FROM information_schema.tables WHERE table_name = 'rep_credentials'`.
4. Delete the edge fn + local files.

### Step 2: Update the create-rep edge function

After reading the current edge fn (recon step):

Add this block immediately after the rep's Supabase Auth account is created and their `profiles` row is confirmed:

```typescript
// Store plain-text password for admin credential lookup
const { error: credError } = await supabase
  .from('rep_credentials')
  .upsert(
    {
      profile_id: newUser.id,   // the profiles.id (same as auth.uid for the new rep)
      username:   email,        // whatever field holds the login email
      password:   password,     // the plain-text password before hashing
    },
    { onConflict: 'profile_id' }  // update if somehow called twice for same rep
  );

if (credError) {
  console.error('[create-rep] rep_credentials insert failed:', credError.message);
  // Non-fatal: rep account was created; don't fail the whole request over this
}
```

Use the SERVICE ROLE client (supabase admin client) to bypass RLS — the edge fn already has it. Do NOT use the user-facing anon client.

Redeploy the edge fn:
```
supabase functions deploy [edge-fn-name] --no-verify-jwt --project-ref jjextitmbptoaolacocs
```

### Step 3: Add the hook / RPC for admin to fetch credentials

In `useProfiles.js` (or the appropriate hook file), add a new hook:

```javascript
// Fetch credentials for a specific rep (admin only — RLS enforces this)
export function useRepCredentials(profileId) {
  return useQuery({
    queryKey: ['rep_credentials', profileId],
    queryFn: async () => {
      if (!profileId) return null;
      const { data, error } = await supabase
        .from('rep_credentials')
        .select('username, password')
        .eq('profile_id', profileId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!profileId,
    staleTime: 60_000,
  });
},
```

Or use a lazy fetch (called only when the reveal button is clicked) rather than pre-loading for all reps — this is better UX and avoids loading credentials until needed.

### Step 4: Admin rep list UI — "View Login" button

In the admin rep list component (found in recon):

For each rep row, add a "View Login" button/chip. Behavior:
- Hidden by default: shows a 🔒 icon or "View Login" text button, no credentials visible
- Click to reveal: fetches from `rep_credentials` (the hook above, triggered lazily on click), then shows:
  ```
  Login: apex11@ohvara.internal  ••• [eye icon]
  Pass:  ••••••••  [eye icon]
  ```
  Both fields start masked (••••••). Each has its own eye-toggle to unmask.
- Only renders for admin role (check `profile.role === 'admin'` in the component, same as how other admin-only UI is gated).

UI notes from [[DESIGN]]:
- Consistent with the modal/card visual language already in use
- No new color tokens — use existing `text-slate-400` for the "hidden" state, normal text for revealed
- Small inline block below the rep's name/email in the row — not a separate modal

### Step 5: Test

Manual test with a test rep:
1. Create a test rep via the admin "Create Rep" flow. After creation:
   ```sql
   SELECT username, password FROM rep_credentials
   WHERE profile_id = (SELECT id FROM profiles WHERE full_name = 'Test Rep X');
   ```
   Expected: a row with the exact email and plain-text password used at creation.

2. In the admin dashboard as Brayden (admin role), navigate to the rep list. Confirm the "View Login" button is visible.
3. Click it. Confirm credentials appear (masked first, unmask with eye icon).
4. Log in as a rep (apex11). Confirm:
   ```sql
   SELECT * FROM rep_credentials;
   ```
   Returns 0 rows (RLS blocks rep access).
5. Log in as a closer. Same check — 0 rows.

### Step 6: Commit + deploy + log

```bash
cd ohvara-dashboard
git add supabase/migrations/032_rep_credentials.sql supabase/functions/[edge-fn-name]/ src/
git commit -m "migration 032: rep_credentials + admin credential reveal"
git push origin master
```

Append to `brain/Memories.md`:
```
[CC | 2026-06-21 HH:MM] — Migration 032 + Prompt 23: rep_credentials table live.
  Edge fn [name] updated to write plain-text password at creation.
  Admin rep list has "View Login" reveal button (masked + eye-toggle).
  RLS verified: rep/closer see 0 rows; admin sees all. All 5 test steps PASS.
  Commits: [hash1] (migration), [hash2] (edge fn), [hash3] (dashboard UI).
```

Delete Prompt 23 block from `brain/LIVE_STATE.md`. Update migrations line: `001–032 applied`.

Commit + push obsidian-mind.

## Done means

`rep_credentials` table is live with correct RLS. The create-rep edge fn writes credentials at creation. The admin rep list has a working masked-reveal credential button, admin-role-gated. All 5 manual test steps pass. LIVE_STATE is clean.
