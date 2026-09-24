// @ts-check
import { defineConfig, envField } from 'astro/config';

// Fully static: `astro build` writes plain files to dist/ for any static host.
// A server endpoint (the upload needs one) will need an adapter, e.g.
// @astrojs/cloudflare, with that route opting out via `export const prerender = false`.
export default defineConfig({
  site: 'https://copyisto.com',
  env: {
    schema: {
      // Usernames for the temporary direct-message buttons on the contribution
      // page. Read at build time; a missing one hides its button.
      INSTAGRAM_USERNAME: envField.string({ context: 'client', access: 'public', optional: true }),
      MESSENGER_USERNAME: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});
