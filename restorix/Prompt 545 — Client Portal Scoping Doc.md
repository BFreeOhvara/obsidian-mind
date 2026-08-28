---
date: 2026-08-27
description: "Scoping doc (planning only, no code, no DB) for the new `client` role: structured Stack capture at confirm time, auto-provisioning, the client dashboard shell, and the client RLS model. Grounded in the real current schema. Open questions flagged for Brayden."
tags:
  - restorix
  - work-note
  - scoping
quarter: Q3-2026
---

# Prompt 545 — Client Portal Scoping Doc

> **Planning only, per the prompt's own deliverable. Zero schema / function / RLS / cron / edge-function / frontend changes made this round.** Schema below was read fresh from the live `restorix-portal` DB (`avgvmzshujwphneykuvu`) on 2026-08-27, not from old notes. Context: [[Restorix North Star]] "Delivery Model — Client Portal & Provisioning" (the three settled decisions — `client` role inside this same app; shell-first MVP; voice engine undecided). Shape follows [[Prompt 534 — Closer My Leads UI + Rotation Scoping Doc]].

> **Brayden's addendum (2026-08-27, folded in): shared component catalog, not per-client custom builds.** Every agent type Restorix sells is built **once**, as a generic reusable module. "Provisioning" = turning on the subset of already-built modules a given client bought. Two clients with different Stacks get two different-looking dashboards, both assembled from the same catalog — never two implementations. "Incremental" means *the catalog grows one agent type at a time* (front-runner #1 built for real, everything else an inactive catalog entry until its turn), not that each client's dashboard is built out separately over time. This drives Part 4 below — the dashboard is **catalog entries filtered to what the client bought**, each showing its own build status.

---

## Part 1 — What's confirmed from the real schema & code

### 1. `user_role` is a hard Postgres enum — adding `client` is the DDL-classifier-blocked path

`profiles.role` and `invites.role` are both `user_role`, enum value set is exactly `{setter, closer, admin}`. A 4th role means `ALTER TYPE user_role ADD VALUE 'client'` — the same non-transactional DDL that `apply_migration`/`execute_sql` have refused every schema-touching prompt this project has hit (506/515/525/535/543). **Eagle applied 543's SQL directly with no block on their MCP connection** — same expected path here. Unlike 543's `niche` (which had a real text+CHECK alternative), `role` is already an enum column across two tables plus a dozen policies and functions, so `ADD VALUE` is the natural move, not a redesign.

### 2. Nothing structured captures the Stack today — the survey is 100% stateless

- `src/lib/survey.js` / `Survey.jsx` / `SurveyBody` (embedded in `CloserLeadModal`) compute a recommendation live and **persist nothing** — the file's own header comment: *"Stateless per Brayden's own call — this file is pure data/logic, no persistence."*
- Closing a deal (`LogOutcomeForm` → `useLogCloserOutcome`) writes exactly four things to the `leads` row: `closer_outcome = 'closed'`, freeform `closer_notes`, `deal_setup_fee`, `deal_first_month_fee`. That write is a plain authenticated `UPDATE` — **no trigger fires** (`handle_lead_pipeline` only runs `if new.status is distinct from old.status`, and closing never touches `status`, which stays `appointment_booked`).
- So there is **no record anywhere of which front-runner or which sub-agents were agreed to.** This is the core gap the client portal has to close, and it has to be captured at confirm time — it cannot be reconstructed from `closer_notes` later.

### 3. The survey already has a clean, stable vocabulary to reuse

`computeSurveyResults` works in fixed keys — reuse these verbatim as the stored Stack selection, don't invent new ones:

| Kind | Keys |
|---|---|
| Front-runner (exactly one) | `intake_triage`, `missed_call_recovery` |
| Sub-agent (zero or more) | `insurance`, `follow_up`, `bed_sync`, `reminders`, `referral_reporting` |

`RESULTS_CONTENT` in `survey.js` already maps every one of these keys to `{whatItIs, whatItDoes}` client-facing copy — the dashboard shell can render agent cards straight from it with no new content authoring.

### 4. Provisioning today = invite token → `claim-invite` edge function → `handle_new_user` trigger

Confirmed flow for setter/closer accounts:
1. Admin (`InviteModal`) or closer (Prompt 533 flow) inserts an `invites` row — `token`, `role`, `created_by`, `expires_at = now() + 7d`, single-use (`used_at`/`used_by`).
2. `invites.role` has a **CHECK constraint `role = ANY (ARRAY['setter','closer'])`** — admin is excluded, and `client` would be too. Adding `client` to the invite path means relaxing this CHECK, not just the enum.
3. `Join.jsx` (`/join/:token`) calls the deployed `claim-invite` edge function (`action: 'check'` then `action: 'claim'`) — creates the `auth.users` row with `raw_user_meta_data.role`.
4. `handle_new_user` trigger (SECURITY DEFINER) reads `raw_user_meta_data->>'role'` and inserts the `profiles` row: `coalesce((raw_user_meta_data->>'role')::user_role, 'setter')`. **Any role that exists in the enum flows through this untouched** — no per-role branch here.
5. RLS: `invites_insert_admin`, `invites_insert_closer` (gated to `role = 'setter'` only), `invites_select_admin`. A closer-confirmed client provision needs its own insert policy (`my_role() = 'closer' AND role = 'client'`), mirroring `invites_insert_closer`.

There is also an admin **direct-create** path (`Users.jsx` → an edge function with a bearer token, username+password+role) — a second, non-invite way accounts get made. Not needed for the client flow but noted so the design doesn't assume invites are the only door.

### 5. No column links a `profiles` row to a lead / facility

`profiles` has no `lead_id`, `facility_name`, or `account_id`. `leads` has no `client_profile_id`. The client↔facility relationship is **net-new** — it needs somewhere to live (see Part 2).

### 6. `leads_select_all` gives every authenticated user every lead — the load-bearing RLS fact

```
leads_select_all  SELECT  qual: (auth.uid() IS NOT NULL)
```

Every setter/closer/admin can read all ~19k lead rows (this is why Stats, the shared pool, and the admin rollup all work with no per-row scoping). **A `client` must never inherit this.** Because the policy is `PERMISSIVE` (the default), simply adding a narrow client policy does **not** help — permissive policies OR together, so `leads_select_all` would still match a client. This policy has to be **rewritten** to `(auth.uid() IS NOT NULL AND my_role() <> 'client')`, and a separate narrow client-scoped SELECT policy added alongside. Rewriting an existing broad policy that the whole internal app depends on is the single real risk in this whole design — call it out the same way every prior RLS-widening prompt has.

### 7. `CloserLeadModal` is the natural confirm surface

It already renders a tab strip — `Log Outcome` / `Closer Survey` / `Reschedule` (conditional) — over one shared `<Modal>`, reusing `LogOutcomeForm` and `SurveyBody` verbatim. A confirm-the-Stack step belongs here as either a 4th tab or a new section inside `Log Outcome` that appears when `outcome === 'closed'`. No new modal infrastructure needed.

### 8. Role is enumerated explicitly in ~6 places — the blast radius for "add a 4th role"

Each of these hard-codes the three current roles and needs a `client` branch (or a deliberate decision to exclude it):

| Location | Current shape | Client treatment |
|---|---|---|
| `user_role` enum | `{setter,closer,admin}` | `ADD VALUE 'client'` (DDL, Eagle) |
| `invites.role` CHECK | `IN ('setter','closer')` | add `'client'` |
| `my_role()` | returns `profiles.role` | works as-is |
| `handle_new_user` | `coalesce(... ,'setter')` | works as-is |
| `can_message(from,to)` IMMUTABLE fn | setter/closer/admin matrix | decide: can a client message anyone? (probably admin-only, or nobody in v1) |
| `profiles_select` policy | per-role visibility matrix | client should see **only their own row** (`auth.uid() = id`) — already the first OR-branch, so a client naturally gets just themselves; confirm no internal role should see client rows beyond admin |
| `App.jsx` `RoleRoute` + `Home` redirect | redirects `/` → `/overview` | client `/` must redirect to a client route, and `/overview` etc. must be closed to `client` |
| `Layout.jsx` `NAV_GROUPS` | every item has `roles: [...]` | a client sees an entirely different, minimal nav — likely its own `NAV_GROUPS` branch rather than adding `'client'` to scattered items |

---

## Part 2 — Proposed schema (for the future build prompt, not built here)

### Recommended: a new `deals` table, one row per confirmed sale

Columns on `leads` were the right call for the two fee numbers (a lead has at most one deal, fees are simple scalars). A structured Stack is a different shape — a front-runner key + a variable set of sub-agent keys + provisioning state + a pointer to the client account — and it will grow (per-agent config, go-live dates, client-connected credentials). That belongs in its own table.

```
deals
  id                uuid pk default gen_random_uuid()
  lead_id           uuid not null references leads(id)        -- the facility this deal is for
  confirmed_by      uuid not null references profiles(id)     -- the closer who confirmed
  confirmed_at      timestamptz not null default now()
  front_runner      text not null check (front_runner in ('intake_triage','missed_call_recovery'))
  sub_agents        text[] not null default '{}'              -- subset of the 5 survey keys
  setup_fee         numeric check (setup_fee >= 0)            -- snapshot at confirm (leads.deal_* stays as-is for commission math continuity)
  monthly_fee       numeric check (monthly_fee >= 0)
  client_profile_id uuid references profiles(id)              -- filled once the client account is provisioned
  status            text not null default 'provisioning'      -- provisioning | active | churned
  created_at / updated_at
```

- `sub_agents text[]` over a join table: the set is tiny (max 5), fixed, and always read whole to render the dashboard — an array is simpler and matches how `niche`/`avatar_color` CHECK-constrained scalars are already done in this schema. A `check (sub_agents <@ array['insurance','follow_up','bed_sync','reminders','referral_reporting'])` keeps it honest.
- `lead_id` is the facility link (a lead row already carries `facility_name`, `contact_name`, `phone`). No separate `facilities` table needed for v1 — a lead *is* the facility record here.
- Keep `leads.deal_setup_fee` / `deal_first_month_fee` untouched — Prompt 468's commission math (`lib/commissions.js`) reads them and must not regress. `deals.setup_fee`/`monthly_fee` are a snapshot for the client's own view; if that duplication feels wrong, an alternative is `deals` has no fee columns and the client view reads `leads.deal_*` through the join. **Open question C.**

### Client ↔ facility link

`deals.client_profile_id` + `deals.lead_id` is the whole relationship: one deal ties one client `profiles` row to one lead/facility. A client's scoped queries all route through `deals WHERE client_profile_id = auth.uid()`. If a facility can ever have two deals (renewal, second location) → **Open question D.**

---

## Part 3 — Proposed provisioning flow

**At confirm time (in `CloserLeadModal`):** when the closer sets outcome `closed`, a Stack-confirm step collects front-runner + sub-agents (pre-filled from the live survey recommendation if the survey tab was used, fully editable — matches North Star's "closer can adjust live"). Saving writes the `deals` row (`status = 'provisioning'`).

**Account creation — two real options, need Brayden's pick (Open question A):**

| | A1 — auto-create, no human step | A2 — generate a client invite link |
|---|---|---|
| Matches North Star wording | "auto-provision … no manual setup step" — yes | weaker (someone still sends it) |
| Mechanism | edge function creates `auth.users` with a random password + emails a set-password / magic link | insert `invites` row (`role='client'`, new `deal_id` column on `invites`), reuse `Join.jsx` + `claim-invite` almost as-is; delivery via existing `send-invite-sms` (Prompt 533) to the facility contact's phone |
| New data needed at confirm | client **email** (not collected anywhere today) | client **phone** — already on the lead as `leads.phone` |
| Reuse | least (new EF, new email path — and email provider is itself undecided per Prompt 533) | most (invites table, claim-invite, Join page, send-invite-sms all exist) |
| Recommendation | — | **A2 for the shell-first MVP.** It's almost entirely existing machinery; the only additions are `'client'` in the enum + invite CHECK, an `invites_insert_closer_client` policy, an `invites.deal_id` column, and `claim-invite` passing `role: 'client'` through (which `handle_new_user` already handles). "No manual step" can still be met by auto-firing `send-invite-sms` the instant the `deals` row is written — the closer never leaves the modal. |

**Linking back:** `claim-invite`'s claim path already has the new `auth.users` id and (via `invites.deal_id`) the deal — it sets `deals.client_profile_id` and flips `deals.status = 'active'` in the same transaction.

---

## Part 4 — Dashboard shell (client-facing v1) — catalog + activation, per Brayden's addendum

**The model:** one **agent catalog** — every front-runner and sub-agent Restorix can sell, defined once. A client's dashboard is that catalog filtered to `{deals.front_runner} ∪ deals.sub_agents`, each surviving entry rendered from its own catalog definition. No per-client views, no bespoke variants — the only difference between two clients' dashboards is which catalog entries are on.

**Where the catalog lives — recommendation: a static module (`src/lib/agentCatalog.js`), not a table.** It's code-shaped, not data-shaped: each entry needs client-facing copy (already in `RESULTS_CONTENT`), a build-status flag, a card component, and eventually a connect-flow — a source artifact versioned in git, same reasoning `survey.js` is a module and not a `survey_questions` table. A table would only earn its place if non-engineers edited the catalog, which they won't.

```js
// src/lib/agentCatalog.js  (illustrative — not built)
export const AGENT_CATALOG = {
  intake_triage:       { kind: 'front_runner', label: 'Inbound Intake & Triage', status: 'placeholder', needsConnect: ['phone_number'] },
  missed_call_recovery:{ kind: 'front_runner', label: 'Missed-Call Recovery',     status: 'placeholder', needsConnect: ['phone_number'] },
  insurance:           { kind: 'sub_agent',    label: 'Insurance / payer verification',            status: 'placeholder', needsConnect: [] },
  follow_up:           { kind: 'sub_agent',    label: 'Follow-up & nurture',                       status: 'placeholder', needsConnect: [] },
  bed_sync:            { kind: 'sub_agent',    label: 'Bed/program availability sync',             status: 'placeholder', needsConnect: [] },
  reminders:           { kind: 'sub_agent',    label: 'Appointment Reminder & No-Show Prevention', status: 'placeholder', needsConnect: [] },
  referral_reporting:  { kind: 'sub_agent',    label: 'Referral-source reporting',                 status: 'placeholder', needsConnect: [] },
}
// status: 'placeholder' | 'live' — flips per entry as each module is actually built.
// copy comes from RESULTS_CONTENT[key], keyed identically — no duplication.
```

Keys are exactly the `deals.front_runner` / `deals.sub_agents` values (Finding 3), so the dashboard is one `Object.entries(AGENT_CATALOG).filter(([k]) => purchased.has(k))`.

**Pages — minimal:**
- **`/client` (or `/overview` with a role branch — Open question E)** — the only real page. Facility name; front-runner as a hero card; one card per purchased sub-agent (`AGENT_CATALOG[key].label` + `RESULTS_CONTENT[key].whatItIs`). Each card's status line derives from its catalog `status`: `Coming soon` (`placeholder`) or `Not connected` / `Live` (`live` + connect state). A client who bought a still-`placeholder` agent sees an honest "being built" card — costs nothing to render.
- **Per-agent connect affordance** — only for catalog entries with non-empty `needsConnect` (v1: just the front-runner's phone number). Captures a string into a deferred `deal_connections` table; no telephony wiring in v1.
- **Client nav** — its own `NAV_GROUPS` branch: overview + Settings (the `update_own_*` RPCs are role-agnostic) + maybe Messages (Open question F). Nothing else.
- **No client write access** to `leads`, `deals` (beyond own connect fields), or anything else.

Voice-agent engine stays entirely out — the dashboard renders from `deals` + the static catalog + `RESULTS_CONTENT` and knows nothing about Retell or any vendor.

---

## Part 5 — RLS model for `client`

The client model is **scoped-to-self**, closer to the `assigned_closer = auth.uid()` pattern than to the setter/closer shared-pool model. Concretely:

| Table | Client SELECT | Client write |
|---|---|---|
| `deals` | `client_profile_id = auth.uid()` | none (or only specific connect columns via a SECURITY DEFINER RPC) |
| `leads` | only the row where `id IN (SELECT lead_id FROM deals WHERE client_profile_id = auth.uid())` — **and `leads_select_all` must be rewritten to exclude `client`** (Finding 6) | none |
| `profiles` | own row only (already the case via `profiles_select`'s `auth.uid() = id` branch) | own name/avatar/timezone/theme via the existing `update_own_*` RPCs (role-agnostic, work as-is) |
| `deal_connections` (new, deferred) | own rows | own rows |
| everything else (`calls`, `messages`, `follow_up_queue`, `no_answer_queue`, `invites`, …) | no policy grants `client` — default deny | — |

A helper `my_client_lead_ids()` (SECURITY DEFINER, returns `setof uuid`) keeps the `leads` client policy readable and avoids a correlated subquery per row.

**The real risk, stated plainly (same standard as every prior RLS prompt):** rewriting `leads_select_all` from `(auth.uid() IS NOT NULL)` to `(auth.uid() IS NOT NULL AND my_role() <> 'client')` changes a policy the entire internal app leans on. It *should* be inert for setter/closer/admin (they still match), but every internal query against `leads` runs through it, so the build prompt must re-verify the shared pool, Stats, the admin rollup, My Leads, My Pipeline, and Pipeline all still return full data after the change — not assume it. **Open question G** covers whether Brayden wants that rewrite or prefers a `RESTRICTIVE` policy approach (add `AS RESTRICTIVE ... USING (my_role() <> 'client')` on `leads`, which ANDs with everything and leaves `leads_select_all` textually untouched — arguably lower blast radius).

---

## Part 6 — Open questions for Brayden (need answers before any build)

**A. Account creation: auto-create + email (A1) or client invite link + SMS (A2)?** Recommendation: A2, auto-fired via `send-invite-sms` so there's still no manual step. A1 needs a client email captured at confirm and an email provider that isn't chosen yet (Prompt 533).

**B. What does a client log in with?** A2 → username + password they set on the Join page (same as setters). A1 → email + magic link. Tied to A.

**C. `deals` as a new table (recommended) vs. columns on `leads`?** And if `deals`: does it snapshot the fees, or read `leads.deal_*` through the join to avoid duplication?

**D. One client account per facility, or per deal?** Affects whether `deals.client_profile_id` is effectively unique per lead, and what happens on a renewal / second-location sale.

**E. Client landing route:** reuse `/overview` with a `if (role === 'client')` branch inside `Overview.jsx` (consistent with how `Overview.jsx` already branches setter/closer/admin), or a dedicated `/client` route + page? The former matches existing precedent.

**F. Can a client send messages** (to their admin/closer), or is Messages internal-only in v1? Drives whether `can_message` gets a `client` branch now or stays untouched.

**G. `leads` client isolation:** rewrite the permissive `leads_select_all` to exclude `client`, or add a `RESTRICTIVE` policy that ANDs `my_role() <> 'client'` without touching the existing policy text? The restrictive route is lower-risk but adds a policy type this schema doesn't currently use anywhere.

**H. Provisioning timing:** does the `deals` row + invite fire the instant `closer_outcome` is set to `closed`, or is there a deliberate admin review step between "closer confirmed" and "client gets a login"?

**I. Agent catalog as a static `src/lib/agentCatalog.js` module (recommended) vs. a DB table?** Static matches `survey.js`'s precedent and keeps build-status + card components + connect-flows versioned with the code. A table only makes sense if the catalog needs non-engineer editing.

**J. Placeholder cards:** is it acceptable for a client to see a "Coming soon / being built" card for an agent they've paid for but that isn't a `live` catalog entry yet (honest, matches the incremental-catalog model), or should a client's dashboard only ever show agents that are actually functioning?

---

## Part 7 — What this round did NOT do, on purpose

No migration, no `ALTER TYPE`, no new table, no RLS change, no edge function, no frontend change, no cron. Per the prompt's explicit "PLANNING ONLY — do not build, do not touch the database or push code." Everything above waits on Brayden's answers to A–J.

## Related

[[Restorix LIVE_STATE]] · [[Restorix Memories]] · [[Restorix North Star]] · [[Prompt 534 — Closer My Leads UI + Rotation Scoping Doc]] · [[Prompt 543 — Niche Dimension (Blocked SQL) + Bail-Bonds Source Research]]
