/**
 * Nuke Toolbar Component
 * Action button groups for layouts
 * Usage: <nuke-toolbar style="1|2|3">
 */

class NukeToolbar extends HTMLElement {
  connectedCallback() {
    // Set ARIA role for accessibility
    this.setAttribute('role', 'toolbar');
    this.setAttribute('aria-label', 'Action toolbar');

    // Default to style 1 if not set
    if (!this.hasAttribute('style')) {
      this.setAttribute('style', '1');
    }
  }
}

// Register custom element
customElements.define('nuke-toolbar', NukeToolbar);
