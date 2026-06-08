---
date: 2026-06-08
description: "Glass morphism, animated orbs, counting KPIs, staggered row entrances, hover lift — premium dark UI for Ohvara dashboard."
tags:
  - skill
  - react
  - ui
status: active
---

# Skill: Premium Animated UI

**Category:** React / UI  
**Created:** 2026-06-08  
**Last used:** 2026-06-08  
**Repo:** `ohvara-dashboard`

## What This Skill Does

World-class premium animated dark UI for the Ohvara outreach dashboard.  
Animated background orbs, glass morphism cards that breathe, KPI numbers that count up on load, staggered row entrances, hover lift effects on every surface.

## CSS Classes (src/index.css)

| Class | Effect |
|-------|--------|
| `.glass` | Frosted glass card — `backdrop-filter:blur(20px)`, hover lift +1px, border brightens |
| `.glass-accent` | Accent purple glowing card — `accentBreathe` animation, no hover transform |
| `.sidebar-glass` | Sidebar — `blur(40px)`, 75% opacity base |
| `.page-enter` | Page fade+slide up on mount (`fadeSlideUp 0.35s`) |
| `.stagger` | Staggered children — each `nth-child` delays by 50ms |
| `.nav-active-dot` | 5px pulsing dot next to active nav item |
| `.table-row-animated` | Row slide-in from left (`rowSlideIn 0.25s`) |
| `.btn-call` | Accent CTA button with glow — use for Call Now |

## CSS Tokens (src/index.css `:root`)

```
--bg-base / --bg-surface / --bg-elevated / --bg-overlay
--border / --border-hover
--text-primary / --text-secondary / --text-muted / --text-dim
--accent / --accent-hover / --accent-glow / --accent-dim / --accent-border
--success / --success-dim
--warning / --warning-dim
--danger / --danger-dim
--info / --info-dim
--font-sans / --font-mono
--radius-glass: 12px
```

## Keyframes

| Name | Used by |
|------|---------|
| `orbFloat1` | Purple orb top-center |
| `orbFloat2` | Cyan orb bottom-right, Green orb bottom-left |
| `fadeSlideUp` | `.page-enter`, `.stagger` children |
| `rowSlideIn` | `.table-row-animated` |
| `accentBreathe` | `.glass-accent` |
| `navPulse` | `.nav-active-dot` |

## Hooks

### `useCountUp(target, duration=800)`
Animates a number from 0 to `target` using `requestAnimationFrame` + `easeOutCubic`.  
Resets if `target` changes.  
File: `src/hooks/useCountUp.js`

## Components

### `<BackgroundOrbs />`
Three slow-floating ambient orbs behind everything (purple, cyan, green).  
Mount once in `App.jsx` — not inside individual pages (prevents re-mount on navigation).  
File: `src/components/BackgroundOrbs.jsx`

### `<KPICard label value prefix suffix delta deltaPositive accent icon sub subColor />`
Glass KPI tile with animated countup. Pass `accent={true}` for the accent-breathing variant.  
`value` must be numeric for countup to activate.  
File: `src/components/ui/KPICard.jsx`

## Application Checklist

- [ ] `<BackgroundOrbs />` mounted in `App.jsx` root (once)
- [ ] Each page root div has `className="page-enter"`
- [ ] KPI grids use `<KPICard>` + parent has `className="stagger"`
- [ ] Table containers: `className="glass"` + `style={{ overflow:'hidden', borderRadius:10 }}`
- [ ] Table rows: `className="table-row-animated"`
- [ ] Card divs: `className="glass"` or `className="glass-accent"`
- [ ] Sidebar: `className="sidebar-glass"`
- [ ] Active nav items: `<span className="nav-active-dot" />` after label
- [ ] Call Now / primary actions: `className="btn-call"`
- [ ] No hardcoded hex colors in JSX — all via CSS vars

## Implementation Notes

- `Card.jsx` and `StatCard.jsx` share components — upgrading them to `.glass` cascades to all consumers automatically
- Login card uses `.glass-accent` for the breathing glow effect on entry
- `LeadPipeline` kanban: column containers get `glass border-t-2 {stage-color-class}`; individual lead cards get `glass table-row-animated`
- `body::before` / `body::after` CSS pseudo-elements handle the two main orbs — `BackgroundOrbs` handles the green tertiary orb only

## Verified Working

**2026-06-08** — Ohvara dashboard full sweep  
Commit `a050dc4` — 20 files changed, 466 insertions, 264 deletions  
Build: `✓ 1.05s`, zero errors  
Deploy: Vercel auto-deploy via `git push origin master`

## Related

- [[DESIGN]] — Ohvara design system tokens
- [[ohvara-dashboard]] — main dashboard project note
