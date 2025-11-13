import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Nuke Card Component
 * A content container with enforced structure
 * Usage: <nuke-card nuke-style="1|2|3">
 */
@customElement('nuke-card')
export class NukeCard extends LitElement {
  @property({ type: String, reflect: true, attribute: 'nuke-style' }) nukeStyle = '1';

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'article');
  }

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('nuke-card-header')
export class NukeCardHeader extends LitElement {
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'heading');
    this.setAttribute('aria-level', '2');
  }

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('nuke-card-content')
export class NukeCardContent extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('nuke-card-actions')
export class NukeCardActions extends LitElement {
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    this.setAttribute('aria-label', 'Card actions');
  }

  render() {
    return html`<slot></slot>`;
  }
}
