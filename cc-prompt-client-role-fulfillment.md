Read brain/LIVE_STATE.md and brain/Memories.md before doing anything.

## Context

Prompt 1 of the client-role fulfillment build is IN PROGRESS. Phases 1 + SQL half of Phase 5 are already done:
- Migration 032: adds `'client'` to `user_role` enum — committed on branch `client-role-fulfillment` in `ohvara-dashboard`, pushed to origin, NOT yet applied to prod
- Migration 033: `clients.profile_id` FK→profiles, `recommended_tier`/`recommended_price`/`override_price` cols, client self-RLS on clients/onboarding — same branch, NOT yet applied to prod

## Task

Execute phases 2, 3, 4, 6, 7 of Prompt 1. Apply migrations first, then build.

### Step 0 — Apply migrations to prod

Apply 032 BEFORE 033 (separate transactions — enum value can't be used in its own tx). Use the PAT runner (one-off edge function deploy → invoke → delete pattern, same as migrations 025–031). Verify each applied before moving to the next.

### Phase 2 — Auth on close

In `supabase/functions/provision-client/index.ts`: when a client is provisioned, also create the actual login — `auth.users` + `profiles` row with `role='client'`, linked via the new `clients.profile_id` FK. Use the same `{firstName}@ohvara.internal` / generated-password pattern as existing accounts (apex11, jordan22, etc.). Surface the generated credentials (email + password) in the admin notification that already fires on close — manual handoff to the client is fine for now, no email automation.

### Phase 3 — Persist recommendation + closer override

1. In `provision-client`: wire `recommend-stack`'s output (`recommended_tier`, `recommended_price`) into the new `clients.recommended_tier` / `clients.recommended_price` columns at provision time.
2. In `src/pages/closer/AppointmentCard.jsx` (or wherever the closer's mark-closed flow lives): add an `override_price` input field that Nate can fill before finalizing a close. Save it to `clients.override_price` when the close is committed.

### Phase 4 — Client role + routes

1. Add `'client'` to `ProtectedRoute` and `App.jsx` routing.
2. Add a client sidebar (`Sidebar.jsx` or equivalent) — minimal: Overview link, maybe Onboarding link.
3. Build `/client/*` route tree — minimum viable:
   - `/client` — overview page: shows their tier, AI agent status, phone number (from `clients` row + `onboarding` row)
   - `/client/onboarding` — port the onboarding questionnaire from `ohvara-client-portal` (the multi-step form that fires `build-agent` on submit)
4. Read the `ohvara-client-portal` source first (`src/pages/Onboarding.jsx`, `src/pages/Portal.jsx`, `src/App.jsx`) — port the logic, not the standalone-app scaffolding. Adapt to the main dashboard's design system (CSS tokens, glass cards, no Tailwind hardcoded hex).

### Phase 6 — Retire standalone portal

Once `/client/*` reaches parity with what `ohvara-client-portal` does (onboarding form + status view), update `provision-client` to set `CLIENT_PORTAL_URL` references to the main dashboard's `/client/onboarding` path instead of the standalone app URL. Note in Memories that `ohvara-client-portal` is superseded — do NOT delete the repo.

### Phase 7 — Cleanup

In `supabase/functions/generate-ai-script/index.ts`: remove the dead `stack_analysis` mode (recon confirmed the live UI never calls it — all 4 modes are unused). Redeploy the function after.

## Self-verify (standing rule)

After Phase 4, use Chrome MCP to open the dashboard as a client-role user (create one via the admin panel or directly via service-role insert), screenshot the `/client` overview page, and confirm it renders correctly before logging done.

## When done

1. Commit + push `ohvara-dashboard` (master or merge `client-role-fulfillment` branch)
2. Append session log to `brain/Memories.md`
3. Update `work/active/ohvara-dashboard.md` (fulfillment loop section)
4. Overwrite `brain/LIVE_STATE.md` — clear Prompt 1 from "Next Up for CC", update Current State
5. Push `obsidian-mind`
