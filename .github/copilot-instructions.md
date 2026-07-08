# Copilot instructions for Next Move

## Project shape
- Next Move is a mobile-first React/Vite frontend paired with a Spring Boot recommendation backend.
- The current frontend flow is single-screen: `App` -> `NextMovePage` -> `NextMoveApp`, with UI split into `FilterSection`, `PillGroup`, and `BottomSheet`.
- The client geocodes a UK postcode with `api.postcodes.io`, then posts coordinates and filter values to `POST /api/recommendations`.
- Reroll reuses the same endpoint and passes previously shown place IDs so the backend can exclude them.
- The repo docs describe a stateless backend that loads curated London places from local JSON, filters by type/budget, ranks by distance, and returns one recommendation.

## Build, test, and lint
Frontend:
- `cd frontend && npm install`
- `cd frontend && npm run dev`
- `cd frontend && npm run build`
- `cd frontend && npm run lint`

Backend / root Maven build:
- `mvn --batch-mode --update-snapshots verify`
- Single test class: `mvn -Dtest=<TestClassName> test`
- Manual API checks: use `recommendationsHTTPTests.http` against `http://localhost:8080/api/recommendations`

## High-level architecture
- Frontend state lives almost entirely in `frontend/src/components/NextMoveApp.jsx`.
- `frontend/src/api/recommendations.js` owns the network boundary: postcode geocoding and recommendation POSTs.
- `BottomSheet` renders three phases: `empty`, `loading`, and `success`.
- `FilterSection` is driven by shared option lists from `frontend/src/constraints/options.js`.
- The docs and pom point to a Spring Boot backend that is intended to stay stateless and keep recommendation logic out of the UI.

## Key conventions
- Keep postcode normalization and validation in `NextMoveApp`: uppercase, collapsed spaces, UK postcode regex.
- Keep the filter values aligned with `frontend/src/constraints/options.js`; budget and type values are uppercase enums.
- Keep `phase` values limited to `empty`, `loading`, and `success` because the UI branches on those exact strings.
- Keep the reroll exclusion list logic intact; the client tracks shown IDs and sends them back on repeat requests.
- Keep API payload shape stable in `frontend/src/api/recommendations.js`; `latitude` and `longitude` are only sent when available.
- Preserve the single-page, one-recommendation UX unless the product direction changes.
- In the backend, prefer SLF4J over `System.out.println`, keep mapping out of controllers, and keep Spring packages under a scan-friendly root package.
- If you touch the Docker image, remember it copies `target/NextMove-1.0-SNAPSHOT.jar` and exposes port 8080.