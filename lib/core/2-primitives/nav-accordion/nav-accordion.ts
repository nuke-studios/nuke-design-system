import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Nav Accordion - Vertical navigation with expandable items
 * Usage: <nuke-nav-accordion>...</nuke-nav-accordion>
 */
@customElement('nuke-nav-accordion')
export class NukeNavAccordion extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * Nav Accordion Item - Expandable nav item
 */
@customElement('nuke-nav-accordion-item')
export class NukeNavAccordionItem extends LitElement {
  @property({ type: Boolean, reflect: true }) expandable = false;
  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: Boolean, reflect: true }) active = false;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.expandable) {
      this.addEventListener('click', this._handleClick);
    }
  }

  private _handleClick = (e: Event) => {
    if (this.expandable) {
      e.preventDefault();
      this.expanded = !this.expanded;
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}
