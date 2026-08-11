// Static option/data sets for the Register — Step 2 profile form.
// Kept isolated to this page's partials so future data/API changes here
// can't ripple into other pages (per the repo's page-isolation rule).

export const TITLE_OPTIONS = [
  { value: 'Dr.', label: 'Dr.' },
  { value: 'Prof.', label: 'Prof.' },
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Ms.', label: 'Ms.' },
  { value: 'Mrs.', label: 'Mrs.' },
  { value: 'Mx.', label: 'Mx.' },
];

export const COUNTRY_OPTIONS = [
  'Australia',
  'Canada',
  'China',
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

// Personal Classifications (subjects) and Personal Keywords are fetched live
// from the Subjects/Keywords APIs (see PersonalClassificationsModal.jsx and
// PersonalKeywordsModal.jsx) — no static option list is kept here for them.

export const MIN_CLASSIFICATIONS = 1;
export const MIN_KEYWORDS = 5;
