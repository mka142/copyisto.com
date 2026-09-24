import { INSTAGRAM_USERNAME, MESSENGER_USERNAME } from 'astro:env/client';

/** Every internal destination in one place, so a route rename is a one-line change. */
export const routes = {
  home: '/',
  form: '/formularz',
  terms: '/regulamin',
} as const;

/** Anchors that are linked to from more than one page. */
export const anchors = {
  howItWorks: `${routes.home}#jak-to-dziala`,
  why: `${routes.home}#dlaczego`,
  team: `${routes.home}#zespol`,
  credits: `${routes.form}#kredyty`,
  terms: `${routes.terms}#regulamin`,
  gdpr: `${routes.terms}#rodo`,
  privacy: `${routes.terms}#prywatnosc`,
  creditsClause: `${routes.terms}#kredyty`,
} as const;

export const CONTACT_EMAIL = 'kontakt@copyisto.com';
export const mailto = `mailto:${CONTACT_EMAIL}`;

/**
 * Temporary direct-message channels while notebooks are collected in person.
 * Each opens a chat, not just the profile; an unset username hides its button.
 */
export const social = {
  instagram: INSTAGRAM_USERNAME ? `https://ig.me/m/${INSTAGRAM_USERNAME}` : '',
  messenger: MESSENGER_USERNAME ? `https://m.me/${MESSENGER_USERNAME}` : '',
} as const;
