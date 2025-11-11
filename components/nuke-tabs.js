/**
 * Nuke Tabs Component
 * Tab interface with keyboard navigation
 * Usage: <nuke-tabs style="1|2|3">
 */

class NukeTabs extends HTMLElement {
  connectedCallback() {
    // Set ARIA role
    this.setAttribute('role', 'tablist');

    // Default to style 1 if not set
    if (!this.hasAttribute('style')) {
      this.setAttribute('style', '1');
    }

    // Initialize tabs
    this.initializeTabs();
  }

  initializeTabs() {
    const tabs = Array.from(this.querySelectorAll('nuke-tab'));
    const panels = Array.from(this.querySelectorAll('nuke-tab-panel'));

    if (tabs.length === 0 || panels.length === 0) return;

    // Set up each tab
    tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      tab.dataset.index = index;

      // Click handler
      tab.addEventListener('click', () => this.selectTab(index));

      // Keyboard navigation
      tab.addEventListener('keydown', (e) => this.handleKeydown(e, index, tabs.length));
    });

    // Set up each panel
    panels.forEach((panel, index) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
      panel.dataset.index = index;
    });

    // Show first tab by default
    this.selectTab(0);
  }

  selectTab(index) {
    const tabs = this.querySelectorAll('nuke-tab');
    const panels = this.querySelectorAll('nuke-tab-panel');

    // Update tabs
    tabs.forEach((tab, i) => {
      const isSelected = i === index;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    // Update panels
    panels.forEach((panel, i) => {
      panel.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
  }

  handleKeydown(event, currentIndex, totalTabs) {
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
    this.querySelectorAll('nuke-tab')[newIndex].focus();
  }
}

class NukeTab extends HTMLElement {
  connectedCallback() {
    this.setAttribute('tabindex', '-1');
  }
}

class NukeTabPanel extends HTMLElement {
  connectedCallback() {
    // Panel container
  }
}

// Register custom elements
customElements.define('nuke-tabs', NukeTabs);
customElements.define('nuke-tab', NukeTab);
customElements.define('nuke-tab-panel', NukeTabPanel);
