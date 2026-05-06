export const DISCIPLINES = [
  { label: 'MMA', value: 'MMA' },
  { label: 'BJJ', value: 'BJJ' },
  { label: 'Boxing', value: 'BOXING' },
  { label: 'Muay Thai', value: 'MUAY_THAI' },
  { label: 'Kickboxing', value: 'KICKBOXING' },
  { label: 'Wrestling', value: 'WRESTLING' },
  { label: 'Judo', value: 'JUDO' },
  { label: 'Karate', value: 'KARATE' },
  { label: 'K-1', value: 'K1' },
  { label: 'Sambo', value: 'SAMBO' },
  { label: 'Other', value: 'OTHER' },
] as const;

export type DisciplineValue = (typeof DISCIPLINES)[number]['value'];
