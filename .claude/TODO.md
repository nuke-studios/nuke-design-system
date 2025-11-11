# TODO - Nuke Design System

## ✅ COMPLETED - v0.9 Release (Native Elements Done!)

### Project Renamed ✅ DONE
- **Was:** Stark UI
- **Now:** Nuke Design System (@nuke-ds)
- All references updated across codebase
- Demo files updated
- Documentation updated

### Clean Architecture ✅ DONE
**Final folder structure (crystal clear naming):**

```
core/
├── base/                    ← Browser resets & animations
│   ├── reset.css
│   ├── scrollbars.css
│   └── animations.css
├── text/                    ← Basic text (no variants)
│   └── typography.css       (h1-h6, p, blockquote, lists, strong, em, small)
├── helpers/
│   └── scroll-lock.css
└── elements/                ← FLAT - All 28 native elements with .style-1/2/3
    ├── button.css
    ├── input.css
    ├── select.css
    ├── textarea.css
    ├── checkbox.css
    ├── radio.css
    ├── label.css
    ├── fieldset.css
    ├── progress.css
    ├── meter.css
    ├── range.css
    ├── form.css
    ├── a.css
    ├── dialog.css
    ├── details.css
    ├── nav.css
    ├── table.css
    ├── ul.css
    ├── ol.css
    ├── hr.css
    ├── code.css
    ├── pre.css
    ├── img.css
    ├── main.css
    ├── header.css
    ├── footer.css
    └── section.css

theme/
├── base/                    ← Global design tokens
│   ├── colors.css
│   ├── spacing.css
│   ├── sizing.css
│   ├── transitions.css
│   ├── shadows.css
│   ├── borders.css
│   └── typography.css
└── elements/                ← FLAT - Mirrors core/elements/
    └── (28 element variable files)
```

**Total: 70 CSS files (34 core + 36 theme)**

**Folder naming rationale:**
- `base/` = Global primitives (not vague "foundation")
- `text/` = Typography only (clear purpose)
- `elements/` = Native HTML (not vague "ui")
- `components/` = Web components (future)

### 28 Production-Ready Native Elements ✅ DONE

**Deleted niche/unused elements:**
- ❌ abbr, kbd, mark, menu (too niche)
- ❌ dl (never used, replaced with ul/ol)
- ❌ figure (nobody uses it)
- ❌ video, audio (edge cases)
- ❌ article, aside (semantic abuse - not for cards/sidebars)

**Current native elements (28 total):**

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

### Demos ✅ DONE
- ✅ index.html - Comprehensive demo of all 28 native elements
- ✅ demo-2025.html - Web component proof of concept (nuke-card, nuke-toolbar, nuke-badge)
- ✅ All emoji icons removed (professional appearance)
- ✅ Semantic HTML correctness enforced

---

## 🎯 NEXT - Web Components (v1.0)

### Decision Made: Custom Elements Approach

**Why web components:**
- Structure enforcement (can't misuse `<nuke-card>`)
- Self-documenting HTML
- Saves time in prototyping/building (real-world experience)
- Framework independent
- Same universal `style="1/2/3"` pattern

**Why NOT just utility classes:**
- No structure enforcement
- Easy to misuse
- More verbose HTML
- Less semantic

### Priority 1: Core Components for Prototyping

**Build these FIRST (most used in real projects):**

**1. Card Component** 🔥 CRITICAL
```html
<nuke-card style="1">
  <nuke-card-header>Title</nuke-card-header>
  <nuke-card-content>Your content</nuke-card-content>
  <nuke-card-actions>
    <button>Cancel</button>
    <button>Save</button>
  </nuke-card-actions>
</nuke-card>
```
- [ ] Create `components/nuke-card.js` (registration)
- [ ] Create `core/components/card.css` (styling logic)
- [ ] Create `theme/components/card.css` (variables)
- [ ] Add to index.html demo
- [ ] Variants: style="1" (standard), style="2" (elevated), style="3" (bordered)

**2. Toolbar Component** 🔥 CRITICAL
```html
<nuke-toolbar style="1">
  <button>New</button>
  <button>Edit</button>
  <button>Delete</button>
</nuke-toolbar>
```
- [ ] Create `components/nuke-toolbar.js`
- [ ] Create `core/components/toolbar.css`
- [ ] Create `theme/components/toolbar.css`
- [ ] Add to demo
- [ ] Variants: style="1" (standard), style="2" (bordered), style="3" (sticky)

**3. Badge Component**
```html
<nuke-badge style="1">New</nuke-badge>
<nuke-badge style="2">12</nuke-badge>
```
- [ ] Create `components/nuke-badge.js`
- [ ] Create `core/components/badge.css`
- [ ] Create `theme/components/badge.css`
- [ ] Add to demo
- [ ] Variants: style="1" (solid), style="2" (subtle), style="3" (outlined)

**4. Tabs Component**
```html
<nuke-tabs>
  <nuke-tab>Tab 1</nuke-tab>
  <nuke-tab>Tab 2</nuke-tab>
  <nuke-tab-panel>Content 1</nuke-tab-panel>
  <nuke-tab-panel>Content 2</nuke-tab-panel>
</nuke-tabs>
```
- [ ] Create `components/nuke-tabs.js` (with keyboard navigation)
- [ ] Create `core/components/tabs.css`
- [ ] Create `theme/components/tabs.css`
- [ ] Add to demo
- [ ] Variants: style="1" (underline), style="2" (pills), style="3" (boxed)

### Priority 2: Supporting Components

**5. Sidebar Component**
- [ ] `<nuke-sidebar>` for navigation panels
- [ ] Variants: style="1" (standard), style="2" (bordered), style="3" (minimal)

**6. Tooltip Component**
- [ ] `<nuke-tooltip>` with positioning
- [ ] Use popover API internally (with fallback)
- [ ] Variants: style="1" (dark), style="2" (light), style="3" (subtle)

### Technical Implementation Pattern

**For each component:**

1. **JavaScript (components/nuke-{name}.js):**
   - Minimal registration (~10 lines)
   - No Shadow DOM (keep CSS customizable)
   - ARIA roles for accessibility
   - Keyboard navigation if needed
   - Example:
   ```javascript
   class NukeCard extends HTMLElement {
     connectedCallback() {
       this.setAttribute('role', 'article');
     }
   }
   customElements.define('nuke-card', NukeCard);
   ```

2. **Core CSS (core/components/{name}.css):**
   - Uses variables, never defines them
   - Styling logic only
   - Support for style="1/2/3" variants
   - All states (:hover, :focus, etc.)

3. **Theme CSS (theme/components/{name}.css):**
   - Variables only
   - References base/ tokens
   - Defines all customization points

4. **Demo (index.html):**
   - Show all 3 variants
   - Real-world usage examples
   - Prove it works

### File Structure After Web Components

```
nuke-ds/
├── core/
│   ├── base/
│   ├── text/
│   ├── elements/          (28 native elements)
│   ├── components/        ← NEW (4-6 web component styles)
│   │   ├── card.css
│   │   ├── toolbar.css
│   │   ├── badge.css
│   │   └── tabs.css
│   └── all.css            (updated to include components/)
│
├── theme/
│   ├── base/
│   ├── elements/
│   ├── components/        ← NEW (4-6 web component variables)
│   │   ├── card.css
│   │   ├── toolbar.css
│   │   ├── badge.css
│   │   └── tabs.css
│   └── all.css            (updated to include components/)
│
└── components/            ← NEW (4-6 JS files)
    ├── nuke-card.js
    ├── nuke-toolbar.js
    ├── nuke-badge.js
    ├── nuke-tabs.js
    └── all.js             (imports all components)
```

**Import pattern for users:**
```html
<!-- CSS (theme + core) -->
<link rel="stylesheet" href="nuke-theme/all.css">
<link rel="stylesheet" href="@nuke-ds/core/all.css">

<!-- Web components (optional) -->
<script type="module" src="@nuke-ds/components/all.js"></script>
```

---

## 🎯 PRIORITY 3 - Distribution (After Web Components)

### npm Package Setup

**Package 1: @nuke-ds/core**
- [ ] Create `package.json`
  - Name: @nuke-ds/core
  - Version: 1.0.0
  - Entry point: all.css
  - Files: base/, text/, elements/, components/, helpers/, all.css
  - Exclude: theme/
- [ ] Create postinstall script
  - Copy theme/ to project root as `nuke-theme/`
  - Optional: CLI prompt for custom location
- [ ] Create `.npmignore` (exclude .claude/, index.html, demo-2025.html, style.css)
- [ ] Test locally with `npm link`
- [ ] Verify postinstall works correctly

**Package 2: @nuke-ds/components**
- [ ] Create `package.json`
  - Name: @nuke-ds/components
  - Version: 1.0.0
  - Entry point: all.js
  - Files: nuke-card.js, nuke-toolbar.js, etc.
  - Peer dependency: @nuke-ds/core
- [ ] Test locally with `npm link`
- [ ] Verify imports work correctly

---

## 🎯 PRIORITY 4 - Documentation

### README.md
- [ ] Write README.md
  - Project description
  - Installation instructions (npm + manual)
  - Quick start guide
  - Link to demo (index.html)
  - Core philosophy explanation
  - Universal .style-1/2/3 pattern
  - Web components usage
  - Customization guide

### Design Token Documentation
- [ ] Document all design tokens
  - What each variable controls
  - How to customize
  - Theme file reference
  - Examples for common use cases

### Framework Integration
- [ ] Document Angular integration
  - CUSTOM_ELEMENTS_SCHEMA setup
  - Import pattern
  - Example component usage
- [ ] Document React integration
  - Custom element usage in JSX
  - Event handling
- [ ] Document Vue integration
  - Custom element registration
  - v-model support (if needed)

### Contributing Guide
- [ ] Create `CONTRIBUTING.md`
  - How to add new native elements
  - How to add new web components
  - Variable naming conventions
  - Testing guidelines
  - File structure explanation

---

## 🎯 PRIORITY 5 - Testing & Polish

### Browser Compatibility
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Test web components in all browsers
- [ ] Test popover fallback (demo-2025.html)

### Mobile Testing
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive behavior
- [ ] Touch interactions

### Accessibility Audit
- [ ] Keyboard navigation (all interactive elements)
- [ ] Screen reader compatibility
- [ ] Focus indicators (visible and clear)
- [ ] Color contrast (WCAG AA minimum)
- [ ] ARIA roles on web components
- [ ] Tab interface keyboard support

### Themes
- [ ] Create dark mode theme example
  - `theme/dark-colors.css` variant
  - Document how to switch themes
  - Test all elements in dark mode
- [ ] Create high contrast theme (accessibility)

---

## 🎯 FUTURE EXPLORATION (v2.0+)

### Advanced Components
- [ ] `<nuke-dropdown>` - Dropdown menus (beyond native select)
- [ ] `<nuke-modal>` - Enhanced dialog with backdrop
- [ ] `<nuke-accordion>` - Multi-item accordion (beyond details)
- [ ] `<nuke-toast>` - Toast notifications
- [ ] `<nuke-drawer>` - Slide-in panels

### Advanced Features
- [ ] CSS Grid utilities (optional add-on)
- [ ] Responsive typography system
- [ ] Animation utilities library
- [ ] Print styles
- [ ] RTL language support
- [ ] Icon library integration (Lucide, Heroicons)

### Tooling
- [ ] VS Code extension (autocomplete for .style-1/2/3)
- [ ] Figma design kit
- [ ] Theme generator CLI
- [ ] Migration tool (from other frameworks)

---

## 📝 CURRENT STATUS

**What works RIGHT NOW (v0.9):**
- ✅ Open `index.html` in any modern browser
- ✅ All 28 native elements render perfectly
- ✅ All .style-1/2/3 variants work
- ✅ Design tokens demonstrated
- ✅ Real-world architecture proven
- ✅ Clean, semantic HTML structure
- ✅ Professional appearance (no emoji clutter)
- ✅ Renamed to Nuke Design System
- ✅ Clear folder structure (base/text/elements)

**What's ready for users:**
- ✅ Clean, production-ready CSS (70 files)
- ✅ Comprehensive native element coverage (28 elements)
- ✅ Clear separation of concerns (base/text/elements)
- ✅ Easy customization through theme
- ✅ Educational demo page
- ✅ Semantically correct HTML

**What's needed for v1.0 release:**
- ⏳ Web components (card, toolbar, badge, tabs)
- ⏳ npm package configuration
- ⏳ README with installation docs
- ⏳ Basic testing across browsers

**Current focus:**
- 🔥 Build web components (starting with card)
- 🔥 Test in real projects
- 🔥 Iterate based on actual usage

---

## 🎉 KEY DECISIONS LOCKED IN

### Architecture ✅
- base/ = Global resets, animations, design tokens
- text/ = Basic typography (no variants)
- elements/ = FLAT structure, all 28 native elements with .style-1/2/3
- components/ = Web components for complex patterns
- Theme mirrors core structure
- Import order: theme FIRST, then core

### Naming ✅
- Variables: `--color-1`, `--button-height`, `--button-style-1-bg`
- Classes: `.style-1`, `.style-2`, `.style-3` (universal)
- Components: `<nuke-card>`, `<nuke-toolbar>`, etc.
- Attributes: `style="1/2/3"` (same universal pattern)
- Files: `{element}.css`, `{token}.css`, `nuke-{name}.js`

### Distribution ✅
- npm packages: `@nuke-ds/core`, `@nuke-ds/components`
- Postinstall copies theme to project
- Users customize theme freely
- Updates never overwrite theme

### Philosophy ✅
- Element-first (native HTML works without classes)
- Universal pattern (same classes, different meanings)
- Native APIs first (dialog, details, popover)
- Web components for structure enforcement (card, toolbar, etc.)
- Minimal JavaScript (only for web components)
- No build tools required
- Semantically correct HTML (no abuse of semantic tags)
- Building for personal use first, sharing second

---

## 🎯 RECOMMENDED NEXT SESSION

**Start building web components:**

1. **Create folder structure:**
   - `core/components/`
   - `theme/components/`
   - `components/`

2. **Build `<nuke-card>` first** (most critical):
   - `components/nuke-card.js` (registration)
   - `core/components/card.css` (styling)
   - `theme/components/card.css` (variables)
   - Add demo to index.html
   - Test in real usage

3. **Build remaining priority components:**
   - nuke-toolbar
   - nuke-badge
   - nuke-tabs

4. **Use in real project:**
   - Actually build something with Nuke
   - Find what's missing
   - Iterate based on real needs

**Remember:** You're building for YOURSELF. Don't overthink it. Just build what you need as you need it.

---

## 💡 SESSION SUMMARY (What We Did Today)

**Major accomplishments:**
1. ✅ Renamed entire project: Stark UI → Nuke Design System
2. ✅ Reorganized folder structure for clarity:
   - foundation/ → base/ (no more vague English buzzwords!)
   - base/ → text/ (clear purpose)
   - ui/ → elements/ (native HTML elements)
3. ✅ Updated all import paths in core/all.css and theme/all.css
4. ✅ Updated all documentation (PROJECT.md, TODO.md)
5. ✅ Updated demo files (index.html, demo-2025.html)
6. ✅ Made decision: Web components for complex patterns (card, toolbar, etc.)
7. ✅ Clarified philosophy: Building for personal use, sharing is bonus

**Key insights from discussion:**
- "Design tokens" = just CSS variables (buzzword exposed!)
- Native popover needs JS positioning anyway (not really "native")
- Custom elements make sense for structure enforcement
- Shoelace exists but Nuke is different (element-first, smaller scope, personal toolkit)
- Universal .style-1/2/3 pattern is genuinely unique
- German brain appreciates clear, non-buzzword folder names

**Next up:**
- Build web components (card first!)
- Use in real projects
- Iterate based on actual needs

**Have a good evening! 🚀**
