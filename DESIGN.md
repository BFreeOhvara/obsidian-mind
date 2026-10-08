---
date: 2026-06-07
updated: 2026-10-07
description: "Ohvara design system — color tokens, typography, anti-rules. Read before touching any UI component."
tags:
  - brain
  - reference
---

# Ohvara Design System

> Read before touching any UI component.

## v16 (2026-10-07, Prompt 714): Overview pilot, the new visual language. Current for `/agent` and `/agent/book` (P715).

Brayden called the agent Overview bland, rejected a flat v1, and approved a richer direction (quality bar: Watermelon UI dashboards). `/agent` is the pilot; the portal-wide rollout reads from this entry. Every other page still follows v15.

- **Retired on pages in this language:** the no-`box-shadow`, no-gradient and JetBrains-Mono-for-every-number rules. Cards get a soft top-to-bottom gradient, an inset 1px top highlight and a long soft shadow; large numerals are Space Grotesk 600 with tabular figures. JetBrains Mono stays for small chart axis labels only.
- **Tokens** (`src/index.css`, dark under `:root`, light under `[data-theme="light"]`): text `--ov-hi` / `--ov-mid` / `--ov-soft` / `--ov-mute` / `--ov-faint`, divider `--ov-line`; series A (Booked) `--ov-data-a` / `-tint` / `-bar` (gradient) / `-key`, series B (Cancelled) `--ov-data-b` / `-tint` / `-bar` / `-key`; trend `--ov-up` / `--ov-up-tint`, `--ov-stub`, chart `--ov-grid`; attention `--ov-warn` / `--ov-warn-tint`, `--ov-badge-bg` / `--ov-badge-fg`; hero `--ov-hero-soft` / `--ov-hero-dot` / `--ov-hero-btn-text` / `--ov-hero-btn-glow`.
- **Four surface classes** (each with a light override): `.ov-card` (every card, radius 20, 18 on phones), `.ov-hero` (navy / teal gradient with two radial glows, radius 24, 22 on phones, white text in both themes), `.ov-attn` (card plus an amber top glow and amber border, only when something needs attention), `.ov-ghost` (secondary pill buttons). Helpers: `.ov-hero-chip`, `.ov-hero-btn`, `.ov-link` (clickable card: border one step brighter on hover, no lift), `.ov-grid`, `.ov-chart-bars`.
- **Backdrop:** `.app-backdrop--v2` = two glows over a 24px dot grid (`#07080D` dark, `#EEF2F3` light), added by `DashboardLayout` on pages in this language.
- **Type scale:** greeting 46px (32 phones), hero clock 64px with a 22px AM/PM (26/13 phones), trend-card numbers 52px (40 phones), chart totals 34px (30 phones), card titles 19px (18 phones); all Space Grotesk 600, negative tracking (-0.035em on the big ones).
- **Colour discipline:** amber appears only in the attention panel; green only in the "N more" trend chip and the caught-up state. A "fewer" trend is neutral, not red. No all-caps eyebrow labels; sentence case.
- **Guardrails:** depth comes only from the card gradient + inset highlight, the long shadow, and the hero/backdrop glows. No blur/glass, animated backgrounds, hover lifts or extra gradients. Touch targets 44px+ on phones.
- **P715 — Book a call** (`/agent/book`, 2026-10-07): adds tokens `--ov-placeholder`, `--ov-pick` (selected day label + check), `--ov-seg-on` (filled weekly-meter segment) and classes `.ov-input` (48px input box, 50 on phones; `:focus-within` ring, `.is-error`), `.ov-choice` (day cards + time slots; `.is-on` = selected day), `.ov-slot-on` (selected slot gradient), `.ov-step` (1/2 badge), `.ov-note` (info box; `.is-warn` amber), `.ov-day` (container query: long date only when the card has room), `.ov-book` / `.ov-book-side` (two columns + sticky 380px summary at 1280px). Components in `AgentUI.jsx`: `StepHead`, `OvField`, `DayChoice`, `SlotGrid`, `BookingSummary` (+ phone bottom bar), `WeeklyUsage` (+ phone pill), `BookedCard`. Slot times are Space Grotesk, not mono.

## v15 (2026-10-02, Prompt 674): current everywhere except pages on the v16 language. Ohvara's own colours are back.

Brayden's call on the v14 result: Restorix's *layout and feel* stays, but the colours go back to Ohvara's own. Every colour token that existed before Prompt 669 is restored verbatim from the pre-669 commit (`ea358dd`): v13's dark palette (navy sidebar `#192C4F`, white / `#93A6C4` / `#5E7195` text, `--bg-panel` `#0F2850`, white sidebar divider) and the teal light family (page `#F3F4F6`, teal sidebar `#008674`, teal text `#016F62`, accent `#024F46`), plus the `aside` token overrides that make text readable on the coloured rail.

- **Kept from v14:** type (Space Grotesk / Manrope / JetBrains Mono), 16px cards, pill buttons, 40px controls, eyebrow labels, segmented tabs, the 64px header, and 1px borders. Light mode does **not** go back to the export's 3px borders, because that's layout, not colour.
- **New tokens from v14, re-derived from this palette:** `--bg-muted`, `--accent-deep`, `--border-strong`. Inside the sidebar, `--bg-surface`, `--bg-muted` and `--accent-deep` are overridden too. On the navy rail, the active nav row keeps white text with an accent icon, because blue text on navy is too dark.
- **Particles:** the same Restorix canvas, coloured from Ohvara's own accent: blue in dark, logo-sidebar teal `0,134,116` in light (v14 used `#007A69`).
- **Account card:** Restorix's AccountPopover pattern. It expands upward in place and offers Profile & settings and Sign out. There's no duty toggle, no Profile item, and no divider above it.

## v14 (2026-10-02, Prompt 669): colours superseded by v15. Layout/type/shape rules still current.

Brayden asked for the agent portal to match Restorix Portal's look, so the dashboard now uses Restorix's design system with Ohvara's brand hues. The live source of truth is `ohvara-dashboard/src/index.css` and `src/lib/exportStyles.js`. The v1–v13 history below is kept as a record.

- **Surfaces:** page `--bg-base`, then cards `--bg-surface`, then inner rows and controls `--bg-elevated`, then `--bg-muted`. Borders are 1px hairlines in both modes. The old 3px teal light-mode border is gone.
- **Dark:** page `#0A0A0F`, card `#13131A`, inner `#1C1C26`, accent `#4B79CE`, eyebrow `--accent-deep` `#A9C0EE`.
- **Light:** page `#E8ECF2`, card `#FFFFFF`, inner `#F3F6F9`, text navy `#0A1F44`, accent teal `#007A69` (5.3:1 on white), eyebrow `#00695B`.
- **Sidebar:** sits on the card surface (`--bg-sidebar`) in both modes. The solid navy/teal fill is retired. To bring it back, set `--bg-sidebar` to `#192C4F` (dark) or `#008674` (light).
- **Type:** Space Grotesk for display headings, Manrope for UI text (14px / 400 body), JetBrains Mono for every number. Labels use the `.eyebrow` style: mono caps, 0.14em tracking, `--accent-deep`.
- **Shapes:** cards have a 16px radius, buttons are fully rounded, controls are 40px tall with an 8px radius, and segmented tabs sit in one bordered box with a solid accent on the active tab.
- **Background:** Restorix's dot-network canvas (`ParticleField`), coloured by `--particle-line` / `--particle-dot`.

Full record: [[Memories]] 2026-10-02 · screenshots in `media/p669-agent-portal-refresh/`.

## Color Tokens

**Brand-aligned as of 2026-07-22, corrected 2026-07-22 (v2).** Pulled directly from the real logo asset (`media/new ohvara pfp.png`, pixel-sampled — not eyeballed): the bird mark's navy is `#0A1F44`, the teal wing is `#00BFA6`. The old generic dark-purple `#6C63FF` accent is retired for both modes.

### Dark mode

**History (all 2026-07-22):** v1 read as "too blue" (page background matched the cards). v2 fixed that by pushing the page to near-black while keeping cards navy-filled — **this was the confirmed-good version.** v3 through v8 then tried a long run of variations on top of that — outlined-instead-of-filled cards, a separate navy sidebar, teal borders, reusing the sidebar's hover color for borders, several rounds of border-thickness and text-weight tweaks. **v9 reverts all of that and returns to the v2 baseline** — the user's own read was that dark mode had drifted away from the simplicity that made light mode work, and asked to go back to the version from right after the original fix, before the outline/fill/border-color experimentation started. v3–v8 are kept here only as a record of what was tried and rolled back.

**v9 (2026-07-22) — full revert to the v2 baseline.** No separate sidebar background — sidebar matches the near-black page canvas, same as v2. Cards are filled with solid navy (not outlined). Border is a plain, unemphasized navy-gray, not teal and not a reused hover color. Secondary text returns to its original, more muted tone. No dark-mode-specific bold/unbold or thick/thin border exceptions — dark mode just follows the general Typography rules like everything else, no special-casing.

**v10 (2026-07-22) — page background and card fill switch from navy-tinted to neutral, matching the real live `ohvara-dashboard` app's original dark theme.** The user pulled up the actual old admin dashboard (pre-insurance-pivot) as a reference: its background and card fill are neutral near-black/dark-gray, no navy/blue tint at all. This isn't a new eyeballed guess — these are the exact values this same file had for dark mode before any of the brand-color work started (`#0A0A0F` / `#13131A` / `#1C1C26`), i.e. the real, currently-live app's actual tokens. Sidebar explicitly stays navy for now (user's call, may revisit later) — this round only changes the page canvas and card fill, not the sidebar.

**v11 (2026-07-22) — border color also switches to neutral, same reasoning as v10.** The navy-gray border read oddly against the newly-neutral card fill, exactly as flagged. Fix: use the original live app's actual border color (`#2A2A3A`, plain neutral gray) instead of the navy-gray `#40506D` — same precise, pulled-from-the-real-app approach as v10, not a new guess. Matches the subtle divider lines visible in the old admin dashboard's "Recent Bookings" list.

**v12 (2026-07-22) — dark mode drops the teal accent entirely, replaced with a blue derived from the sidebar's own hue.** Teal is confirmed working in light mode but rejected for dark mode specifically — a deliberate per-mode difference, not an inconsistency. The literal sidebar navy (`#192C4F`) can't be reused directly as an accent, though — checked and it only measures 1.42:1 contrast against the page background and 1.33:1 against card fill, both far below the 3:1 minimum for UI elements, so it would be nearly invisible as icon/link/badge color. Instead, derived a brighter blue from the exact same hue (219°, same family as the sidebar navy, lifted in lightness/saturation rather than just mixed toward white, which would have desaturated it into gray): `#4B79CE`, measuring 4.63:1 against the page background and 4.34:1 against card fill — comfortably legible, still reads as "blue," not gray, not teal.

**Also v12: the hover/click highlight on main-page interactive elements changes from blue to a light neutral gray** (distinct from the sidebar's own active-item highlight, which is unaffected — this only applies to hover states on the main content area, not the sidebar nav).

**v13 (2026-07-23) — two fixes found reviewing the built mockup.** (1) Popovers/dropdowns (e.g. the notification panel) were rendering in the blue accent color instead of a neutral elevated surface — `--bg-elevated` already existed for exactly this purpose (light mode's version is explicitly commented "raised surfaces (modals/popovers)") but wasn't being applied consistently in dark mode. Explicitly documenting: **`--bg-elevated` is the modal/popover/dropdown surface color in both modes** — never the accent color. (2) The sidebar's own divider lines were blending into the navy sidebar background using the general `--border` gray — added a sidebar-specific divider token, white, used only for lines inside the sidebar (e.g. below the logo/portal-name header). General `--border` is unchanged everywhere else (cards, page-level dividers).

```css
--bg-base:       #0A0A0F   /* page canvas — neutral near-black, matches the real live app */
--sidebar-bg:    #192C4F   /* sidebar fill — explicitly kept navy per the user's call, unaffected by v12's accent change */
--sidebar-border:#F0F0F5   /* v13: sidebar-only divider lines — white, so they read against the navy sidebar fill instead of blending in. Not used outside the sidebar. */
--bg-surface:    #13131A   /* card/box fill — neutral dark gray, matches the real live app */
--bg-elevated:   #1C1C26   /* v13: confirmed as the modal/popover/dropdown surface color (notification panel, etc.) — distinct from both --bg-base and --bg-surface, never the accent color */
--border:        #2A2A3A   /* neutral gray, matches the real live app — cards and page-level dividers only, not the sidebar (see --sidebar-border) */
--accent:        #4B79CE   /* v12: blue derived from the sidebar's hue, replacing teal (#00BFA6) for dark mode only — light mode keeps teal */
--accent-hover:  #5F88D3   /* v12: lighter variant of the new blue accent */
--text-primary:  #F0F0F5
--text-secondary:#98A1B0   /* unchanged from v9 */
--success:       #22C55E
--warning:       #F59E0B
--danger:        #EF4444
```

### Light mode

**v2 (solid teal card fills) read as "too much"** — corrected 2026-07-22 (v3). Sidebar stays exactly as v2 (solid deepened teal, white lettering) — that part worked. Cards flip the other way: white/light fill instead of solid teal, with **teal used for the text and border lines inside them** instead of dark navy.

**Contrast checked again for this flip.** Teal text on a white card fill needs to be darker than the raw brand teal to stay legible — raw teal (`#00BFA6`) on white only measures 2.33:1, and even the previous "deepened for text" value (`#02A797`) only reaches 3.01:1, which clears the 3:1 minimum for large text/graphical elements but not the 4.5:1 minimum for normal-sized text (labels, subtext). The same deepened teal already used for the sidebar (`#008674`) clears 4.5:1 on white, so it's reused here too, for both the teal text and the teal border/divider lines inside cards — one consistent teal value for every non-sidebar text/line use in light mode, not a third shade.

```css
--bg-base:        #F3F4F6   /* page canvas — unchanged, stays light */
--bg-surface:     #FFFFFF   /* card/box fill — white, not teal (v3 correction) */
--bg-elevated:    #FFFFFF   /* raised surfaces (modals/popovers) — same white */
--sidebar-bg:     #008674   /* sidebar fill only — unchanged from v2 */
--sidebar-text:   #F0F0F5   /* sidebar lettering only — white, unchanged from v2 */
--accent:         #00BFA6   /* filled elements only — buttons, toggle "on" state, active tab pills (with white or dark text on top, whichever passes contrast) */
--accent-hover:   #008674   /* teal text AND teal border/divider lines everywhere inside cards — the same value used for the sidebar, reused here because it's the one teal dark enough to pass 4.5:1 on white */
--text-primary:   #081A3A   /* still used for anything not explicitly called out as teal above */
--text-secondary: #606D85
--border:         #008674   /* card border/divider lines — teal, not gray (v3 correction) */
--success:        #22C55E
--warning:        #F59E0B
--danger:         #EF4444
```

## Typography

| Property | Value |
|----------|-------|
| Font UI | Geist or Inter |
| Font Mono | JetBrains Mono (all numbers/data/money) |
| Weights | 400–700 (cap lifted 2026-07-22 — see note below) |

**Weight cap lifted 2026-07-22.** The dashboard read as too thin/washed out once the brand rebrand went in — labels, sidebar nav text, and border lines needed real visual presence, not just size/color. 600/700 are now allowed wherever something needs to read as bold, not just the numeric values. This supersedes the old 400/500-only rule below where the two conflict.

**Exception, light mode only (2026-07-22): sidebar nav text stays at its original, non-bold weight.** Everything else in light mode keeps the bolder treatment above; the sidebar nav specifically reverts to normal weight. **Dark mode has no such exception as of v9** — it reverted fully to its pre-experimentation baseline (see Dark mode history above), so it just follows whatever the general weight/border rules land on, no dark-mode-specific carve-out.

**Border thickness: light mode only.** Light mode keeps the thicker card/divider border treatment. Dark mode reverted to its v9 baseline, which never had a special thickness rule — normal weight, no dark-mode-specific override.

## Anti-Rules

- No `box-shadow`
- No gradients
- No `border-radius` > `10px`
- No hardcoded hex colors in JSX — use CSS custom properties
- ~~No `font-weight` 600 or 700~~ — **retired 2026-07-22, see Typography above**
- No zebra striping on tables
