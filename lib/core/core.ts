/**
 * Nuke Design System - Web Components
 *
 * Import this file to register all web components:
 * import '@nuke.dev/design-system';
 *
 * Icons (Phosphor) - import individually:
 * import '@phosphor-icons/webcomponents/PhHouse';
 * Then use: <ph-house></ph-house>
 */

// 1. Shell
export { NukeAppShellSidebar } from './1-shell/app-shell-sidebar/app-shell-sidebar.js';
export { NukeAppShellStacked } from './1-shell/app-shell-stacked/app-shell-stacked.js';
export { NukeSidebar } from './1-shell/sidebar/sidebar.js';

// 2. Layout
// (pure CSS: nuke-layout, nuke-area, section)

// 3. Primitives

// 3.1 UI
export { NukeAccordion } from './3-primitives/ui/accordion/accordion.js';
export { NukeBadge } from './3-primitives/ui/badge/badge.js';
export { NukeNavAccordion, NukeNavAccordionItem } from './3-primitives/ui/nav-accordion/nav-accordion.js';
export { NukeNavBarItem } from './3-primitives/ui/nav-bar/nav-bar.js';
export { NukeNavRailItem } from './3-primitives/ui/nav-rail/nav-rail.js';
export { NukeToolbar } from './3-primitives/ui/toolbar/toolbar.js';
export { NukeToast } from './3-primitives/ui/toast/toast.js';

// 3.2 Forms
// (pure CSS: button, checkbox, input, label, radio, range, select, textarea)

// Tabs (moved to UI)
export { NukeTabs, NukeTab, NukeTabPanel } from './3-primitives/ui/tabs/tabs.js';

// 3.3 Content
// (pure CSS: headings, paragraph, links, lists, code)
