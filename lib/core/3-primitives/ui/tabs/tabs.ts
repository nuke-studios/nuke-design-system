import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Nuke Tabs Component
 * Tab interface with keyboard navigation
 * Usage: <nuke-tabs nuke-style="1|2|3">
 */
@customElement('nuke-tabs')
export class NukeTabs extends LitElement {
  @property({ type: String, reflect: true, attribute: 'nuke-style' }) nukeStyle = '1';

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tablist');
    this.initializeTabs();
  }

  initializeTabs() {
    const tabs = Array.from(this.querySelectorAll('nuke-tab'));
    const panels = Array.from(this.querySelectorAll('nuke-tab-panel'));

    if (tabs.length === 0 || panels.length === 0) return;

    tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      (tab as any).dataset.index = index;

      tab.addEventListener('click', () => this.selectTab(index));
      tab.addEventListener('keydown', (e) => this.handleKeydown(e as KeyboardEvent, index, tabs.length));
    });

    panels.forEach((panel, index) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
      (panel as any).dataset.index = index;
    });

    this.selectTab(0);
  }

  selectTab(index: number) {
    const tabs = this.querySelectorAll('nuke-tab');
    const panels = this.querySelectorAll('nuke-tab-panel');

    tabs.forEach((tab, i) => {
      const isSelected = i === index;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    panels.forEach((panel, i) => {
      panel.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
  }

  handleKeydown(event: KeyboardEvent, currentIndex: number, totalTabs: number) {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % totalTabs;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = (currentIndex - 1 + totalTabs) % totalTabs;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = totalTabs - 1;
        break;
      default:
        return;
    }

    this.selectTab(newIndex);
    (this.querySelectorAll('nuke-tab')[newIndex] as HTMLElement).focus();
  }

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('nuke-tab')
export class NukeTab extends LitElement {
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', '-1');
  }

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('nuke-tab-panel')
export class NukeTabPanel extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<slot></slot>`;
  }
}
