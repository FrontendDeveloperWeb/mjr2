import { useEffect, useRef } from 'react';
import { getOrCreateActiveDraftId, getActiveDraftId, saveDraft, removeDraft } from './draftStorage.js';
import { setStepData, getManuscriptData } from './manuscriptStore.js';

const AUTOSAVE_DELAY = 600;

/** Stable draft id for the in-progress submission — created once, then reused
 * across every step page and survives refresh/browser close (localStorage-backed). */
export function useDraftId() {
  const idRef = useRef(null);
  if (idRef.current === null) idRef.current = getOrCreateActiveDraftId();
  return idRef.current;
}

/**
 * Call from every step page with that page's own live state. Keeps the
 * cross-step in-memory store (`manuscriptStore.js`) up to date on every
 * keystroke, and debounces a full-draft snapshot into localStorage so a
 * refresh or closed tab never loses in-progress work.
 */
export function useDraftAutosave(draftId, stepKey, stepNumber, stepData) {
  const timerRef = useRef(null);

  useEffect(() => {
    setStepData(stepKey, stepData);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // The draft may have been completed/removed (e.g. step 6 just submitted
      // and navigated away) between this timer being set and firing — don't
      // resurrect it.
      if (getActiveDraftId() !== draftId) return;
      const formData = getManuscriptData();
      const patch = { currentStep: stepNumber, formData };
      const title = formData.step6?.fullTitle;
      if (title?.trim()) patch.title = title;
      saveDraft(draftId, patch);
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftId, stepKey, stepNumber, stepData]);

  // Flush immediately on unmount (step change) or tab close — don't lose the
  // last debounce window's edits. Same completed-draft guard as above: a
  // completion (step 6 submit) clears the active pointer just before
  // navigating away, and that unmount must not re-save the draft it just
  // finished.
  useEffect(() => {
    const flush = () => {
      clearTimeout(timerRef.current);
      if (getActiveDraftId() !== draftId) return;
      const formData = getManuscriptData();
      saveDraft(draftId, { currentStep: stepNumber, formData });
    };
    window.addEventListener('beforeunload', flush);
    return () => {
      window.removeEventListener('beforeunload', flush);
      flush();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftId]);
}

/** Call once the manuscript is actually submitted — the draft is no longer "Incomplete". */
export function completeDraft(draftId) {
  removeDraft(draftId);
}
