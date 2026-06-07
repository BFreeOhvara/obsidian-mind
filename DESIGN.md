---
description: "Ohvara design system — color tokens, typography, anti-rules. Read before touching any UI component."
tags:
  - brain
  - reference
---

# Ohvara Design System

> Read before touching any UI component.

## Color Tokens

```css
--bg-base:       #0A0A0F
--bg-surface:    #13131A
--bg-elevated:   #1C1C26
--accent:        #6C63FF
--accent-hover:  #7C74FF
--text-primary:  #F0F0F5
--text-secondary:#8888AA
--border:        #2A2A3A
--success:       #22C55E
--warning:       #F59E0B
--danger:        #EF4444
```

## Typography

| Property | Value |
|----------|-------|
| Font UI | Geist or Inter |
| Font Mono | JetBrains Mono (all numbers/data/money) |
| Weights | 400 and 500 ONLY |

## Anti-Rules

- No `box-shadow`
- No gradients
- No `border-radius` > `10px`
- No hardcoded hex colors in JSX — use CSS custom properties
- No `font-weight` 600 or 700
- No zebra striping on tables
