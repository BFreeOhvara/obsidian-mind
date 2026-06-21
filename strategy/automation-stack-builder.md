---
date: 2026-06-20
description: "Per-automation build registry — closing a deal provisions a slot for every sold automation (not just one voice agent), each goes live the moment its own info is filled in. Park until there's a real client to onboard."
tags:
  - brain
  - strategy
status: building
quarter: Q3-2026
---

# Automation Stack Builder — Strategy Idea (2026-06-20)

> Raised by Brayden after seeing the closer's AI-recommended stack: "could we set it up so the AI just builds the dashboard with the agents the customer got, and all we do manually is fill in the info each agent needs?" Answer: not today, but feasible with the right architecture.
>
> **UN-PARKED 2026-06-20 (Brayden):** originally going to wait for a real close to test against — Brayden decided to build ahead of that instead. Rationale: this is the core product, not an extension of it — if AI builds the sold stack and fulfillment is reduced to "collect each agent's required info," that's the actual deliverable Ohvara sells. See [[North Star]] Anti-goals for the paired decision (setter-headcount gate still holds; this build no longer waits on it).

## The Gap

`build-agent` (built 2026-06-08, never revisited since the custom front-runner/sub-agent stack model shipped) only provisions ONE generic Retell voice agent + ONE Twilio number on close, regardless of what was actually sold. It has no concept of `front_runner_agents`/`sub_agents` at all.

This was never going to be a single function anyway — the automations in the catalog are fundamentally different kinds of things:
- **AI Receptionist / AI Dispatcher** — real voice agents (Retell + a phone number)
- **Missed Call Text Back / Review Generation / Lead Follow-Up / Appointment Reminders / SMS Marketing** — Twilio SMS triggers tied to an event (missed call, job complete, no-response, appointment time), no voice agent involved
- **Website** — not an "agent" at all, a Vertical 2 deliverable

So today, closing a deal builds one voice agent and silently leaves everything else in the sold stack unbuilt — manual work per client, with nothing tracking that it's pending.

## The Idea

A small **automation registry**: one entry per automation type, each declaring (a) what info it needs from the client to go live, and (b) what gets auto-provisioned once that info exists. Several automations share infra (e.g. AI Receptionist + Missed Call Text Back + AI Dispatcher all ride the same Twilio number — don't provision three numbers for one client).

On close:
1. Instead of firing one hardcoded `build-agent`, create one row per sold automation on the client record, each starting in `awaiting_info`.
2. Onboarding form is generated dynamically from the registry — only asks the questions the *actually sold* automations need (not a fixed form).
3. Each automation flips to `active` the moment its own required inputs are filled in and its specific builder runs (Retell agent creation for voice-based ones, Twilio SMS template/webhook config for event-based ones).
4. Client dashboard shows real per-automation status instead of one phone number — "AI Receptionist: active," "Review Generation: awaiting your Google review link," etc.

## Why It's Better

- What Nate sells is what actually gets built — no more sold-but-never-configured automations.
- Client onboarding only asks for info relevant to what they bought, not a generic form.
- Matches the demo experience (Prompt 4/7's `SampleDashboard`/client portal preview already shows the real stack) with a real provisioning path on close — closes the loop between "what we showed them" and "what they get."

## Current State (2026-06-20)

- `build-agent`: one voice agent + one number, stack-blind. Last touched 2026-06-08.
- `provision-client`: creates `clients`/`onboarding` records on close, stack-blind on what gets built.
- `recommend-stack` already returns `front_runner_agents`/`sub_agents` (migration 039) — the data needed to drive the registry exists, just isn't consumed by the build side.

## When to Build

**Now (2026-06-20).** No real close exists yet to test against, so build against synthetic/test data first (a manually-created `clients` row with a realistic `front_runner_agents`/`sub_agents` payload from a real `recommend-stack` output) and re-verify against the first actual close once one happens.

## Status

Building — see [[LIVE_STATE]] queue, Prompt 19+.
