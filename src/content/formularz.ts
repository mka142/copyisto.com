export const formIntro = {
  eyebrow: 'Zbiórka materiałów',
  titleLead: 'Podaruj swojemu zeszytowi z harmonii',
  titleScript: 'drugie życie',
  body:
    'Każda przesłana kartka uczy model czytać pismo odręczne. Zadania z harmonii, ćwiczenia z kontrapunktu, ' +
    'brudnopisy z ołówkiem i gumką — im mniej idealne, tym cenniejsze.',
  steps: [
    {
      number: '01',
      title: 'Wysyłasz skan lub zdjęcie',
      body: 'Telefon w zupełności wystarczy.',
    },
    {
      number: '02',
      title: 'Anonimizujemy materiał',
      body: 'Nazwiska i dane ze strony trafiają do usunięcia przed treningiem.',
    },
    {
      number: '03',
      title: 'Dostajesz wczesny dostęp',
      body: 'Bezpłatnie przez 12 miesięcy od uruchomienia narzędzia.',
    },
  ],
} as const;

export const scanRules = {
  eyebrow: 'Instrukcja',
  title: 'Jak poprawnie zeskanować materiały – 3 krótkie zasady',
  body: 'Aby system mógł bezbłędnie przeanalizować i odczytać Twoje rękopisy, trzymaj się tych wytycznych:',
  rules: [
    {
      number: '01',
      badge: 'Placeholder · rysunek 01',
      tileCaption:
        'Zeszyt przy oknie w dziennym świetle obok tego samego zeszytu z fleszem i białą plamą odbicia, przekreślonego.',
      lead: 'Światło bez flesza:',
      body:
        'Skanuj w świetle dziennym (np. przy oknie) i wyłącz lampę błyskową w telefonie – ' +
        'inaczej grafit ołówka odbije światło i tekst będzie nieczytelny.',
    },
    {
      number: '02',
      badge: 'Placeholder · rysunek 02',
      tileCaption:
        'Widok z boku: telefon idealnie równolegle nad rozprostowanym zeszytem na ciemnym blacie, obok wariant pod skosem, przekreślony.',
      lead: 'Płasko i z góry:',
      body:
        'Rozprostuj maksymalnie kartki, połóż zeszyt na ciemnym blacie, a telefon trzymaj idealnie ' +
        'równolegle nad środkiem strony.',
    },
    {
      number: '03',
      badge: 'Placeholder · rysunek 03',
      tileCaption:
        'Ekran telefonu z aplikacją skanującą: wykryta ramka strony i pasek filtrów z zaznaczonym „Czarno-biały”.',
      lead: 'Użyj aplikacji, nie aparatu:',
      body:
        'Skanuj przez darmowe aplikacje (np. Adobe Scan, Microsoft Lens, Notatki Apple/Google Drive) ' +
        'i po zrobieniu zdjęcia upewnij się, że nałożony jest filtr „Czarno-biały”, aby maksymalnie podbić kontrast.',
    },
  ],
  note: {
    title: 'Coś nie wyszło? Odezwiemy się.',
    body:
      'Jeśli któryś skan okaże się nieczytelny, napiszemy z prośbą o powtórkę — zależy nam na tych danych ' +
      'i na tym, żebyś dostał/a wczesny dostęp. Materiały, których nie da się wykorzystać, nie uprawniają ' +
      'do bezpłatnego dostępu, więc wolimy poprosić o poprawkę, niż odrzucić zgłoszenie.',
  },
} as const;

export const credits = {
  eyebrow: 'Kredyty',
  title: 'Im więcej przyślesz, tym więcej kredytów zbierasz.',
  body:
    'Każdy przesłany materiał zasila Twoje konto kredytami, które wykorzystasz w narzędziu po jego uruchomieniu. ' +
    'Kredyty nie wygasają razem z okresem testów.',
  points: [
    {
      number: '01',
      body: 'Wysyłasz materiał, my go weryfikujemy i naliczamy kredyty na Twoje konto.',
    },
    {
      number: '02',
      body: 'Liczy się objętość i jakość — czytelne skany przeliczają się w pełni, nieczytelne prosimy o powtórkę.',
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

export const uploadForm = {
  fileLabel: 'Materiał',
  dropTitle: 'Przeciągnij pliki albo kliknij, aby wybrać',
  dropHint: 'JPG, PNG lub PDF · do 20 MB na plik',
  backToRules: '↑ Wróć do zasad skanowania',
  descriptionLabel: 'Krótki opis (opcjonalnie)',
  descriptionPlaceholder: 'Np. zadania z harmonii, II klasa, lata 2018–2020',
  consentLabel: 'Zgody',
  required: 'Wymagane',
  optional: 'Dobrowolne',
  submit: 'Podaruj zeszytowi drugie życie',
  submitNote: 'Materiały wykorzystujemy wyłącznie do trenowania modelu.',
  sentTitle: 'Dziękujemy.',
  sentBody:
    'Materiał trafił do kolejki. Jeśli zaznaczyłeś/aś zgodę na kontakt, odezwiemy się z dostępem do wersji testowej.',
  sentCta: 'Wróć na stronę główną',
} as const;
