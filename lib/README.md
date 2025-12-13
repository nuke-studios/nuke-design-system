# Nuke Design System

**A minimal, customizable CSS design system with native HTML elements and web components.**

Pure CSS styling for 20+ native elements + 6 web components built with Lit.

```html
<button>Click me</button>
<input type="text" placeholder="Name">
<nuke-badge>New</nuke-badge>
```

---

## Features

- **20+ styled native elements** - Buttons, forms, tables, navigation
- **6 web components** - Card, toolbar, badge, tabs, toast, sidebar
- **Fully customizable** - CSS variables for everything
- **No build tools required** - Just CSS + optional JS
- **Framework agnostic** - React, Vue, Angular, or vanilla
- **TypeScript support** - Full type definitions included

---

## Installation

```bash
npm install @nuke.dev/design-system
```

The postinstall script extracts a `nuke-theme/` folder to your project root with all customizable theme files.

---

## Quick Start

### 1. Import CSS

```html
<!-- Single import - includes everything -->
<link rel="stylesheet" href="./nuke-theme/theme.css">
```

Or in your CSS:

```css
@import './nuke-theme/theme.css';
```

**What this imports:**
- Core styling logic (bundled, minified)
- All theme variables (flat structure, easy to customize)

### 2. Optional: Import Web Components

```html
<script type="module" src="./node_modules/@nuke.dev/design-system/dist/core.js"></script>
```

Or in your JavaScript:

```javascript
import '@nuke.dev/design-system/dist/core.js';
```

### 3. Use It!

```html
<!-- Native elements work automatically -->
<button>Click me</button>
<input type="text" placeholder="Your name">
<textarea placeholder="Your message"></textarea>

<!-- Web components -->
<nuke-badge>New</nuke-badge>
<nuke-card>
  <nuke-card-header>Title</nuke-card-header>
  <nuke-card-content>Content here</nuke-card-content>
</nuke-card>
```

---

## Available Elements

### Form Controls (10)
- `button` - zen/soft/solid buttons
- `input` - Text, email, password, etc. (zen: underline, soft: filled, solid: bordered)
- `select` - Custom dropdown
- `textarea` - zen/soft/solid text areas
- `checkbox` - zen/soft/solid checkboxes
- `radio` - zen/soft/solid radio buttons
- `label` - Bold/uppercase/colored
- `progress` - Solid/striped/rounded
- `meter` - Semantic coloring
- `range` - Slider with variants

### Navigation (2)
- `a` - Links with hover states
- `nav` - Horizontal/bar/vertical

### Interactive (2)
- `dialog` - Native modal
- `details` - Accordion/disclosure

### Content (1)
- `table` - Striped/bordered/minimal

### Lists (2)
- `ul` - Unordered lists
- `ol` - Ordered lists

### Text/Code (3)
- `hr` - Horizontal rules
- `code` - Inline code
- `pre` - Code blocks

### Media (1)
- `img` - Images with borders

---

## Web Components

### Card
```html
<nuke-card>
  <nuke-card-header>Title</nuke-card-header>
  <nuke-card-content>
    Your content here
  </nuke-card-content>
  <nuke-card-actions>
    <button>Cancel</button>
    <button>Save</button>
  </nuke-card-actions>
</nuke-card>
```

### Toolbar
```html
<nuke-toolbar>
  <button>New</button>
  <button>Edit</button>
  <button>Delete</button>
</nuke-toolbar>
```

### Badge
```html
<nuke-badge>New</nuke-badge>
<nuke-badge>12</nuke-badge>
<nuke-badge>Beta</nuke-badge>
```

### Tabs
```html
<nuke-tabs>
  <nuke-tab>Tab 1</nuke-tab>
  <nuke-tab>Tab 2</nuke-tab>
  <nuke-tab-panel>Content 1</nuke-tab-panel>
  <nuke-tab-panel>Content 2</nuke-tab-panel>
</nuke-tabs>
```

**Features:** Arrow key navigation, Home/End keys, full ARIA support

### Toast
```html
<button onclick="showToast('Hello!')">Show Toast</button>

<script>
  function showToast(message) {
    const toast = document.createElement('nuke-toast');
    toast.textContent = message;
    document.body.appendChild(toast);
  }
</script>
```

**Features:** Auto-dismiss, slide animations, stacking

### Sidebar
```html
<nuke-sidebar>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
</nuke-sidebar>

<button onclick="document.querySelector('nuke-sidebar').open()">
  Open Sidebar
</button>
```

**Features:** Slide animations, overlay backdrop, collapsible

---

## Customization

All design tokens are CSS variables in your `nuke-theme/` folder:

### Colors
```css
/* nuke-theme/foundation.style.css */
:root {
  --color-1: hsl(25, 85%, 55%);     /* Primary */
  --color-2: hsl(280, 40%, 65%);    /* Secondary */
  --color-3: hsl(160, 45%, 55%);    /* Accent */

  --background-1: hsl(0, 0%, 96%);  /* Page bg */
  --background-2: hsl(0, 0%, 100%); /* Card bg */
  --background-3: hsl(0, 0%, 94%);  /* Alt bg */
}
```

### Spacing & Typography
```css
:root {
  --space-1: 0.375rem;  /* 6px */
  --space-2: 0.75rem;   /* 12px */
  --space-3: 1.5rem;    /* 24px */
  --space-4: 2.25rem;   /* 36px */

  --font-size-1: 0.6875rem;  /* 11px */
  --font-size-2: 0.75rem;    /* 12px */
  --font-size-3: 0.9375rem;  /* 15px */
  --font-size-4: 1.125rem;   /* 18px */
}
```

### Component Variables
```css
/* nuke-theme/button.style.css */
:root {
  --button-height: var(--height-2);
  --button-padding-x: var(--space-2);
  --button-radius: var(--border-radius);
  --button-font-size: var(--font-size-1);
}
```

**Edit any `.theme.css` file to customize!**

---

## CI/CD

The postinstall script automatically skips in CI environments:

```bash
# Or manually skip
NUKE_SKIP_SETUP=true npm install
```

## Re-run Setup

```bash
npx @nuke.dev/design-system setup
```

---

## Framework Integration

### React
```jsx
import '@nuke.dev/design-system/dist/core.js';

function App() {
  return (
    <nuke-card>
      <nuke-card-header>React + Nuke</nuke-card-header>
      <nuke-card-content>
        <button>Click me</button>
      </nuke-card-content>
    </nuke-card>
  );
}
```

### Vue
```vue
<template>
  <nuke-card>
    <nuke-card-header>Vue + Nuke</nuke-card-header>
    <nuke-card-content>
      <button>Click me</button>
    </nuke-card-content>
  </nuke-card>
</template>

<script setup>
import '@nuke.dev/design-system/dist/core.js';
</script>
```

### Angular
```typescript
// app.config.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export const appConfig = {
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
};
```

```typescript
// main.ts
import '@nuke.dev/design-system/dist/core.js';
```

```html
<!-- component.html -->
<nuke-card>
  <nuke-card-header>Angular + Nuke</nuke-card-header>
  <nuke-card-content>
    <button>Click me</button>
  </nuke-card-content>
</nuke-card>
```

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern mobile browsers

**Requires:** ES6 modules support (for web components)

---

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/nuke-studios/nuke-design-system
cd nuke-design-system

# Start Docker container
docker-compose up -d

# Enter container
docker-compose exec bun bash

# Install dependencies
bun install
```

### Build

```bash
# Build library (outputs to dist/)
bun run build

# What gets built:
# - dist/core.css      - Bundled styles (all @imports resolved)
# - dist/core.js       - Bundled web components
# - dist/types/        - TypeScript definitions
# - dist/nuke-theme/   - Extracted theme files (flat structure)
```

### Documentation Site

```bash
# Start Astro dev server
bun run docs:dev

# Visit http://localhost:4321
# Live component examples and documentation
```

### File Structure

```
nuke-design-system/
├── core/                   # Source files
│   ├── button/
│   │   ├── button.core.css    # Styling logic
│   │   ├── button.theme.css   # Design tokens
│   │   └── button.docs.html   # Documentation (optional)
│   └── badge/
│       ├── badge.core.css
│       ├── badge.core.ts      # Web component (Lit)
│       └── badge.theme.css
│
├── dist/                   # Build output (published to npm)
│   ├── core.css           # Bundled (all imports resolved)
│   ├── core.js            # Bundled web components
│   ├── types/             # TypeScript definitions
│   └── nuke-theme/        # Extracted theme (flat)
│       ├── theme.css          # Entry point
│       ├── foundation.theme.css
│       ├── button.theme.css
│       └── ...
│
├── docs/                   # Astro documentation site
│   ├── src/pages/
│   └── public/             # Symlinks to dist/
│
└── scripts/
    ├── bundle-core-css.js  # Bundles CSS
    └── build-theme.js      # Extracts theme
```

### Tech Stack

- **Build:** Bun + TypeScript
- **Components:** Lit (web components)
- **Docs:** Astro (static site generator)
- **Container:** Docker (with Bun image)

---

## License

MIT

---

## Links

- **Repository:** [github.com/nuke-studios/nuke-design-system](https://github.com/nuke-studios/nuke-design-system)
- **Issues:** [Report a bug](https://github.com/nuke-studios/nuke-design-system/issues)
- **npm:** [@nuke.dev/design-system](https://www.npmjs.com/package/@nuke.dev/design-system)

---

**Built by [@nuke-studios](https://github.com/nuke-studios)** | Three design systems. One framework. Your choice.
