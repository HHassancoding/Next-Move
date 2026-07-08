---
name: repo-orient
description: >
  Use this at the start of any session on a new or returning repo.
  Scans structure, tech stack, CI setup, and open issues to build
  a full mental model before any work begins. Saves tokens by front-loading
  context so Copilot does not need to re-read files repeatedly.
---

# Repo Orientation

Run these steps once per session before any other skill is invoked.

1. Run `git log --oneline -10` — summarise recent work direction and what areas are actively changing.
2. Run `find . -not -path '*/node_modules/*' -not -path '*/target/*' -not -path '*/.git/*' -type f | head -60` — map file structure.
3. Read `pom.xml` or `package.json` at the root — identify stack, dependencies, and version.
4. Read `.github/copilot-instructions.md` if it exists — absorb project conventions.
5. Read `.github/workflows/*.yml` — summarise CI/CD pipeline triggers and key steps.
6. Run `gh issue list --state open --limit 10` — list open issues.
7. Run `gh pr list --state open` — list any open PRs.
8. Output a single structured summary with these sections:
   - **Stack**: languages, frameworks, tools
   - **Entry points**: main backend class, frontend root component
   - **CI/CD**: what triggers what
   - **Open work**: top 3 issues or PRs to action
9. Ask: "Which of these should we focus on first?"

## Token Discipline
- Do not re-read files that were already summarised earlier in the same session.
- Cache the stack summary mentally; only re-orient if the user switches repos or branches significantly.
