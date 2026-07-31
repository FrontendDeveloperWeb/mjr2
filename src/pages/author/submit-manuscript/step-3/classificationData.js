// Static option/data sets for Step 3 (General Information). Kept co-located with
// the page so this step stays self-contained and future data/API changes here
// can't ripple into other pages.

export const SECTION_OPTIONS = [
  'None',
  'Medicine',
  'Pharmaceutical Sciences',
  'Dentistry',
  'Physical Therapy',
  'Veterinary Medicine',
  'Basic and Biological Sciences',
  'Mathematics, Engineering, and Computer Sciences',
  'Agricultural Sciences',
].map((v) => ({ value: v, label: v }));

// Checkable classification catalogue for the "Select Submission Classifications"
// modal. Top-level entries are grouping headers (codes 100–800 from the
// reference); leaves are what actually get selected. Keys are the codes.
export const CLASSIFICATION_TREE = [
  {
    title: '100: Science',
    key: '100',
    children: [
      { title: '110: Biology', key: '110' },
      { title: '120: Chemistry', key: '120' },
      { title: '130: Physics', key: '130' },
    ],
  },
  {
    title: '200: Oral and Dental Medicine',
    key: '200',
    children: [
      { title: '210: Oral Surgery', key: '210' },
      { title: '220: Orthodontics', key: '220' },
      { title: '230: Periodontology', key: '230' },
    ],
  },
  {
    title: '300: Veterinary Medicine',
    key: '300',
    children: [
      { title: '310: Animal Pathology', key: '310' },
      { title: '320: Veterinary Surgery', key: '320' },
    ],
  },
  {
    title: '400: Pharmacy',
    key: '400',
    children: [
      { title: '410: Pharmacology', key: '410' },
      { title: '420: Pharmaceutics', key: '420' },
      { title: '430: Pharmacognosy', key: '430' },
    ],
  },
  {
    title: '500: Engineering',
    key: '500',
    children: [
      { title: '510: Chemical Engineering', key: '510' },
      { title: '520: Biomedical Engineering', key: '520' },
      { title: '530: Computer Engineering', key: '530' },
    ],
  },
  {
    title: '600: Agriculture',
    key: '600',
    children: [
      { title: '610: Agronomy', key: '610' },
      { title: '620: Soil Science', key: '620' },
      { title: '630: Horticulture', key: '630' },
    ],
  },
  {
    title: '700: Medicine',
    key: '700',
    children: [
      { title: '710: Cardiology', key: '710' },
      { title: '720: Neurology', key: '720' },
      { title: '730: Oncology', key: '730' },
      { title: '740: Pediatrics', key: '740' },
    ],
  },
  {
    title: '800: Physical Therapy',
    key: '800',
    children: [
      { title: '810: Rehabilitation', key: '810' },
      { title: '820: Sports Therapy', key: '820' },
    ],
  },
];

// Flat map: leaf key -> title (used to render selected classification labels).
export const CLASSIFICATION_LABELS = CLASSIFICATION_TREE.reduce((acc, group) => {
  group.children.forEach((leaf) => {
    acc[leaf.key] = leaf.title;
  });
  return acc;
}, {});

// All parent (group) keys — used for Expand All in the modal.
export const PARENT_KEYS = CLASSIFICATION_TREE.map((g) => g.key);

// All selectable leaf keys — checking a parent in antd's Tree also reports the
// parent key, so we keep only leaves in the committed value.
export const LEAF_KEYS = new Set(Object.keys(CLASSIFICATION_LABELS));
