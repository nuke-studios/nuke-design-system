<script>
  import { onMount } from 'svelte';

  let scaling = $state(1);
  let radiusFactor = $state(1);

  function setVar(name, value) {
    document.documentElement.style.setProperty(name, value);
  }

  function updateScaling(e) {
    scaling = parseFloat(e.target.value);
    setVar('--scaling', scaling);
  }

  function updateRadius(e) {
    radiusFactor = parseFloat(e.target.value);
    setVar('--radius-factor', radiusFactor);
  }

  onMount(() => {
    document.body.classList.add('dark-theme');
    // Set indeterminate state (only possible via JS)
    const indeterminateCheckbox = document.getElementById('indeterminate-checkbox');
    if (indeterminateCheckbox) indeterminateCheckbox.indeterminate = true;
  });
</script>

<nuke-app-shell-sidebar>

  <nuke-nav-rail>
    <div class="controls">
      <div class="global-controls">
        <h4>Global</h4>
        <label>
          --scaling: {scaling}
          <input type="range" min="0.8" max="1.2" step="0.05" value="1" oninput={updateScaling}>
        </label>
        <label>
          --radius-factor: {radiusFactor}
          <input type="range" min="0" max="2" step="0.25" value="1" oninput={updateRadius}>
        </label>
      </div>

      <div>
        <h4>Shell</h4>
        <label>--shell-gap <input type="range" min="0" max="16" value="1" oninput={(e) => setVar('--shell-gap', e.target.value + 'px')}></label>
        <label>--shell-padding <input type="range" min="0" max="24" value="0" oninput={(e) => setVar('--shell-padding', e.target.value + 'px')}></label>
      </div>

      <div>
        <h4>Layout</h4>
        <label>--layout-gap <input type="range" min="0" max="16" value="1" oninput={(e) => setVar('--layout-gap', e.target.value + 'px')}></label>
        <label>--layout-padding <input type="range" min="0" max="24" value="0" oninput={(e) => setVar('--layout-padding', e.target.value + 'px')}></label>
        <label>--layout-radius <input type="range" min="0" max="16" value="0" oninput={(e) => setVar('--layout-radius', e.target.value + 'px')}></label>
      </div>

      <div>
        <h4>Area</h4>
        <label>--area-gap <input type="range" min="0" max="16" value="1" oninput={(e) => setVar('--area-gap', e.target.value + 'px')}></label>
        <label>--area-padding <input type="range" min="0" max="24" value="12" oninput={(e) => setVar('--area-padding', e.target.value + 'px')}></label>
        <label>--area-radius <input type="range" min="0" max="16" value="0" oninput={(e) => setVar('--area-radius', e.target.value + 'px')}></label>
      </div>

      <div>
        <h4>Section</h4>
        <label>--section-padding <input type="range" min="0" max="24" value="12" oninput={(e) => setVar('--section-padding', e.target.value + 'px')}></label>
        <label>--section-radius <input type="range" min="0" max="16" value="0" oninput={(e) => setVar('--section-radius', e.target.value + 'px')}></label>
      </div>
    </div>
  </nuke-nav-rail>

  <nuke-app-shell-sidebar-content>
    <header>Header - scales with --height-4 ({Math.round(48 * scaling)}px)</header>
    <main>
      <nuke-layout style="grid-template-columns: 1fr 320px">
        <nuke-area>
          <section>
            <h2>Buttons</h2>
            <p>Variants + sizes, all scale with --scaling</p>

            <h4>Variants</h4>
            <div class="form-row">
              <button>Default</button>
              <button data-variant="primary">Primary</button>
              <button data-variant="destructive">Destructive</button>
              <button data-variant="outline">Outline</button>
              <button data-variant="ghost">Ghost</button>
              <button data-variant="link">Link</button>
            </div>

            <h4>Sizes</h4>
            <div class="form-row">
              <button data-size="small">Small</button>
              <button>Default</button>
              <button data-size="large">Large</button>
            </div>

            <h4>Combinations</h4>
            <div class="form-row">
              <button data-variant="primary" data-size="small">Primary Small</button>
              <button data-variant="outline" data-size="large">Outline Large</button>
              <button data-variant="ghost" data-size="small">Ghost Small</button>
            </div>
          </section>

          <section>
            <h2>Checkboxes</h2>

            <h4>Default</h4>
            <div class="form-row">
              <label><input type="checkbox"> Unchecked</label>
              <label><input type="checkbox" checked> Checked</label>
              <label><input type="checkbox" disabled> Disabled</label>
              <label><input type="checkbox" checked disabled> Checked Disabled</label>
            </div>

            <h4>Sizes</h4>
            <div class="form-row">
              <label><input type="checkbox" data-size="small"> Small</label>
              <label><input type="checkbox"> Default</label>
              <label><input type="checkbox" data-size="large"> Large</label>
            </div>

            <h4>Indeterminate</h4>
            <div class="form-row">
              <label><input type="checkbox" id="indeterminate-checkbox"> Indeterminate</label>
            </div>
          </section>

          <section>
            <h2>Radio Buttons</h2>

            <h4>Default</h4>
            <div class="form-row">
              <label><input type="radio" name="demo1"> Option A</label>
              <label><input type="radio" name="demo1" checked> Option B</label>
              <label><input type="radio" name="demo1" disabled> Disabled</label>
            </div>

            <h4>Sizes</h4>
            <div class="form-row">
              <label><input type="radio" name="demo2" data-size="small"> Small</label>
              <label><input type="radio" name="demo2"> Default</label>
              <label><input type="radio" name="demo2" data-size="large"> Large</label>
            </div>
          </section>

          <section>
            <h2>Inputs</h2>

            <h4>Default</h4>
            <div class="form-row">
              <input type="text" placeholder="Text input">
              <input type="text" value="With value">
              <input type="text" disabled placeholder="Disabled">
            </div>

            <h4>Sizes</h4>
            <div class="form-row">
              <input type="text" data-size="small" placeholder="Small">
              <input type="text" placeholder="Default">
              <input type="text" data-size="large" placeholder="Large">
            </div>
          </section>

          <section>
            <h2>Select</h2>

            <h4>Default</h4>
            <div class="form-row">
              <select>
                <option>Select option</option>
                <option>Option 2</option>
              </select>
              <select disabled>
                <option>Disabled</option>
              </select>
            </div>

            <h4>Sizes</h4>
            <div class="form-row">
              <select data-size="small">
                <option>Small</option>
              </select>
              <select>
                <option>Default</option>
              </select>
              <select data-size="large">
                <option>Large</option>
              </select>
            </div>
          </section>

          <section>
            <h2>Textarea</h2>
            <div class="form-row" style="flex-direction: column">
              <textarea placeholder="Default textarea"></textarea>
              <textarea data-size="small" placeholder="Small textarea"></textarea>
              <textarea data-size="large" placeholder="Large textarea"></textarea>
            </div>
          </section>

          <section>
            <h2>Range Slider</h2>
            <h4>Sizes</h4>
            <div class="form-row" style="flex-direction: column">
              <input type="range" data-size="small">
              <input type="range">
              <input type="range" data-size="large">
            </div>
          </section>

        </nuke-area>

        <nuke-area>
          <section>
            <h2>Headings</h2>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
          </section>

          <section>
            <h2>Paragraph</h2>
            <p data-size="large">Large lead text for introductions.</p>
            <p>Default paragraph with <strong>bold</strong>, <em>italic</em>, and <mark>highlighted</mark> text.</p>
            <p data-size="small">Small text for captions and metadata.</p>
            <p data-muted>Muted text for secondary information.</p>
            <blockquote>Blockquote for quotes and callouts.</blockquote>
            <hr>
            <small>Small element for fine print.</small>
          </section>

          <section>
            <h2>Links</h2>
            <p>
              <a href="/">Default link</a> with animated underline.
            </p>
            <p>
              <a href="/" data-variant="subtle">Subtle link</a> blends with text.
            </p>
            <p>
              <a href="https://example.com" target="_blank">External link</a> with indicator.
            </p>
          </section>

          <section>
            <h2>Code</h2>
            <p>Inline <code>code</code> and keyboard <kbd>Ctrl</kbd> + <kbd>C</kbd></p>
<pre><code>// Code block
function hello() {'{'}
  console.log("Hello, Nuke!");
{'}'}</code></pre>
          </section>

          <section>
            <h2>Lists</h2>
            <h4>Unordered</h4>
            <ul>
              <li>First item</li>
              <li>Second item
                <ul>
                  <li>Nested item</li>
                  <li>Another nested</li>
                </ul>
              </li>
              <li>Third item</li>
            </ul>

            <h4>Ordered</h4>
            <ol>
              <li>Step one</li>
              <li>Step two
                <ol>
                  <li>Sub-step</li>
                </ol>
              </li>
              <li>Step three</li>
            </ol>

            <h4>Definition</h4>
            <dl>
              <dt>Term</dt>
              <dd>Definition of the term</dd>
              <dt>Another</dt>
              <dd>Another definition</dd>
            </dl>
          </section>

          <section>
            <h2>Badge</h2>
            <h4>Variants</h4>
            <div class="form-row">
              <span data-badge>Default</span>
              <span data-badge data-variant="secondary">Secondary</span>
              <span data-badge data-variant="destructive">Destructive</span>
              <span data-badge data-variant="outline">Outline</span>
              <span data-badge data-variant="success">Success</span>
              <span data-badge data-variant="warning">Warning</span>
            </div>
            <h4>Dot (empty)</h4>
            <div class="form-row">
              <span style="position: relative; padding: 8px;">
                Icon <span data-badge data-position="top-right"></span>
              </span>
            </div>
          </section>

          <section>
            <h2>Tag</h2>
            <h4>Variants</h4>
            <div class="form-row">
              <span data-tag>Default</span>
              <span data-tag data-variant="primary">Primary</span>
              <span data-tag data-variant="success">Success</span>
              <span data-tag data-variant="warning">Warning</span>
              <span data-tag data-variant="error">Error</span>
              <span data-tag data-variant="outline">Outline</span>
            </div>
            <h4>Sizes</h4>
            <div class="form-row">
              <span data-tag data-size="small">Small</span>
              <span data-tag>Default</span>
              <span data-tag data-size="large">Large</span>
            </div>
          </section>

          <section>
            <h2>Table</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th align="right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alice</td>
                  <td><span data-tag data-variant="success">Active</span></td>
                  <td align="right">$250.00</td>
                </tr>
                <tr>
                  <td>Bob</td>
                  <td><span data-tag data-variant="warning">Pending</span></td>
                  <td align="right">$150.00</td>
                </tr>
                <tr>
                  <td>Charlie</td>
                  <td><span data-tag data-variant="error">Failed</span></td>
                  <td align="right">$350.00</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>Toolbar</h2>
            <div data-toolbar>
              <button data-variant="ghost">Cut</button>
              <button data-variant="ghost">Copy</button>
              <button data-variant="ghost">Paste</button>
              <span data-separator></span>
              <button data-variant="ghost">Undo</button>
              <button data-variant="ghost">Redo</button>
            </div>
            <h4>Ghost variant</h4>
            <div data-toolbar data-variant="ghost">
              <button data-variant="outline">Edit</button>
              <button data-variant="outline">Delete</button>
            </div>
          </section>

          <section>
            <h2>Nav</h2>
            <h4>Default</h4>
            <nav>
              <a href="/" class="active">Home</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>
            <h4>Pills</h4>
            <nav data-variant="pills">
              <a href="/" class="active">Dashboard</a>
              <a href="/settings">Settings</a>
              <a href="/profile">Profile</a>
            </nav>
            <h4>Underline</h4>
            <nav data-variant="underline">
              <a href="/" class="active">Overview</a>
              <a href="/analytics">Analytics</a>
              <a href="/reports">Reports</a>
            </nav>
          </section>
        </nuke-area>
      </nuke-layout>
    </main>
    <footer>Footer - scales with --height-2 ({Math.round(32 * scaling)}px)</footer>
  </nuke-app-shell-sidebar-content>

</nuke-app-shell-sidebar>
