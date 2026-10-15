# Saniti Design System

Saniti is a structured-content platform ("content operating system"): a code-configurable editing **Studio**, a queryable **Content Lake**, and AI **Agent** features. Its marketing site reads like a software-engineering trade journal — dark-first, oversized editorial display type, IBM Plex Mono eyebrows, and a single coral-red accent.

**Source:** `uploads/DESIGN-sanity.md` (a DESIGN.md token + prose spec, "Saniti-design-analysis", version alpha). No codebase, Figma, logo files or imagery were provided.

## Products / surfaces
- **Marketing website** — dark brand pages (home, studio, content-agent) and light commercial pages (pricing). → `ui_kits/website/`
- **Studio** (product) — only appears as framed screenshots on marketing pages; represented by `StudioWindow`. No full Studio app kit (not specified in source).

## CONTENT FUNDAMENTALS
- **Voice:** confident, sober, editorial. Short declarative headlines ("Structure powers intelligence", "Loved by 1M+ users"). Never hypey; no exclamation marks.
- **Person:** speaks to *you* / *your team*; the company is "Saniti" or "we" sparingly.
- **Casing:** Sentence case for headlines and buttons ("Get started free", "Book a demo", "Sign in"). Mono eyebrows sentence case; footer column heads and app tabs UPPERCASE.
- **Structure:** mono eyebrow (2–5 words) → display headline (≤8 words) → one-sentence subtitle → one CTA pair.
- **CTAs:** "Get started free" (primary), "Book a demo" (secondary), "Contact sales" (the rare brand CTA). Arrow suffix "→" on ghost/text links.
- **Emoji:** never. Unicode used only functionally (✓ checks, → arrows, — empty cells).
- **Numbers:** precise and plain ("$15 per seat / month", "10,000 documents").

## VISUAL FOUNDATIONS
- **Color:** monochrome (#0b0b0b ↔ #ffffff with greys) plus one accent, coral-red `--brand` #f36458 — max one occurrence per viewport (one CTA, brand dot, or one brand card). Soft blue #afe3ff is the only other surface fill (info banners). No gradients, no extra hues.
- **Polarity:** theme is section-scoped. Dark bands (`--canvas`) are the brand voice; light/paper bands are the commercial voice. Sections cut hard between polarities — that cut is the primary divider and depth cue. No rules or gradients between sections.
- **Type:** one sans (waldenburgNormal → Inter fallback) for everything; IBM Plex Mono for labels only. Display 112→38px, weight 400, aggressive negative tracking (-4.48px at 112), OpenType cv01 cv11 cv12 cv13 ss07 on display only. Never mixed-weight headlines.
- **Spacing:** 8px base, 4px micro. Card padding 32, card gaps 24, section vertical 96 (64 on mobile/compact), container max 1640.
- **Corners:** two languages on purpose — pills (`--radius-full`) for marketing CTAs/badges; 3–6px for product UI (inputs 3, tabs 4, toolbar 5, windows 6); 12px for marketing cards.
- **Cards:** flat tonal fill (canvas-soft on dark, white on paper), optional 1px hairline border, 12px radius, no shadow. Featured pricing = full ink inversion (no ribbon).
- **Shadows:** essentially none. One rare soft drop `0 4px 24px rgba(0,0,0,.08)` on light hero cards only.
- **Borders:** 1px `--hairline-soft` #353535 on dark, `--hairline` #ededed on light; comparison table uses hairline row rules.
- **Imagery:** product screenshots inside `StudioWindow` (6px radius, traffic-light chrome). Content-agent pages use full-bleed 12px abstract panels. Partner logos are flat mono wordmarks in one row. No illustrations, no textures.
- **Transparency/blur:** not used. Nav is opaque, sticky, borderless.
- **Motion (spec is silent — conservative choice):** 120–200ms color/background transitions, `cubic-bezier(.2,0,0,1)`; no bounces, no entrance animations.
- **Hover:** white pill → paper grey; black pill → graphite; ghost/secondary dark → text brightens to white; links brighten. **Press:** scale .98. **Focus:** 2px link-blue ring.
- **Layout:** full-width display headlines without cards; 4-up pricing grid; content-agent uses an asymmetric 50% text column. Sticky 64px nav.

## ICONOGRAPHY
The source defines no icon set, icon font or SVG assets. The system is type-driven: brand dot (coral 12px circle) + wordmark is the only mark; functional unicode (✓ → —) covers checks and arrows. If icons become necessary, use a thin-stroke outline set (e.g. Lucide via CDN at 1.5px stroke) — **this is an untested substitution, flag before shipping.** No emoji.

**Logo:** no logo file was provided. The wordmark is rendered in type ("Saniti") with the brand dot, per spec. Replace with official artwork when available.

## Fonts
- `waldenburgNormal` is proprietary and not included → substituted with **Inter** (Google Fonts), as the spec's own fallback note recommends. Supply the real woff2 files to replace it.
- **IBM Plex Mono** loaded from Google Fonts (open-source, matches spec).

## Index
- `styles.css` — entry point (imports only)
- `tokens/` — fonts, colors, typography (vars + `.t-*` utility classes), spacing, radii, elevation
- `components/components.css` — hover/focus/press states (`.sn-btn`, `.sn-navlink`, `.sn-input`, `.sn-link`)
- `components/core/` — Button, Badge, Wordmark + BrandDot, Eyebrow
- `components/forms/` — TextInput, Textarea
- `components/cards/` — FeatureCard, PricingCard, StudioWindow
- `components/feedback/` — AlertBanner
- `components/navigation/` — NavBar, Footer
- `components/sections/` — Section, DisplayLockup, ComparisonTable
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `ui_kits/website/` — Home + Pricing click-through
- `SKILL.md` — Agent Skill entry

### Intentional additions
- **Eyebrow**, **DisplayLockup**, **Section** — direct encodings of the spec's "Editorial Display + Mono Eyebrow" and "marketing-section-*" components.
- **Textarea** lives with TextInput (spec `textarea`).
