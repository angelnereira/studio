# UX Standards

## Performance Targets

- Lighthouse Performance: ≥ 90
- Lighthouse Accessibility: ≥ 95
- Lighthouse SEO: ≥ 95
- Time to Interactive: < 3s
- Core Web Vitals: all green

## Interaction Standards

- EVERY async action must have 3 states: loading, success, error
- Loading states: use skeleton loaders (not spinners for layout elements)
- Error states: must show actionable message, not just "Something went wrong"
- Success states: brief (auto-dismiss after 3s) unless action is irreversible

## Accessibility (WCAG 2.1 AA minimum)

- All interactive elements need visible focus states
- Color contrast ratio: minimum 4.5:1 for body text, 3:1 for large text
- All images need descriptive alt text (translated via i18n)
- All form inputs need associated labels
- Keyboard navigation must work for all interactive elements
- Respect prefers-reduced-motion for all animations

## Mobile First

- Design for 375px width first, then scale up
- All admin features must work on mobile (owner may use phone)
- Touch targets minimum 44x44px

## Destructive Actions

- ALWAYS require confirmation for delete/unpublish actions
- Offer undo when technically feasible
- Never perform irreversible action without explicit user confirmation
