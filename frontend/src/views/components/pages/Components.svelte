<script>
  function showToast(variant) {
    let container = document.querySelector('.nuke-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'nuke-toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('nuke-toast');
    toast.setAttribute('nuke-style', variant);
    toast.setAttribute('duration', '3000');
    toast.textContent = `Toast message (style-${variant})`;
    container.appendChild(toast);
  }

  function showSidebar(variant) {
    const sidebar = document.createElement('nuke-sidebar');
    sidebar.setAttribute('nuke-style', variant);
    sidebar.innerHTML = `
      <h3>Sidebar (style-${variant})</h3>
      <p style="margin: var(--space-2) 0;">Sidebar content goes here.</p>
      <button nuke-style="${variant}" onclick="this.closest('nuke-sidebar').close()">Close</button>
    `;
    document.body.appendChild(sidebar);
    setTimeout(() => sidebar.show(), 0);
  }
</script>

<nuke-area>
  <h1>Components</h1>
  <p>All components with style-1 and style-2 variants.</p>
</nuke-area>

<!-- Buttons -->
<nuke-area>
  <h3><code nuke-style="1">&lt;button&gt;</code></h3>
  <nuke-grid style="grid-template-columns: 1fr 1fr;">
    <nuke-area>
      <small>style-1</small>
      <nuke-toolbar nuke-style="1" style="margin-top: var(--space-1);">
        <button nuke-style="1">Button</button>
        <button nuke-style="1">+ Add</button>
        <button nuke-style="1" aria-label="Settings">⚙</button>
      </nuke-toolbar>
    </nuke-area>
    <nuke-area>
      <small>style-2</small>
      <nuke-toolbar nuke-style="1" style="margin-top: var(--space-1);">
        <button nuke-style="2">Button</button>
        <button nuke-style="2">✎ Edit</button>
        <button nuke-style="2" aria-label="Delete">🗑</button>
      </nuke-toolbar>
    </nuke-area>
  </nuke-grid>
</nuke-area>

<!-- Inputs -->
<nuke-area>
  <h3><code nuke-style="1">&lt;input&gt; &lt;select&gt; &lt;textarea&gt;</code></h3>
  <nuke-grid style="grid-template-columns: 1fr 1fr;">
    <nuke-area>
      <small>style-1</small>
      <div style="display: grid; gap: var(--space-1); margin-top: var(--space-1);">
        <input type="text" nuke-style="1" placeholder="Text input">
        <select nuke-style="1">
          <option>Select option...</option>
          <option>Option 1</option>
        </select>
        <textarea nuke-style="1" rows="2" placeholder="Textarea..."></textarea>
      </div>
    </nuke-area>
    <nuke-area>
      <small>style-2</small>
      <div style="display: grid; gap: var(--space-1); margin-top: var(--space-1);">
        <input type="text" nuke-style="2" placeholder="Text input">
        <select nuke-style="2">
          <option>Select option...</option>
          <option>Option 1</option>
        </select>
        <textarea nuke-style="2" rows="2" placeholder="Textarea..."></textarea>
      </div>
    </nuke-area>
  </nuke-grid>
</nuke-area>

<!-- Checkbox & Radio -->
<nuke-area>
  <h3><code nuke-style="1">&lt;input type="checkbox|radio"&gt;</code></h3>
  <nuke-grid style="grid-template-columns: 1fr 1fr;">
    <nuke-area>
      <small>style-1</small>
      <div style="display: grid; gap: var(--space-1); margin-top: var(--space-1);">
        <label><input type="checkbox" nuke-style="1" checked> Checkbox</label>
        <label><input type="radio" name="r1" nuke-style="1" checked> Radio A</label>
        <label><input type="radio" name="r1" nuke-style="1"> Radio B</label>
      </div>
    </nuke-area>
    <nuke-area>
      <small>style-2</small>
      <div style="display: grid; gap: var(--space-1); margin-top: var(--space-1);">
        <label><input type="checkbox" nuke-style="2" checked> Checkbox</label>
        <label><input type="radio" name="r2" nuke-style="2" checked> Radio A</label>
        <label><input type="radio" name="r2" nuke-style="2"> Radio B</label>
      </div>
    </nuke-area>
  </nuke-grid>
</nuke-area>

<!-- Badges -->
<nuke-area>
  <h3><code nuke-style="1">&lt;nuke-badge&gt;</code></h3>
  <nuke-grid style="grid-template-columns: 1fr 1fr;">
    <nuke-area>
      <small>style-1</small>
      <nuke-toolbar nuke-style="1" style="margin-top: var(--space-1);">
        <nuke-badge nuke-style="1">Active</nuke-badge>
        <nuke-badge nuke-style="1">New</nuke-badge>
      </nuke-toolbar>
    </nuke-area>
    <nuke-area>
      <small>style-2</small>
      <nuke-toolbar nuke-style="1" style="margin-top: var(--space-1);">
        <nuke-badge nuke-style="2">Pending</nuke-badge>
        <nuke-badge nuke-style="2">Draft</nuke-badge>
      </nuke-toolbar>
    </nuke-area>
  </nuke-grid>
</nuke-area>

<!-- Tabs -->
<nuke-area>
  <h3><code nuke-style="1">&lt;nuke-tabs&gt;</code></h3>
  <nuke-grid style="grid-template-columns: 1fr 1fr;">
    <nuke-area>
      <small>style-1</small>
      <nuke-tabs nuke-style="1" style="margin-top: var(--space-1);">
        <nuke-tab>Overview</nuke-tab>
        <nuke-tab>Details</nuke-tab>
        <nuke-tab-panel>Overview content</nuke-tab-panel>
        <nuke-tab-panel>Details content</nuke-tab-panel>
      </nuke-tabs>
    </nuke-area>
    <nuke-area>
      <small>style-2</small>
      <nuke-tabs nuke-style="2" style="margin-top: var(--space-1);">
        <nuke-tab>Overview</nuke-tab>
        <nuke-tab>Details</nuke-tab>
        <nuke-tab-panel>Overview content</nuke-tab-panel>
        <nuke-tab-panel>Details content</nuke-tab-panel>
      </nuke-tabs>
    </nuke-area>
  </nuke-grid>
</nuke-area>

<!-- Table -->
<nuke-area>
  <h3><code nuke-style="1">&lt;table&gt;</code></h3>
  <nuke-grid style="grid-template-columns: 1fr 1fr;">
    <nuke-area>
      <small>style-1</small>
      <table nuke-style="1" style="margin-top: var(--space-1);">
        <thead><tr><th>Name</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Project A</td><td><nuke-badge nuke-style="1">Active</nuke-badge></td></tr>
          <tr><td>Project B</td><td><nuke-badge nuke-style="2">Draft</nuke-badge></td></tr>
        </tbody>
      </table>
    </nuke-area>
    <nuke-area>
      <small>style-2</small>
      <table nuke-style="2" style="margin-top: var(--space-1);">
        <thead><tr><th>Name</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>User 1</td><td><nuke-badge nuke-style="1">Active</nuke-badge></td></tr>
          <tr><td>User 2</td><td><nuke-badge nuke-style="2">Pending</nuke-badge></td></tr>
        </tbody>
      </table>
    </nuke-area>
  </nuke-grid>
</nuke-area>

<!-- Toast & Sidebar -->
<nuke-area>
  <h3><code nuke-style="1">&lt;nuke-toast&gt; &lt;nuke-sidebar&gt;</code></h3>
  <nuke-grid style="grid-template-columns: 1fr 1fr;">
    <nuke-area>
      <small>Toast</small>
      <nuke-toolbar nuke-style="1" style="margin-top: var(--space-1);">
        <button nuke-style="1" onclick={() => showToast('1')}>Show Toast (1)</button>
        <button nuke-style="2" onclick={() => showToast('2')}>Show Toast (2)</button>
      </nuke-toolbar>
    </nuke-area>
    <nuke-area>
      <small>Sidebar</small>
      <nuke-toolbar nuke-style="1" style="margin-top: var(--space-1);">
        <button nuke-style="1" onclick={() => showSidebar('1')}>Sidebar (1)</button>
        <button nuke-style="2" onclick={() => showSidebar('2')}>Sidebar (2)</button>
      </nuke-toolbar>
    </nuke-area>
  </nuke-grid>
</nuke-area>

<style>
</style>
