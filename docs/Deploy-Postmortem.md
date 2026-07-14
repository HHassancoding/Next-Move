# Deploy Postmortem: Backend Docker + Render Deployment

**Date:** 2026-07-14
**Service:** NextMove — Spring Boot Backend
**Author:** Hamza Hassan

---

## Incident Summary

I was deploying the NextMove Spring Boot backend to Render using a Dockerfile at the project root, with a Maven build stage and a Temurin JRE runtime stage. Locally, `docker build` and `docker run` worked without issue. However, the Render deployment failed with two distinct errors:

- `COPY .mvn .mvn: "/.mvn": not found` — the build context on Render didn't contain the `.mvn` directory.
- `ClassNotFoundException: org.example.NextMoveLondonApplication` — the packaged JAR wasn't resolving the main class correctly (encountered during an earlier iteration).

What followed was a debugging session where I had to untangle which layer of the stack was actually failing — Docker, Java version mismatch, Spring Boot packaging, or build context differences between local and remote.

---

## Problem 1: Copying `.mvn` Into the Image

### Symptom

Render's build failed at the step:

```dockerfile
COPY .mvn .mvn
```

with the error `file not found in build context`, even though `.mvn` existed locally at the project root.

### Root Cause

The Dockerfile was written to use the Maven base image and run `mvn clean package` directly — not the Maven wrapper (`./mvnw`). The `.mvn` directory is part of the Maven Wrapper machinery; it only matters if you're using `./mvnw` to control the Maven version per project.

In my repo, `.mvn` was effectively empty or not meaningfully committed. By including `COPY .mvn .mvn` in the Dockerfile, I created a hard dependency on that directory being present in the Render build context — which is assembled from the GitHub repo after `.dockerignore` filtering. Any mismatch between local files and the remote GitHub branch (empty `.mvn`, not committed, or stripped by `.dockerignore`) made this `COPY` instruction brittle and caused the build to fail outright.

### Fix

I removed `COPY .mvn .mvn` from the Dockerfile entirely and scoped the copy instructions to only what was actually needed:

```dockerfile
COPY pom.xml .
COPY Backend/ ./Backend/
```

The build now relies solely on the Maven image's pre-installed `mvn` binary and the project sources, with no dependency on the wrapper directory at all.

### Lesson

> **Only copy into the image what you actually use at build time.** If you aren't running `./mvnw`, you don't need `.mvn`.

For remote builds (Render, CI/CD), treat every `COPY` instruction as a contract against the Git repo contents — not your local filesystem. If a file isn't reliably committed and present in the repo, it has no business being in the Dockerfile.

---

## Problem 2: Local vs Remote Environment Assumptions

### Symptom

Local builds succeeded consistently. Render's build failed. This led me down a rabbit hole chasing potential causes: Java 21 vs Java 23 version mismatch, incorrect Spring Boot main class configuration in `pom.xml`, or something fundamentally wrong with Docker itself.

### Root Cause

Local `docker build` used my local working copy of the repository. Render built from the GitHub repo — which was not in an identical state. Files that existed locally but weren't committed (or were filtered by `.dockerignore`) simply weren't there on the remote builder.

I initially chased the `ClassNotFoundException` angle — suspecting Spring Boot packaging or Java version issues — because that error had appeared in an earlier iteration of the Dockerfile. But for the specific Render failure, the actual error was far simpler: `file not found in build context` during `COPY .mvn .mvn`. I was debugging the wrong problem because I was anchored to a previous error.

The mental model I was operating under was *"if it works locally, it should work remotely"* — but that's only true if the local filesystem and the remote build context are identical. They aren't.

### Fix

I aligned the Dockerfile strictly to the deployment strategy:

- **Maven base image** for the build stage, using the installed `mvn` — no wrapper.
- **Temurin JRE runtime stage** for the final image — pinned to a specific Java version matching the build stage.
- **Only copied** `pom.xml` and the `Backend/` source directory — nothing else.

I also validated that the Dockerfile path and the Render root directory setting matched the actual repo structure before re-triggering the deployment.

### Lesson

> **Debug remote build failures by asking: "What does the remote builder actually see in the build context tarball?"** — not "What exists on my machine?"

The remote builder is stateless and Git-driven. If it's not in the repo and not excluded from `.dockerignore`, it won't be there. Every `COPY` is a dependency. Keep them minimal and intentional.

---

## Timeline

| Time | Event |
|------|-------|
| T+0  | Initial Dockerfile written with Maven wrapper support (`COPY .mvn .mvn`, `COPY mvnw .`) |
| T+1  | Local `docker build` and `docker run` succeed |
| T+2  | First Render deployment — fails with `ClassNotFoundException` |
| T+3  | Investigated Java version and Spring Boot packaging — red herring |
| T+4  | Second Render deployment — fails with `"/.mvn": not found` in build context |
| T+5  | Root cause identified: `.mvn` not reliably present in remote build context |
| T+6  | Dockerfile refactored: removed wrapper files, scoped COPY to `pom.xml` + `Backend/` |
| T+7  | Render deployment succeeds |

---

## Action Items

- [x] Remove `COPY .mvn .mvn` and `COPY mvnw .` from Dockerfile
- [x] Validate that all files referenced in `COPY` instructions are committed to the repo
- [ ] Add a `.dockerignore` review step to the pre-deployment checklist
- [ ] Pin Java version explicitly in both build and runtime stages to prevent future version drift
- [ ] Add a CI step (GitHub Actions) that runs `docker build` against the repo checkout — not the local workspace — to catch build context issues before they reach Render

---

## What I'd Do Differently

1. **Start debugging from the remote logs first.** I wasted time investigating `ClassNotFoundException` locally when the actual Render error was a completely different `COPY` failure. Always read the remote build log top-to-bottom before forming a hypothesis.

2. **Audit every `COPY` against `git ls-files` before deploying.** If it's not in `git ls-files`, the remote builder won't see it.

3. **Make a deliberate choice: Maven wrapper or system Maven — not both.** If using the Maven base image (`maven:3.x-eclipse-temurin-21`), use `mvn`. If using a plain JDK image, use `./mvnw`. Don't mix conventions.
