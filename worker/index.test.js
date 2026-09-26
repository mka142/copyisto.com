import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from './index.js';

const page = (status = 200, type = 'text/html; charset=utf-8') =>
  new Response('', { status, headers: { 'Content-Type': type } });

async function visit(url, { headers = {}, method = 'GET', response = page() } = {}) {
  const points = [];
  const env = {
    ASSETS: { fetch: async () => response },
    VISITS: { writeDataPoint: (point) => points.push(point) },
  };
  const request = new Request(url, { headers, method });
  Object.defineProperty(request, 'cf', { value: { country: 'PL' } });
  const served = await worker.fetch(request, env);
  assert.equal(served, response, 'the static response is passed through untouched');
  return points;
}

test('counts a campaign visit with its parameters and nothing identifying', async () => {
  const [point] = await visit(
    'https://copyisto.com/?utm_source=facebook&utm_medium=social&utm_campaign=post-2026-09-30',
    { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://l.facebook.com/' } },
  );
  assert.deepEqual(point.indexes, ['facebook']);
  assert.deepEqual(point.blobs, [
    '/',
    'facebook',
    'social',
    'post-2026-09-30',
    '',
    'l.facebook.com',
    'PL',
    '200',
  ]);
});

test('a visit without parameters is direct; an internal referrer is dropped', async () => {
  const [point] = await visit('https://copyisto.com/formularz', {
    headers: { Referer: 'https://copyisto.com/' },
  });
  assert.deepEqual(point.indexes, ['direct']);
  assert.equal(point.blobs[5], '');
});

test('skips link-preview bots, assets and non-GET requests', async () => {
  const fb = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
  assert.equal((await visit('https://copyisto.com/', { headers: { 'User-Agent': fb } })).length, 0);
  assert.equal(
    (await visit('https://copyisto.com/favicon.ico', { response: page(200, 'image/x-icon') }))
      .length,
    0,
  );
  assert.equal((await visit('https://copyisto.com/', { method: 'POST' })).length, 0);
});
