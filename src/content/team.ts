export interface TeamMember {
  name: string;
  /** TODO: replace the placeholder copy carried over from the design. */
  bio: string;
  /** The design gives the second member a quoted, rule-marked treatment. */
  emphasised?: boolean;
}

export const team: TeamMember[] = [
  { name: 'Michał', bio: 'UZUPEŁNIJ OPIS MICHAŁ' },
  { name: 'Oleś', bio: 'UZUPEŁNIJ OPIS OLEŚ', emphasised: true },
];

export const teamStatement =
  'Jesteśmy dwójką inżynierów i muzyków, którzy postanowili rozwiązać problem, ' +
  'o który od lat potykają się największe komercyjne programy muzyczne.';
