import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * App Shell Stacked - Vertical header/main/footer layout
 * Usage: <nuke-app-shell-stacked centered>...</nuke-app-shell-stacked>
 */
@customElement('nuke-app-shell-stacked')
export class NukeAppShellStacked extends LitElement {
  @property({ type: Boolean, reflect: true }) centered = false;

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}
