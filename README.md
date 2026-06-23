# Next Move London

A mobile-first recommendation app for discovering a nearby place in London based on **location, budget, and vibe**. Users enter a postcode, choose simple filters, and get one recommendation with the option to reroll for another matching result.

## Overview

Next Move London is built as a focused MVP around one core user flow: **pick filters, get one place, reroll if needed**. The app takes a user’s postcode, converts it to latitude and longitude on the frontend, sends those coordinates to a Spring Boot backend, and returns the best matching place after filtering and distance-based ranking.

The project is intentionally narrow in scope. Rather than trying to solve all of London discovery, it concentrates on a small but useful recommendation loop that is easy to understand, test, and improve over time.

## Features

- Mobile-first single-screen flow
- Postcode-to-coordinate recommendation flow
- Filtering by place type and budget
- Distance-based ranking using backend location logic
- Reroll support using a stateless exclusion-based approach
- Local curated London place dataset loaded from JSON
- Unit-tested backend services
- Continuous integration with GitHub Actions

## Product Flow

1. User enters a London postcode in the frontend.
2. The frontend resolves the postcode into latitude and longitude.
3. The frontend sends coordinates and selected filters to the backend.
4. The backend loads curated place data, filters matching entries, calculates distance, sorts the results, and returns the best option.
5. If the user taps reroll, the same endpoint is called again with previously shown place IDs excluded.

## Tech Stack

| Layer | Tools |
|------|------|
| Frontend | JavaScript frontend for the mobile-first interface |
| Backend | Java, Spring Boot |
| Data | Curated local JSON seed data |
| Testing | JUnit-based service tests |
| CI | GitHub Actions |

## Architecture

### Frontend

The frontend is designed around a single mobile-first screen with:

- A lightweight hero section
- Filter controls for location, budget, and type
- A primary action to request one recommendation
- A result sheet that supports reroll without changing the main flow

It is responsible for:

- Collecting user inputs
- Converting postcode input into coordinates
- Calling the recommendation API
- Tracking already shown place IDs for reroll behavior
- Rendering success, loading, and error states

### Backend

The backend is responsible for the recommendation logic itself. It:

- Accepts recommendation requests through the API
- Reads curated place data from a local JSON file
- Filters places by requested type and budget
- Excludes previously returned place IDs during reroll
- Calculates distance from the user’s coordinates to each candidate place
- Sorts candidates by proximity and returns the top result

This keeps the API stateless while still supporting reroll and multiple independent users.

### Data Layer

The current dataset is intentionally local and curated. Places are stored outside the Java source code in JSON rather than being hardcoded directly in classes, which makes the project easier to maintain and extend.

Each place includes fields such as:

- `id`
- `name`
- `area`
- `type`
- `budget`
- `description`
- `latitude`
- `longitude`

This structure is simple enough for an MVP while still creating a clean path toward a future PostgreSQL-backed version.

## API

### Recommendation endpoint

`POST /api/recommendations`

Example request:

```json
{
  "latitude": 51.5134,
  "longitude": -0.1312,
  "type": "FOOD",
  "budget": "CHEAP",
  "excludedPlaceIds": [1, 4]
}
```

Example response:

```json
{
  "id": 7,
  "name": "Bar Italia",
  "area": "Soho",
  "type": "FOOD",
  "budget": "CHEAP",
  "description": "Iconic late-opening Italian café ideal for post-theatre coffee or quick casual bite.",
  "distance": 0.8
}
```

## Running Locally

### Backend

1. Clone the repository.
2. Open the backend project in the IDE of choice.
3. Install the required Java version and Maven dependencies.
4. Run the Spring Boot application.

### Frontend

1. Navigate to the frontend directory.
2. Install dependencies.
3. Start the local development server.
4. Ensure the frontend is configured to call the backend API.

## Testing

The backend includes tests for the main recommendation and data-loading logic.

Current coverage includes:

- `RecommendationService`
- `PlaceDataService`

These tests help verify that filtering, distance ordering, reroll exclusions, and JSON-based place loading behave as expected.

## CI/CD

The repository includes continuous integration through GitHub Actions.

Current CI setup covers:

- Build validation on push and pull request
- Automated test execution
- Early detection of breaking changes

The next step in the delivery pipeline is extending this into full deployment automation so the project can move from tested code to a live hosted environment.

## Project Status

This project is currently in the **MVP+ stage**:

- Core backend and frontend flow is working
- Real coordinate-based recommendation logic is implemented
- Reroll is implemented using stateless request design
- Seed data has been moved out of hardcoded Java objects into local JSON
- CI and service-level tests are in place

## Roadmap

Planned improvements include:

- Controller and end-to-end API tests
- Better empty-state and error handling
- Expanded and better-curated place data
- Stronger ranking logic beyond pure distance
- Database-backed storage for places
- Deployment pipeline to a live environment
- Observability, logging, and health checks

## Production Considerations

This repository is designed to show thoughtful engineering trade-offs at MVP stage rather than pretend to be fully production-complete.

Current intentional limitations:

- No authentication or user accounts yet
- Curated local data instead of a database
- No admin interface for managing places
- No advanced recommendation scoring beyond filtering and distance
- Limited geographic scope focused on London

These choices keep the app simple while making the architecture easy to evolve.

## Why this project matters

Next Move London is a good example of a practical early-stage product build:

- a clear problem,
- a focused mobile-first user experience,
- a small but real backend system,
- data modelling decisions that evolved with the product,
- and engineering improvements such as testing, CI, and stateless reroll design.

It is intended both as a usable MVP and as a portfolio project that demonstrates product thinking, backend fundamentals, and iterative software design.
