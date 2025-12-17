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

// 3. Components
export { NukeAccordion } from './3-components/accordion/accordion.js';
export { NukeNavAccordion, NukeNavAccordionItem } from './3-components/nav-accordion/nav-accordion.js';
export { NukeNavBarItem } from './3-components/nav-bar/nav-bar.js';
export { NukeNavRailItem } from './3-components/nav-rail/nav-rail.js';
export { NukeTabs, NukeTab, NukeTabPanel } from './3-components/tabs/tabs.js';
export { NukeToolbar } from './3-components/toolbar/toolbar.js';
export { NukeToast } from './3-components/toast/toast.js';
