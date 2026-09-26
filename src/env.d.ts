import type { PostHog } from 'posthog-js';

declare global {
  interface Window {
    /** Set by the snippet in components/posthog.astro; absent when unconfigured. */
    posthog?: PostHog;
  }
}
