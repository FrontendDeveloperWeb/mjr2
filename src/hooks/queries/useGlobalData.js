import useQuery from "@/hooks/reactQuery/useQuery";

const GLOBAL_DATA_ENDPOINT = "getGlobalData";

/**
 * Single source of truth for the global website/journal payload.
 *
 * The endpoint name IS the React Query cache key (see hooks/reactQuery/useQuery.js),
 * so every call below — regardless of which page or component makes it, and
 * regardless of the `select` passed in — reads and writes the SAME cache entry.
 * The network request fires once; every consumer after that is served from cache
 * until staleTime elapses. React Query also dedupes concurrent mounts on its own,
 * so two components rendering on the same tick still cause only one fetch.
 *
 * Don't call this directly from pages. Build a feature selector on top of it
 * (see useHomeData.js for the pattern) so each page only re-renders when the
 * slice of data it actually reads changes, not on every field in the payload.
 *
 * @param {(journal: object | null) => any} [select] - Projects the cached
 *   journal object down to what the caller needs. Omit to get the raw object.
 */
export function useGlobalData(select) {
  return useQuery(GLOBAL_DATA_ENDPOINT, {
    select: (response) => {
      const journal = response?.data?.data || null;
      return select ? select(journal) : journal;
    },
    // Global site config changes rarely — cache aggressively so navigating
    // between pages never re-fetches it within a session.
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}

export default useGlobalData;
