import { useState, useEffect, useRef, useCallback } from 'react';

// Batch size for each scroll load (the initial batch included). Single source
// of truth so swapping to a real paginated API only touches this file.
export const INFINITE_SCROLL_PAGE_SIZE = 10;

// Simulated network latency before the next batch is appended.
const LOAD_DELAY = 500;

/**
 * Load-on-scroll windowing over a static array. Deliberately mirrors a
 * paginated API: `page` + `pageSize` produce the visible slice and the
 * `hasMore` flag, so wiring a backend later means replacing the setTimeout
 * slice below with `fetch(page, limit)` and appending the response — the
 * consuming components stay untouched.
 *
 * @param {Array}  items    - full source array (already filtered / sorted).
 * @param {number} pageSize - items appended per batch.
 * @returns {{ visibleItems: Array, hasMore: boolean, loading: boolean, sentinelRef: object }}
 */
export function useInfiniteScroll(items, pageSize = INFINITE_SCROLL_PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);
  const timerRef = useRef(null);

  // Reset the window whenever the source list changes (filter / sort / route).
  useEffect(() => {
    setPage(1);
  }, [items]);

  const visibleItems = items.slice(0, page * pageSize);
  const hasMore = visibleItems.length < items.length;

  const loadMore = useCallback(() => {
    // Functional update doubles as the "already fetching" guard, keeping this
    // callback stable so the observer effect below doesn't re-subscribe.
    setLoading((isLoading) => {
      if (isLoading) return isLoading;
      timerRef.current = setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoading(false);
      }, LOAD_DELAY);
      return true;
    });
  }, []);

  // Observe the bottom sentinel and pull the next batch as it nears the viewport.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '120px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  // Clear any pending batch timer on unmount.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { visibleItems, hasMore, loading, sentinelRef };
}
