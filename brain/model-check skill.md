# model-check skill (manager chats: Eagle and Falcon)

> Skills save to the claude.ai account that saves them, so each manager account needs its own copy. If you are Eagle or Falcon and your skills list has no `model-check`, propose the skill below with `propose_skills` (name `model-check`, new) and Brayden saves it from the card. Not for CC; CC builds with whatever model Brayden picks. Requested by Brayden 2026-10-09. Saved on the Eagle account: check with ListSkills before proposing again.

---
name: model-check
description: Run first on every new message from Brayden: decide if the task needs Opus 5.5 or Sonnet 5.5, flag a switch before doing any work, and tag each queued prompt with its model.
---

# Model check

Brayden pays for usage, so Opus 5.5 should only run when the work needs it. Every request has two parts, the thinking (planning, designing, writing the spec) and the doing (building). This skill covers both: which model should think about this message, and which model should CC use to build the prompt that comes out of it.

## 1. Before anything else: is this the right model for the thinking?

Do this first, before reading files, calling tools, or writing anything. Work out which model is running now (from the session's configured model; if it can't be told, skip the flag rather than guess). Then decide which model the message needs.

**Needs Opus 5.5:**
- Rethinking a whole page or flow, or designing something new from scratch
- Anything touching the database, migrations, auth, billing, payments, security or permissions
- Hard debugging (cause unknown, several systems involved)
- Specs that change data rules, many files, or behaviour that is hard to undo
- Ambiguous requests where the right reading takes real judgment

**Sonnet 5.5 is enough:**
- Small UI tweaks, wording, spacing, colours, copy changes
- Queueing or appending a spec that is already written and approved
- Building or editing from an approved spec or mockup
- Status questions, quick lookups, simple explanations, file housekeeping
- Follow-ups that only adjust something just built

**If the running model does not match, stop and send only this, with no other work and no tool calls:**

> Switch to Opus 5.5 and resend. (reason in a few words)

or

> Switch to Sonnet 5.5 and resend. (reason in a few words)

Then wait. When Brayden resends on the right model, do the work. Do not flag again for the same message, and if he says to stay on the current model, just proceed.

**If it matches, or it is borderline, say nothing about models and get on with the work.** When unsure, stay on the current model. Never flag more than once per message, and never lecture about it.

## 2. After queueing a prompt: say which model CC should build it with

Each time a prompt is queued in `brain/Ohvara CC Queue.md`, end the reply with one short line in this form:

> P725: Opus 5.5

Pick the model for the build by the risk and size of the build, not by which model wrote the spec:
- **Opus 5.5:** database changes or migrations, billing/auth/security, data rules, changes that touch many files or every place a value is shown, anything hard to undo
- **Sonnet 5.5:** UI-only changes from an approved mockup, copy, styling, small isolated edits

Add a few words of reason only if it is not obvious (for example "adds columns"). Keep it to that one line; the rest of the reply stays as short as it would be anyway. If several prompts are queued in one turn, give one line each.
