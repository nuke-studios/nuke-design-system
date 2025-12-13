import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Mobile Nav - Full-screen overlay navigation
 * Usage: <nuke-mobile-nav open>...</nuke-mobile-nav>
 */
@customElement('nuke-mobile-nav')
export class NukeMobileNav extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  createRenderRoot() {
    return this;
  }

  show() {
    this.open = true;
    document.body.classList.add('no-scroll');
  }

  hide() {
    this.open = false;
    document.body.classList.remove('no-scroll');
  }

  toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * Mobile Nav Item - Expandable nav item
 */
@customElement('nuke-mobile-nav-item')
export class NukeMobileNavItem extends LitElement {
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
