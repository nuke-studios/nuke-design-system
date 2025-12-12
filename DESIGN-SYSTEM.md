# Unit Design System

Two CSS variables control everything.

## The Two Controls

```css
--unit: 6px;   /* Base size - scales entire UI */
--ratio: 0.5;  /* How much content fills containers */
```

### --unit

The base measurement. Everything derives from it.

| Value | Density |
|-------|---------|
| 4px | Compact |
| 6px | Standard |
| 8px | Spacious |

Change `--unit` once → entire UI scales proportionally.

### --ratio

How much content (text, icons) fills its container height.

| Value | Effect |
|-------|--------|
| 0.4 | More padding, airy feel |
| 0.5 | Balanced (default) |
| 0.7 | Tighter, denser feel |

**The math:**
```
Text size = container height × ratio
Padding   = container height × (1 - ratio) / 2
```

**Example** with `--unit: 6px` and `--ratio: 0.5`:
```
Controls height = 6px × 6 = 36px
Text size       = 36px × 0.5 = 18px
Padding         = 36px × (1 - 0.5) / 2 = 9px each side
```

## Derived Tokens

All tokens derive from `--unit`:

```css
/* Heights */
--controls-height: calc(var(--unit) * 6);        /* buttons, inputs, select */
--controls-height-small: calc(var(--unit) * 4);  /* checkbox, radio, badge */
--bar-height-1: calc(var(--unit) * 5);           /* breadcrumb, status bar */
--bar-height-2: calc(var(--unit) * 8);           /* toolbar, nav bar */
--bar-height-3: calc(var(--unit) * 10);          /* header, hero sections */

/* Text - derived from height × ratio */
--text-base: calc(var(--controls-height) * var(--ratio));

/* Text Colors */
--color-text-1: ...;        /* primary text */
--color-text-2: ...;        /* muted, placeholders */
--color-text-inverse: ...;  /* text on accent backgrounds */

/* Spacing */
--space-1: var(--unit);              /* tight: gaps, icon padding */
--space-2: calc(var(--unit) * 2);    /* default: card padding, form gaps */
--space-3: calc(var(--unit) * 4);    /* loose: section spacing */

/* Widths */
--width-1: calc(var(--unit) * 40);   /* sidebar, narrow panels */
--width-2: calc(var(--unit) * 80);   /* content, modals */
--width-3: calc(var(--unit) * 128);  /* max-width, containers */

/* Border Radius */
--border-radius-1: calc(var(--unit) * 0.5);  /* subtle: inputs, buttons */
--border-radius-2: var(--unit);              /* default: cards, panels */
--border-radius-3: calc(var(--unit) * 2);    /* rounded: pills, tags */
```

## Typography Scale

All text sizes derive from `--text-base`:

| Element | Size |
|---------|------|
| h1 | `text-base × 2` |
| h2 | `text-base × 1.5` |
| h3 | `text-base × 1.25` |
| h4, body, buttons, inputs | `text-base` |
| card header | `text-base × 1.2` |
| code, pre | `text-base × 0.9` |
| label, badge, small | `text-base × 0.8` |

## File Structure

```
core/
  tokens.css       ← all CSS variables (--unit, --ratio, colors, etc.)
  core.css         ← resets + typography + components + animations
  components/      ← individual component styles
```

## Usage

Import the system:

```css
@import 'core/core.css';
```

Or just the tokens:

```css
@import 'core/tokens.css';
```

## Customization

Override the two controls in your own CSS:

```css
:root {
  --unit: 5px;   /* Smaller UI */
  --ratio: 0.6;  /* Tighter content */
}
```

Or use fluid scaling:

```css
:root {
  --unit: clamp(4px, 0.5vw + 3px, 8px);
}
```

## Style Variants

Components support `nuke-style="1"` and `nuke-style="2"`:

```html
<!-- Style 1: Outlined/Ghost -->
<button nuke-style="1">Button</button>

<!-- Style 2: Filled with border -->
<button nuke-style="2">Button</button>
```

Apply to containers to affect all children:

```html
<div nuke-style="1">
  <button>All buttons here are style 1</button>
  <input type="text" placeholder="Inputs too">
</div>
```
