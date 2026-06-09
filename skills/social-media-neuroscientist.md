---
date: 2026-06-07
description: "Three-tool system for neuroscience-based social media content analysis — Apify MCP + TribeV2 brain model + Modal cloud GPU"
tags:
  - skill
  - research
  - content
  - ai-tools
status: future
source: "Instagram — 'Turn your Claude Code into a Neuroscientist'"
media: "media/instagram-claude-neuroscientist-social-media-research.mp4"
---

# Skill: Claude Code as Social Media Neuroscientist

**Category:** Research / Content / AI Tools
**Created:** 2026-06-07
**Last used:** 2026-06-07
**Phase relevance:** Phase 2–3 (not Phase 1)

## What This System Does

Three tools combined let Claude Code analyze your social media content using a neuroscience model — showing how the brain responds to your content and where attention is most active. Goes beyond generic advice like "better hooks" to give data-driven brain response insights.

---

## The 3-Tool System

### Tool 1 — Apify MCP (Content Downloader)

**URL:** https://mcp.apify.com
**What it does:** Downloads all your past TikTok or Instagram content for analysis

- Connects to 25K+ tools for web scraping and data extraction
- Preloaded actor: RAG Web Browser
- Scrapes Instagram or TikTok profiles and downloads all posts/videos
- Returns content in a structured format Claude can analyze

**MCP Config:**

```json
{
  "mcpServers": {
    "apify": {
      "command": "npx",
      "args": ["-y", "@apify/mcp-server"],
      "env": {
        "APIFY_API_TOKEN": "your_token_here"
      }
    }
  }
}
```

Add to `~/.claude/claude_desktop_config.json` when ready to use.

---

### Tool 2 — TribeV2 (Meta's Brain Response Model)

**What it does:** Meta's neuroscience model that shows how the brain responds to social media content

- Trained on brain scan data correlated with social media engagement
- Shows which parts of the brain are most active when viewing content
- Outputs heatmaps and attention maps for specific content
- Gives insights beyond standard engagement metrics

> ⚠️ **Important:** Correlation ≠ causation. This is a research tool — use insights directionally, not as absolute truth.

**GitHub:** Search `TribeV2 Meta brain social media model`

---

### Tool 3 — Modal (Cloud GPU Runner)

**URL:** https://modal.com
**What it does:** Runs TribeV2 in the cloud when local hardware is too slow

- AI infrastructure with sub-second cold starts
- Run inference, training, and batch processing
- Developer experience that feels local

**Setup:**

```bash
pip install modal
modal setup  # authenticates your account
```

**Why needed:** TribeV2 is a heavy neural network model. Modal runs it on cloud GPUs in the background.

---

## The Full Workflow

```
1. Use Apify MCP → scrape all Instagram/TikTok content
2. Download content to local folder
3. Run TribeV2 on each piece of content (via Modal if needed)
4. Get outputs:
   - Brain attention heatmaps
   - Where attention is most active
   - Psychological insights per post
5. Feed results to Claude for pattern analysis and recommendations
```

## Example Claude Prompt (after running analysis)

```
Here are the TribeV2 brain response outputs for my last 20 Instagram posts.
Analyze the patterns:
- Which content types get the highest brain activation?
- What visual elements correlate with attention?
- What should I change about my content strategy based on this data?
Remember: correlation ≠ causation, but look for consistent patterns.
```

---

## Relevance for Ohvara

### Phase 1 — Not relevant now
Focus is outreach + sales machine. Don't install Apify or TribeV2 yet.

### Phase 2–3 — High potential

| Use Case | Application |
|----------|-------------|
| Content marketing | Analyze which LinkedIn/Instagram posts generate the most inbound from trades owners |
| Profile A audience research | What content about AI automation gets highest engagement from roofing/HVAC/electrical owners |
| Content strategy optimization | Data-driven decisions instead of guessing on hooks and formats |

### Web Agency — Premium differentiator

- Analyze client content performance neuroscientifically
- "We don't just build your website — we optimize your content for brain engagement"
- Differentiator from commodity web agencies

---

## Install Checklist (when Phase 2 begins)

```
□ Get Apify API token from mcp.apify.com
□ Add Apify MCP to ~/.claude/claude_desktop_config.json
□ pip install modal && modal setup
□ Clone TribeV2 repo
□ Test on a sample of recent posts before full analysis run
□ Keep "correlation ≠ causation" disclaimer in any client-facing output
```

---

## Related

- [[North Star]] — Phase 2–3 roadmap, web agency vertical
- [[google-stitch-mcp-workflow]] — another design/content tool for when Phase 1 is running
- [[claude-code-mastery-levels]] — Level 4 (Integrator) tool — surgical MCP selection applies here
- [[skills/Index]] — check skill count before adding Apify MCP (stay under 30)
