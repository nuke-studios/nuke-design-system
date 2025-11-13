import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Nuke Toolbar Component
 * Action button groups for layouts
 * Usage: <nuke-toolbar style="1|2|3">
 */
@customElement('nuke-toolbar')
export class NukeToolbar extends LitElement {
  @property({ type: String, reflect: true }) variant = '1';

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'toolbar');
    this.setAttribute('aria-label', 'Action toolbar');
  }

  render() {
    return html`<slot></slot>`;
  }
}
