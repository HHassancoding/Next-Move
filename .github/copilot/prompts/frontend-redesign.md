# Frontend Redesign — Warm Minimalist Theme

## Scope
Restyle the existing frontend to match a warm minimalist postcode-finder UI.
**Change only layout and visual styling. Keep all current structure, components, state logic, API calls, and phase values (`empty` | `loading` | `success`) exactly as they are.**

---

## Visual System

### Foundation
- Background: warm off-white / beige (`#F5F0E8` or similar)
- Layout: centered single column, `max-width: 540px`, left-aligned content
- Spacing: generous vertical gaps between sections — consistent rhythm throughout
- No heavy borders, no shadows, no gradients
- Font: clean modern sans-serif (system stack or single web font — no font libraries)
- Weight contrast: strong — headings bold/black, body and labels light/regular

---

## Component Styles

### Header
- Small all-caps location label at top: `"- LONDON"` — muted grey, tracked letter-spacing
- Thin low-contrast `<hr>` below the label
- Large bold two-line headline: e.g. `"find your / next move."` — heavy weight, tight line-height
- Smaller grey subtitle line beneath

### Section Labels
- Applied above each form control: `"WHERE ARE YOU"`, `"WHAT KIND OF MOVE"`, `"BUDGET"`
- Style: small all-caps, muted grey, letter-spaced, left-aligned
- Spacing: slight gap above the label, tighter gap between label and its control

### Postcode Input
- Full-width dark pill input: near-black background (`#1A1A1A`), white text
- Large border-radius (`9999px`), generous padding (`16px 24px`)
- No default browser border — remove with `border: none; outline: none`
- Subtle custom focus style: faint white ring or slight background lift

### Category Tabs (`what kind of move`)
- Horizontal row of equal-width pill buttons
- Default: soft light background, faint border, normal weight text
- Selected: darker text, clear selection indicator — colored underline or stronger border
- Small dot `·` before each label as accent
- Values and labels must remain driven by `options.js` — no hardcoding

### Budget Row
- Single horizontal row of equal-width buttons
- Default: very light background, subtle border, all-caps text, wide letter-spacing
- Selected: invert — dark background, white text
- Values must remain driven by `options.js`

### CTA Button
- Full-width, large border-radius
- Default: pale background, soft border, lowercase text, wide letter-spacing
- Hover: invert to dark background, white text — smooth transition
- Label: `"find my move"` or current label — keep existing handler

---

## Constraints
- Use only CSS / className updates and minimal JSX structural changes
- Do not touch `frontend/src/api/recommendations.js`
- Do not touch `frontend/src/constraints/options.js`
- Do not change `phase` values or state logic in `NextMoveApp.jsx`
- Do not introduce new dependencies
- All existing tests must still pass after changes
- This is a `style` commit — use prefix `style(frontend):`
