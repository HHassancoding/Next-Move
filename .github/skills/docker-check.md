---
name: docker-check
description: >
  Use when the Next Move Docker build or container runtime is broken.
  Diagnoses Dockerfile issues and verifies the image builds and runs correctly.
---

# Docker Check – Next Move

## Project Docker Context
- The Dockerfile is at the repo root.
- It copies `target/NextMove-1.0-SNAPSHOT.jar` as `app.jar`.
- The container exposes port 8080.
- Build the JAR first with `mvn package -DskipTests` before building the image.

## Step 1 – Read Files
- Read the `Dockerfile`.
- Read `docker-compose.yml` if present.
- Check that `target/NextMove-1.0-SNAPSHOT.jar` exists; if not, run `mvn package -DskipTests` first.

## Step 2 – Build
```bash
docker build . --no-cache 2>&1 | tail -40
```
Capture the last 40 lines of output.

## Step 3 – Diagnose
Common failure points for this project:
- `COPY target/NextMove-1.0-SNAPSHOT.jar app.jar` — JAR name must match `pom.xml` `<artifactId>-<version>.jar`.
- `EXPOSE 8080` must be present.
- Base image Java version must match `pom.xml` `<java.version>`.
- Multi-stage builds: ensure the builder stage runs `mvn package` before the runtime stage copies.

## Step 4 – Verify Runtime
```bash
docker run --rm -p 8080:8080 next-move
curl http://localhost:8080/api/recommendations
```
Confirm a valid JSON response.

## Step 5 – Fix and Commit
```
fix(docker): <short description of fix>
```
