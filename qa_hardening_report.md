# QA Hardening Report — Overflow Patterns

## Shadcn Table
All tables wrapped in `overflow-auto` via the shared `table.tsx` component, preventing horizontal blowout on narrow screens.

## Breadcrumbs
Styled with `overflow-x-auto whitespace-nowrap scrollbar-hide` so long breadcrumb trails scroll horizontally without breaking layout.

## Absolute Elements
Contained via `relative` parents combined with `overflow-hidden` to prevent positioned children from escaping their bounds.

## Images
44/44 image elements constrained with `object-cover` or `object-contain`, ensuring no unconstrained images exist.

## Text
95 instances of `truncate` / `line-clamp-*` utilities applied across the codebase to prevent text overflow.

## Overflow Containers
198+ elements use `overflow-hidden` as a defensive measure against content blowout.
