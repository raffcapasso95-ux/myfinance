Saniti's button — use `primary` on dark sections, `primary-on-light` on light sections, `brand` only for the single highest-priority CTA per viewport.

```jsx
<Button variant="primary">Get started free</Button>
<Button variant="secondary-dark">Book a demo</Button>
<Button variant="brand">Contact sales</Button>
```

- `primary`/`primary-on-light`/`brand`: 44px pills, button-lg type.
- `secondary-dark`: 36px, 5px radius, hairline border. `ghost-dark`: text-style pill.
- `app-tab`: 32px uppercase Studio toolbar tab; pass `active`.
