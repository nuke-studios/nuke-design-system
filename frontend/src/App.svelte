<script>
  import { onMount } from 'svelte';
  import Nav from './layout/Nav.svelte';
  import Welcome from './views/welcome/pages/Welcome.svelte';
  import Components from './views/components/pages/Components.svelte';

  let currentPage = $state('welcome');

  onMount(() => {
    document.body.classList.add('dark-theme');
  });
</script>

<div class="app-layout">
  <Nav bind:currentPage />

  <main>
    {#if currentPage === 'welcome'}
      <Welcome />
    {:else if currentPage === 'components'}
      <Components />
    {/if}
  </main>

  <footer>NUKE Design System</footer>
</div>

<style>
  .app-layout {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    gap: var(--area-gap);
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: var(--background-1);
  }

  .app-layout > :global(:first-child) {
    grid-row: 1 / -1;
  }

  main {
    display: grid;
    grid-template-columns: 1fr;
    align-content: start;
    gap: var(--area-gap);
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--space-2);
  }

  footer {
    display: grid;
    align-items: center;
    justify-content: flex-end;
    height: var(--height-2);
    padding: 0 var(--space-3);
    font-size: var(--font-size-1);
    color: var(--on-background-light);
    background: var(--background-2);
  }
</style>
