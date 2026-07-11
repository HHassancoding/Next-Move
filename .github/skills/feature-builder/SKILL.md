---
name: feature-builder
description: >
  Use when adding any new feature to Next Move. Determines scope then
  delegates to the correct specialist agent. Never re-defines conventions
  that already live in the agent files — those are the single source of truth.
---

# Feature Builder — Orchestrator

## Step 1 — Clarify Scope
Ask the user:
- "Is this backend only, frontend only, or full-stack?"
- "Is there a related GitHub issue number?"

## Step 2 — Branch
```bash
# No issue linked
git checkout -b feat/<kebab-case-name>

# Issue linked
git checkout -b feat/issue-<id>-<short-description>
```

## Step 3 — Delegate to the Right Agent

| Scope | Load and follow |
|---|---|
| Backend only (Spring Boot) | `.github/copilot/agents/backend.agent.md` |
| Frontend only (React/Vite) | `.github/copilot/agents/frontend.agent.md` |
| Full-stack | Both — backend first, then frontend |

Do not re-state or override rules defined in those files. Load them and follow them.

## Step 4 — Push
```bash
git push -u origin <branch-name>
```

## Step 5 — Pull Request
```bash
gh pr create \
  --title "feat: <feature-name> (#<issue>)" \
  --body "Closes #<issue>

## What
<what was built and why>

## Checklist
- [ ] Backend tests pass (\`./mvnw verify\`)
- [ ] Frontend lint + tests pass (\`npm run lint && npm test\`)
- [ ] Manually tested locally
- [ ] Docker build unaffected"
```
