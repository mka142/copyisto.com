/**
 * The three legal documents, carried over verbatim from the design.
 *
 * Every "[bracketed]" value and every `placeholder` block is an open item the
 * design itself marks as pending; the side nav carries the same caveat.
 * Note: the numbering jumps from §4 to §6 in the source. Left as found.
 */

import { CONTACT_EMAIL } from '@/lib/routes';

export type LegalBlock =
  { kind: 'paragraph'; text: string } | { kind: 'placeholder'; label: string; text: string };

export interface LegalClause {
  /** Set when the clause is a link target in its own right. */
  id?: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDefinition {
  term: string;
  /** Rendered as a bordered placeholder block when true. */
  placeholder?: boolean;
  label?: string;
  text: string;
  /** Marks spans that should render in the accent colour, matched literally. */
  accents?: string[];
}

export interface LegalDocument {
  id: string;
  eyebrow: string;
  title: string;
  meta?: { label: string; value: string }[];
  clauses?: LegalClause[];
  definitions?: LegalDefinition[];
}

export const docNavLabel = 'Dokumenty';
export const docNavCaveat = 'Wersja robocza · do zatwierdzenia przez prawnika';

export const docNav = [
  { href: '#regulamin', label: 'Regulamin' },
  { href: '#kredyty', label: '§6. Kredyty', nested: true },
  { href: '#rodo', label: 'Klauzula informacyjna (RODO)' },
  { href: '#prywatnosc', label: 'Polityka prywatności' },
];

const P = (text: string): LegalBlock => ({ kind: 'paragraph', text });
const LEGAL = (text: string): LegalBlock => ({
  kind: 'placeholder',
  label: 'Placeholder prawny:',
  text,
});

export const legalDocuments: LegalDocument[] = [
  {
    id: 'regulamin',
    eyebrow: 'Dokument 01',
    title: 'Regulamin przekazywania materiałów',
    meta: [
      { label: 'Obowiązuje od:', value: '[data wejścia w życie]' },
      { label: 'Administrator:', value: '[pełna nazwa podmiotu, adres, NIP]' },
    ],
    clauses: [
      {
        heading: '§1. Postanowienia ogólne',
        blocks: [
          P(
            'Regulamin określa zasady przekazywania przez Użytkownika materiałów zawierających odręczny zapis nutowy ' +
              'na potrzeby rozwoju i trenowania systemu Copyisto. Przekazanie materiału jest dobrowolne i nieodpłatne.',
          ),
        ],
      },
      {
        heading: '§2. Licencja',
        blocks: [
          P(
            'Przesyłając materiał, Użytkownik udziela nieodpłatnej licencji niewyłącznej, nieograniczonej terytorialnie, ' +
              'na korzystanie z materiału w celu trenowania, testowania i walidacji modeli uczenia maszynowego oraz rozwoju systemu.',
          ),
          LEGAL(
            'pola eksploatacji, czas trwania licencji, prawo do sublicencji i przenoszenia, zasady wypowiedzenia – ' +
              'do uzupełnienia przez radcę prawnego.',
          ),
        ],
      },
      {
        heading: '§3. Oświadczenia Użytkownika',
        blocks: [
          P(
            'Użytkownik oświadcza, że przysługują mu prawa do przesłanego materiału albo posiada zgodę osoby uprawnionej, ' +
              'a przesłanie materiału nie narusza praw osób trzecich.',
          ),
          LEGAL(
            'materiały osób niepełnoletnich – wymóg zgody opiekuna; odpowiedzialność za treść materiału.',
          ),
        ],
      },
      {
        heading: '§4. Wczesny dostęp',
        blocks: [
          P(
            'Użytkownikom, którzy wyrazili zgodę na kontakt, przysługuje bezpłatny dostęp do narzędzia przez 12 miesięcy ' +
              'od dnia jego publicznego uruchomienia.',
          ),
          LEGAL(
            'zakres funkcji objętych dostępem, warunki odebrania, brak gwarancji terminu uruchomienia.',
          ),
        ],
      },
      {
        id: 'kredyty',
        heading: '§6. Kredyty',
        blocks: [
          P(
            'Za przyjęte materiały Użytkownikowi naliczane są kredyty stanowiące jednostkę rozliczeniową w narzędziu. ' +
              'Liczba kredytów zależy od objętości i przydatności przekazanego materiału. Kredyty nie są środkiem płatniczym, ' +
              'nie podlegają wymianie na pieniądze ani przeniesieniu na inną osobę.',
          ),
          LEGAL(
            'przelicznik jednostek na kredyty, termin naliczenia, tryb reklamacji naliczenia, okres ważności kredytów, ' +
              'zasady na wypadek zamknięcia projektu.',
          ),
        ],
      },
      {
        heading: '§7. Reklamacje i postanowienia końcowe',
        blocks: [
          LEGAL(
            'tryb reklamacyjny, adres kontaktowy, zmiany regulaminu, prawo właściwe i sąd właściwy.',
          ),
        ],
      },
    ],
  },
  {
    id: 'rodo',
    eyebrow: 'Dokument 02',
    title: 'Klauzula informacyjna (RODO)',
    definitions: [
      {
        term: 'Administrator danych',
        text: `Administratorem danych osobowych jest [nazwa podmiotu, adres siedziby, dane rejestrowe]. Kontakt: ${CONTACT_EMAIL}.`,
        accents: ['[nazwa podmiotu, adres siedziby, dane rejestrowe]'],
      },
      {
        term: 'Cel i podstawa prawna',
        text:
          'Adres e-mail przetwarzamy wyłącznie w celu kontaktu w sprawie wczesnego dostępu do narzędzia, ' +
          'na podstawie zgody (art. 6 ust. 1 lit. a RODO). Przesłane materiały przetwarzamy w celu rozwoju systemu, ' +
          'na podstawie prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO).',
      },
      {
        term: 'Okres przechowywania',
        placeholder: true,
        label: 'Placeholder:',
        text: 'okres przechowywania adresu e-mail oraz materiałów treningowych.',
      },
      {
        term: 'Odbiorcy danych',
        placeholder: true,
        label: 'Placeholder:',
        text: 'dostawcy hostingu, poczty i infrastruktury obliczeniowej; ewentualne transfery poza EOG.',
      },
      {
        term: 'Twoje prawa',
        text:
          'Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, ' +
          'przenoszenia oraz sprzeciwu. Zgodę możesz wycofać w dowolnym momencie bez wpływu na zgodność z prawem ' +
          'przetwarzania dokonanego przed jej wycofaniem. Masz też prawo wniesienia skargi do Prezesa Urzędu ' +
          'Ochrony Danych Osobowych.',
      },
      {
        term: 'Dobrowolność',
        text:
          'Podanie danych jest dobrowolne. Brak podania adresu e-mail uniemożliwia wyłącznie kontakt ' +
          'w sprawie wczesnego dostępu.',
      },
    ],
  },
  {
    id: 'prywatnosc',
    eyebrow: 'Dokument 03',
    title: 'Polityka prywatności',
    clauses: [
      {
        heading: 'Jakie dane zbieramy',
        blocks: [
          P(
            'Adres e-mail podany w formularzu, przesłane pliki z zapisem nutowym oraz opcjonalny opis materiału. ' +
              'Nie prosimy o dane wrażliwe ani o dane uczniów.',
          ),
        ],
      },
      {
        heading: 'Anonimizacja materiałów',
        blocks: [
          P(
            'Przed wykorzystaniem materiału do trenowania modelu usuwamy z niego widoczne dane identyfikujące, ' +
              'w szczególności imiona, nazwiska i nazwy szkół.',
          ),
        ],
      },
      {
        heading: 'Pliki cookies i analityka',
        blocks: [
          {
            kind: 'placeholder',
            label: 'Placeholder:',
            text: 'lista używanych cookies, narzędzia analityczne, sposób zarządzania zgodą.',
          },
        ],
      },
      {
        heading: 'Kontakt',
        blocks: [P(`W sprawach dotyczących danych osobowych pisz na ${CONTACT_EMAIL}.`)],
      },
    ],
  },
];

export const legalClosing = {
  question: 'Gotów przekazać materiał?',
} as const;
