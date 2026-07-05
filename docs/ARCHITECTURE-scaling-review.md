# Architecture Review — Scaling to 1,000 Users

**Project:** Next-Move London  
**Author:** Hamza Hassan  
**Date:** June 2026  
**Document Type:** Architecture Scaling Review  

---

## Current Architecture Overview

Next-Move is a single Spring Boot monolith with a React frontend. The backend loads a static JSON file of London places into memory at startup via `@PostConstruct`, filters them in-memory on each request using Java Streams, and returns results via a single REST endpoint (`POST /api/recommendations`).

```
[React Frontend]
      │
      ▼
[Spring Boot API — Single Instance]
      │
      ▼
[In-Memory JSON Data (loaded once at startup)]
```

This architecture is appropriate for a personal project or demo. The bottlenecks below document what would need to change to support 1,000 real concurrent users.

---

## Bottleneck 1 — In-Memory Data Store

### Current Behaviour
All place data lives in a `List<Place>` held in memory inside `PlaceDataService`. Every recommendation request streams and filters this entire list on each call.

### Problem at 1,000 Users
With 1,000 concurrent users hitting the endpoint, each request triggers a full stream scan of the entire dataset. There is no indexing, no caching layer, and no way to query by field efficiently. As the dataset grows, response times degrade linearly.

### Recommended Fix
- **Short term:** Add `@Cacheable` on `getAllPlaces()` so the list is not re-scanned on every call
- **Long term:** Migrate to PostgreSQL with indexed columns on `type` and `budget`, and spatial indexing on `latitude`/`longitude` using PostGIS

---

## Bottleneck 2 — No Database, No Persistence

### Current Behaviour
Data lives in a flat JSON file (`london-places.json`) bundled inside the JAR. Adding or updating places requires a code change and a full redeployment.

### Problem at 1,000 Users
There is no way to update place data at runtime, add user-submitted places, track popularity, or personalise results. Any data change takes the service down during redeployment.

### Recommended Fix
Replace the JSON flat file with a relational database. Spring Data JPA with PostgreSQL is the natural upgrade path given the existing Spring Boot stack and requires minimal change to the service layer.

---

## Bottleneck 3 — Single Instance, No Horizontal Scaling

### Current Behaviour
One Spring Boot process handles all requests. The embedded Tomcat server has a default thread pool of 200 threads.

### Problem at 1,000 Users
1,000 simultaneous users will exhaust the default thread pool, causing requests to queue and eventually time out. The single instance is also a single point of failure — one crash takes down the entire service.

### Recommended Fix
- Containerise the application with Docker
- Deploy behind a load balancer (e.g. AWS ALB or Nginx) with at least two instances
- This requires the application to be **stateless** — the current design already satisfies this, as no session state is stored in memory ✅

---

## Scaling Readiness Summary

| Area | Current State | Ready for 1,000 Users? |
|---|---|---|
| Data storage | In-memory JSON | ❌ No |
| Database | None | ❌ No |
| Horizontal scaling | Single instance | ❌ No |
| Statelessness | No session state | ✅ Yes |
| Caching | None | ❌ No |
| Logging | `System.out.println` | ❌ No |

---

## Conclusion

The application has a clean, stateless design that is a strong foundation for scaling. All blockers are infrastructure and configuration concerns — none require a fundamental rewrite of the business logic. The natural next step is a database migration followed by containerisation.
