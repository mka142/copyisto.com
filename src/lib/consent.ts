/**
 * The visitor's analytics decision, kept in a first-party cookie. It is a
 * strictly necessary cookie: it only remembers the answer, so the banner
 * does not ask again.
 */
export type Consent = 'granted' | 'denied';

const COOKIE = 'cookie_consent';
const MAX_AGE = 60 * 60 * 24 * 365; // 12 months

export function readConsent(): Consent | null {
  const match = document.cookie.match(/(?:^|;\s*)cookie_consent=(granted|denied)(?:;|$)/);
  return match ? (match[1] as Consent) : null;
}

export function writeConsent(value: Consent) {
  document.cookie = `${COOKIE}=${value}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax; Secure`;
}
