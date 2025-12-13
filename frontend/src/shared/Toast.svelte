<script>
  import { onMount } from 'svelte';
  import X from 'phosphor-svelte/lib/X';

  let { message, type = 'success', duration = 3000, onClose } = $props();

  onMount(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  });
</script>

<div class="toast">
  <div class="toast-content">
    <span class="toast-title" class:success={type === 'success'} class:error={type === 'error'}>
      {type === 'success' ? 'Success' : 'Error'}
    </span>
    <p class="toast-message">{message}</p>
  </div>
  <button class="close-btn" onclick={onClose}>
    <X size={16} />
  </button>
</div>

<style>
  .toast {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-2);
    align-items: start;
    min-width: 300px;
    max-width: 400px;
    padding: var(--space-3);
    background: color-mix(in srgb, var(--background-2) 95%, transparent);
    backdrop-filter: blur(8px);
    border-radius: var(--border-radius-1);
    box-shadow: var(--shadow-3);
    animation: slideIn 0.3s ease;
  }

  .toast-content {
    display: grid;
    gap: var(--space-1);
  }

  .toast-title {
    font-size: var(--font-size-2);
    font-weight: var(--font-weight-medium);
  }

  .toast-title.success {
    color: var(--success-color);
  }

  .toast-title.error {
    color: var(--error-color);
  }

  .toast-message {
    font-size: var(--font-size-2);
    color: var(--on-background);
    margin: 0;
    line-height: var(--line-height-2);
  }

  .close-btn {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    padding: 0;
    background: none;
    border: none;
    border-radius: var(--border-radius-1);
    color: var(--on-background-light);
    cursor: pointer;
  }

  .close-btn:hover {
    background: var(--background-3);
    color: var(--on-background);
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
