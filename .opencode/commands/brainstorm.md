---
description: Brainstorm and design a feature before implementation
---

# Brainstorm

## Task

Collaboratively explore, design, and spec out the idea described below before any implementation begins.

**Topic / idea:** $ARGUMENTS

## Instructions

### 1. Load the skill

Before doing anything, load the `brainstorming` skill from `.agents/skills/brainstorming/SKILL.md`.

### 2. Follow the brainstorming checklist

Execute every step of the skill's checklist in order:

1. **Explore project context** — check files, docs, recent commits relevant to the topic.
2. **Offer visual companion** — if the topic will involve visual questions, offer it as its own message (do not combine with a clarifying question).
3. **Ask clarifying questions** — one at a time, prefer multiple-choice, understand purpose/constraints/success criteria.
4. **Propose 2-3 approaches** — with trade-offs and a recommendation.
5. **Present design** — in sections scaled to complexity, get user approval after each section.
6. **Write design doc** — save to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` and commit.
7. **Spec self-review** — scan for placeholders, contradictions, ambiguity, scope issues; fix inline.
8. **User reviews written spec** — ask the user to review before proceeding.
9. **Transition to implementation** — invoke the `writing-plans` skill to create the implementation plan.

### 3. Key rules

- Do NOT write any code or invoke any implementation skill until the design is approved.
- One question per message.
- Prefer multiple-choice questions.
- Apply YAGNI ruthlessly — remove unnecessary features from all designs.
- Always propose 2-3 approaches before settling on one.
- The only skill invoked after brainstorming is `writing-plans`.
