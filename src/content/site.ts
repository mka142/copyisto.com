import { anchors, routes } from '@/lib/routes';

export const site = {
  name: 'Copyisto',
  domain: 'copyisto.com',
  stage: 'projekt w fazie MVP',
  tagline: 'Cyfrowy skryba, który rozumie Twój charakter pisma muzycznego.',
} as const;

export interface NavLink {
  href: string;
  label: string;
  /** Renders as non-clickable text with a "Wkrótce" badge. */
  soon?: boolean;
}

export const primaryNav: NavLink[] = [
  { href: anchors.howItWorks, label: 'Jak to działa?' },
  { href: anchors.why, label: 'Dlaczego harmonia?' },
  { href: anchors.team, label: 'Zespół' },
  { href: '#', label: 'Blog', soon: true },
];

export const legalNav: NavLink[] = [
  { href: anchors.terms, label: 'Regulamin' },
  { href: anchors.gdpr, label: 'Klauzula RODO' },
  { href: anchors.privacy, label: 'Polityka prywatności' },
];

export const cta = {
  openForm: 'Otwórz formularz',
  donate: 'Podaruj swojemu zeszytowi z harmonii drugie życie',
  donateShort: 'Podaruj zeszytowi drugie życie',
  checkCredits: 'Sprawdź swoje kredyty',
  formHref: routes.form,
} as const;

export const notFound = {
  title: 'Nie znaleziono strony',
  eyebrow: 'Błąd 404',
  titleLead: 'Tej strony nie ma',
  titleScript: 'w naszym zeszycie',
  body: 'Adres mógł się zmienić albo zawierać literówkę. Zacznij od strony głównej lub przekaż nam swoje materiały.',
  home: 'Wróć na stronę główną',
} as const;
