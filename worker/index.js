/**
 * Counts page views on the server, for every visitor, consent or not, then
 * serves the static site as before. Only aggregate, non-identifying fields
 * are written: no IP address, no cookies, nothing read from or stored on the
 * device, no script in the browser.
 *
 * Query the counts with the Analytics Engine SQL API (see README).
 */

// Link-preview fetchers and crawlers, so posting a link does not count as a visit.
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|headless/i;

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (isPageView(request, response)) record(env, request, response);
    return response;
  },
};

/** @param {Request} request @param {Response} response */
function isPageView(request, response) {
  return (
    request.method === 'GET' &&
    (response.headers.get('Content-Type') ?? '').startsWith('text/html') &&
    !BOT.test(request.headers.get('User-Agent') ?? '')
  );
}

/** @param {{ VISITS?: { writeDataPoint(point: object): void } }} env @param {Request} request @param {Response} response */
function record(env, request, response) {
  const url = new URL(request.url);
  const param = (name) => url.searchParams.get(name) ?? '';
  let referrer = '';
  try {
    referrer = new URL(request.headers.get('Referer') ?? '').hostname;
  } catch {
    // no or malformed Referer: a direct visit
  }

  // blob order is the column order in SQL: blob1 = path, blob2 = utm_source, …
  env.VISITS?.writeDataPoint({
    indexes: [param('utm_source') || 'direct'],
    blobs: [
      url.pathname,
      param('utm_source'),
      param('utm_medium'),
      param('utm_campaign'),
      param('utm_content'),
      referrer === url.hostname ? '' : referrer,
      request.cf?.country ?? '',
      String(response.status),
    ],
    doubles: [1],
  });
}
