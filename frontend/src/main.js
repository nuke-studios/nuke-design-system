import { mount } from 'svelte';
import App from './App.svelte';
import './style.css';

// Import lib web components
import '../../lib/dist/core.js';

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
