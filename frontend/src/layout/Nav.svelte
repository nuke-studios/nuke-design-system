<script>
  import { onMount } from 'svelte';
  import Logo from './Logo.svelte';
  import '@phosphor-icons/webcomponents/PhHouse';
  import '@phosphor-icons/webcomponents/PhCode';
  import '@phosphor-icons/webcomponents/PhSun';
  import '@phosphor-icons/webcomponents/PhMoon';
  import '@phosphor-icons/webcomponents/PhCaretLeft';
  import '@phosphor-icons/webcomponents/PhCaretRight';

  let { currentPage = $bindable() } = $props();
  let expanded = $state(false);
  let darkMode = $state(true);

  onMount(() => {
    document.body.classList.add('dark-theme');
  });

  function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-theme', darkMode);
    document.body.classList.toggle('light-theme', !darkMode);
  }
</script>

<div class="nav" class:expanded>
  <button class="nav-item nav-logo" onclick={() => (currentPage = 'welcome')} title="Home" type="button">
    <div class="nav-icon-container">
      <Logo size="small" />
    </div>
    {#if expanded}
      <span class="logo-text">NUKE</span>
    {/if}
  </button>

  <button class="nav-item" class:active={currentPage === 'welcome'} onclick={() => (currentPage = 'welcome')} title="Welcome" type="button">
    <ph-house></ph-house>
    {#if expanded}<span class="nav-label">Welcome</span>{/if}
  </button>

  <button class="nav-item" class:active={currentPage === 'components'} onclick={() => (currentPage = 'components')} title="Components" type="button">
    <ph-code></ph-code>
    {#if expanded}<span class="nav-label">Components</span>{/if}
  </button>

  <div class="nav-spacer"></div>

  <button class="nav-item" onclick={toggleTheme} title={darkMode ? 'Light mode' : 'Dark mode'} type="button">
    {#if darkMode}<ph-sun></ph-sun>{:else}<ph-moon></ph-moon>{/if}
    {#if expanded}<span class="nav-label">{darkMode ? 'Light' : 'Dark'}</span>{/if}
  </button>

  <button class="nav-item" onclick={() => (expanded = !expanded)} title={expanded ? 'Collapse' : 'Expand'} type="button">
    {#if expanded}<ph-caret-left></ph-caret-left>{:else}<ph-caret-right></ph-caret-right>{/if}
    {#if expanded}<span class="nav-label">Collapse</span>{/if}
  </button>
</div>

<style>
  .nav {
    display: grid;
    grid-template-rows: auto repeat(2, auto) 1fr repeat(2, auto);
    height: 100%;
    background: var(--background-2);
    border-radius: var(--border-radius-1);
    overflow: hidden;

    &.expanded {
      min-width: 200px;
    }
  }

  .nav-item {
    display: grid;
    grid-template-columns: var(--bar-height-2) auto;
    align-items: center;
    gap: 0;
    height: var(--bar-height-2);
    background: transparent;
    border: none;
    color: var(--on-background);
    padding: 0;
    font-size: var(--text-base);
    cursor: pointer;

    &:hover {
      color: var(--color-1);
    }

    &.active {
      color: var(--color-1);
      background: var(--background-3);
    }

    &.nav-logo {
      color: var(--color-1);
      height: calc(var(--bar-height-2) * 1.5);

      &:hover {
        opacity: 0.7;
      }
    }

    ph-house, ph-code, ph-sun, ph-moon, ph-caret-left, ph-caret-right {
      display: grid;
      place-items: center;
      width: var(--bar-height-2);
      height: var(--bar-height-2);
    }
  }

  .nav-label {
    font-size: var(--font-size-1);
    font-weight: var(--font-weight-medium);
    white-space: nowrap;
    text-align: left;
  }

  .logo-text {
    font-size: var(--font-size-1);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: left;
  }

  .nav-spacer {
    flex: 1;
  }
</style>
