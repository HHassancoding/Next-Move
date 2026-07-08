---
name: test-writer
description: >
  Use when you want tests written for existing Next Move code without
  re-explaining the whole codebase. Works for Java backend (JUnit 5 + Mockito)
  and React frontend (Jest + React Testing Library).
---

# Test Writer – Next Move

## Step 1 – Target
Ask: "Which file or class needs tests?" Accept a relative path or class name.

## Step 2 – Read and Analyse
- Read the target file fully.
- Identify: public methods, constructor dependencies, edge cases, expected exceptions, and return types.
- List the test cases you plan to write before generating any code.

## Step 3 – Java (JUnit 5 + Mockito)
- Mirror the package path under `src/test/java/...`.
- Use `@ExtendWith(MockitoExtension.class)` at class level.
- Mock all injected dependencies with `@Mock`; inject with `@InjectMocks`.
- Test method naming: `methodName_stateUnderTest_expectedBehaviour`.
- Cover: happy path, null/empty inputs, boundary values, exception paths.
- Run `mvn -Dtest=<TestClassName> test` and iterate until green.

## Step 4 – React (Jest + React Testing Library)
- Place test file alongside the component: `ComponentName.test.jsx`.
- Use `render()`, `screen.getByRole/Text/Label`, and `userEvent` from `@testing-library/user-event`.
- Mock API calls in `frontend/src/api/` using `jest.mock()`.
- Test: renders without crashing, user interactions update state, API called with correct args.
- Run `cd frontend && npm test -- --watchAll=false` and iterate until green.

## Step 5 – Report
Summarise: X test cases written, Y passing, Z skipped, and any gaps remaining.

## Commit
```
test: add tests for <ClassName/ComponentName>
```
