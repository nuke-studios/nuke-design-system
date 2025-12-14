import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Accordion - Collapsible section
 * Usage: <nuke-accordion expanded>...</nuke-accordion>
 */
@customElement('nuke-accordion')
export class NukeAccordion extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = false;

  createRenderRoot() {
    return this;
  }

  toggle() {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { expanded: this.expanded },
      bubbles: true
    }));
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this._handleClick);
  }

  private _handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'NUKE-ACCORDION-HEADER' || target.closest('nuke-accordion-header')) {
      this.toggle();
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}
