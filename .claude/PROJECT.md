# Nuke Design System

## What is This?

**An element-first design system with the killer feature no one else has: fully extractable, editable theme files.**

- **Native HTML elements work out of the box** - `<button>`, `<input>`, `<select>` - no classes needed
- **Three complete design philosophies** - `nuke-style="1/2/3"` gives you minimal, subtle, or all-in aesthetics
- **Extracted theme folder** - Get ALL theme files in your project, edit freely, updates never overwrite
- **Framework independent** - Works with vanilla HTML, React, Vue, Angular, Svelte, etc.
- **Lit-powered web components** - TypeScript-based, lightweight, accessible
- **Zero build requirements for users** - Just CSS + optional JS

## The Killer Features (Why Nuke is Different)

### 1. Extracted Theme Architecture (UNIQUE)
**No other design system does this.**

Most systems: Override variables in your code, hope updates don't break things.

Nuke: Extract ENTIRE theme folder to your project. Every single theme file. Edit anything. Updates never touch it.

```
npm install @nuke.dev/design-system
# Postinstall extracts theme files

nuke-theme/
├── theme.css           (foundation tokens - EDIT FREELY)
├── button/
│   └── button.theme.css (button tokens - EDIT FREELY)
├── card/
│   └── card.theme.css   (card tokens - EDIT FREELY)
└── ... (all 26 components)
```

**Full creative freedom. Update-safe. Simple.**

### 2. Three Design Philosophies in ONE System (UNIQUE)

Ship three complete aesthetic systems. Users pick one or mix them.

**Style 1: Minimal / Japanese**
- Philosophy: Zen-like simplicity, maximum whitespace
- Forms: Bottom borders only (underline style)
- Buttons: Minimal, subtle hover states
- Think: Japanese design, brutalism, text-heavy interfaces

**Style 2: Subtle Contrasts**
- Philosophy: Modern, clean, background-driven
- NO borders anywhere - only backgrounds create structure
- Soft, airy feel
- Think: iOS, modern web apps, soft aesthetics

**Style 3: All In**
- Philosophy: Traditional, clear, defined
- Borders AND backgrounds working together
- Maximum clarity, nothing ambiguous
- Think: Material Design, Bootstrap, enterprise apps

```html
<!-- Same element, three philosophies -->
<button nuke-style="1">Minimal</button>
<button nuke-style="2">Subtle</button>
<button nuke-style="3">All In</button>
```

### 3. Native-First with Optional Enhancement

**Most systems wrap everything in components.**
- Material UI: `<Button>`, `<TextField>`, `<Select>`
- Every framework: custom components for basic HTML

**Nuke: HTML just works.**
```html
<!-- Native elements styled automatically -->
<button>Works immediately</button>
<input type="text" placeholder="Styled">
<select><option>Dropdown</option></select>

<!-- Web components only for complex stuff -->
<nuke-toast>Notification</nuke-toast>
<nuke-tabs>Tab interface</nuke-tabs>
```

**20 native elements + 6 web components. Lightweight. Practical.**

## Tech Stack

### For Library Development (You)
- **TypeScript** - Type-safe component development
- **Lit** - Lightweight web components (5KB)
  - `@property()` decorators for reactive props
  - Light DOM rendering (no Shadow DOM)
  - Framework-agnostic
- **Bun** - Fast TypeScript → JavaScript compilation
  - Built-in bundler (no extra config)
  - Compiles to `dist/core.js`
  - Install via Homebrew: `brew install oven-sh/bun/bun`

### For Users (Zero Dependencies)
- **Pure CSS** - No preprocessors, no build tools
- **Vanilla JavaScript** - Web components work everywhere
- **Framework agnostic** - HTML, React, Vue, Angular, Svelte

## File Structure

```
nuke-design-system/
├── core/                        # Source (TypeScript + CSS)
│   ├── animations.css           # Foundation (no .core suffix)
│   ├── helpers.css
│   ├── reset.css
│   ├── theme.css                # Foundation tokens + component imports
│   ├── core.css                 # Aggregates all *.core.css files
│   ├── core.ts                  # Web component entry (TypeScript)
│   │
│   ├── button/                  # Native element (CSS only)
│   │   ├── button.core.css      # Styling logic
│   │   └── button.theme.css     # Design tokens
│   │
│   ├── badge/                   # Web component (CSS + TS)
│   │   ├── badge.core.css       # Styling logic
│   │   ├── badge.theme.css      # Design tokens
│   │   └── badge.core.ts        # Lit component (TypeScript)
│   │
│   └── ... (26 total: 20 native + 6 web components)
│
├── dist/                        # Build output (published to npm)
│   ├── core.css                 # All styling logic (bundled, imports resolved)
│   ├── core.js                  # All web components (bundled)
│   ├── types/                   # TypeScript definitions (.d.ts)
│   └── nuke-theme/              # Extracted theme (flat structure)
│       ├── theme.css            # Entry point (imports core.css + all themes)
│       ├── foundation.theme.css # Foundation tokens (colors, spacing, etc.)
│       ├── button.theme.css     # Component design tokens
│       ├── input.theme.css
│       └── ... (26 theme files)
│
├── docs/                        # Astro documentation site
│   ├── src/
│   │   └── pages/
│   │       └── index.astro      # Homepage
│   ├── public/                  # Static assets
│   │   ├── nuke-theme/          # Copied from ../../dist/nuke-theme (gitignored)
│   │   ├── core.css             # Copied from ../../dist/core.css (gitignored)
│   │   └── core.js              # Copied from ../../dist/core.js (gitignored)
│   ├── astro.config.mjs
│   └── dist/                    # Built Astro site (static HTML)
│
├── docs_static/                 # Old demo (backup)
│   ├── index_save.html
│   └── style_save.css
│
├── .scripts/
│   ├── bundle-core-css.js       # Bundles core CSS (resolves imports)
│   ├── build-theme.js           # Extracts theme files to dist/nuke-theme/
│   ├── copy-to-docs.js          # Copies dist/ files to docs/public/ for dev
│   ├── watch.js                 # Watches core/ and rebuilds on changes
│   └── postinstall.js           # npm postinstall (theme extraction for users)
│
├── tsconfig.json                # TypeScript config
├── package.json                 # Build scripts + dependencies
└── README.md
```

## Architecture Decisions (LOCKED)

### Core vs Theme Separation

**Problem:** How to let users customize without breaking on updates?

**Solution:** Paired files in component folders.

- `.core.css` = Styling logic (never edited by users, ships from node_modules)
- `.theme.css` = Design tokens (extracted to user's project, fully editable)

```css
/* button.core.css - Uses variables, never defines them */
button {
  height: var(--button-height);
  background: var(--button-bg);
  color: var(--button-color);
}

/* button.style.css - Defines variables users can edit */
:root {
  --button-height: 36px;
  --button-bg: var(--background-2);
  --button-color: var(--on-background);
}
```

**Updates to core never touch user's theme files. Perfect separation.**

### Lit for Web Components

**Why Lit?**
- ✅ TypeScript support (`@property()` decorators)
- ✅ Tiny (5KB bundled)
- ✅ Light DOM rendering (no Shadow DOM - keeps CSS simple)
- ✅ Reactive properties without boilerplate
- ✅ Framework-agnostic (works everywhere)
- ✅ Better DX than vanilla `class extends HTMLElement`

**Example (Toast component):**
```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('nuke-toast')
export class NukeToast extends LitElement {
  @property({ type: String, reflect: true }) variant = '1';
  @property({ type: Number }) duration = 3000;

  // Render in Light DOM (no Shadow DOM)
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <slot></slot>
      <button @click=${this.dismiss}>×</button>
    `;
  }

  dismiss() {
    this.remove();
  }
}
```

**Compiled to JavaScript, shipped as `dist/core.js`. Users just import and use.**

### Build Pipeline (Bun + TypeScript)

**Source:** TypeScript (`.ts`) + CSS
**Output:** JavaScript (`.js`) + CSS + Type definitions (`.d.ts`)

```bash
# Build command (inside Docker container)
bun run build

# What happens:
# 1. TypeScript compiles core/*.ts → dist/*.js
# 2. CSS files copied core/*.css → dist/*.css
# 3. Type definitions generated → dist/types/*.d.ts
# 4. Empty folders cleaned up
```

**Users never see TypeScript. They get clean JavaScript + CSS.**

### User Import Pattern

**Users extract theme, import ONE file:**

```html
<!-- CSS: Import extracted theme (includes core.css automatically) -->
<link rel="stylesheet" href="./nuke-theme/theme.css">

<!-- JS: Optional web components -->
<script type="module" src="./node_modules/@nuke.dev/design-system/dist/core.js"></script>
```

**That's it. Everything works.**

The extracted `theme.css` has this at the top:
```css
/* IMPORTANT: Adjust this path to match your node_modules location */
@import './node_modules/@nuke.dev/design-system/dist/core.css';

/* Foundation tokens (EDIT THESE) */
:root { --color-1: ...; }

/* Component theme imports */
@import './button/button.theme.css';
@import './card/card.theme.css';
/* ... */
```

## What's Implemented (v2.0 - Lit Migration Complete)

### 20 Native HTML Elements
**Styled automatically, no classes needed:**

- **Forms:** button, input, select, textarea, checkbox, radio, label, progress, range
- **Navigation:** a, nav
- **Interactive:** dialog, details
- **Content:** table
- **Lists:** ul, ol
- **Text/Code:** hr, code, pre
- **Media:** img

**Each has:**
- `element.core.css` (styling logic)
- `element.theme.css` (design tokens)
- 3 style variants (nuke-style="1/2/3")

### 6 Web Components (Lit + TypeScript)
**Complex interactions, keyboard navigation, accessibility:**

- `<nuke-badge>` - Labels, tags, counters
- `<nuke-card>` - Content containers (header/content/actions)
- `<nuke-sidebar>` - Collapsible navigation (overlay mode, escape key)
- `<nuke-tabs>` - Tab interface (arrow keys, Home/End navigation)
- `<nuke-toast>` - Notifications (auto-dismiss, stacking, animations)
- `<nuke-toolbar>` - Button groups

**Each has:**
- `component.core.ts` (Lit component, TypeScript)
- `component.core.css` (styling logic)
- `component.theme.css` (design tokens)
- 3 style variants (variant="1/2/3" property)

### Foundation Files
- `reset.css` - Browser normalization
- `animations.css` - Keyframe definitions (@fadeIn, @slideDown, etc.)
- `helpers.css` - Utility classes (.no-scroll)
- `theme.css` - Foundation tokens (colors, spacing, typography)

## Development Workflow

### Setup (First Time)
```bash
# Install Bun via Homebrew
brew install oven-sh/bun/bun

# Install dependencies
bun install

# Build library
bun run build
# Outputs to dist/
#   dist/core.css        - Bundled styles (all imports resolved)
#   dist/core.js         - Bundled web components
#   dist/types/          - TypeScript definitions
#   dist/nuke-theme/     - Extracted theme files
```

### Development Workflow (HMR Enabled)

**Run TWO terminals:**

**Terminal 1: Watch & Auto-rebuild**
```bash
bun run build:watch
```
- Watches `core/` for changes
- Auto-rebuilds `dist/` on changes
- Copies built files to `docs/public/`

**Terminal 2: Astro Dev Server**
```bash
bun run docs:dev
```
- Serves docs at `http://localhost:4321`
- HMR enabled (browser auto-reloads)
- Watches `docs/` for changes

**How it works:**
1. Edit `core/*.css` or `core/*.ts`
2. `build:watch` detects change → rebuilds `dist/` → copies to `docs/public/`
3. Astro detects change in `docs/public/` → browser reloads
4. See changes immediately!

**Production Build:**
```bash
bun run build          # One-time build for npm publishing
bun run docs:build     # Static site build
```

### Build Scripts (package.json)
```json
{
  "scripts": {
    "build": "bun run build:clean && bun run build:ts && bun run build:css && bun run build:theme && bun run build:cleanup",
    "build:dev": "bun run build && node .scripts/copy-to-docs.js",
    "build:watch": "bun run build:dev && node .scripts/watch.js",
    "build:clean": "mkdir -p dist dist/nuke-theme dist/types",
    "build:ts": "tsc && bun build core/core.ts --outdir dist --format esm",
    "build:css": "node .scripts/bundle-core-css.js",
    "build:theme": "node .scripts/build-theme.js",
    "build:cleanup": "find dist -mindepth 1 -maxdepth 1 -type d ! -name 'nuke-theme' ! -name 'types' -exec rm -rf {} +",
    "docs:dev": "astro dev --root docs --host",
    "docs:build": "astro build --root docs"
  }
}
```

### Build Pipeline Explained

**Production Build (`bun run build`):**
1. **`build:clean`** - Creates dist/ structure
2. **`build:ts`** - Compiles TypeScript → `dist/core.js` + type definitions
3. **`build:css`** - Bundles all CSS → `dist/core.css` (resolves @imports)
4. **`build:theme`** - Extracts theme files → `dist/nuke-theme/`
5. **`build:cleanup`** - Removes leftover folders

**Development Build (`bun run build:dev`):**
1. Runs production build
2. **Copies files to `docs/public/`** for Astro dev server

**Watch Mode (`bun run build:watch`):**
1. Runs development build
2. **Watches `core/` for changes** → auto-rebuilds on file changes

### File Naming Conventions

**TypeScript (source):**
- `core.ts` - Main entry (exports all components)
- `badge.core.ts` - Component logic
- Compiled to `.js` in dist/

**CSS:**
- `core.css` - Aggregate (imports all *.core.css)
- `theme.css` - Aggregate (imports all *.theme.css + core.css)
- `element.core.css` - Styling logic
- `element.theme.css` - Design tokens
- Foundation files: `reset.css`, `animations.css`, `helpers.css` (no suffix)

**Lit Component Pattern:**
```typescript
// Properties use 'variant' not 'style' (avoids HTMLElement.style conflict)
@property({ type: String, reflect: true }) variant = '1';

// Light DOM rendering (no Shadow DOM)
createRenderRoot() {
  return this;
}
```

## Nuke vs Other Systems

### vs Tailwind
- ❌ Tailwind: `.p-4 .bg-blue-500 .flex` everywhere
- ✅ Nuke: Elements work without classes, optional `nuke-style="1/2/3"`

### vs Bootstrap / Material UI
- ❌ Bootstrap: `.btn-primary`, `.form-control`, framework-locked
- ✅ Nuke: Native HTML, framework-agnostic, extractable theme

### vs Shoelace / Carbon
- ❌ Shoelace: Everything is a web component (even buttons)
- ✅ Nuke: Native elements stay native, web components only for complex stuff

### vs PicoCSS / SimpleCSS
- ❌ Pico: One style, hard to customize
- ✅ Nuke: Three philosophies, extractable theme folder

### The Unique Combination:
1. Native elements styled by default
2. Three complete design philosophies (nuke-style="1/2/3")
3. Extracted, fully-editable theme folder
4. Lit web components for complex interactions
5. Framework-agnostic
6. Zero build requirements for users
7. TypeScript development experience

**No other system has this exact combination.**

## Naming Decisions

### Why "variant" not "style" in Lit?
```typescript
// ❌ This causes TypeScript errors (conflicts with HTMLElement.style)
@property({ type: String }) style = '1';

// ✅ Use 'variant' property internally
@property({ type: String, reflect: true }) variant = '1';

// HTML still uses nuke-style="1" (attribute reflects to property)
<nuke-badge nuke-style="1">Badge</nuke-badge>
```

### Why "core.css" not "index.css"?
- `core.css` = clear purpose (core styling logic)
- `core.js` = symmetrical naming (web components)
- `theme.css` = design tokens
- User imports `theme.css` (which imports `core.css`)

### Folder Structure Logic
- No `_base/` folder (foundation files at root)
- Flat component folders (button/, card/, badge/)
- Paired files in same folder (easy navigation)
- Web components identifiable (have `.core.ts` files)

## Key Insights & Philosophy

> "Extract the ENTIRE theme folder. Give users the actual files, not just override points. This is the killer feature."

> "Three design philosophies in one system. Not variants - complete aesthetic approaches. Minimal, Subtle, All-In."

> "Native HTML just works. Web components only when necessary. Hybrid approach beats all-or-nothing."

> "Build for yourself first. If others find it useful, great. No market pressure, just practical tools."

> "Updates never touch extracted theme files. Perfect separation. This solves the customization problem."

## What Makes This Brilliant

**The innovation isn't any single feature. It's the combination:**

1. **Extracted theme architecture** - No one else does this
2. **Three philosophies** - Not just variants, complete aesthetic systems
3. **Native-first** - HTML works without wrappers
4. **Lit web components** - TypeScript DX, tiny runtime
5. **Framework-agnostic** - Works everywhere
6. **Zero user build requirements** - Just CSS + optional JS

**This could cause attention from the right people IF:**
- ✅ Used in 2-3 real projects (battle-tested)
- ✅ Clear documentation showing extract → customize → ship workflow
- ✅ Published to npm with great README
- ✅ Examples across frameworks (React, Vue, Angular, Svelte)

## Next Steps (Wrap Up v2.0)

See TODO.md for actionable tasks.

**Priority:** Ship it. Use it. Two projects waiting for this.
