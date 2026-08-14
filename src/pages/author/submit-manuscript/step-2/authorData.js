// Static option set for Step 2's "Add New Author" modal. Co-located (not
// imported from step-6/manuscriptData.js) per this repo's page-isolation
// rule — step-6 belongs to a separate, older wizard flow.
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

export const TITLE_OPTIONS = ['Dr', 'Mr', 'Mrs', 'Ms', 'Prof'].map((t) => ({ value: t.toLowerCase(), label: t }));

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

// The Subjects API returns a parent/children tree (same shape Step 1 already
// flattens) — needed here too since Subjects is a flat multi-select, not a tree.
export function flattenSubjects(nodes = []) {
  return nodes.flatMap((node) => [
    { value: node.id, label: node.name },
    ...(node.children?.length ? flattenSubjects(node.children) : []),
  ]);
}
