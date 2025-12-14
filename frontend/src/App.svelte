<script>
  import { onMount } from 'svelte';

  // Shell tokens
  let shellGap = $state(1);
  let shellRadius = $state(0);
  let bodyBg = $state(8);
  let shellBg = $state(10);

  // Layout tokens
  let layoutRadius = $state(0);
  let layoutBg = $state(14);

  let tokenStyle = $derived(`
    --shell-gap: ${shellGap}px;
    --shell-radius: ${shellRadius}px;
    --body-background: hsl(0, 0%, ${bodyBg}%);
    --shell-background: hsl(0, 0%, ${shellBg}%);
    --layout-radius: ${layoutRadius}px;
    --layout-background: hsl(0, 0%, ${layoutBg}%);
  `);

  onMount(() => document.body.classList.add('dark-theme'));
</script>

<nuke-app-shell-sidebar style={tokenStyle}>

  <nuke-nav-rail>
    <nuke-nav-rail-header>
      <nuke-icon name="cube"></nuke-icon>
      <span>Unit</span>
    </nuke-nav-rail-header>
    <nuke-nav-rail-content>
      <nuke-nav-rail-item active>
        <nuke-icon name="home"></nuke-icon>
        <span>Shell Demo</span>
      </nuke-nav-rail-item>
    </nuke-nav-rail-content>
  </nuke-nav-rail>

  <nuke-app-shell-sidebar-content>

    <header>
      <strong>Shell Layer Demo</strong>
    </header>

    <main>
      <nuke-area>
        <section>
          <h3>Shell</h3>
          <label>Gap: {shellGap}px <input type="range" min="0" max="16" bind:value={shellGap}></label>
          <label>Radius: {shellRadius}px <input type="range" min="0" max="16" bind:value={shellRadius}></label>
          <label>Body BG: {bodyBg}% <input type="range" min="0" max="20" bind:value={bodyBg}></label>
          <label>Shell BG: {shellBg}% <input type="range" min="5" max="25" bind:value={shellBg}></label>

          <h3>Layout</h3>
          <label>Radius: {layoutRadius}px <input type="range" min="0" max="16" bind:value={layoutRadius}></label>
          <label>Layout BG: {layoutBg}% <input type="range" min="10" max="25" bind:value={layoutBg}></label>
        </section>
      </nuke-area>
    </main>

    <footer>
      Shell layer: body-background shows through shell-gap
    </footer>

  </nuke-app-shell-sidebar-content>

</nuke-app-shell-sidebar>
