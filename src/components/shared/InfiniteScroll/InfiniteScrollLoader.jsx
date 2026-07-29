import { Spin } from 'antd';

/**
 * Bottom sentinel + spinner for load-on-scroll lists. Stateless and strictly
 * prop-driven — `useInfiniteScroll` owns page/limit/hasMore/loading and passes
 * them in. The hook's IntersectionObserver watches `sentinelRef`, so this
 * element must stay mounted while there is more to load.
 */
export default function InfiniteScrollLoader({ sentinelRef, loading, hasMore, className = 'mt-5' }) {
  if (!hasMore) return null;

  return (
    <div
      ref={sentinelRef}
      className={`sd-infinite-scroll-loader d-flex justify-content-center align-items-center ${className}`}
      style={{ minHeight: 48 }}
    >
      {loading && <Spin />}
    </div>
  );
}
