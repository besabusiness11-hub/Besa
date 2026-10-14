# BESA 2.0 Design System

Brand register. Lane: **ad teardown / product demo** (annotated real UI, big confident type, blue-committed). Not the editorial-magazine lane. Kept from brand: blue palette, Inter, skewed italic wordmark, 0.75rem radius.

Scene: a shop or gym owner on their phone between customers, mid-day light, thumb scrolling, deciding in seconds.

## Principles (Impeccable + Apple restraint)

1. **One idea per fold.** Big type, wide space, one message (Apple product pages).
2. **Show, don't describe.** HTML/CSS/SVG ad and landing mockups are the imagery. Never stock photos, never AI clipart.
3. **Committed blue.** Blue (drenched hero + final CTA, ~35% of page), tinted white elsewhere. Blue = action and emphasis only.
4. **Depth by hierarchy, not decoration.** No glass, no gradient text, no side stripes, no eyebrow on every section, numbers only for the true 3-step sequence.
5. **Nested radii stay concentric** (inner = outer - padding), as on Apple hardware/UI.
6. **Motion explains.** The only choreographed moment is the hero ad-to-landing morph. Elsewhere short, quiet reveals.

## Color (OKLCH, derived from locked brand HSL)

| Token | Brand source | OKLCH | Hex | Use |
|---|---|---|---|---|
| `--blue` | hsl(229 65% 45%) | `oklch(0.448 0.193 268)` | #2844bd | Primary, hero drench, CTA |
| `--blue-deep` | hsl(229 84% 32%) | `oklch(0.348 0.182 266)` | #0d2696 | Hover/pressed, text links on tint |
| `--ink` | hsl(222 47% 11%) | `oklch(0.206 0.039 266)` | #0f1729 | Body + headings |
| `--tint` | hsl(232 100% 96%) | `oklch(0.95 0.024 279)` | #ebedff | Alternate sections, chips |
| `--surface` | white | `oklch(1 0 0)` | #ffffff | Base page |
| `--muted` | hsl(220 14% 96%) | `oklch(0.968 0.003 265)` | #f3f4f6 | Fields, ad-mock chrome |
| `--line` | hsl(220 13% 91%) | `oklch(0.928 0.006 265)` | #e5e7eb | Borders |
| `--ink-soft` | adjusted | `oklch(0.44 0.03 265)` | ~#4b5563 | Secondary text (>= 4.5:1 on white, tint, muted) |
| `--ok` / `--err` | functional | `oklch(0.52 0.14 150)` / `oklch(0.52 0.19 27)` | | Form states only |

Contrast (computed): white on blue 7.9:1, ink on white 17.9:1, blue on tint 6.9:1, white on blue-deep 12.1:1. Brand `muted-foreground` hsl(220 9% 46%) is 4.4:1 on `--muted`, so `--ink-soft` replaces it. No dark mode. Bodies are never pure gray-on-tint.

On blue: text white, secondary text `white / 0.82`. Button on blue: white bg, blue text.

## Typography

One family, weight + style contrast: **Inter variable**, self-hosted (Fontsource, latin subset, `font-display: swap`, preload one file; add italic file only if emphasis italics ship). Brand-locked, overrides the generic Inter reflex-reject.

| Step | Size (fluid) | Weight/style | Line | Tracking |
|---|---|---|---|---|
| display (H1) | `clamp(2.75rem, 1.7rem + 4.8vw, 5.5rem)` | 800, key words 800 italic | 1.0 | -0.035em |
| h2 | `clamp(2rem, 1.4rem + 2.6vw, 3.5rem)` | 800 | 1.05 | -0.03em |
| h3 | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` | 700 | 1.2 | -0.015em |
| lead | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | 400 | 1.5 | 0 |
| body | `1.0625rem` | 400 | 1.6 | 0 |
| small | `0.875rem` | 500 | 1.5 | 0.005em |

Ratio >= 1.25 between steps. Max body width 65ch. `text-wrap: balance` on headings, `pretty` on prose. `font-variant-numeric: tabular-nums` on prices. Signature: 1-3 key words per headline set in 800 italic blue (no gradient). Wordmark keeps `skewX(-8deg)` Inter 800 italic, `--blue`. No all-caps body; no tracked uppercase kickers.

## Spacing, grid, shape

- 4px base: `4 8 12 16 24 32 48 64 96 128`. Section padding `clamp(4rem, 3rem + 5vw, 8rem)`; vary rhythm, tight inside groups, loose between.
- 12-col grid, max 1200px, gutter 16px mobile / 24px desktop, mobile-first, 16px side gutter.
- Radius: sm 0.5rem, base **0.75rem**, lg 1.25rem, xl 2rem (device frames), pill for chips only.
- Shadow: two soft layers only, `0 1px 2px oklch(0.2 0.04 266 / .08), 0 8px 24px oklch(0.2 0.04 266 / .10)`; used on mockups, not on every box.
- z-scale: base 0, sticky 10, overlay 20, toast 30.

## Components

- **Header**: solid surface, wordmark left, one CTA right; sticky; 64px; no blur.
- **Button primary**: blue bg, white text, min-h 48px, radius base, verb+object label ("Mandaci la tua pubblicità"). Hover: `--blue-deep` + translateY(-1px); active: scale(.98); focus: 3px `--blue-deep` ring, 2px offset.
- **Link**: ink, underlined with blue offset 3px.
- **Form**: label above field, 48px fields on `--muted`, 2px border on focus, inline error text with `--err` + icon-free text, honeypot hidden, Turnstile invisible, checkbox privacy 44px target, success replaces form (and routes to /grazie).
- **Ad mock** (hero): generic social-post card (no Meta/IG logos or trademarks), profile row, image block, caption, "Scopri di più" button. Neutral `--muted` chrome.
- **Landing mock**: phone frame (xl radius) showing the BESA-style landing: headline, proof row, one button.
- **Annotation**: ink pill + thin line pointing at a mock element ("L'utente atterra qui: profilo, niente da fare"). Max 3 visible at once.
- **Plan blocks**: asymmetric, not identical cards. Subscription dominant (blue drench), one-shot and custom as quieter rows. Price slot `[TODO: prezzo]`.
- **FAQ**: native `<details>`; chevron rotates (transform), 48px summary.
- **Team**: two portraits, different crop/size, short first-person bios `[TODO]`.
- **Footer**: wordmark, email, legal line `[TODO]`, privacy + cookie links.

## Motion

Tokens: `--ease-out: cubic-bezier(.25,1,.5,1)` (quart), `--ease-expo: cubic-bezier(.16,1,.3,1)`; durations 150 / 250 / 500 / 900ms.
- **Signature: hero morph.** Sticky stage, scroll-linked via `animation-timeline: view()`: ad card scales down and slides left while the landing phone frame rises into place; annotation lines draw (stroke-dashoffset). Transform/opacity/clip-path only.
- **Reveals**: 12px translateY + opacity, 500ms ease-out, different per content type (headline lines clip-reveal, mockups rise, list items stagger 60ms). Content is visible by default; animation enhances (`@supports (animation-timeline: view())`, IntersectionObserver fallback adds class only to enhance).
- **Micro**: button press, field focus line, FAQ chevron, form success check.
- **Reduced motion**: all choreography off; the morph shows its final state and sections crossfade (150ms) only.
- Budget: no JS animation library, < 2KB of motion JS, no animation on LCP element before paint, no layout-property animation.

## Anti-slop checklist for the build

No em dashes in copy; no buzzwords; no eyebrow/number scaffolding except the real 3-step block; no identical card grids; no gradient text; no glass; no stock photos; headings tested at 320 / 768 / 1280 for overflow; every image has width/height; one H1.

## Open choices for approval

1. Inter italic emphasis (adds ~25KB font file) vs weight-only emphasis (0KB). Recommended: italic, subset to latin, preloaded only if above the fold needs it.
2. Hero drenched blue vs white hero with blue stage. Recommended: drenched blue.
3. Opsz axis (Inter Display at large sizes): verify Fontsource support at build time.
