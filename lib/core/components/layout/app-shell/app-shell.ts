import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * App Shell - Main layout wrapper
 * Usage: <nuke-app-shell collapsed>...</nuke-app-shell>
 */
@customElement('nuke-app-shell')
export class NukeAppShell extends LitElement {
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

@customElement('nuke-app-shell-main')
export class NukeAppShellMain extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}
