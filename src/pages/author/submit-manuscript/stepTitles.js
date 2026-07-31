// Shared stepper labels for the submit-manuscript wizard. Single source of
// truth so every step page's <Steps current={N}> indexes into the same list
// — keeps the 6 routes (step-1..step-6) aligned 1:1 with these 6 titles.
export const STEP_TITLES = [
  'Article Type Selection',
  'Attach Files',
  'General Information',
  'Additional Information',
  'Comments',
  'Manuscript Data',
];
