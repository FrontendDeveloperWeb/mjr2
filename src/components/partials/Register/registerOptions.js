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

// Checkable classification tree — mirrors the reference "Select Personal
// Classifications" dialog. Leaves are what actually get selected; parents are
// grouping headers. Keys are the classification codes.
export const CLASSIFICATION_TREE = [
  {
    title: '100: Science',
    value: '100',
    key: '100',
    children: [
      { title: '110: Biology', value: '110', key: '110' },
      { title: '120: Chemistry', value: '120', key: '120' },
      { title: '130: Physics', value: '130', key: '130' },
      { title: '140: Mathematics', value: '140', key: '140' },
    ],
  },
  {
    title: '200: Oral and Dental Medicine',
    value: '200',
    key: '200',
    children: [
      { title: '210: Endodontics', value: '210', key: '210' },
      { title: '220: Orthodontics', value: '220', key: '220' },
      { title: '230: Periodontics', value: '230', key: '230' },
    ],
  },
  {
    title: '300: Veterinary Medicine',
    value: '300',
    key: '300',
    children: [
      { title: '310: Animal Pathology', value: '310', key: '310' },
      { title: '320: Veterinary Surgery', value: '320', key: '320' },
    ],
  },
  {
    title: '400: Pharmacy',
    value: '400',
    key: '400',
    children: [
      { title: '410: Pharmacology', value: '410', key: '410' },
      { title: '420: Pharmaceutics', value: '420', key: '420' },
      { title: '430: Clinical Pharmacy', value: '430', key: '430' },
    ],
  },
  {
    title: '500: Engineering',
    value: '500',
    key: '500',
    children: [
      { title: '510: Civil Engineering', value: '510', key: '510' },
      { title: '520: Electrical Engineering', value: '520', key: '520' },
      { title: '530: Mechanical Engineering', value: '530', key: '530' },
      { title: '540: Software Engineering', value: '540', key: '540' },
    ],
  },
  {
    title: '600: Agriculture',
    value: '600',
    key: '600',
    children: [
      { title: '610: Agronomy', value: '610', key: '610' },
      { title: '620: Horticulture', value: '620', key: '620' },
      { title: '630: Soil Science', value: '630', key: '630' },
    ],
  },
  {
    title: '700: Medicine',
    value: '700',
    key: '700',
    children: [
      { title: '710: Cardiology', value: '710', key: '710' },
      { title: '720: Neurology', value: '720', key: '720' },
      { title: '730: Oncology', value: '730', key: '730' },
      { title: '740: Pediatrics', value: '740', key: '740' },
    ],
  },
  {
    title: '800: Physical Therapy',
    value: '800',
    key: '800',
    children: [
      { title: '810: Sports Rehabilitation', value: '810', key: '810' },
      { title: '820: Orthopedic Therapy', value: '820', key: '820' },
    ],
  },
];

// Flat lookup of leaf { key -> title } so the main form can render friendly
// labels for whatever codes the classifications modal returns.
export const CLASSIFICATION_LABELS = CLASSIFICATION_TREE.reduce((acc, parent) => {
  (parent.children ?? []).forEach((child) => {
    acc[child.key] = child.title;
  });
  return acc;
}, {});

export const MIN_CLASSIFICATIONS = 1;
export const MIN_KEYWORDS = 5;
