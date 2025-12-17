<script>
  import { onMount } from 'svelte';
  import Logo from './layout/Logo.svelte';

  // Global
  let scaling = $state(1);
  let radiusFactor = $state(0);

  // Layers
  let shellGap = $state(1);
  let shellPadding = $state(0);
  let shellBorderWidth = $state(0);
  let layoutGap = $state(1);
  let layoutPadding = $state(0);
  let layoutBorderWidth = $state(0);
  let areaGap = $state(1);
  let areaPadding = $state(0);
  let areaBorderWidth = $state(0);
  let sectionGap = $state(1);
  let sectionPadding = $state(0);
  let sectionBorderWidth = $state(0);
  let componentBorderWidth = $state(1);

  function setVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  function setBlockStyle() {
    // Block: 1px hairline gaps, balanced padding, no radius
    radiusFactor = 0; setVar('--radius-factor', 0);
    shellGap = 1; setVar('--shell-gap', '1px');
    shellPadding = 8; setVar('--shell-padding', '8px');
    shellBorderWidth = 0; setVar('--shell-border-width', '0px');
    layoutGap = 1; setVar('--layout-gap', '1px');
    layoutPadding = 0; setVar('--layout-padding', '0px');
    layoutBorderWidth = 0; setVar('--layout-border-width', '0px');
    areaGap = 1; setVar('--area-gap', '1px');
    areaPadding = 0; setVar('--area-padding', '0px');
    areaBorderWidth = 0; setVar('--area-border-width', '0px');
    sectionGap = 8; setVar('--section-gap', '8px');
    sectionPadding = 16; setVar('--section-padding', '16px');
    sectionBorderWidth = 0; setVar('--section-border-width', '0px');
    componentBorderWidth = 1; setVar('--component-border-width', '1px');
  }

  function setIslandStyle() {
    // Island: larger gaps, padding, radius, borders
    radiusFactor = 1; setVar('--radius-factor', 1);
    shellGap = 8; setVar('--shell-gap', '8px');
    shellPadding = 8; setVar('--shell-padding', '8px');
    shellBorderWidth = 1; setVar('--shell-border-width', '1px');
    layoutGap = 8; setVar('--layout-gap', '8px');
    layoutPadding = 0; setVar('--layout-padding', '0px');
    layoutBorderWidth = 0; setVar('--layout-border-width', '0px');
    areaGap = 8; setVar('--area-gap', '8px');
    areaPadding = 12; setVar('--area-padding', '12px');
    areaBorderWidth = 1; setVar('--area-border-width', '1px');
    sectionGap = 12; setVar('--section-gap', '12px');
    sectionPadding = 16; setVar('--section-padding', '16px');
    sectionBorderWidth = 1; setVar('--section-border-width', '1px');
    componentBorderWidth = 1; setVar('--component-border-width', '1px');
  }

  function resetToDefault() {
    // Reset to token defaults
    scaling = 1; setVar('--scaling', 1);
    radiusFactor = 0; setVar('--radius-factor', 0);
    shellGap = 1; setVar('--shell-gap', '1px');
    shellPadding = 0; setVar('--shell-padding', '0px');
    shellBorderWidth = 0; setVar('--shell-border-width', '0px');
    layoutGap = 1; setVar('--layout-gap', '1px');
    layoutPadding = 0; setVar('--layout-padding', '0px');
    layoutBorderWidth = 0; setVar('--layout-border-width', '0px');
    areaGap = 1; setVar('--area-gap', '1px');
    areaPadding = 0; setVar('--area-padding', '0px');
    areaBorderWidth = 0; setVar('--area-border-width', '0px');
    sectionGap = 1; setVar('--section-gap', '1px');
    sectionPadding = 0; setVar('--section-padding', '0px');
    sectionBorderWidth = 0; setVar('--section-border-width', '0px');
    componentBorderWidth = 1; setVar('--component-border-width', '1px');
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    document.body.classList.toggle('dark-theme', !isDark);
    document.body.classList.toggle('light-theme', isDark);
  }

  // Draggable controls
  let controlsX = $state(window.innerWidth - 320);
  let controlsY = $state(12);
  let isDragging = $state(false);
  let dragOffset = { x: 0, y: 0 };

  function startDrag(e) {
    if (e.target.closest('input, button')) return;
    isDragging = true;
    dragOffset = { x: e.clientX - controlsX, y: e.clientY - controlsY };
  }

  function onDrag(e) {
    if (!isDragging) return;
    controlsX = e.clientX - dragOffset.x;
    controlsY = e.clientY - dragOffset.y;
  }

  function stopDrag() {
    isDragging = false;
  }

  onMount(() => {
    document.body.classList.add('dark-theme');
    const el = document.getElementById('indeterminate');
    if (el) el.indeterminate = true;

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    };
  });
</script>

<style>
  .floating-controls {
    position: fixed;
    z-index: 1000;
    background: var(--section-background);
    border: 1px solid var(--border-color-1);
    border-radius: var(--radius-3);
    padding: var(--space-3);
    display: grid;
    gap: var(--space-3);
    font-size: var(--text-1);
    max-height: calc(100vh - var(--space-6));
    overflow-y: auto;
    cursor: grab;
    user-select: none;
  }

  .floating-controls:active {
    cursor: grabbing;
  }

  .control-group {
    display: grid;
    gap: var(--space-2);
  }

  .control-group-title {
    font-weight: var(--font-weight-bold);
    color: var(--color-text-2);
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.5px;
  }

  .control-row {
    display: grid;
    grid-template-columns: 70px 60px 1fr;
    align-items: center;
    gap: var(--space-2);
  }

  .control-row input[type="range"] {
    width: 100%;
    min-width: 60px;
  }

  .control-value {
    text-align: right;
    font-family: var(--family-mono);
    color: var(--color-text-2);
  }

  /* Limit page width for testing */
  :global(nuke-app-shell-sidebar) {
    max-width: 70vw;
  }
</style>

<div class="floating-controls" style="left: {controlsX}px; top: {controlsY}px;" onmousedown={startDrag}>
  <div class="control-group">
    <span class="control-group-title">Presets</span>
    <div style="display: flex; gap: var(--space-2);">
      <button onclick={resetToDefault} data-variant="ghost" data-size="small">Reset</button>
      <button onclick={setBlockStyle} data-variant="outline" data-size="small">Block</button>
      <button onclick={setIslandStyle} data-variant="outline" data-size="small">Island</button>
    </div>
  </div>

  <div class="control-group">
    <span class="control-group-title">Global</span>
    <button onclick={toggleTheme} data-variant="outline" data-size="small">Toggle Theme</button>
    <div class="control-row">
      <span>Scale</span>
      <span class="control-value">{scaling}</span>
      <input type="range" min="0.8" max="1.2" step="0.05" value={scaling}
             oninput={(e) => { scaling = +e.target.value; setVar('--scaling', scaling); }}>
    </div>
    <div class="control-row">
      <span>Radius</span>
      <span class="control-value">{radiusFactor}</span>
      <input type="range" min="0" max="2" step="0.25" value={radiusFactor}
             oninput={(e) => { radiusFactor = +e.target.value; setVar('--radius-factor', radiusFactor); }}>
    </div>
  </div>

  <div class="control-group">
    <span class="control-group-title">Shell</span>
    <div class="control-row">
      <span>Gap</span>
      <span class="control-value">{shellGap}px</span>
      <input type="range" min="0" max="16" value={shellGap}
             oninput={(e) => { shellGap = +e.target.value; setVar('--shell-gap', shellGap + 'px'); }}>
    </div>
    <div class="control-row">
      <span>Padding</span>
      <span class="control-value">{shellPadding}px</span>
      <input type="range" min="0" max="32" value={shellPadding}
             oninput={(e) => { shellPadding = +e.target.value; setVar('--shell-padding', shellPadding + 'px'); }}>
    </div>
    <div class="control-row">
      <span>Border</span>
      <span class="control-value">{shellBorderWidth}px</span>
      <input type="range" min="0" max="3" value={shellBorderWidth}
             oninput={(e) => { shellBorderWidth = +e.target.value; setVar('--shell-border-width', shellBorderWidth + 'px'); }}>
    </div>
  </div>

  <div class="control-group">
    <span class="control-group-title">Layout</span>
    <div class="control-row">
      <span>Gap</span>
      <span class="control-value">{layoutGap}px</span>
      <input type="range" min="0" max="16" value={layoutGap}
             oninput={(e) => { layoutGap = +e.target.value; setVar('--layout-gap', layoutGap + 'px'); }}>
    </div>
    <div class="control-row">
      <span>Padding</span>
      <span class="control-value">{layoutPadding}px</span>
      <input type="range" min="0" max="32" value={layoutPadding}
             oninput={(e) => { layoutPadding = +e.target.value; setVar('--layout-padding', layoutPadding + 'px'); }}>
    </div>
    <div class="control-row">
      <span>Border</span>
      <span class="control-value">{layoutBorderWidth}px</span>
      <input type="range" min="0" max="3" value={layoutBorderWidth}
             oninput={(e) => { layoutBorderWidth = +e.target.value; setVar('--layout-border-width', layoutBorderWidth + 'px'); }}>
    </div>
  </div>

  <div class="control-group">
    <span class="control-group-title">Area</span>
    <div class="control-row">
      <span>Gap</span>
      <span class="control-value">{areaGap}px</span>
      <input type="range" min="0" max="16" value={areaGap}
             oninput={(e) => { areaGap = +e.target.value; setVar('--area-gap', areaGap + 'px'); }}>
    </div>
    <div class="control-row">
      <span>Padding</span>
      <span class="control-value">{areaPadding}px</span>
      <input type="range" min="0" max="32" value={areaPadding}
             oninput={(e) => { areaPadding = +e.target.value; setVar('--area-padding', areaPadding + 'px'); }}>
    </div>
    <div class="control-row">
      <span>Border</span>
      <span class="control-value">{areaBorderWidth}px</span>
      <input type="range" min="0" max="3" value={areaBorderWidth}
             oninput={(e) => { areaBorderWidth = +e.target.value; setVar('--area-border-width', areaBorderWidth + 'px'); }}>
    </div>
  </div>

  <div class="control-group">
    <span class="control-group-title">Section</span>
    <div class="control-row">
      <span>Gap</span>
      <span class="control-value">{sectionGap}px</span>
      <input type="range" min="0" max="32" value={sectionGap}
             oninput={(e) => { sectionGap = +e.target.value; setVar('--section-gap', sectionGap + 'px'); }}>
    </div>
    <div class="control-row">
      <span>Padding</span>
      <span class="control-value">{sectionPadding}px</span>
      <input type="range" min="0" max="32" value={sectionPadding}
             oninput={(e) => { sectionPadding = +e.target.value; setVar('--section-padding', sectionPadding + 'px'); }}>
    </div>
    <div class="control-row">
      <span>Border</span>
      <span class="control-value">{sectionBorderWidth}px</span>
      <input type="range" min="0" max="3" value={sectionBorderWidth}
             oninput={(e) => { sectionBorderWidth = +e.target.value; setVar('--section-border-width', sectionBorderWidth + 'px'); }}>
    </div>
  </div>

  <div class="control-group">
    <span class="control-group-title">Component</span>
    <div class="control-row">
      <span>Border</span>
      <span class="control-value">{componentBorderWidth}px</span>
      <input type="range" min="0" max="3" value={componentBorderWidth}
             oninput={(e) => { componentBorderWidth = +e.target.value; setVar('--component-border-width', componentBorderWidth + 'px'); }}>
    </div>
  </div>
</div>

<nuke-app-shell-sidebar>
  <nuke-nav-rail>
    <nuke-nav-rail-header>
      <Logo size="small" />
      <span><strong>Nuke</strong></span>
    </nuke-nav-rail-header>
  </nuke-nav-rail>

  <nuke-app-shell-sidebar-content>
    <header>
      <h4>Playground</h4>
    </header>

    <main>
      <nuke-layout style="grid-template-columns: 1fr 1fr">

        <nuke-area>
          <section>
            <h2>Button</h2>
            <h4>Variants</h4>
            <nuke-toolbar>
              <button>Default</button>
              <button data-variant="primary">Primary</button>
              <button data-variant="destructive">Destructive</button>
              <button data-variant="outline">Outline</button>
              <button data-variant="ghost">Ghost</button>
            </nuke-toolbar>
            <h4>Sizes</h4>
            <nuke-toolbar>
              <button data-size="small">Small</button>
              <button>Default</button>
              <button data-size="large">Large</button>
            </nuke-toolbar>
          </section>

          <section>
            <h2>Input</h2>
            <input type="text" data-size="small" placeholder="Small">
            <input type="text" placeholder="Default input">
            <input type="text" data-size="large" placeholder="Large">
            <input type="text" disabled placeholder="Disabled">
          </section>

          <section>
            <h2>Select</h2>
            <select data-size="small"><option>Small</option></select>
            <select><option>Default select</option></select>
            <select data-size="large"><option>Large</option></select>
          </section>

          <section>
            <h2>Checkbox</h2>
            <label><input type="checkbox" data-size="small"> Small</label>
            <label><input type="checkbox" checked> Default</label>
            <label><input type="checkbox" data-size="large"> Large</label>
            <label><input type="checkbox" id="indeterminate"> Indeterminate</label>
            <label><input type="checkbox" disabled> Disabled</label>
          </section>

          <section>
            <h2>Radio</h2>
            <label><input type="radio" name="r1" data-size="small"> Small</label>
            <label><input type="radio" name="r1" checked> Default</label>
            <label><input type="radio" name="r1" data-size="large"> Large</label>
            <label><input type="radio" name="r2" disabled> Disabled</label>
          </section>

          <section>
            <h2>Textarea</h2>
            <textarea placeholder="Enter text..."></textarea>
          </section>

          <section>
            <h2>Range</h2>
            <input type="range" data-size="small">
            <input type="range">
            <input type="range" data-size="large">
          </section>

          <section>
            <h2>Tag</h2>
            <p>
              <span data-tag>Default</span>
              <span data-tag data-variant="primary">Primary</span>
              <span data-tag data-variant="success">Success</span>
              <span data-tag data-variant="warning">Warning</span>
              <span data-tag data-variant="error">Error</span>
            </p>
          </section>
        </nuke-area>

        <nuke-area>
          <section>
            <h2>Typography</h2>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <p data-size="large">Large lead paragraph.</p>
            <p>Default paragraph with <strong>bold</strong>, <em>italic</em>, and <a href="https://example.com">link</a>.</p>
            <p data-size="small" data-muted>Small muted text.</p>
          </section>

          <section>
            <h2>Table</h2>
            <table>
              <thead>
                <tr><th>Name</th><th>Status</th><th align="right">Amount</th></tr>
              </thead>
              <tbody>
                <tr><td>Alice</td><td><span data-tag data-variant="success">Active</span></td><td align="right">$250</td></tr>
                <tr><td>Bob</td><td><span data-tag data-variant="warning">Pending</span></td><td align="right">$150</td></tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>Toolbar</h2>
            <nuke-toolbar>
              <button data-variant="ghost">Cut</button>
              <button data-variant="ghost">Copy</button>
              <button data-variant="ghost">Paste</button>
              <span data-separator></span>
              <button data-variant="ghost">Undo</button>
            </nuke-toolbar>
          </section>

          <section>
            <h2>Nav</h2>
            <nav>
              <a href="https://example.com" class="active">Home</a>
              <a href="https://example.com">About</a>
              <a href="https://example.com">Contact</a>
            </nav>
          </section>

          <section>
            <h2>Accordion</h2>
            <nuke-accordion expanded>
              <nuke-accordion-header>What is Nuke?</nuke-accordion-header>
              <nuke-accordion-content>
                A design system where everything scales from two variables.
              </nuke-accordion-content>
            </nuke-accordion>
            <nuke-accordion>
              <nuke-accordion-header>How does it work?</nuke-accordion-header>
              <nuke-accordion-content>
                Change --scaling and --radius-factor to transform the entire UI.
              </nuke-accordion-content>
            </nuke-accordion>
          </section>

          <section>
            <h2>Tabs</h2>
            <nuke-tabs>
              <nuke-tab>Overview</nuke-tab>
              <nuke-tab>Features</nuke-tab>
              <nuke-tab>Install</nuke-tab>
              <nuke-tab-panel><p>This is the overview panel.</p></nuke-tab-panel>
              <nuke-tab-panel><p>Modular scale, CSS variables, web components.</p></nuke-tab-panel>
              <nuke-tab-panel><p>npm install @nuke.dev/design-system</p></nuke-tab-panel>
            </nuke-tabs>
          </section>

          <section>
            <h2>Lists</h2>
            <ul>
              <li>First item</li>
              <li>Second item
                <ul><li>Nested</li></ul>
              </li>
            </ul>
          </section>
        </nuke-area>

      </nuke-layout>
    </main>

    <footer>
      <p data-muted>Nuke Design System — One unit. One ratio. Everything scales.</p>
    </footer>
  </nuke-app-shell-sidebar-content>
</nuke-app-shell-sidebar>
