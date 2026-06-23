# Incident Report — Unstructured Logging via System.out.println

**Project:** Next-Move London  
**Author:** Hamza Hassan  
**Date:** June 2026  
**Severity:** 🟢 Low  
**Status:** 🔧 Open  

---

## Summary

`System.out.println` was used in `RecommendationController` to trace incoming requests and outgoing responses during development. This produces raw, unformatted output with no log levels, no timestamps, and no ability to control verbosity in production.

---

## Root Cause

Using `System.out.println` is a natural habit during early development for quick debugging. It was not replaced with a proper logging framework before the code was committed.

The affected lines in `RecommendationController`:

```java
System.out.println("Received recommendation request: " + request);
System.out.println("Found " + matches.size() + " matches for request: " + request);
System.out.println("No matches found for request: " + request);
```

---

## Impact

- No log levels — cannot distinguish debug noise from real errors in production
- No timestamps — impossible to correlate events to a specific point in time
- Cannot be disabled without a code change — debug output appears in production logs
- Does not integrate with log aggregation tooling (e.g. Datadog, CloudWatch)

---

## Recommended Fix

Replace all `System.out.println` calls with SLF4J, which is included with Spring Boot by default via `spring-boot-starter-logging`. No additional dependencies are needed.

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RecommendationController {

    private static final Logger log = LoggerFactory.getLogger(RecommendationController.class);

    // Replace println calls with:
    log.info("Received recommendation request: {}", request);
    log.debug("Found {} matches for request: {}", matches.size(), request);
    log.warn("No matches found for request: {}", request);
}
```

Log levels can then be controlled via `application.properties` without touching code:

```properties
logging.level.controller.RecommendationController=DEBUG
```

---

## Lessons Learned

- Never use `System.out.println` in a Spring Boot application — SLF4J is already on the classpath
- Use appropriate log levels: `DEBUG` for development noise, `INFO` for key events, `WARN`/`ERROR` for problems
- Structured logging becomes critical when running multiple instances — raw stdout is impossible to query
