<script>
  import { toasts } from '../store.js';
  import Toast from './Toast.svelte';

  function removeToast(id) {
    toasts.update(items => items.filter(t => t.id !== id));
  }
</script>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <Toast
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      onClose={() => removeToast(toast.id)}
    />
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: var(--space-3);
    right: var(--space-3);
    display: grid;
    gap: var(--space-2);
    z-index: 9999;
    pointer-events: none;
  }

  .toast-container :global(.toast) {
    pointer-events: all;
  }
</style>
