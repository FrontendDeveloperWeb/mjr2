// Client-side session store for the author area: the full user object
// returned by the login/registration APIs is persisted here (localStorage),
// and doubles as this app's global auth state — ProtectedRoute, GuestRoute
// and the Header all read it through these helpers.

const AUTH_KEY = 'mjr.auth';
const ORCID_KEY = 'mjr.orcid';

/** Persist a logged-in session. `profile` is the API's user object (role/name/etc). */
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

/** The persisted user object (role/name/user_name/etc), or null when logged out. */
export function getUser() {
  try {
    const session = JSON.parse(localStorage.getItem(AUTH_KEY));
    if (!session?.authed) return null;
    const { authed, ...user } = session;
    return user;
  } catch {
    return null;
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
