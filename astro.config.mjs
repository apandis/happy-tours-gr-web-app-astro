// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  srcDir: './app',
  site: 'https://www.happytours.gr',
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': 'http://localhost:7071'  // Only runs in dev server
      }
    }
  },
  integrations: [sitemap()]
});