export const formIntro = {
  eyebrow: 'Zbiórka we Wrocławiu',
  titleLead: 'Podaruj swojemu zeszytowi z harmonii',
  titleScript: 'drugie życie',
  body:
    'Przez najbliższy miesiąc zbieramy zeszyty osobiście we Wrocławiu. Zadania z harmonii, ćwiczenia z ' +
    'kontrapunktu, brudnopisy z ołówkiem i gumką – im mniej idealne, tym cenniejsze.',
  steps: [
    {
      number: '01',
      title: 'Piszesz do nas',
      body: 'Mailem albo w wiadomości prywatnej.',
    },
    {
      number: '02',
      title: 'Umawiamy przekazanie',
      body: 'Ustalamy miejsce i termin we Wrocławiu.',
    },
    {
      number: '03',
      title: 'Dostajesz wczesny dostęp',
      body: 'Bezpłatnie przez 12 miesięcy od uruchomienia narzędzia.',
    },
  ],
} as const;

/** The two ways in while collection is in person only. */
export const collection = {
  local: {
    eyebrow: 'Jesteś we Wrocławiu?',
    title: 'Napisz do nas, umówimy się na przekazanie zeszytu.',
    body: 'Zanim kartki trafią do trenowania modelu, usuwamy z nich nazwiska i inne dane osobowe.',
    email: 'Napisz e-mail',
    instagram: 'Napisz na Instagramie',
    messenger: 'Napisz na Messengerze',
  },
  remote: {
    eyebrow: 'Spoza Wrocławia?',
    title: 'Formularz online pojawi się wkrótce.',
    body: 'Zostaw adres, a damy znać, gdy będzie można przesłać skany z dowolnego miejsca.',
  },
} as const;

export const credits = {
  eyebrow: 'Kredyty',
  title: 'Im więcej przekażesz, tym więcej kredytów zbierasz.',
  body:
    'Każdy przekazany materiał zasila Twoje konto kredytami, które wykorzystasz w narzędziu po jego uruchomieniu. ' +
    'Kredyty nie wygasają razem z okresem testów.',
  points: [
    {
      number: '01',
      body: 'Przekazujesz materiał, my go weryfikujemy i naliczamy kredyty na Twoje konto.',
    },
    {
      number: '02',
      body: 'Liczy się objętość i czytelność zapisu.',
    },
    {
      number: '03',
      body: 'Stan konta sprawdzisz w każdej chwili przyciskiem „Sprawdź swoje kredyty” na stronie głównej.',
    },
  ],
  footnoteLead:
    'Dokładny przelicznik podamy przy uruchomieniu narzędzia. Zasady naliczania opisuje ',
  footnoteLink: '§6 Regulaminu',
  footnoteTail: '.',
} as const;
