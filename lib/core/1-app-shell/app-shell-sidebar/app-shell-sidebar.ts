import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * App Shell Sidebar - Layout with sidebar + content area
 * Usage: <nuke-app-shell-sidebar collapsed>...</nuke-app-shell-sidebar>
 */
@customElement('nuke-app-shell-sidebar')
export class NukeAppShellSidebar extends LitElement {
  @property({ type: Boolean, reflect: true }) collapsed = false;

  createRenderRoot() {
    return this;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('collapse-change', {
      detail: { collapsed: this.collapsed },
      bubbles: true
    }));
  }

  render() {
    return html`<slot></slot>`;
  }
}
