import {vitePreprocess} from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true
  },
  onwarn: (warning, handler) => {
    // Ignore specific a11y warnings
    if (warning.code === 'a11y_interactive_supports_focus') return;
    if (warning.code === 'a11y_click_events_have_key_events') return;
    if (warning.code === 'a11y_no_static_element_interactions') return;

    handler(warning);
  }
}
