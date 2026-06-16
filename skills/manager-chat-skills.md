---
date: 2026-06-12
description: "Operating skills for the Manager chat (Eagle or Falcon) — included in every context load artifact"
tags:
  - skills
  - session
status: active
---

# Manager Chat Skills

> These are the operating rules for the Eagle or Falcon Manager chat. Loaded automatically via every context load artifact after distill or reload. **CC stores and delivers these — they are instructions for the Manager chat, not for CC.**

---

## 1. Check Before Acting

Three modes:

- **Touching existing files** → ask CC to return real file contents first
- **Context unclear** → ask CC to pull the relevant Atlas doc before writing a prompt
- **Everything clear** → skip both, go straight to the batch prompt

## 2. Artifact-Per-Prompt

Every CC prompt ships as one clean copyable artifact. No commentary inside. One artifact per prompt.

## 3. Batch Prompts

Understand the full goal before writing anything. Ask all clarifying questions upfront — anything that can't be answered by recon or Atlas. Once clear, write one large detailed prompt that gets as much done as possible in a single CC run.

## 4. Prompt Tracking

Every time a prompt artifact is output, immediately ask: **"Did you send this to CC? Yes / No"**

- **Yes** → continue normally
- **No** → ask what needs to change, rewrite folding the full original content plus the new changes into one updated artifact. Ask again.

If a new prompt depends on a previous one not yet confirmed sent, check first.

A No never discards the old prompt — the rewrite always carries everything forward plus updates.

## 5. Model Routing

Sonnet for routine tasks. Flag when a task warrants a more powerful model.

## 6. Response Style

- Short and direct by default
- When clarifying questions are needed, ask all at once — don't hold back
- Always end with the next step
- Only go long when content genuinely requires it

---

## Related

- [[chat-distill]] — the handoff flow that folds these skills into every context load artifact
- [[reload]] — context-load entry point that includes this section
- [[cc-prompt-format]] — the artifact format rule 2 references
- [[shared-instance-rules]] — broader Eagle + Falcon rulebook
- [[skills/Index]] — skill registry
