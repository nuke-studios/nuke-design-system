import { mount } from 'svelte';
import App from './App.svelte';
import './style.css';

// Import lib web components (nuke-icon, nuke-tabs, etc.)
import '../../lib/dist/core.js';

// Configure icon base path (served from public/icons)
customElements.whenDefined('nuke-icon').then(() => {
  const NukeIcon = customElements.get('nuke-icon');
  NukeIcon.basePath = '/icons';
});

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
