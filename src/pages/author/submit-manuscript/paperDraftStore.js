// In-memory draft store for the (new) Overview-first submission flow,
// keyed by the paper's `slug` once Step 1's /papers/store call succeeds.
// The upcoming Author/Keywords/Upload Files/Final Submission steps read
// this to know which paper draft they're continuing.
//
// Deliberately separate from manuscriptStore.js: that module backs the
// older step-1..step-6 flow, and pdfGenerator.js reads its `step1` key
// expecting that flow's shape (`articleType`/`orcid`). Reusing it here would
// silently corrupt that unrelated flow's data.
let state = { slug: null, paper: null };

/** Persist the paper draft returned by /papers/store. */
export function setPaperDraft(paper) {
  state = { slug: paper?.slug ?? null, paper };
}

/** The current paper draft (`{ slug, paper }`), or nulls before Step 1 completes. */
export function getPaperDraft() {
  return state;
}

/** Clears the draft — call after a completed/abandoned submission. */
export function clearPaperDraft() {
  state = { slug: null, paper: null };
}
