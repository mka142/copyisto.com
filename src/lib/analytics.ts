import type { PostHog } from 'posthog-js';
import { PUBLIC_POSTHOG_HOST, PUBLIC_POSTHOG_PROJECT_TOKEN } from 'astro:env/client';

/**
 * PostHog, loaded only after the visitor accepts analytics. Until then the
 * library is not even downloaded, so nothing reaches PostHog and nothing is
 * stored on the device.
 */

let loading: Promise<PostHog> | undefined;
// Set once loaded, so a withdrawal can stop capture synchronously.
let instance: PostHog | undefined;

/** Every key PostHog writes: `ph_<token>_posthog`, `__ph_opt_in_out_<token>` and the like. */
const POSTHOG_KEY = /^_*ph_/i;

export function startAnalytics() {
  if (!PUBLIC_POSTHOG_PROJECT_TOKEN || !PUBLIC_POSTHOG_HOST) {
    if (import.meta.env.DEV) {
      console.error(
        'PostHog is not configured: set PUBLIC_POSTHOG_PROJECT_TOKEN and PUBLIC_POSTHOG_HOST.',
      );
    }
    return;
  }

  if (loading) {
    // Consent given again after a withdrawal on this same page.
    void loading.then((posthog) => {
      posthog.set_config({
        disable_persistence: false,
        advanced_disable_flags: false,
        opt_out_capturing_by_default: false,
      });
      posthog.opt_in_capturing();
      posthog.startSessionRecording();
      posthog.capture('$pageview');
    });
    return;
  }

  const token = PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = PUBLIC_POSTHOG_HOST;
  loading = import('posthog-js').then(({ default: posthog }) => {
    posthog.init(token, {
      api_host: host,
      defaults: '2026-01-30',
      persistence: 'localStorage+cookie',
      session_recording: { maskAllInputs: true },
      // Send each event as it happens rather than in a timed batch, so
      // nothing collected under consent is still queued after a withdrawal.
      request_batching: false,
      capture_exceptions: {
        capture_unhandled_errors: true,
        capture_unhandled_rejections: true,
        capture_console_errors: false,
      },
    });
    document.addEventListener('click', (event) => trackClick(posthog, event));
    instance = posthog;
    return posthog;
  });
}

/** Withdraws consent: stops PostHog and removes everything it stored. */
export function stopAnalytics() {
  const posthog = instance;
  if (posthog) {
    posthog.opt_out_capturing();
    posthog.stopSessionRecording();
    // reset() would otherwise refetch feature flags from PostHog.
    posthog.set_config({ advanced_disable_flags: true });
    posthog.reset();
    // reset() clears the stored decision too, so opt out again after it.
    posthog.opt_out_capturing();
    // The opt-out lives in a __ph_ key that clearPosthogStorage() deletes;
    // without a stored decision, this default keeps the live instance quiet.
    posthog.set_config({ disable_persistence: true, opt_out_capturing_by_default: true });
  }
  clearPosthogStorage();
}

function clearPosthogStorage() {
  for (const store of [localStorage, sessionStorage]) {
    for (const key of Object.keys(store)) {
      if (POSTHOG_KEY.test(key)) store.removeItem(key);
    }
  }

  // PostHog sets its cookie on the parent domain (.copyisto.com) in
  // production and host-only on localhost, so expire it under each.
  const host = location.hostname;
  const domains = ['', `; Domain=${host}`, `; Domain=.${host.split('.').slice(-2).join('.')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!POSTHOG_KEY.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Path=/; Max-Age=0${domain}`;
    }
  }
}

/**
 * One named event per tracked link or button, so CTA, e-mail and social
 * clicks read as their own insights instead of generic $autocapture rows.
 * Tag an element with data-track="event_name"; every other data-track-*
 * attribute becomes a property (data-track-location → location).
 */
function trackClick(posthog: PostHog, event: MouseEvent) {
  const el =
    event.target instanceof Element ? event.target.closest<HTMLElement>('[data-track]') : null;
  const name = el?.dataset.track;
  if (!el || !name) return;

  const props: Record<string, string | null | undefined> = { href: el.getAttribute('href') };
  for (const [key, value] of Object.entries(el.dataset)) {
    if (key.startsWith('track') && key !== 'track') props[key.slice(5).toLowerCase()] = value;
  }
  // sendBeacon survives the navigation a link click starts.
  posthog.capture(name, props, { transport: 'sendBeacon' });
}
