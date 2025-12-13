import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Cache fetched icons
const iconCache = new Map<string, string>();

/**
 * Nuke Icon Component
 * Loads SVG icons from /dist/icons/
 * Usage: <nuke-icon name="house"></nuke-icon>
 */
@customElement('nuke-icon')
export class NukeIcon extends LitElement {
  @property({ type: String }) name = '';

  // Base path for icons - can be overridden
  static basePath = '/dist/icons';

  createRenderRoot() {
    return this;
  }

  async updated() {
    if (!this.name) return;

    // Check cache first
    if (iconCache.has(this.name)) {
      this.innerHTML = iconCache.get(this.name)!;
      return;
    }

    try {
      const res = await fetch(`${NukeIcon.basePath}/${this.name}.svg`);
      if (!res.ok) throw new Error(`Icon not found: ${this.name}`);

      const svg = await res.text();
      iconCache.set(this.name, svg);
      this.innerHTML = svg;
    } catch (e) {
      console.warn(`nuke-icon: ${e}`);
    }
  }
}
