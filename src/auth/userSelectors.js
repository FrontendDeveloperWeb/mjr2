// Centralized helpers for reading user data out of API responses and the
// stored session object, so every consumer (Header, Login, Register, ...)
// derives the same values the same way instead of re-implementing this
// optional-chaining/fallback logic inline.

/**
 * Normalize an API response into a flat user object, regardless of whether
 * the backend nests it under `data.user` (current shape) or returns it as a
 * flat `data` payload.
 * @param {{ data?: object }} response - the raw response from useMutation/apiClient
 * @returns {object} flat user object (never null/undefined)
 */
export function extractUserFromResponse(response) {
  return response?.data?.user || response?.data || {};
}

/**
 * The name to show in the UI: prefers a combined display name, then the
 * backend's own `name` field, then falls back to the username.
 * @param {object|null} user
 * @returns {string}
 */
export function getUserDisplayName(user) {
  const first = user?.first_name?.trim();
  const last = user?.last_name?.trim();
  if (first || last) return [first, last].filter(Boolean).join(' ');
  return user?.name?.trim() || user?.user_name?.trim() || '';
}

/**
 * Avatar initials, e.g. "noman" + "waheed" -> "NW". Falls back to the
 * leading letter(s) of `name` or `user_name` when first/last aren't both set.
 * @param {object|null} user
 * @returns {string}
 */
export function getUserInitials(user) {

  const first = user?.data?.user?.first_name?.trim();
  const last = user?.data?.user?.last_name?.trim();
  if (first && last) {
    return `${first[0]}${last[0]}`.toUpperCase();
  }

  const fallback = user?.name?.trim() || user?.user_name?.trim() || '';
  return fallback
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

/**
 * Display-friendly role name (Title Case), defaulting to "Author" — the
 * only role the app currently registers/logs in as.
 * @param {string|undefined} role
 * @returns {string}
 */
export function getUserRole(role) {
  if (!role) return 'Author';
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}
