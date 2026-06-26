---
date: 2026-06-26
description: Literal code-sourced text-style values for the SAY THIS quote element in CallPrepModal — confirms ONE shared element used by both setter and closer
tags:
  - brain
---

# SAY THIS Text-Style Check

**Source file:** `src/components/shared/CallPrepModal.jsx`, line 336

## Result: ONE shared element

There is **exactly one** `<p>` element that renders the quote text. It is inside the `{scriptLines ? (...) : children}` branch, used when any caller passes `scriptLines`. Both `CallModal` (setter) and `CloserModal` (closer) pass `scriptLines`, so both callers hit this same element.

No separate element for setter vs closer. No two style objects. One `<p>`, one style definition.

## Exact style values (copied from source)

```js
// CallPrepModal.jsx line 336
<p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
  {scriptDisplay}
</p>
```

| Property     | Value                  |
|--------------|------------------------|
| `fontSize`   | `14` (px)              |
| `color`      | `var(--text-primary)`  |
| `lineHeight` | `1.65`                 |
| `margin`     | `0`                    |
| `fontStyle`  | `italic`               |
| `fontWeight` | *(not set — inherits browser default: 400)* |
| `fontFamily` | *(not set — inherits body: system-ui, sans-serif)* |

## What this means

If Brayden is seeing a visual text size difference between the closer and setter SAY THIS box, it is **not** from two different style objects — they share one. Possible other causes:

- **Browser zoom / OS scaling** — if the closer page is viewed at a different zoom level
- **Stale Vercel deploy** — closer may be hitting a cached build that predates Prompt 111's shared-element fix
- **Different script line length** — a longer closer line wraps to more lines, which can *feel* visually smaller even at the same font-size; actual `fontSize` is identical
- **[ASK] badge** — closer lines marked `[ASK]` render a small chip above the text, shifting the quote text down slightly; the `<p>` itself is unchanged

## Related

- [[Memories]] — Prompt 115 Playwright measurements confirmed quote box dimensions identical (278×103) in both modes
- [[LIVE_STATE]] — Prompt 116 context
