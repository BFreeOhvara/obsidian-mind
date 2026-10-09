## Prompt 735 — Settings: stop the browser filling the current-password box (and hijacking the header search), add "Forgot password?", and build the portal's own dropdown for Time zone

> **✅ Asked for by Brayden 2026-10-09 (Falcon session), from three screenshots of `/settings`. Sonnet 5.5** (agent UI plus a reusable component; no migration, no new dependencies). **Self-flag as an Opus-tier problem if the autofill fix in section 1 doesn't hold after two honest attempts** (browser password-manager heuristics are fiddly and can't be proven headless). Queued after P734.

**What Brayden sees.** Settings → Sign-in & security, in Opera GX (Chromium):
1. **"Current password" is already filled in** (nine dots) the moment the page opens. He doesn't want that: *"you have to put your password in. You can't just use a saved password to get in."*
2. **The header search box** ("Search clients, pages…") sits above it, and when he clicks it the browser pops its **saved-login picker** ("testagent11 / brayden11 / testfulfill11 / Manage passwords…") as if the search box were a username field. Same cause: the browser has decided this page is a login form, the first text box on the page is "the username" and the password field is "the password".
3. He wants **"Forgot password?"** right there.
4. **Time zone** (Settings → Preferences) uses the **browser's default `<select>` list** (white, system-styled). He wants the portal's **own dropdown**, in the v16 look.

### 1. Stop the autofill and the saved-login picker (`Settings.jsx` sign-in panel, `src/lib/verifyPassword.js` flow unchanged)

- **Current password field:** it must **never be pre-filled** by the browser or a password manager, and must **not open the saved-passwords picker** when focused. Layer the fixes, because browsers ignore any single one:
  - Put the two-step password area in a **real `<form autoComplete="off">`** with an explicit submit (Enter and the Continue button submit it). A formless page is what lets Chromium pair this password field with the nearest preceding text box (the header search). A real form splits them.
  - The input: `type="password"`, `autoComplete="off"`, a **non-standard `name`** (e.g. `ov-confirm-current`), `data-lpignore="true"`, `data-1p-ignore`, `data-form-type="other"`, and **`readOnly` until its first focus / pointerdown** (then removed) so nothing can fill it on load. If Chromium still fills it, try `autoComplete="new-password"` on this field **and say in the ship note whether Chrome then offers "Suggest strong password"**; that's worse, so prefer the first set.
  - Same care for the **New password / Confirm** fields in step 2 (these may use `autoComplete="new-password"`, that's their correct value, but they must not be pre-filled either).
- **Header search input** (`src/components/layout/`, the Ctrl K search): `type="search"`, `name="q"` (not `username`/`email`), `autoComplete="off"`, `role="combobox"` with the right `aria-*`, `data-lpignore="true"`, `data-1p-ignore`, `data-form-type="other"`, and it must not sit inside any `<form>` that also contains a password field. Check the **Login** page still offers saved logins normally (its fields keep `autoComplete="username"` / `"current-password"`; don't touch Login).
- **Prove what can be proven:** in Playwright check the attributes and the form structure on `/settings#security` (the search box is outside the password form; the password input is empty on load, still empty after 2 s, and `readOnly` until focus). **Say plainly that headless Chrome has no password manager, so the real test is Brayden's Opera GX with saved logins.** His check: open Settings → Sign-in & security with saved passwords present; the box is empty; clicking the header search shows no saved-login list.

### 2. "Forgot password?"

- A text link **"Forgot password?"** at the right end of the "Current password" label row (and it stays visible if the check fails with a wrong password). It does **not** need the current password.
- Behaviour: **reuse the existing Forgot password flow from Login** (same Supabase `resetPasswordForEmail`, same redirect and reset-landing page; read `Login.jsx` and the reset page and don't build a second one). From Settings it sends to the signed-in account's **own sign-in email** and shows in-card: **"We'll email a reset link to <email>."** → Send link → **"Check <email>. The link signs you in to set a new password."** (Resend link after 60 s.)
- **Accounts that sign in by username** (`@ohvara.internal`, like Test Agent, Test Fulfillment, etc.): there's no real inbox. Show **"This account has no email on file. Ask your admin to reset your password."** instead of the send button. Don't send anything to an `.internal` address.
- **Known gap (don't fix here, say it in the ship note):** Memories (P720) records that **no custom SMTP sender is configured**, so reset emails (and Change email) may not arrive until Brayden sets up SMTP (Resend would do). If a send call errors, show the real reason ("Couldn't send that. Try again.").

### 3. The portal's own dropdown (`OvSelect`), used for Time zone

- Build **one reusable `OvSelect`** in `AgentUI.jsx` (v16 look, `.ov-input` trigger, `.ov-card.ov-pop` list), and use it for **Settings → Preferences → Time zone**. Behaviour (WAI-ARIA listbox pattern):
  - Trigger is a button: shows the selected label, a chevron that flips when open, the same height and focus ring as the other fields; `aria-haspopup="listbox"`, `aria-expanded`.
  - The list is a popover **rendered in a portal** (so a card or modal never clips it), **same width as the trigger**, opens **below, or above if there isn't room**, `max-height` about 280px with its own scroll, the selected option scrolled into view, **a check mark on the selected row**, hover and keyboard-active tint like My Pipeline's rows.
  - Keyboard: ↑ ↓ Home End move, Enter / Space choose, Esc closes and returns focus to the trigger, Tab closes; **typing letters jumps to the matching option** (matters for long lists like States); click outside closes. Opens and closes with the same short fade/slide as `.ov-pop`; reduced motion = none.
  - Phone: rows 44px tall; the popover stays within the screen width.
  - Light and dark, tokens only. Works inside the Settings cards without clipping.
- **Time zone options stay exactly as they are** (Eastern, Central, Mountain, Mountain (AZ, no DST), Pacific, Alaska, Hawaii, same stored values, same Save button and "unsaved" behaviour). **Small addition:** each option shows, right-aligned and muted, **the current time in that zone** (e.g. "6:05 PM") from `Intl.DateTimeFormat`, so he can see what he's picking.
- **Falcon's addition, same component, small:** replace the other native `<select>` that Brayden would hit next, the **State** field on **Book a call → New booking / Change a booking** (P724/P730's `.ov-input.ov-select`), with `OvSelect` (shows "Florida", stores "FL", placeholder "Choose a state", type-ahead). Do `grep -rn "<select" src/pages/agent src/components/agent src/pages/Settings* src/pages/settings*` and **list any others in the ship note without changing them** (admin and fulfillment pages are out of scope).

### 4. Files and rules

Expect `src/pages/Settings.jsx` (or the settings panel files under `src/components/agent/`), `src/components/layout/` (header search), `src/components/agent/AgentUI.jsx` (`OvSelect`), `src/pages/agent/BookCall.jsx` / `ChangeBooking.jsx` (State field), `src/index.css`, `DESIGN.md` (add a "P735" line under v16 and note `OvSelect` as the portal's dropdown). Design tokens only; light mode works. Don't touch Login's fields, `verifyPassword.js`, or admin / Fulfillment pages.

### 5. Verify and log

- `vite build` + eslint clean on touched files. Throwaway Vite harness with mocked auth (delete it, never commit), Playwright + local Chrome, dark and light, 1440 and 390:
  - `/settings#security`: the password input is empty on load and after 2 s, it's inside a real form, the header search is outside any form and has the attributes above, Enter submits Continue, Forgot password? is visible, shows the email form for a real-email account and the "ask your admin" note for an `.internal` account, and the send path calls the same function Login uses (mock it).
  - `OvSelect` on `/settings#preferences`: opens and closes, mouse and every key listed, type-ahead, selected scrolled into view, opens upward near the bottom of a short window, not clipped by the card, check mark and per-zone current time show, Save behaviour unchanged, phone 44px rows. Same checks on the State field in Book a call and Change a booking (prefill still works, values still `FL`-style).
  - No native `<select>` left in Settings and in Book a call / Change a booking.
- Ship note in [[Memories]]; say plainly it wasn't seen logged in, that the autofill behaviour **couldn't be proven headless** and needs Brayden's Opera GX check, and the SMTP gap. Brayden checks as Test Agent: (1) Settings → Sign-in & security opens with an empty current-password box; (2) clicking the header search shows no saved-login list; (3) Forgot password? is there (Test Agent is a username account, so it should say to ask an admin); (4) Preferences → Time zone opens the portal's own list with a check mark and the times; (5) State on Book a call looks the same way.
