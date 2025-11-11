/**
 * Nuke Sidebar Component
 * Collapsible side navigation panel
 * Usage: <nuke-sidebar style="1|2|3" position="left|right">
 */

class NukeSidebar extends HTMLElement {
  connectedCallback() {
    // Set ARIA role
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Sidebar navigation');

    // Default to style 1 if not set
    if (!this.hasAttribute('style')) {
      this.setAttribute('style', '1');
    }

    // Default to left position
    if (!this.hasAttribute('position')) {
      this.setAttribute('position', 'left');
    }

    // Create overlay for style 1 (overlay mode)
    if (this.getAttribute('style') === '1') {
      this.createOverlay();
    }

    // Escape key handler
    this.escapeHandler = (e) => {
      if (e.key === 'Escape' && this.hasAttribute('open')) {
        this.close();
      }
    };

    // Add escape listener when open
    if (this.hasAttribute('open')) {
      document.addEventListener('keydown', this.escapeHandler);
    }
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.escapeHandler);
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'nuke-sidebar-overlay';
    this.overlay.addEventListener('click', () => this.close());

    // Insert overlay before sidebar
    this.parentNode.insertBefore(this.overlay, this);

    // Show overlay if sidebar is open
    if (this.hasAttribute('open')) {
      this.overlay.classList.add('show');
    }
  }

  open() {
    this.setAttribute('open', '');
    document.addEventListener('keydown', this.escapeHandler);

    if (this.overlay) {
      this.overlay.classList.add('show');
    }

    // Emit custom event
    this.dispatchEvent(new CustomEvent('sidebar-open', { bubbles: true }));
  }

  close() {
    this.removeAttribute('open');
    document.removeEventListener('keydown', this.escapeHandler);

    if (this.overlay) {
      this.overlay.classList.remove('show');
    }

    // Emit custom event
    this.dispatchEvent(new CustomEvent('sidebar-close', { bubbles: true }));
  }

  toggle() {
    if (this.hasAttribute('open')) {
      this.close();
    } else {
      this.open();
    }
  }
}

// Register custom element
customElements.define('nuke-sidebar', NukeSidebar);
