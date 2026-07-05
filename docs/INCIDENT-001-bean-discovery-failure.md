# Incident Report — Spring Boot Bean Discovery Failure

**Project:** Next-Move London  
**Author:** Hamza Hassan  
**Date:** June 2026  
**Severity:** 🔴 Critical  
**Status:** ✅ Resolved  

---

## Summary

The application failed to start during early development. Spring Boot could not detect controllers or services, causing startup failures and all endpoints returning `404` despite being correctly defined in the codebase.

---

## Timeline

| Phase | Event |
|---|---|
| Development | Application written with packages at root classpath level |
| First run | Application starts but all endpoints return `404` |
| Investigation | Discovered Spring was not registering any beans |
| Resolution | Manually specified all packages in `scanBasePackages` |

---

## Root Cause

The `@SpringBootApplication` entry point was placed in the package `org.example`. Spring Boot's default component scan only looks **within the package of the main class and its sub-packages**. All application layers — `controller`, `service`, `DTO`, `Entity`, `Mapper` — were defined in top-level root packages with no parent namespace, placing them entirely outside Spring's default scan path.

```
❌ Problematic structure:
src/main/java/
  org/example/NextMoveLondonApplication.java   ← Spring scans here only
  controller/RecommendationController.java      ← invisible to Spring
  service/RecommendationService.java            ← invisible to Spring
  DTO/RecommendationRequest.java                ← invisible to Spring
```

---

## Resolution Applied

The `@SpringBootApplication` annotation was extended with an explicit `scanBasePackages` attribute, manually listing every package containing Spring-managed components:

```java
@SpringBootApplication(scanBasePackages = {
    "controller", "service", "DTO",
    "Entity", "Mapper", "data", "org.example"
})
```

---

## Impact

- Application could not start until resolved
- Every new package added to the project must be manually registered or it will be silently ignored by Spring
- Increases maintenance overhead and risk of future regressions

---

## Recommended Permanent Fix

Consolidate all packages under a single base namespace and move the main application class to that root:

```
✅ Correct structure:
src/main/java/com/nextmove/
  NextMoveLondonApplication.java   ← scans all sub-packages automatically
  controller/
  service/
  dto/
  entity/
  mapper/
```

This removes the need for `scanBasePackages` entirely and follows standard Spring Boot project conventions.

---

## Lessons Learned

- Always initialise a Spring Boot project with a proper base package (e.g. `com.yourname.appname`)
- The `@SpringBootApplication` class must sit at the **root** of all packages it needs to scan
- IntelliJ's Spring Boot project wizard sets this up correctly — prefer it over manual project creation
