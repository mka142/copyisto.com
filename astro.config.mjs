// @ts-check
import { defineConfig } from 'astro/config';

// Fully static: `astro build` writes plain files to dist/ for any static host.
// A server endpoint (the upload needs one) will need an adapter, e.g.
// @astrojs/cloudflare, with that route opting out via `export const prerender = false`.
export default defineConfig({
  site: 'https://copyisto.com',
});
