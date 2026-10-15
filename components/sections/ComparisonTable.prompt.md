Feature comparison matrix for light pricing pages. `true` renders a green check, `false` a dash, strings render verbatim. Rows with `group` render mono subheads.

```jsx
<ComparisonTable tiers={['Free','Growth','Enterprise']} featured="Growth"
  rows={[{ group:'Content' }, { label:'Documents', values:['10k','Unlimited','Unlimited'] }, { label:'SSO', values:[false,false,true] }]} />
```
