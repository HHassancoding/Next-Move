---
name: feature-builder
description: >
  Use when adding a new feature to Next Move. Covers branch creation,
  Spring Boot backend and/or React frontend implementation, test
  generation, and PR creation with proper issue linking.
---

# Feature Builder – Next Move

## Step 1 – Clarify Scope
Before writing any code, ask the user:
- "Is this backend (Spring Boot), frontend (React/Vite), or full-stack?"
- "Should I write unit tests for the new code?"
- "Is there a related GitHub issue number to link?"

## Step 2 – Branch
```bash
git checkout -b feat/<kebab-case-feature-name>
```
If linked to an issue: `feat/issue-<id>-<short-description>`.

## Step 3 – Backend (Spring Boot)
- Follow the layer order: Controller → Service → Repository.
- Controllers live under the root package; keep mapping logic out of controllers.
- Services hold business logic; keep them framework-agnostic where possible.
- Use SLF4J (`@Slf4j`) for all logging — never `System.out.println`.
- New endpoints must be tested with an entry in `recommendationsHTTPTests.http`.
- Generate a JUnit 5 test class under `src/test/java/...` mirroring the main package.
- Use `@ExtendWith(MockitoExtension.class)` and `@Mock` for dependencies.
- Run `mvn test` and confirm green before committing.

## Step 4 – Frontend (React/Vite)
- Components live under `frontend/src/components/`.
- Network calls belong in `frontend/src/api/` — never inline in components.
- Filter/type constants go in `frontend/src/constraints/options.js` — keep values as uppercase enums.
- Keep `phase` values strictly: `empty`, `loading`, `success`.
- Preserve the reroll exclusion list logic in `NextMoveApp.jsx`.
- Run `cd frontend && npm run lint && npm test` before committing.

## Step 5 – Atomic Commits Per Layer
```
feat(backend): add <endpoint> for <feature> (#<issue>)
feat(frontend): add <component> for <feature> (#<issue>)
test: add unit tests for <feature> (#<issue>)
```
Push: `git push -u origin feat/<branch-name>`.

## Step 6 – Pull Request
```bash
gh pr create \
  --title "feat: <feature-name> (#<issue>)" \
  --body "## What
<description of what was built>

## Why
<reason / issue link>
Closes #<issue>

## Checklist
- [ ] Backend tests pass (`mvn test`)
- [ ] Frontend lint passes (`npm run lint`)
- [ ] Manually tested locally
- [ ] Docker build unaffected"
```
