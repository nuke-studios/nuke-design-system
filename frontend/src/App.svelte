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
        <label>--shell-padding <input type="range" min="0" max="24" value="0" oninput={(e) => setVar('--shell-padding', e.target.value + 'px')}></label>
        <label>--shell-gap <input type="range" min="0" max="16" value="1" oninput={(e) => setVar('--shell-gap', e.target.value + 'px')}></label>
      </div>

      <div>
        <h4>Layout</h4>
        <label>--layout-padding <input type="range" min="0" max="24" value="12" oninput={(e) => setVar('--layout-padding', e.target.value + 'px')}></label>
        <label>--layout-gap <input type="range" min="0" max="16" value="1" oninput={(e) => setVar('--layout-gap', e.target.value + 'px')}></label>
        <label>--layout-radius <input type="range" min="0" max="16" value="0" oninput={(e) => setVar('--layout-radius', e.target.value + 'px')}></label>
        <label>--layout-border-width <input type="range" min="0" max="3" value="0" oninput={(e) => setVar('--layout-border-width', e.target.value + 'px')}></label>
      </div>
    </div>
  </nuke-nav-rail>

  <nuke-app-shell-sidebar-content>
    <header>Header</header>
    <main>Main</main>
    <footer>Footer</footer>
  </nuke-app-shell-sidebar-content>

</nuke-app-shell-sidebar>
