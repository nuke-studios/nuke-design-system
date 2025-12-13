<script>
  import CaretRight from 'phosphor-svelte/lib/CaretRight';
  import { onMount, onDestroy } from 'svelte';

  let { title, description = '', expanded: initialExpanded = false, children } = $props();

  const storageKey = `area-expanded-${title.toLowerCase().replace(/\s+/g, '-')}`;

  let expanded = $state(initialExpanded);

  function handleCollapseAll() {
    expanded = false;
    localStorage.setItem(storageKey, 'false');
  }

  function handleExpandAll() {
    expanded = true;
    localStorage.setItem(storageKey, 'true');
  }

  onMount(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored !== null) {
      expanded = stored === 'true';
    }
    window.addEventListener('nuke:collapse-all', handleCollapseAll);
    window.addEventListener('nuke:expand-all', handleExpandAll);
  });

  onDestroy(() => {
    window.removeEventListener('nuke:collapse-all', handleCollapseAll);
    window.removeEventListener('nuke:expand-all', handleExpandAll);
  });

  function toggle() {
    expanded = !expanded;
    localStorage.setItem(storageKey, String(expanded));
  }
</script>

<section class="area" class:expanded>
  <header class="area-header" onclick={toggle} role="button">
    <div class="area-title-row">
      <span class="area-title">{title}</span>
      {#if description}
        <span class="area-description"># {description}</span>
      {/if}
    </div>
    <span class="area-caret" class:expanded>
      <CaretRight size={14} />
    </span>
  </header>
  {#if expanded}
    <div class="area-container">
      {@render children()}
    </div>
  {/if}
</section>

<style>
  :root {
    --area-gap: 6px;
    --area-padding: var(--space-3);
  }

  .area {
    display: contents;
  }

  .area-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 0 var(--space-3);
    font-size: var(--font-size-2);
    font-weight: var(--font-weight-bold);
    color: var(--on-background);
    background: var(--background-1);
    height: var(--height-3);
    user-select: none;
  }

  .area-header:hover,
  .area.expanded .area-header {
    background: var(--background-2);
  }

  .area-title-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    overflow: hidden;
  }

  .area-title {
    flex-shrink: 0;
  }

  /*.area-header:hover .area-title,*/
  /*.area.expanded .area-title {*/
  /*  color: var(--color-1);*/
  /*}*/

  .area-description {
    color: var(--on-background-light);
    font-size: var(--font-size-2);
    font-weight: var(--font-weight-normal);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .area-caret {
    display: grid;
    place-items: center;
    color: var(--on-background-light);
    transition: transform 0.15s ease;
  }

  .area-caret.expanded {
    transform: rotate(90deg);
  }

  .area-container {
    container-type: inline-size;
    width: 100%;
  }
</style>
