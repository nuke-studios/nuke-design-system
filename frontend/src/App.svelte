<script>
  import { onMount } from 'svelte';
  import Logo from './layout/Logo.svelte';

  let scaling = $state(1);
  let radiusFactor = $state(1);

  function setVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    document.body.classList.toggle('dark-theme', !isDark);
    document.body.classList.toggle('light-theme', isDark);
  }

  onMount(() => {
    document.body.classList.add('dark-theme');
    const el = document.getElementById('indeterminate');
    if (el) el.indeterminate = true;
  });
</script>

<nuke-app-shell-sidebar>
  <nuke-nav-rail>
    <nuke-nav-rail-header>
      <Logo size="small" />
      <span><strong>Nuke</strong></span>
    </nuke-nav-rail-header>

    <nuke-nav-rail-content>
      <div>
        <small data-muted><strong>THEME</strong></small>
        <button onclick={toggleTheme} data-variant="outline" data-size="small">
          Toggle Dark/Light
        </button>
      </div>

      <div>
        <small data-muted><strong>SCALING</strong></small>
        <label>
          {scaling}
          <input type="range" min="0.8" max="1.2" step="0.05" value={scaling}
                 oninput={(e) => { scaling = +e.target.value; setVar('--scaling', scaling); }}>
        </label>
      </div>

      <div>
        <small data-muted><strong>RADIUS</strong></small>
        <label>
          {radiusFactor}
          <input type="range" min="0" max="2" step="0.25" value={radiusFactor}
                 oninput={(e) => { radiusFactor = +e.target.value; setVar('--radius-factor', radiusFactor); }}>
        </label>
      </div>

      <div>
        <small data-muted><strong>GAPS</strong></small>
        <label>Shell <input type="range" min="0" max="8" value="1" oninput={(e) => setVar('--shell-gap', e.target.value + 'px')}></label>
        <label>Layout <input type="range" min="0" max="8" value="1" oninput={(e) => setVar('--layout-gap', e.target.value + 'px')}></label>
        <label>Area <input type="range" min="0" max="8" value="1" oninput={(e) => setVar('--area-gap', e.target.value + 'px')}></label>
        <label>Section <input type="range" min="0" max="24" value="12" oninput={(e) => setVar('--section-gap', e.target.value + 'px')}></label>
      </div>
    </nuke-nav-rail-content>
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
            <input type="text" placeholder="Default input">
            <input type="text" data-size="small" placeholder="Small">
            <input type="text" data-size="large" placeholder="Large">
            <input type="text" disabled placeholder="Disabled">
          </section>

          <section>
            <h2>Select</h2>
            <select><option>Default select</option></select>
            <select data-size="small"><option>Small</option></select>
            <select data-size="large"><option>Large</option></select>
          </section>

          <section>
            <h2>Checkbox</h2>
            <label><input type="checkbox"> Unchecked</label>
            <label><input type="checkbox" checked> Checked</label>
            <label><input type="checkbox" id="indeterminate"> Indeterminate</label>
            <label><input type="checkbox" disabled> Disabled</label>
          </section>

          <section>
            <h2>Radio</h2>
            <label><input type="radio" name="r1"> Option A</label>
            <label><input type="radio" name="r1" checked> Option B</label>
            <label><input type="radio" name="r1" disabled> Disabled</label>
          </section>

          <section>
            <h2>Textarea</h2>
            <textarea placeholder="Enter text..."></textarea>
          </section>

          <section>
            <h2>Range</h2>
            <input type="range">
            <input type="range" data-size="small">
            <input type="range" data-size="large">
          </section>

          <section>
            <h2>Badge</h2>
            <p>
              <span data-badge>Default</span>
              <span data-badge data-variant="secondary">Secondary</span>
              <span data-badge data-variant="destructive">Destructive</span>
              <span data-badge data-variant="success">Success</span>
              <span data-badge data-variant="warning">Warning</span>
            </p>
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
            <h2>Code</h2>
            <p>Inline <code>code</code> and <kbd>Ctrl</kbd>+<kbd>C</kbd></p>
            <pre><code>const nuke = 'One unit. One ratio.';
console.log(nuke);</code></pre>
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
            <nav data-variant="pills">
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
                <p>A design system where everything scales from two variables.</p>
              </nuke-accordion-content>
            </nuke-accordion>
            <nuke-accordion>
              <nuke-accordion-header>How does it work?</nuke-accordion-header>
              <nuke-accordion-content>
                <p>Change --scaling and --radius-factor to transform the entire UI.</p>
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
              <nuke-tab-panel><pre><code>npm install @nuke.dev/design-system</code></pre></nuke-tab-panel>
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
