import { mount } from 'svelte';
import App from './App.svelte';
import './style.css';

// Import lib web components
import '@nuke.dev/design-system';

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
