// localStorage-backed CRUD for in-progress manuscript drafts (no React here —
// kept framework-agnostic so useManuscriptDraft.js is a thin hook wrapper).
// Two keys: one map of all drafts, one pointer to the draft currently being
// edited (so refreshing/closing the tab mid-flow resumes the same draft).
const DRAFTS_KEY = 'mjr.manuscriptDrafts';
const ACTIVE_DRAFT_KEY = 'mjr.activeDraftId';

function readDrafts() {
  try {
    return JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {};
  } catch {
    return {};
  }
}

function writeDrafts(drafts) {
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function getActiveDraftId() {
  return localStorage.getItem(ACTIVE_DRAFT_KEY);
}

export function startNewDraft() {
  const id = `draft_${Date.now()}`;
  localStorage.setItem(ACTIVE_DRAFT_KEY, id);
  return id;
}

/** Resumes the in-progress draft if one exists, otherwise starts a new one. */
export function getOrCreateActiveDraftId() {
  return getActiveDraftId() || startNewDraft();
}

export function getDraft(id) {
  return readDrafts()[id] || null;
}

/** All drafts, newest first — backs an "Incomplete Submissions" list. */
export function listDrafts() {
  return Object.values(readDrafts()).sort(
    (a, b) => new Date(b.dateBegan) - new Date(a.dateBegan),
  );
}

/** Merges `patch` into the draft, creating it on first save. Always leaves status "Incomplete". */
export function saveDraft(id, patch) {
  const drafts = readDrafts();
  const now = new Date().toISOString();
  const existing = drafts[id];
  const next = {
    id,
    title: '(Title not yet Supplied)',
    dateBegan: now,
    ...existing,
    ...patch,
    status: 'Incomplete',
    statusDate: now,
  };
  drafts[id] = next;
  writeDrafts(drafts);
  return next;
}

/** Drops the draft (submission is complete or abandoned) and clears the active pointer if it matches. */
export function removeDraft(id) {
  const drafts = readDrafts();
  delete drafts[id];
  writeDrafts(drafts);
  if (getActiveDraftId() === id) {
    localStorage.removeItem(ACTIVE_DRAFT_KEY);
  }
}
