import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Nuke Sidebar Component
 * Collapsible side navigation panel
 * Usage: <nuke-sidebar nuke-style="1|2|3" position="left|right">
 */
@customElement('nuke-sidebar')
export class NukeSidebar extends LitElement {
  @property({ type: String, reflect: true, attribute: 'nuke-style' }) nukeStyle = '1';
  @property({ type: String, reflect: true }) position = 'left';
  @property({ type: Boolean, reflect: true }) open = false;

  private overlay: HTMLElement | null = null;
  private escapeHandler: ((e: KeyboardEvent) => void) | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Sidebar navigation');

    // Create overlay for style 1 (overlay mode)
    if (this.nukeStyle === '1') {
      this.createOverlay();
    }

    // Escape key handler
    this.escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.open) {
        this.close();
      }
    };

    if (this.open) {
      document.addEventListener('keydown', this.escapeHandler);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
    }
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'nuke-sidebar-overlay';
    this.overlay.addEventListener('click', () => this.close());

    if (this.parentNode) {
      this.parentNode.insertBefore(this.overlay, this);
    }

    if (this.open) {
      this.overlay.classList.add('show');
    }
  }

  show() {
    this.open = true;
    if (this.escapeHandler) {
      document.addEventListener('keydown', this.escapeHandler);
    }

    if (this.overlay) {
      this.overlay.classList.add('show');
    }

    this.dispatchEvent(new CustomEvent('sidebar-open', { bubbles: true }));
  }

  close() {
    this.open = false;
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
    }

    if (this.overlay) {
      this.overlay.classList.remove('show');
    }

    this.dispatchEvent(new CustomEvent('sidebar-close', { bubbles: true }));
  }

  toggle() {
    if (this.open) {
      this.close();
    } else {
      this.show();
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}
