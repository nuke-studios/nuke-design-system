import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Nav Bar Item - Individual nav item with optional dropdown
 * Usage: <nuke-nav-bar-item dropdown>Label<nuke-nav-bar-dropdown>...</nuke-nav-bar-dropdown></nuke-nav-bar-item>
 */
@customElement('nuke-nav-bar-item')
export class NukeNavBarItem extends LitElement {
  @property({ type: Boolean, reflect: true }) dropdown = false;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) active = false;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.dropdown) {
      this.addEventListener('mouseenter', this._handleMouseEnter);
      this.addEventListener('mouseleave', this._handleMouseLeave);
      this.addEventListener('click', this._handleClick);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this._handleMouseEnter);
    this.removeEventListener('mouseleave', this._handleMouseLeave);
    this.removeEventListener('click', this._handleClick);
  }

  private _handleMouseEnter = () => {
    if (this.dropdown) {
      this.open = true;
    }
  };

  private _handleMouseLeave = () => {
    if (this.dropdown) {
      this.open = false;
    }
  };

  private _handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    // If clicking on a dropdown link, close the dropdown
    if (target.closest('nuke-nav-bar-dropdown-item')) {
      this.open = false;
    }
  };

  render() {
    return html`<slot></slot>`;
  }
}
