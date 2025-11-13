import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Nuke Badge Component
 * Inline labels/tags/counters
 * Usage: <nuke-badge style="1|2|3">Content</nuke-badge>
 */
@customElement('nuke-badge')
export class NukeBadge extends LitElement {
  @property({ type: String, reflect: true }) variant = '1';

  // Render in Light DOM (no Shadow DOM)
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'status');
  }

  render() {
    return html`<slot></slot>`;
  }
}
