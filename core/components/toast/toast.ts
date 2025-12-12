import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Nuke Toast Component
 * Notification messages with auto-dismiss
 * Usage: <nuke-toast nuke-style="1|2|3" duration="3000">Message</nuke-toast>
 * Or programmatically: NukeToast.show('Message', {nukeStyle: '1', duration: 3000})
 */
@customElement('nuke-toast')
export class NukeToast extends LitElement {
  @property({ type: String, reflect: true, attribute: 'nuke-style' }) nukeStyle = '1';
  @property({ type: Number }) duration = 0;

  private dismissTimer: number | null = null;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');

    if (this.duration > 0) {
      this.autoDismiss(this.duration);
    }

    requestAnimationFrame(() => {
      this.classList.add('show');
    });
  }

  autoDismiss(duration: number) {
    this.dismissTimer = window.setTimeout(() => {
      this.dismiss();
    }, duration);
  }

  dismiss() {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }

    this.classList.remove('show');
    this.classList.add('hide');

    setTimeout(() => {
      this.remove();
    }, 300);
  }

  render() {
    return html`
      <slot></slot>
      <button class="toast-close" @click=${this.dismiss} aria-label="Close notification">×</button>
    `;
  }

  // Static helper for programmatic toast creation
  static show(message: string, options: { nukeStyle?: string; duration?: number } = {}) {
    const toast = document.createElement('nuke-toast');

    if (options.nukeStyle) {
      toast.setAttribute('nuke-style', options.nukeStyle);
    }

    if (options.duration !== undefined) {
      toast.setAttribute('duration', options.duration.toString());
    } else {
      toast.setAttribute('duration', '3000');
    }

    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    messageSpan.className = 'toast-message';
    toast.appendChild(messageSpan);

    let container = document.querySelector('.nuke-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'nuke-toast-container';
      document.body.appendChild(container);
    }

    container.appendChild(toast);
    return toast;
  }
}

// Export for programmatic usage
declare global {
  interface Window {
    NukeToast: typeof NukeToast;
  }
}

window.NukeToast = NukeToast;
