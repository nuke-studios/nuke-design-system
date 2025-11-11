# UNA Theme Kit

A minimal, variable-driven CSS theme kit for building accessible and customizable web interfaces.

## 📚 Documentation

**Visit the full documentation site:** [https://c-heer.github.io/una-theme-kit/](https://c-heer.github.io/una-theme-kit/)

The documentation includes:
- Interactive Getting Started guide
- Complete variables reference
- Live examples and demos
- Best practices for customization

## Quick Links

- **Package:** [@heer.dev/una-theme-kit](https://www.npmjs.com/package/@heer.dev/una-theme-kit)
- **Documentation:** [https://c-heer.github.io/una-theme-kit/](https://c-heer.github.io/una-theme-kit/)
- **Repository:** [https://github.com/c-heer/una-theme-kit](https://github.com/c-heer/una-theme-kit)

## Features

- 🎨 **CSS Variable-Driven** - Customize everything through CSS custom properties
- 🌓 **Light & Dark Themes** - Built-in theme support with easy switching
- ♿ **Accessibility First** - Semantic HTML, proper contrast, respects motion preferences
- 📦 **Lightweight** - Under 10KB, zero dependencies
- 🎯 **Framework Agnostic** - Works with React, Vue, Angular, or plain HTML
- 🚀 **Modern CSS** - Fluid typography, custom scrollbars, smooth animations

## Installation

```bash
npm install @heer.dev/una-theme-kit
```

Or via CDN:

```html
<link rel="stylesheet" href="https://unpkg.com/@heer.dev/una-theme-kit/css/base.css">
```

## Quick Start

1. Import the CSS:
```css
@import '@heer.dev/una-theme-kit/css/base.css';
```

2. Add a theme class to your HTML:
```html
<body class="light">
  <!-- Your content -->
</body>
```

3. Use the CSS variables:
```css
.my-component {
  background: var(--background-2);
  color: var(--on-background);
  padding: var(--space-2);
}
```

For detailed setup instructions and examples, visit the [documentation site](https://c-heer.github.io/una-theme-kit/).

## Development

This repository contains:

- **CSS Package** (`/workspace/projects/una-theme-kit/`) - The published CSS theme kit
- **Documentation App** (`/workspace/projects/una-theme-kit-demo-app/`) - Angular documentation site

### Local Development

```bash
# Install dependencies
cd workspace
npm install

# Start development server
npm start

# Build for production
npm run build

# Build documentation for GitHub Pages
npm run build -- --configuration=github-pages
```

### Deployment

- **npm Package:** Automatically published on version tags via GitHub Actions
- **Documentation Site:** Automatically deployed to GitHub Pages on push to main

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment information.

## Project Structure

```
una-theme-kit/
├── .github/
│   └── workflows/
│       ├── publish.yml       # npm publishing workflow
│       └── deploy-docs.yml   # GitHub Pages deployment
├── workspace/
│   └── projects/
│       ├── una-theme-kit/          # CSS package source
│       │   └── css/
│       │       ├── base.css
│       │       └── starter.css
│       └── una-theme-kit-demo-app/ # Documentation Angular app
├── DEPLOYMENT.md             # Deployment documentation
└── README.md                 # This file
```

## License

MIT

---

**Created by [@c-heer](https://github.com/c-heer)** | [Report Issues](https://github.com/c-heer/una-theme-kit/issues)
