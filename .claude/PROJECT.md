# Nuke Design System

## What is This?

A pure CSS element-first styling system with **28 fully implemented native elements**:
- **No build tools** - Just CSS files
- **Framework independent** - Works with any project (HTML, React, Vue, Angular, etc.)
- **Element-first** - Native HTML elements work out of the box
- **Variable-driven** - Customize through CSS custom properties (design tokens)
- **Core + Theme** - System logic separate from design tokens
- **Web components ready** - Custom elements for complex components (card, toolbar, etc.)

## Tech Stack

**CSS + Minimal JavaScript (for web components)**

- Pure CSS for native elements (28 elements)
- Vanilla JavaScript for custom elements (card, toolbar, etc.)
- No build process
- No preprocessors (Sass, Less, etc.)
- No framework dependencies
- Just CSS files + optional JS for web components

## Core Philosophy

### Element-First, Not Class-First

```html
<!-- Just write HTML. It works. -->
<button>Click me</button>

<!-- Need a variant? Use .style-1/2/3 -->
<button class="style-1">Solid</button>
<button class="style-2">Outlined</button>
<button class="style-3">Ghost</button>
```

### The Holy Grail: Universal Style Pattern

**Every element uses `.style-1`, `.style-2`, `.style-3`**

- Same class names everywhere
- Meaning changes per element
- `button.style-1` = solid button
- `input.style-1` = border input
- `checkbox.style-1` = square checkbox
- No naming fatigue, just numbers

**This applies to web components too:**
- `<nuke-card style="1">` = standard card
- `<nuke-card style="2">` = elevated card
- `<nuke-card style="3">` = bordered card

### Numbered Everything

Consistent pattern across the system:
- Variables: `--color-1`, `--space-1`, `--font-size-1`
- Styles: `.style-1`, `.style-2`, `.style-3`
- Components: `style="1"`, `style="2"`, `style="3"`
- Simple, predictable, learnable

## 🔒 LOCKED ARCHITECTURE DECISIONS

### Core vs Theme Separation

**The Problem We Solved:**
- If variables live in UI files, updates overwrite customizations
- If variables live in one giant file, navigation is painful
- Need: separate concerns, easy navigation, update-safe

**The Solution: Dual Structure**

```
nuke-ds/                         (repository)
├── core/                        (pure logic, NO variables)
│   ├── base/                    (browser resets & animations)
│   │   ├── reset.css
│   │   ├── scrollbars.css
│   │   └── animations.css
│   ├── text/                    (basic text, no variants)
│   │   └── typography.css       (h1-h6, p, blockquote, lists, strong, em, small)
│   ├── elements/                (28 native HTML elements - FLAT)
│   │   ├── button.css
│   │   ├── input.css
│   │   ├── select.css
│   │   ├── textarea.css
│   │   ├── checkbox.css
│   │   ├── radio.css
│   │   ├── label.css
│   │   ├── fieldset.css
│   │   ├── progress.css
│   │   ├── meter.css
│   │   ├── range.css
│   │   ├── form.css
│   │   ├── a.css
│   │   ├── dialog.css
│   │   ├── details.css
│   │   ├── nav.css
│   │   ├── table.css
│   │   ├── ul.css
│   │   ├── ol.css
│   │   ├── hr.css
│   │   ├── code.css
│   │   ├── pre.css
│   │   ├── img.css
│   │   ├── main.css
│   │   ├── header.css
│   │   ├── footer.css
│   │   └── section.css
│   ├── components/              (web components CSS - FUTURE)
│   │   ├── card.css
│   │   ├── toolbar.css
│   │   ├── badge.css
│   │   └── tabs.css
│   ├── helpers/
│   │   └── scroll-lock.css
│   └── all.css
│
├── theme/                       (design tokens, ALL variables)
│   ├── base/                    (global design tokens)
│   │   ├── colors.css           (--color-1/2/3, backgrounds, borders)
│   │   ├── spacing.css          (--space-1/2/3/4)
│   │   ├── sizing.css           (--height-1/2/3 for form elements)
│   │   ├── transitions.css      (--transition-fast/medium/slow)
│   │   ├── shadows.css          (--shadow-1/2/3)
│   │   ├── borders.css          (--border-radius-small/medium/large)
│   │   └── typography.css       (font sizes, weights, line heights)
│   ├── elements/                (variables for 28 native elements)
│   │   ├── button.css           (--button-* variables)
│   │   ├── input.css
│   │   └── ... (28 files)
│   ├── components/              (variables for web components - FUTURE)
│   │   ├── card.css
│   │   ├── toolbar.css
│   │   └── badge.css
│   └── all.css
│
└── components/                  (web component registration - FUTURE)
    ├── nuke-card.js            (~10 lines, registers <nuke-card>)
    ├── nuke-toolbar.js
    ├── nuke-badge.js
    ├── nuke-tabs.js
    └── all.js                   (imports all components)
```

**Total Files:**
- 70 CSS files (34 core + 36 theme)
- ~6 JavaScript files (web components, when built)

### Folder Naming Clarity

**Why these names:**
- `base/` = Global primitives (resets, animations, design tokens)
- `text/` = Typography only (h1-h6, p, lists, etc.)
- `elements/` = Native HTML elements (button, input, etc.)
- `components/` = Custom web components (card, toolbar, etc.)

**German-friendly:** No vague English buzzwords like "foundation" or "ui"

### Distribution Model

**npm packages:**
- `@nuke-ds/core` - CSS for native elements
- `@nuke-ds/components` - Web components (optional)

**When installed:**
```
node_modules/
└── @nuke-ds/
    ├── core/                    (the system - never edit)
    │   ├── elements/button.css
    │   └── all.css
    └── components/              (web components - optional)
        └── all.js

project-root/
└── nuke-theme/                  (copied via postinstall - customize this!)
    ├── base/colors.css
    ├── elements/button.css
    └── all.css
```

**Postinstall behavior:**
- Copies `theme/` → `project-root/nuke-theme/`
- User customizes `nuke-theme/` freely
- Updates to `@nuke-ds/core` never touch theme

### User Workflow

**1. Install:**
```bash
npm install @nuke-ds/core
# Optional: npm install @nuke-ds/components
# Postinstall creates nuke-theme/ in your project
```

**2. Import in your `style.css`:**
```css
/* Define design tokens FIRST */
@import 'nuke-theme/all.css';

/* Then import system logic */
@import '@nuke-ds/core/all.css';

/* Your custom styles below */
```

**3. Optional: Import web components (if needed):**
```html
<script type="module" src="node_modules/@nuke-ds/components/all.js"></script>

<!-- Now you can use -->
<nuke-card style="1">
  <nuke-card-header>Title</nuke-card-header>
  <nuke-card-content>Content</nuke-card-content>
</nuke-card>
```

**4. Customize:**
- Edit `nuke-theme/base/colors.css` for brand colors
- Edit `nuke-theme/base/spacing.css` for spacing tokens
- Edit `nuke-theme/elements/button.css` for button variables
- Same structure as core - easy navigation

**5. Update core safely:**
```bash
npm update @nuke-ds/core
# Your theme stays untouched!
```

## Current Implementation Status

### ✅ FULLY IMPLEMENTED (v1.0 Ready)

**28 Native Elements with 70 CSS Files:**

**Form Controls (12):**
- ✅ button - Solid/outlined/ghost
- ✅ input - Border/filled/underline
- ✅ select - Custom dropdown
- ✅ textarea - Border/filled/minimal
- ✅ checkbox - Square/rounded/circle
- ✅ radio - Standard/filled/small dot
- ✅ label - Bold/uppercase/colored
- ✅ fieldset - Base/bordered/filled
- ✅ progress - Solid/striped/rounded
- ✅ meter - Semantic coloring
- ✅ range - Slider with variants
- ✅ form - Layout wrapper (standard/card/compact)

**Navigation (2):**
- ✅ a - Links with hover states
- ✅ nav - Navigation (horizontal/bar/vertical)

**Interactive (2):**
- ✅ dialog - Native modal
- ✅ details - Accordion/disclosure

**Content (1):**
- ✅ table - Striped/bordered/minimal

**Lists (2):**
- ✅ ul - Unordered lists (disc/colored bullets/minimal)
- ✅ ol - Ordered lists (decimal/colored numbers/letters)

**Text/Code (3):**
- ✅ hr - Horizontal rules (thin/thick/gradient)
- ✅ code - Inline code (subtle/highlighted/outlined)
- ✅ pre - Code blocks (standard/dark/minimal)

**Media (1):**
- ✅ img - Images (rounded/circle/bordered)

**Structural/Semantic (4):**
- ✅ main - Main content wrapper (full-width/centered/narrow)
- ✅ header - Page header for nav/logo (standard/toolbar/sticky)
- ✅ footer - Page footer (standard/minimal/sticky)
- ✅ section - Content grouping (standard/card/bordered)

**Foundation:**
- ✅ base/reset.css - CSS reset
- ✅ base/animations.css - Keyframes (@fadeIn, @slideDown, @spin)
- ✅ base/scrollbars.css - Custom scrollbar styles
- ✅ helpers/scroll-lock.css - Body scroll prevention + iOS fix
- ✅ text/typography.css - Basic text elements (h1-h6, p, lists, etc.)

**Demo:**
- ✅ index.html - Comprehensive demo of all 28 elements
- ✅ demo-2025.html - Web component proof of concept (card, toolbar, badge)

### 🚧 NEXT: Web Components (In Progress)

**Priority components for prototyping:**
- [ ] `<nuke-card>` - Content containers with enforced structure
- [ ] `<nuke-toolbar>` - Action button groups
- [ ] `<nuke-badge>` - Inline labels/tags
- [ ] `<nuke-tabs>` - Tab interface

**Later:**
- [ ] `<nuke-sidebar>` - Navigation panels
- [ ] `<nuke-tooltip>` - Positioned tooltips

### 🎯 FUTURE ENHANCEMENTS (Post v1.0)

**Distribution:**
- [ ] Create `package.json` for @nuke-ds/core
- [ ] Create `package.json` for @nuke-ds/components
- [ ] Add postinstall script to copy theme/
- [ ] Create .npmignore (exclude demo files)
- [ ] Test npm workflow locally

**Documentation:**
- [ ] Create README.md with installation instructions
- [ ] Document all design tokens and customization
- [ ] Write CONTRIBUTING.md guidelines
- [ ] Document Angular integration (CUSTOM_ELEMENTS_SCHEMA)

**Testing:**
- [ ] Browser compatibility testing
- [ ] Mobile testing (iOS/Android)
- [ ] Accessibility audit
- [ ] Create dark mode theme example

## Variable Naming Conventions

### Foundation Variables (Global Design Tokens)

Organized into focused files for easy navigation:

**base/colors.css:**
```css
--color-1: hsl(210, 100%, 50%);     /* Primary blue */
--color-2: hsl(280, 70%, 55%);      /* Secondary purple */
--color-3: hsl(160, 70%, 45%);      /* Accent green */
--on-color: hsl(0, 0%, 100%);       /* Text on colors */

--background-1: hsl(0, 0%, 98%);    /* Page background */
--background-2: hsl(0, 0%, 100%);   /* Card background */
--background-3: hsl(0, 0%, 95%);    /* Input/code background */

--on-background: hsl(0, 0%, 15%);
--on-background-light: hsl(0, 0%, 45%);

--border-1: hsl(0, 0%, 88%);
--border-2: hsl(0, 0%, 75%);
```

**base/spacing.css:**
```css
--space-1: 0.5rem;    /* 8px */
--space-2: 1rem;      /* 16px */
--space-3: 2rem;      /* 32px */
--space-4: 3rem;      /* 48px */
```

**base/sizing.css:**
```css
--height-1: 32px;     /* Small form elements */
--height-2: 40px;     /* Medium form elements */
--height-3: 48px;     /* Large form elements */
```

### Element Variables (Referencing Foundation)

Element-specific variables in `theme/elements/{element}.css`:

```css
/* theme/elements/button.css */
:root {
  /* Base button properties */
  --button-height: var(--height-2);
  --button-padding-x: var(--space-2);
  --button-font-size: var(--font-size-1);
  --button-font-weight: var(--font-weight-medium);
  --button-radius: var(--border-radius);
  --button-transition: var(--transition-fast);

  /* Style 1: Solid */
  --button-style-1-bg: var(--color-1);
  --button-style-1-color: var(--on-color);
  --button-style-1-hover-bg: hsl(210, 100%, 45%);

  /* Style 2: Outlined */
  --button-style-2-bg: transparent;
  --button-style-2-border: var(--color-1);
  --button-style-2-color: var(--color-1);
  --button-style-2-hover-bg: var(--color-1);
  --button-style-2-hover-color: var(--on-color);

  /* Style 3: Ghost */
  --button-style-3-bg: transparent;
  --button-style-3-color: var(--color-1);
  --button-style-3-hover-bg: var(--background-3);
}
```

### Core Files (Use Variables, Never Define)

```css
/* core/elements/button.css */
button {
  height: var(--button-height);
  padding: 0 var(--button-padding-x);
  font-size: var(--button-font-size);
  font-weight: var(--button-font-weight);
  border-radius: var(--button-radius);
  transition: all var(--button-transition);
}

button.style-1 {
  background: var(--button-style-1-bg);
  color: var(--button-style-1-color);
}

button.style-1:hover {
  background: var(--button-style-1-hover-bg);
}
```

### Naming Pattern

**Variables:**
- Foundation: `--{category}-{number}` → `--color-1`, `--space-2`
- Element base: `--{element}-{property}` → `--button-height`, `--input-radius`
- Element variant: `--{element}-style-{number}-{property}` → `--button-style-1-bg`
- Element state: `--{element}-style-{number}-{state}-{property}` → `--button-style-1-hover-bg`

**Classes:**
- Style variants: `.style-1`, `.style-2`, `.style-3` (universal across all elements)

**Custom Elements:**
- Component: `<nuke-{name}>` → `<nuke-card>`, `<nuke-toolbar>`
- Children: `<nuke-{name}-{part}>` → `<nuke-card-header>`, `<nuke-card-content>`
- Attributes: `style="1/2/3"` (same universal pattern)

**Files:**
- Element files: `{element}.css` → `button.css`, `input.css`, `checkbox.css`
- Token files: `{token}.css` → `colors.css`, `spacing.css`, `borders.css`
- Base files: `{purpose}.css` → `reset.css`, `animations.css`
- Helpers: `{utility}.css` → `scroll-lock.css`
- Components: `nuke-{name}.js` → `nuke-card.js`, `nuke-toolbar.js`

## Commands

**There are no commands!** It's just CSS files (and optional JS for web components).

**Development workflow:**
- Edit CSS files directly
- Open `index.html` in browser
- Refresh to see changes
- No build step needed

**For users:**
- Install via npm OR download files
- Import theme + core in their CSS
- Optional: Import components JS for web components
- Customize theme variables
- Build their project however they want

## Nuke vs Other Systems

**Not like Tailwind:**
- No `.p-4`, `.bg-blue-500`, `.flex`, etc.
- Elements work without classes
- Variants use semantic numbered pattern

**Not like Bootstrap:**
- No `.btn-primary`, `.form-control`, etc.
- Minimal JavaScript (only for web components)
- Pure CSS for native elements

**Not like Shoelace/Carbon:**
- Native elements stay native (not wrapped in custom elements)
- Only complex components use web components
- Much smaller scope (28 elements + ~6 components)

**What makes Nuke unique:**
- **Element-first architecture** - Native HTML works out of the box
- **Universal numbered pattern** - Same classes everywhere (.style-1/2/3)
- **Hybrid approach** - Pure CSS for native, web components for complex
- **Core/Theme separation** - Update-safe customization
- **One file per element** - Clear ownership, easy navigation
- **Minimal scope** - 28 elements, not 50+ components
- **Personal toolkit** - Built for real usage, not market trends

## Best Practices

### When Building Core Files

- [x] Element works with no classes (base styling)
- [x] Uses variables, never defines them
- [x] .style-1/2/3 variants implemented
- [x] Supports all relevant states (:hover, :focus, :disabled, :checked, etc.)
- [x] Accessible (focus outlines, proper contrast)
- [x] Works across modern browsers

### When Building Theme Files

- [x] Variables use foundation variables as base
- [x] Document what each variable controls (via comments)
- [x] Provide sensible defaults
- [x] Consider light/dark theme compatibility

### When Building Web Components

- [ ] Minimal JavaScript (just registration + structure)
- [ ] No Shadow DOM (keep CSS simple and customizable)
- [ ] Style via external CSS (theme/components/card.css)
- [ ] Same `style="1/2/3"` attribute pattern
- [ ] Accessibility baked in (ARIA roles, keyboard nav)
- [ ] Framework independent (vanilla JS)

### Folder Structure Philosophy

**Why we split base/ into focused files:**
- ❌ BAD: One giant `foundation.css` with 100+ variables
- ✅ GOOD: `colors.css`, `spacing.css`, `borders.css`, etc.
- Easy to find what you need
- Clear ownership (looking for spacing? Open spacing.css)
- German-friendly (no vague English buzzwords)

## Key Insights

> "I don't want utility classes like Tailwind. I want my HTML elements to just work, with optional modifiers when I need variants."

> "The holy grail: `.style-1/2/3` pattern everywhere. No more naming fatigue. `button.style-1` is solid, `checkbox.style-1` is square - same class, different meaning per element."

> "One element = one file. Want to fix buttons? Open `button.css`. Clear ownership, easy to maintain."

> "Variables live in the theme, not the core. Update-safe architecture where core improvements never overwrite customizations."

> "Native elements stay native. Only complex components (card, toolbar) use web components. Best of both worlds."

> "Building for myself first. If others like it, great. No market pressure, just practical tools."

## Project Status

**Current State:** v0.9 (Ready for web components)

**What's Working:**
- ✅ 28 fully implemented native elements
- ✅ 70 CSS files (34 core + 36 theme)
- ✅ Complete core/theme separation
- ✅ Comprehensive demo (index.html)
- ✅ Clear folder structure (base/text/elements)
- ✅ Production-ready CSS
- ✅ Real-world architecture proven

**Next Steps:**
- [ ] Build web components (card, toolbar, badge, tabs)
- [ ] npm package configuration
- [ ] README.md documentation
- [ ] Use in real projects

**Timeline:** Web components can be built incrementally as needed. Core CSS is ready to use today.
