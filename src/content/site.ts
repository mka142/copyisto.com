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
  { href: '#', label: 'Sprawdź swoje kredyty', soon: true },
];

export const footerNav = {
  privacy: { href: routes.privacy, label: 'Polityka prywatności' },
  /** A button, not a link: it reopens the consent banner. */
  cookieSettings: 'Ustawienia cookies',
} as const;

export const cta = {
  openForm: 'Przekaż zeszyt',
  donate: 'Podaruj swojemu zeszytowi z harmonii drugie życie',
  donateShort: 'Podaruj zeszytowi drugie życie',
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
