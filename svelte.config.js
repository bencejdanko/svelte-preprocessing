import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import template_v1 from './src/lib/preprocessors/template-v1.js'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  extensions: ['.svelte'],
  preprocess: [
    vitePreprocess(),
    template_v1(),
  ],
}
