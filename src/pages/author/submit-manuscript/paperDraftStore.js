// Centralized wizard state for the (new) Overview-first submission flow —
// every step (Overview, Author, Keywords, Upload Files, Final Submission)
// reads/writes this so:
//   1. Back-navigation to any step rehydrates its fields instead of
//      resetting them.
//   2. Step 1 can tell "first save" (slug is null → POST /papers/store)
//      apart from "editing after Back" (slug exists → update endpoint)
//      instead of creating a duplicate paper every time.
//   3. Step 5's summary can render Steps 1-4's results without a
//      "get full paper" endpoint to re-fetch them from.
//
// This is a plain module rather than a React Context/Redux store on
// purpose: it needs to be readable synchronously during lazy useState
// initializers (before the first render) and from outside the React tree,
// which a Context can't do without an extra hook/provider layer that adds
// no behavior a plain persisted module doesn't already give here. Backed by
// sessionStorage (not just an in-memory variable) so state survives a full
// page reload within the same tab, not just SPA navigation.
//
// Deliberately separate from manuscriptStore.js: that module backs the
// older step-1..step-6 flow, and pdfGenerator.js reads its `step1` key
// expecting that flow's shape (`articleType`/`orcid`). Reusing it here would
// silently corrupt that unrelated flow's data.
const STORAGE_KEY = 'mjr.paperDraft';

function emptyState() {
  return {
    slug: null,
    step1Data: null, // full paper object returned by /papers/store (or its update endpoint)
    step2Data: [], // authors [{ authorId, name, isCorresponding, contributionHtml, contributionText }]
    step3Data: { existingIds: [], existingLabels: [], newKeywords: [] },
    step4Data: [], // uploaded files [{ type, name, version, size }] — raw File objects never survive a reload
    step5Data: { checked: {}, remarks: '' },
  };
}

function readStorage() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyState(), ...JSON.parse(raw) } : emptyState();
  } catch (error) {
    console.error('[paperDraftStore] Failed to read sessionStorage, starting fresh:', error);
    return emptyState();
  }
}

function writeStorage(next) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.error('[paperDraftStore] Failed to persist to sessionStorage:', error);
  }
}

let state = readStorage();

/** The full wizard state — `{ slug, step1Data, step2Data, step3Data, step4Data, step5Data }`. */
export function getWizardState() {
  return state;
}

/** Step 1 (Overview) — the paper object from /papers/store or its update endpoint. */
export function setStep1Data(paper) {
  state = { ...state, slug: paper?.slug ?? state.slug, step1Data: paper };
  writeStorage(state);
}

/** Step 2 (Author) — the resolved authors list, kept rich enough to both display AND re-hydrate the form. */
export function setStep2Data(authors) {
  state = { ...state, step2Data: authors || [] };
  writeStorage(state);
}

/** Step 3 (Keywords) — existing-keyword IDs/labels plus any newly-typed keywords. */
export function setStep3Data(keywords) {
  state = { ...state, step3Data: keywords };
  writeStorage(state);
}

/** Step 4 (Upload Files) — uploaded-file metadata (never the raw File objects — see emptyState). */
export function setStep4Data(files) {
  state = { ...state, step4Data: files || [] };
  writeStorage(state);
}

/** Step 5 (Final Submission) — checklist + remarks, so re-visiting keeps what was already filled in. */
export function setStep5Data(data) {
  state = { ...state, step5Data: data };
  writeStorage(state);
}

/** Clears the entire wizard state — call after a completed/abandoned submission. */
export function clearWizardState() {
  state = emptyState();
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('[paperDraftStore] Failed to clear sessionStorage:', error);
  }
}
