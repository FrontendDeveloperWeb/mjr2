// In-memory store for the submit-manuscript wizard. Each step page saves its
// own fields under its key before navigating; step 6 reads all of them back
// to build the final PDF summary. Module-level singleton is enough since the
// wizard is client-side routed (React Router), so the module stays loaded
// across step-1..step-6 navigation.
const data = {};

export function setStepData(key, values) {
  data[key] = values;
}

export function getManuscriptData() {
  return data;
}

/** Clears all in-memory step data — called after a completed submission so the next one starts empty. */
export function resetManuscriptStore() {
  Object.keys(data).forEach((key) => delete data[key]);
}
