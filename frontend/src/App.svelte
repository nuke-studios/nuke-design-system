<script>
  import { onMount } from 'svelte';

  function setVar(name, value) {
    document.body.style.setProperty(name, value);
  }

  onMount(() => document.body.classList.add('dark-theme'));
</script>

<nuke-app-shell-sidebar>

  <nuke-nav-rail>
    <div class="controls">
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
    <header>Header</header>
    <main>
      <nuke-layout style="grid-template-columns: 1fr 300px">
        <nuke-area>
          <section>
            <h2>Main Content</h2>
            <p>This is the main content area. nuke-layout → nuke-area → section</p>
          </section>
          <section>
            <h3>Another Section</h3>
            <p>Sections stack inside the area.</p>
          </section>
        </nuke-area>
        <nuke-area>
          <section>
            <h3>Sidebar</h3>
            <p>300px wide sidebar area.</p>
          </section>
        </nuke-area>
      </nuke-layout>
    </main>
    <footer>Footer</footer>
  </nuke-app-shell-sidebar-content>

</nuke-app-shell-sidebar>
