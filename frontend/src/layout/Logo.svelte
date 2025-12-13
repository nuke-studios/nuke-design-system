<script>
  let { size = 'medium' } = $props();
</script>

<div class="logo logo-{size}">
  <span class="logo-icon">И</span>
</div>

<style>
  .logo {
    display: grid;
    place-items: center;
    border: 2px solid currentColor;
    font-family: var(--family-2);
    font-weight: var(--font-weight-bold);
    line-height: 1;
    box-sizing: border-box;
  }

  .logo-small {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }

  .logo-medium {
    width: 48px;
    height: 48px;
    font-size: 32px;
  }

  .logo-large {
    width: 64px;
    height: 64px;
    font-size: 42px;
  }

  .logo-icon {
    user-select: none;
  }
</style>
