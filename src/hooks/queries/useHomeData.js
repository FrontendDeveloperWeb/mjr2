import useGlobalData from "./useGlobalData";

/**
 * Slices the shared global-data cache down to exactly what the Home page
 * renders today. Add a field here only when a Home component starts
 * consuming it — this stays a thin projection, not a mirror of the API.
 *
 * @param {object} journal - Raw journal object from the global-data cache.
 */
function selectHomeData(journal) {
  if (!journal) return null;

  return journal;
}

/**
 * Home-page data hook. Triggers no network request of its own — it rides on
 * the shared useGlobalData() query, so calling this alongside other
 * feature hooks (useAboutData, useFooterData, ...) that read the same cache
 * still results in exactly one API call.
 */
export function useHomeData() {
  const { data, isLoading, isError, error, refetch } = useGlobalData(selectHomeData);
  return { home: data, isLoading, isError, error, refetch };
}

export default useHomeData;
