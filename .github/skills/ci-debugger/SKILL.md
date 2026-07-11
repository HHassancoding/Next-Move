---
name: ci-debugger
description: >
  Use when a GitHub Actions workflow in Next Move is failing. Reads the
  workflow file and last run logs to diagnose and produce a targeted fix.
  Never rewrites the entire workflow — surgical fixes only.
---

# CI Debugger – Next Move

## Step 1 – List Recent Runs
```bash
gh run list --limit 5
```
Show the user the last 5 runs with status and workflow name.

## Step 2 – Select Failing Run
Ask which run to debug, or auto-select the most recent failure.

## Step 3 – Read Failure Logs
```bash
gh run view <run-id> --log-failed
```
Capture only the failed step output — do not read passing steps.

## Step 4 – Read the Workflow File
Read `.github/workflows/<failing-workflow>.yml`.

## Step 5 – Diagnose
Classify the failure into one of these categories:
- **Dependency / version mismatch** — wrong Java/Node version, missing Maven wrapper
- **Missing secret or env var** — environment variable not set in repo secrets
- **Test failure in CI** — passes locally but fails in CI (path, port, or timing issue)
- **Docker build failure** — wrong JAR path, missing COPY step, wrong exposed port
- **Lint / build failure** — TypeScript error, ESLint rule violation

For Next Move specifically:
- Backend JAR path is `target/NextMove-1.0-SNAPSHOT.jar` — verify COPY step.
- Backend runs on port 8080.
- Frontend build: `cd frontend && npm run build`.

## Step 6 – Fix
- Make the minimal change to resolve the classified failure.
- Do not refactor unrelated workflow steps.
- Commit: `fix(ci): resolve <step-name> failure in <workflow-file>`.
- Push and confirm the next run passes: `gh run watch`.
