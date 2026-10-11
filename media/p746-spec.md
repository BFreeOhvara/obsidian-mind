## Prompt 746 — Bug: "Fulfillment" in the portal opens a completely blank page (`/fulfillment/desk`). Find why, fix it, and make a crashing page show a message instead of a black screen

> **✅ Reported by Brayden 2026-10-10 22:17 CT (Falcon session), with a screenshot. Sonnet 5.5; self-flag as Opus-tier if the cause is in the auth / route-guard logic or still unclear after two honest attempts.** This is a live bug and goes **before P745** (Fulfillment Overview v2) in the queue; P745 builds on these routes.

**What Brayden sees.** He clicks **Fulfillment** in the portal and gets a **completely black page**: `portal.ohvara.com/fulfillment/desk`, Opera GX (a normal window, not private), **nothing rendered at all**: no sidebar, no header, no error text. Which account he was on isn't confirmed (Memories: the **admin** nav's "Fulfillment" link points at `/fulfillment/desk`, and the fulfillment rep's own nav "Fulfillment" does too, so **test both**). A page that renders nothing, not even the layout, means either an **uncaught render error that unmounted the whole React tree** (there is no error boundary), a **route guard that returns `null`** for that role, or a **lazy chunk that failed to load**.

### 1. Find the cause (don't guess; reproduce)

- Throwaway harness with mocked auth + data (as before; delete it, never commit), then the **production build** too (`vite build` + `vite preview`, because a minified build or a split chunk can fail where dev doesn't). Load `/fulfillment/desk`, `/fulfillment`, `/fulfillment/pipeline`, `/fulfillment/messages`, `/fulfillment/settings` as **(a) a fulfillment rep and (b) an admin**, fresh load **and** client-side navigation from the sidebar link. Capture `pageerror` and console errors for each. Report which routes go blank.
- **Check these first**, in order of suspicion:
  1. **Something shared changed since the desk last worked.** P741, P742, P743 and P744 shipped today and touched shared files (`AgentUI.jsx` / `OvSelect`, `Sidebar.jsx` collapsed state, `DashboardLayout.jsx`, `index.css`). The desk page or the fulfillment layout may import something that was renamed, removed or now needs a prop. `git log -p` on the files the desk imports, since `d16badb`.
  2. **Route guard / `RoleRedirect` / `ProtectedRoute`** returning `null` (or looping) for an admin on a `fulfillment` route, or for a rep whose profile hasn't loaded yet.
  3. **A stale lazy chunk:** if routes are `React.lazy`, a tab opened before a deploy asks for a chunk hash that no longer exists, the dynamic import rejects, and with no boundary the screen goes blank. P744 shipped at 21:41 CT and he reported this at 22:17, so this is a live possibility. Look at how the route components are loaded and what Vercel serves for a missing `/assets/*.js` (an HTML fallback served as a script is the classic symptom).
  4. A CSP or blocked-script problem (check `vercel.json` / `index.html`).
- Say in the ship note **which one it was**, with the console line that proves it.

### 2. Fix the cause

Fix what step 1 finds, in the smallest way. If it is the stale-chunk case, the fix is section 3(b), not a cache setting.

### 3. Make this never be a blank screen again (small, do it in this item)

- **(a) Error boundaries.** One around the **routed content inside the layout** (so the sidebar and header stay and the agent can click elsewhere) and one **outermost**, around the whole app (so even a layout crash shows something). The fallback is a centred `.ov-card` in the v16 look: a warning icon, **"This page ran into a problem."**, one line "Reload to try again.", a primary **Reload** button, and a ghost **Go to Overview** (the role's own Overview). Log the error with `console.error` (route + message) so it shows up in the console; no stack trace on screen. Reset the boundary when the route changes. Light and dark; works at 390.
- **(b) Chunk-load recovery.** If a dynamic import of a route fails (`ChunkLoadError`, "Failed to fetch dynamically imported module", "Importing a module script failed"), **reload the page once** automatically (guard with a `sessionStorage` flag keyed to the failed URL so it can never loop; wrap the storage calls in try/catch); if it fails again, show the boundary fallback from (a).
- Don't touch Login, the data hooks or any role's pages beyond what the fix in section 2 needs.

### 4. Verify and log

- `vite build` + eslint clean on touched files. Playwright + local Chrome against the harness **and the production build**, dark and light, 1440 and 390: every route in step 1 for both roles renders its page (no blank, no console error); the sidebar "Fulfillment" link from the admin and from the rep lands on the desk; a hard refresh on `/fulfillment/desk` works; browser Back / Forward work. **Prove the boundaries:** temporarily force a throw in one page (don't commit it) and see the fallback with the sidebar intact, then click Reload and Go to Overview; simulate a missing chunk (block one `/assets/*.js`) and see one automatic reload and then the fallback, not a loop. Agent routes (`/agent`, `/agent/billing`, `/agent/clients`) still render.
- Ship note in [[Memories]]: the root cause, the console line, which roles / routes were affected, what was verified against the harness vs the production build, and that it **wasn't seen logged in on the live site**. Brayden checks: (1) click **Fulfillment** as the account he used and the desk opens; (2) the Fulfillment rep's own sidebar link opens it too; (3) he can reload and navigate normally. If it is still blank on his machine, CC asks for the console error (F12, Console) before changing anything else.
