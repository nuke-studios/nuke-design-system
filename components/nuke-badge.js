/**
 * Nuke Badge Component
 * Inline labels/tags/counters
 * Usage: <nuke-badge style="1|2|3">
 */

class NukeBadge extends HTMLElement {
  connectedCallback() {
    // Set ARIA role for accessibility
    this.setAttribute('role', 'status');

    // Default to style 1 if not set
    if (!this.hasAttribute('style')) {
      this.setAttribute('style', '1');
    }
  }
}

// Register custom element
customElements.define('nuke-badge', NukeBadge);
