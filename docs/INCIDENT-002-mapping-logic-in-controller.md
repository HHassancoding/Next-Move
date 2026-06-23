# Incident Report — Mapping Logic Leaked into Controller Layer

**Project:** Next-Move London  
**Author:** Hamza Hassan  
**Date:** June 2026  
**Severity:** 🟡 Medium  
**Status:** 🔧 Open  

---

## Summary

The transformation of `Place` domain objects into `RecommendationResponse` DTOs was implemented directly inside `RecommendationController`, despite a dedicated `RecommendationMapper` class existing in the codebase. The mapper class was left empty.

---

## Root Cause

The mapping logic was written inline during early development for speed. The empty `RecommendationMapper` class indicates the intent to separate concerns was present but not followed through before the feature was completed.

The offending code in the controller:

```java
List<RecommendationResponse> response = matches.stream().map(p -> {
    RecommendationResponse r = new RecommendationResponse();
    r.setId(p.getId());
    r.setName(p.getName());
    r.setLocation(p.getArea());
    // distance logic also lives here
    r.setDescription(p.getDescription());
    r.setType(p.getType());
    return r;
}).toList();
```

---

## Impact

- Controller violates the **Single Responsibility Principle** — it handles both HTTP concerns and data transformation
- Any change to the response shape requires modifying the controller directly
- `RecommendationMapper` is dead code, which is misleading to any future developer reading the project
- Makes unit testing harder — the mapping logic cannot be tested in isolation

---

## Recommended Fix

Implement the mapping inside `RecommendationMapper` and inject it into the controller:

```java
// RecommendationMapper.java
@Component
public class RecommendationMapper {
    public RecommendationResponse toResponse(Place place, String distance) {
        RecommendationResponse r = new RecommendationResponse();
        r.setId(place.getId());
        r.setName(place.getName());
        r.setLocation(place.getArea());
        r.setDistance(distance);
        r.setDescription(place.getDescription());
        r.setType(place.getType());
        return r;
    }
}
```

The controller then becomes thin and readable:

```java
List<RecommendationResponse> response = matches.stream()
    .map(p -> mapper.toResponse(p, resolveDistance(request, p)))
    .toList();
```

---

## Lessons Learned

- Build the mapper class at the same time as the controller, not after
- Controllers should only do two things: receive a request and return a response
- A dead class in a codebase is a code smell — either implement it or delete it
