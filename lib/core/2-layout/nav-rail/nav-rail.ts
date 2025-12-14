import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Nav Rail Item - Individual navigation item with optional expandable sub-items
 * Usage: <nuke-nav-rail-item expandable expanded>...</nuke-nav-rail-item>
 */
@customElement('nuke-nav-rail-item')
export class NukeNavRailItem extends LitElement {
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

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  private _handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    // Only toggle if clicking on the main item, not sub-items
    if (target.closest('nuke-nav-rail-subitems')) return;

    if (this.expandable) {
      this.expanded = !this.expanded;
      this.dispatchEvent(new CustomEvent('toggle', {
        detail: { expanded: this.expanded },
        bubbles: true
      }));
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}
