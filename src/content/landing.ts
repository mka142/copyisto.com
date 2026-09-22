export const hero = {
  titleLead: 'Cyfrowy',
  titleScript: 'skryba',
  subtitle: 'który naprawdę rozumie Twój charakter pisma muzycznego',
  lead: 'Odczytujemy odręczne zadania z harmonii i automatycznie sprawdzamy je pod kątem błędów.',
  eyebrow: 'By musicians for musicians',
  ctaNote: 'Pomóż nam trenować model i zyskaj bezpłatny dostęp na 12 miesięcy.',
  illustrationAlt:
    'Uczennica zapisuje nuty ołówkiem, obok laptop z cyfrową transkrypcją i zaznaczonym błędem',
} as const;

export const problem = {
  title: 'Dlaczego odręczne nuty to informatyczny koszmar?',
  body:
    'Programy muzyczne od lat świetnie radzą sobie ze sterylnym, generowanym komputerowo drukiem. ' +
    'Kiedy jednak widzą ołówek, skrzywioną pięciolinię i zamazaną główkę nuty – poddają się, uznając to za defekt. ' +
    'Tradycyjne algorytmy wymagają idealnych odstępów typograficznych, a ludzkie pismo łamie wszelkie zasady geometrii.',
  quote: 'Odzyskać setki godzin.',
  quoteCaption: 'Nasz cel',
  closing:
    'Nauczyciele harmonii w szkołach muzycznych spędzają setki godzin rocznie na żmudnym sprawdzaniu odręcznych prac. ' +
    'Chcemy stworzyć narzędzie, które wykona tę mechaniczną pracę za nich, zdejmując brzemię wprowadzania nut do edytorów cyfrowych. ' +
    'Zamiast marnować czas na rozszyfrowywanie grafitu, nauczyciele będą mogli skupić się na pracy twórczej z uczniem.',
} as const;

export interface Step {
  number: string;
  title: string;
  body: string;
  /** Steps 1 and 2 show an illustration; step 3 renders the MusicXML preview. */
  image?: { src: string; alt: string };
  /** true places the illustration on the left and the copy on the right. */
  reversed?: boolean;
}

export const howItWorks = {
  eyebrow: 'Jak to działa',
  title: 'Od pogniecionej kartki do MusicXML.',
  steps: [
    {
      number: '01',
      title: 'Zwykłe zdjęcie.',
      body:
        'Nie potrzebujesz skanera. Wystarczy zwykłe zdjęcie z telefonu. ' +
        'Nasz system sam prostuje perspektywę i izoluje ślad ołówka.',
      image: {
        src: '/assets/step-01-scan.svg',
        alt: 'Pogniecona kartka ze szkolnym czterogłosem pisanym ołówkiem, krzywo, w nierównym świetle',
      },
    },
    {
      number: '02',
      title: 'Klasyfikacja obiektów przez CNN.',
      body:
        'Trenujemy głębokie sieci konwolucyjne do tego, aby rozpoznawały każdą nutę, klucz i krzywą laseczkę oddzielnie, ' +
        'radząc sobie z nakładającym się na siebie atramentem.',
      image: {
        src: '/assets/step-02-detection.svg',
        alt: 'To samo zdjęcie z maskami pikseli: główki nut, laseczki i klucze zaznaczone osobnymi kolorami, z etykietami pewności modelu',
      },
      reversed: true,
    },
    {
      number: '03',
      title: 'Cyfrowy zapis i inteligentny asystent.',
      body:
        'Pojedyncze znaki są łączone w logiczną strukturę na podstawie reguł gramatyki muzycznej. ' +
        'Następnie system bezstratnie transkoduje je do formatu cyfrowego i przepuszcza przez algorytmy ' +
        'sprawdzające poprawność kontrapunktu klasycznego.',
    },
  ] satisfies Step[],
  /** Copy for the animated MusicXML placeholder that stands in for step 3. */
  preview: {
    badge: 'Placeholder · animacja',
    format: 'MusicXML',
    error: 'Błąd: zakazane równoległe kwinty między altem a tenorem',
    caption:
      'Podświetlone obiekty przeskakują na prawą stronę, układając się w czysty zapis cyfrowy; ' +
      'system zaznacza dwa akordy na czerwono.',
  },
} as const;

export const why = {
  eyebrow: 'Proof of concept',
  title: 'Zaczynamy od klasycznego czterogłosu wokalnego.',
  tiles: [
    { badge: 'Placeholder · ikona', caption: 'Nuty ułożone w chór' },
    { badge: 'Placeholder · ikona', caption: 'Tarcza z „haczykiem” – weryfikacja' },
  ],
  body:
    'Dlaczego akurat harmonia? Czterogłos wokalny to idealne, zamknięte środowisko dla sztucznej inteligencji. ' +
    'Z góry znana tonacja, metrum i dokładnie cztery głosy drastycznie redukują przestrzeń błędów systemu. ' +
    'Budujemy na tym nasz fundament (Proof of Concept), aby z czasem skalować model na bardziej złożone, ' +
    'swobodne formy kompozytorskie. Obecnie zbieramy dane do uczenia – każdy dostarczony przez Was zeszyt ' +
    'z harmonii to krok w stronę lepszego algorytmu!',
} as const;

export const newsletter = {
  eyebrow: 'Newsletter',
  title: 'Obserwuj, jak model uczy się czytać.',
  body:
    'Co kilka tygodni krótka wiadomość o postępach: co model już rozpoznaje, a na czym wciąż się myli.',
  submit: 'Zapisz się',
  consent:
    'Wyrażam zgodę na przetwarzanie mojego adresu e-mail w celu przesyłania newslettera o rozwoju projektu. ' +
    'Zgodę mogę wycofać w każdej chwili.',
  consentLink: 'Klauzula informacyjna',
  confirmation: 'Zapisane. Napiszemy, gdy będzie o czym.',
} as const;

export const closingCta = {
  title: 'Chcesz pomóc nam rozwijać Copyisto?',
  body:
    'Jesteś nauczycielem lub uczniem, który ma w szafie stare zeszyty z harmonii? Odezwij się do nas!',
  credits:
    'Za przesłane materiały zbierasz kredyty do wykorzystania w narzędziu. Im więcej przyślesz, tym więcej ich masz.',
  creditsLink: 'Jak to działa',
  emailCta: 'Napisz e-mail',
  note:
    'Wysyłka zajmuje minutę. W zamian bezpłatny wczesny dostęp na 12 miesięcy od uruchomienia narzędzia.',
} as const;

export const creditsPopover = {
  label: 'Stan Twoich kredytów',
  prompt: 'Podaj adres, z którego wysyłałeś/aś materiały.',
  submit: 'Sprawdź',
  resultLabel: 'Twoje konto',
  result:
    'Mamy Twoje materiały. Kredyty są już naliczane — przelicznik podamy przy uruchomieniu narzędzia.',
  reset: 'Sprawdź inny adres',
} as const;

export const EMAIL_PLACEHOLDER = 'twoj@email.pl';
