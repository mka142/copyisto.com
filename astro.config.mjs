// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://copyisto.com',
  // The adapter is here so a server endpoint can be added later (the upload
  // needs one). Pages stay prerendered; opt a route out with
  // `export const prerender = false`.
  adapter: vercel(),
});
