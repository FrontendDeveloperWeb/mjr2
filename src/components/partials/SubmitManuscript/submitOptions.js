// Static option/data sets for the multi-step manuscript submission flow.
// Kept isolated to this page's partials so future data/API changes here can't
// ripple into other pages (per the repo's page-isolation rule).

/* ---------------- Step 1: Article Type ---------------- */
export const ARTICLE_TYPES = [
  'Original Manuscript',
  'Review Article',
  'Short Communication',
  'Case Report',
  'Editorial',
  'Letter to the Editor',
].map((v) => ({ value: v, label: v }));

/* ---------------- Step 2: Attach Files ---------------- */
// Item types offered for each attached file. The asterisked entry mirrors the
// reference default ("*Title Page with author details").
export const ITEM_TYPES = [
  'Cover Letter',
  '*Title Page with author details',
  'Manuscript without author details',
  'Conflict of interest',
  'Compliance with Ethics Requirements',
  'Graphical Abstract',
  'Author biography (for review paper only)',
  'Research Highlights',
].map((v) => ({ value: v, label: v }));

// Checklist shown in the Attach-Files sidebar once a file is attached.
export const REQUIRED_ITEMS = [
  'Cover Letter',
  'Title Page with author details',
  'Manuscript without author details',
  'Conflict of interest',
  'Compliance with Ethics Requirements',
  'Graphical Abstract',
  'Author biography (for review paper only)',
  'Research Highlights',
];

// Italic guidance notes that accompany the checklist (verbatim from reference).
export const SUBMISSION_NOTES = [
  'Note: As an open access journal with no subscription charges, a fee (Article Publishing Charge, APC) is payable by the author or research funder to cover the costs associated with publication. This ensures your article will be immediately and permanently free to access by everyone. The Article Publishing Charge for this journal is $4400.',
  'For title page, please ensure to update the complete list of authors, corresponding affiliation, corresponding author information and footnotes, if any.',
  'Please upload tables in editable format and Kindly ensure that all the references, tables and figures are cited correctly within the text of the article before submitting the revised version.',
  'Authors should note that the acceptance rate in this journal is exceptionally low, around 5%; only the most novel, methodologically rigorous, and impactful manuscripts are selected for peer review.',
];

/* ---------------- Step 3: General Information ---------------- */
export const SECTION_OPTIONS = [
  'None',
  'Agricultural Sciences',
  'Biological Sciences',
  'Chemistry',
  'Computer Science',
  'Engineering',
  'Materials Science',
  'Medicine',
  'Physics',
  'Social Sciences',
].map((v) => ({ value: v, label: v }));

// Checkable classification tree for the "Add Classifications" modal. Leaves are
// what get selected; parents are grouping headers. Keys are classification codes.
export const CLASSIFICATION_TREE = [
  {
    title: '100 Physical Sciences',
    key: '100',
    children: [
      { title: '110 Chemistry', key: '110' },
      { title: '120 Physics', key: '120' },
      { title: '130 Materials Science', key: '130' },
      { title: '140 Earth & Planetary Sciences', key: '140' },
    ],
  },
  {
    title: '200 Life Sciences',
    key: '200',
    children: [
      { title: '210 Biochemistry', key: '210' },
      { title: '220 Genetics', key: '220' },
      { title: '230 Microbiology', key: '230' },
      { title: '240 Agricultural Sciences', key: '240' },
    ],
  },
  {
    title: '300 Health Sciences',
    key: '300',
    children: [
      { title: '310 Medicine', key: '310' },
      { title: '320 Pharmacology', key: '320' },
      { title: '330 Nursing', key: '330' },
    ],
  },
  {
    title: '400 Engineering & Technology',
    key: '400',
    children: [
      { title: '410 Computer Science', key: '410' },
      { title: '420 Electrical Engineering', key: '420' },
      { title: '430 Mechanical Engineering', key: '430' },
      { title: '440 Civil Engineering', key: '440' },
    ],
  },
];

// Flat map of leaf key -> label, used to render selected classification tags.
export const CLASSIFICATION_LABELS = CLASSIFICATION_TREE.reduce((acc, group) => {
  group.children.forEach((leaf) => {
    acc[leaf.key] = leaf.title;
  });
  return acc;
}, {});
