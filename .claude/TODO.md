# TODO - Nuke Design System (v2.0)

## 🎯 CURRENT STATUS

**v2.1 - Clean Refactor COMPLETE!** ✅

**What's Done:**
- ✅ Lit + TypeScript setup (Bun, Docker, tsconfig.json)
- ✅ All 6 web components migrated to Lit/TypeScript
- ✅ Build pipeline working (TS → JS, CSS copying, type definitions)
- ✅ Core folder restructured (foundation files at root)
- ✅ **Renamed `style` → `nuke-style` everywhere** (CSS + HTML + TypeScript)
- ✅ **Replaced `variant` with `nukeStyle` property** (all Lit components)
- ✅ **Moved `scripts/` → `.scripts/`** (cleaner project structure)
- ✅ **Fixed CSS bundler** (skips @import in comments, no warnings)
- ✅ **Cleaned all leftovers** (zen/soft/solid removed, counters renamed)
- ✅ **Astro docs setup** with live symlinks to dist/
- ✅ **One node_modules** at root (docs/node_modules gitignored)
- ✅ Theme extraction architecture finalized
- ✅ User import pattern decided (theme.css includes core.css)

**Ready For:**
- 🎯 **USE IT IN REAL PROJECTS** (two projects waiting!)
- 🎯 Battle-test the system
- 🎯 Find rough edges through real usage

---

## 📦 BEFORE NPM PUBLISH

### Documentation
- [ ] Update README.md with Lit migration info
- [ ] Document build process for contributors
- [ ] Add "Why Nuke?" section (killer features)
- [ ] Installation quickstart (extract theme workflow)
- [ ] Framework integration examples (React, Vue, Angular, Svelte)

### Package Configuration
- [ ] Update package.json `main` field: `dist/core.css`
- [ ] Update package.json `module` field: `dist/core.js`
- [ ] Update package.json `types` field: `dist/types/index.d.ts`
- [ ] Update package.json `exports` for proper import paths
- [ ] Add `files` field: only ship `dist/` folder
- [ ] Test with `npm link` locally
- [ ] Verify postinstall script works with new structure

### Postinstall Script
- [ ] Update scripts/postinstall.js to extract from dist/
- [ ] Test theme extraction to nuke-theme/
- [ ] Verify theme.css path adjustment prompt
- [ ] Test extracted theme imports work

### Build Polish
- [ ] Add `build:watch` script for development
- [ ] Consider adding sourcemaps for debugging
- [ ] Verify TypeScript strict mode catches errors
- [ ] Test build in CI environment (not just Docker)

---

## 🚀 SHIP IT (Use in Real Projects)

### Project 1: [Name TBD]
- [ ] Install Nuke locally via npm link
- [ ] Extract theme, customize tokens
- [ ] Build forms, UI components
- [ ] Note pain points, missing features
- [ ] Fix issues found

### Project 2: [Name TBD]
- [ ] Same process as Project 1
- [ ] Compare approaches between projects
- [ ] Identify common patterns
- [ ] Refine based on learnings

### Iterate Based on Real Usage
- [ ] Track issues found in real projects
- [ ] Add missing components if needed
- [ ] Refine theme tokens based on actual use
- [ ] Update documentation with real examples

---

## 🎨 OPTIONAL POLISH (Post Real-World Validation)

### Browser Testing
- [ ] Chrome/Firefox/Safari/Edge (desktop)
- [ ] iOS Safari / Android Chrome (mobile)
- [ ] Test responsive behavior
- [ ] Verify web components work everywhere

### Accessibility Audit
- [ ] Keyboard navigation (tab order, focus management)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] WCAG AA color contrast check
- [ ] ARIA attributes correctness
- [ ] Focus indicators visible

### Additional Themes
- [ ] Dark mode refinement (already exists, test thoroughly)
- [ ] High contrast theme variant
- [ ] Consider community-contributed themes

### Performance
- [ ] Bundle size analysis (core.js, core.css)
- [ ] Consider code splitting if needed
- [ ] Lazy loading for web components?
- [ ] Runtime performance (Lighthouse)

---

## 🔮 FUTURE ENHANCEMENTS (v3.0+)

### Additional Components (Only If Needed)
- [ ] `<nuke-tooltip>` - Positioned tooltips with Popover API
- [ ] `<nuke-dropdown>` - Dropdown menus (beyond native select)
- [ ] `<nuke-modal>` - Enhanced dialog with backdrop
- [ ] `<nuke-accordion>` - Multi-item accordion (beyond details)
- [ ] `<nuke-datepicker>` - Date selection (if really needed)

**Rule:** Only add if 2+ real projects need it. No bloat.

### Developer Experience
- [ ] VS Code snippets for Nuke components
- [ ] Figma design tokens export/import
- [ ] Theme generator tool (GUI for customizing tokens)
- [ ] CLI for scaffolding new components

### Community
- [ ] CONTRIBUTING.md guidelines
- [ ] Issue templates (bug, feature request)
- [ ] PR template with checklist
- [ ] Code of conduct
- [ ] Discord/Discussions for support

---

## 🗂️ TECHNICAL DEBT / CLEANUP

### Code Quality
- [ ] Lint CSS files (stylelint?)
- [ ] Format code consistently (Prettier)
- [ ] Add JSDoc comments to Lit components
- [ ] Review TypeScript strict mode compliance

### Testing (Consider Later)
- [ ] Unit tests for web components (Web Test Runner)
- [ ] Visual regression tests (Percy, Chromatic)
- [ ] Integration tests for theme extraction
- [ ] E2E tests for demo app

### CI/CD
- [ ] GitHub Actions workflow (build on push)
- [ ] Auto-publish to npm on tag
- [ ] Auto-deploy demo to GitHub Pages
- [ ] Dependabot for dependency updates

---

## 📝 NOTES & DECISIONS

### Locked Decisions (Don't Change)
- ✅ Lit for web components (TypeScript, reactive properties)
- ✅ Light DOM rendering (no Shadow DOM)
- ✅ Bun for builds (fast, all-in-one)
- ✅ Docker for consistent environment
- ✅ Extracted theme architecture (killer feature)
- ✅ Three design philosophies (theme="1/2/3")
- ✅ Native-first approach (20 elements + 6 components)

### Open Questions (Decide Based on Real Usage)
- **Theme naming:** Stick with theme="1/2/3" or name them? (minimal, subtle, all-in)
- **Component additions:** Wait for 2+ projects to need them first
- **Documentation site:** Build later or use GitHub README + demo?
- **npm publish timing:** After 1 project or after 2?

---

## 🎯 SUCCESS METRICS

**v2.0 is successful when:**
- ✅ Used in 2+ real projects without major issues
- ✅ Theme extraction workflow is smooth
- ✅ Build process is reliable
- ✅ Documentation is clear enough for strangers to use
- ✅ Published to npm with >0 downloads :)

**Then consider:**
- Blog post about killer features (extracted theme architecture)
- Twitter/social announcement
- Submit to design system showcases
- Hacker News post (maybe)

---

## ✅ COMPLETED (v2.2 - No Docker, Native Bun)

### Build System Refactor
- ✅ Refactored `dist/` structure (flat, clean)
  - `dist/core.css` - Bundled (all imports resolved)
  - `dist/core.js` - Bundled web components
  - `dist/types/` - TypeScript definitions
  - `dist/nuke-theme/` - Flat theme files (no subfolders)
- ✅ Created `.scripts/bundle-core-css.js` (resolves @import recursively)
- ✅ Created `.scripts/build-theme.js` (extracts theme to dist/nuke-theme/)
- ✅ Created `.scripts/copy-to-docs.js` (copies dist/ to docs/public/)
- ✅ Created `.scripts/watch.js` (watches core/ and auto-rebuilds)
- ✅ Updated build pipeline in package.json
- ✅ Build no longer deletes dist/ (updates files in place)

### Astro Documentation Site
- ✅ Set up Astro in `docs/` folder
- ✅ Added Astro to devDependencies
- ✅ Created `docs:dev` and `docs:build` scripts
- ✅ Working demo page with styled buttons

### Docker Removal & Native Bun Setup
- ✅ Removed docker-compose.yml
- ✅ Removed symlinks from docs/public/
- ✅ Added copy-to-docs.js for dev workflow
- ✅ Updated Astro config (removed Docker polling)
- ✅ Updated .gitignore (ignore copied files in docs/public/)
- ✅ Updated PROJECT.md (removed Docker references)

### Developer Experience
- ✅ Native Bun workflow (no Docker overhead)
- ✅ HMR works perfectly (no polling issues)
- ✅ Two terminals: `build:watch` + `docs:dev`
- ✅ Clean separation: library build vs docs site

---

## 🚦 NEXT SESSION PRIORITIES

1. **Rename `style` → `theme`** (CSS selectors + HTML attributes)
2. **Expand Astro docs** (add more component examples)
3. **Test build output** in real project
4. **Use in first real project** (battle-test immediately)

**Stop perfecting. Start using. Iterate based on reality.** 🚀
