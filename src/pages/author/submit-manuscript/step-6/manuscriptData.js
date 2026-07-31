// Static option/data sets for Step 6 (Manuscript Data). Co-located so this step
// stays self-contained.

export const COUNTRY_OPTIONS = [
  'Australia',
  'Canada',
  'China',
  'Egypt',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan',
  'Netherlands',
  'Pakistan',
  'Saudi Arabia',
  'Spain',
  'Sweden',
  'Switzerland',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
].map((c) => ({ value: c, label: c }));

export const GRANT_RECIPIENT_OPTIONS = [
  'xyz  ',
  'Corresponding Author',
  'First Author',
  'Institution',
].map((r) => ({ value: r, label: r }));

// Seed author shown on entry (mirrors the reference "You" row that still needs
// review — hence warn: true).
export const SEED_AUTHORS = [
  {
    id: 'seed-1',
    name: 'xyz ',
    roles: ['Corresponding Author', 'First Author', 'You'],
    meta: 'none',
    warn: true,
  },
];
