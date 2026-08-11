// Minimal client-side session store for the author area. There is no backend
// yet, so auth state lives in localStorage behind these helpers. When the real
// API arrives, only this file changes — callers keep using the same functions.

const AUTH_KEY = 'mjr.auth';
const ORCID_KEY = 'mjr.orcid';

/** Persist a logged-in session. `profile` can carry role/name later. */
export function login(profile = {}) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ authed: true, ...profile }));
}

/** Clear the current session. */
export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

/** True when a session is present. */
export function isAuthenticated() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY))?.authed === true;
  } catch {
    return false;
  }
}

/** The linked ORCID iD for this user, or null when not yet linked. */
export function getOrcid() {
  return localStorage.getItem(ORCID_KEY) || null;
}

/** Link (mock) an ORCID iD and return it. Swap for the real OAuth flow later. */
export function linkOrcid(id = '0009-0009-3687-0976') {
  localStorage.setItem(ORCID_KEY, id);
  return id;
}
