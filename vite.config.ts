import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path";

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'


import template_v1 from "./src/lib/preprocessors/template-v1.ts";
//import template_v0 from './src/lib/preprocessors/template-v0.js'


// https://vitejs.dev/config/
export default defineConfig({

  plugins: [svelte()],

  resolve: {
    alias: {
      $lib: path.resolve("./src/lib")
    },
  },
})