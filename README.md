# Nuke Design System

One unit. One ratio. Everything scales.

## Workspace Structure

```
nuke-design-system/
├── package.json        # Workspace root
├── lib/                # Design system package (@nuke.dev/design-system)
│   ├── core/           # Source: tokens, SCSS, web components
│   └── dist/           # Built: core.css, core.js
└── frontend/           # Documentation app (Svelte 5)
    └── src/
```

## Quick Start

```bash
# Install all dependencies (run from root)
npm install

# Build the lib
npm run build

# Run frontend dev server
npm run dev:frontend

# Watch lib + frontend together
npm run dev:all
```

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all workspace dependencies |
| `npm run build` | Build lib (CSS + JS) |
| `npm run dev` | Watch lib for changes |
| `npm run dev:frontend` | Run frontend dev server |
| `npm run dev:all` | Watch lib + run frontend |

## How It Works

This repo uses **npm workspaces**. The frontend depends on `@nuke.dev/design-system` which npm symlinks to the local `lib/` folder.

```json
// frontend/package.json
"dependencies": {
  "@nuke.dev/design-system": "*"
}
```

This means:
- Shared dependencies (like `@phosphor-icons/webcomponents`) are installed once at root
- Frontend imports work like a real published package
- Changes to lib are immediately available to frontend after rebuild

## Importing

```js
// JS - web components
import '@nuke.dev/design-system';

// CSS
@import '@nuke.dev/design-system/dist/core.css';
```
