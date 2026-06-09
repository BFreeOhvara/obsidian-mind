---
date: 2026-06-07
description: "Use Google Stitch to design UI and export as live MCP connection to Claude Code — higher fidelity than DESIGN.md alone"
tags:
  - skill
  - design
  - mcp
  - workflow
status: active
source: "Instagram video — google-stitch-mcp-claude-export"
media: "media/instagram-google-stitch-mcp-claude-export.mp4"
---

# Skill: Google Stitch → MCP → Claude Code

**Category:** Design / Workflow
**Created:** 2026-06-07
**Last used:** 2026-06-07

## What This Skill Does

Replaces the DESIGN.md → Claude workflow with a live design-to-code pipeline.
Instead of describing the design in markdown and hoping Claude interprets it correctly,
Stitch exports a live MCP connection that Claude reads directly.

**"Stitch designs, Claude builds."**

---

## The Workflow

```
1. Open stitch.withgoogle.com
2. Describe your UI in plain English
   Example: "Design a cinematic landing page for COSMOS with
   liquid-glass design system and Framer Motion animations"
3. Stitch generates the design
4. Export → select MCP (not any other option)
5. Claude Code reads the design via the live MCP connection
6. Claude builds directly from the connection — not from a description
```

## Export Options in Stitch (choose MCP)

| Option | Use? |
|--------|------|
| AI Studio (Preview) | No |
| Figma | No |
| Jules | No |
| .zip | No |
| Code to Clipboard | No |
| **MCP** | ✅ **Use this one** |
| Project Brief | No |

---

## Why This Beats DESIGN.md for UI Sessions

| Approach | What Claude Gets |
|----------|-----------------|
| DESIGN.md alone | A markdown description of design intent |
| Stitch MCP export | A live connection to the actual design |

DESIGN.md is still useful for token rules (no box-shadow, no gradients, etc.) — it's not replaced, it's supplemented. Stitch handles the *visual* spec; DESIGN.md handles the *rule* spec.

---

## When to Use This Skill

- Any session where you're building or redesigning a page in the dashboard
- When you have a specific visual in mind and want high-fidelity output
- Before a major UI overhaul session

## When NOT to Use

- Pure logic/backend work with no UI component
- Small CSS tweaks — just reference DESIGN.md tokens directly

---

## Status for Ohvara

Not yet used — flagged for next dashboard UI session.

**Action:** Next time a new page or major UI component is being built, start in Stitch first.

---

## Related

- [[DESIGN]] — design token rules, anti-rules (still applies alongside Stitch)
- [[North Star]] — dashboard as #1 priority
- [[claude-repos-top10]] — companion tool reference
