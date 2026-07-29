import { useState } from 'react';
import { useInfiniteScroll, INFINITE_SCROLL_PAGE_SIZE } from './useInfiniteScroll.js';

/**
 * Shared state for the article-dashboard pages (Latest Issues, Articles in Press):
 * a load-on-scroll window + preview toggle. Each article card's Abstract/Graphical
 * tab is owned locally by the card itself (see ArticleCard), so it is intentionally
 * NOT tracked here.
 *
 * `articlesForPage` keeps its name for the sections that map over it, but it is now
 * the growing scroll window rather than a fixed page slice. The scroll plumbing
 * (hasMore/loading/sentinelRef) is forwarded straight from useInfiniteScroll, so
 * moving to a real paginated API is a change in that one hook only.
 *
 * @param {Array}  articles - full article list to window.
 * @param {number} pageSize - cards appended per scroll batch.
 */
export function useArticlesDashboard(articles, pageSize = INFINITE_SCROLL_PAGE_SIZE) {
  const [showPreviews, setShowPreviews] = useState(false);
  const { visibleItems, hasMore, loading, sentinelRef } = useInfiniteScroll(articles, pageSize);

  return {
    showPreviews,
    setShowPreviews,
    articlesForPage: visibleItems,
    hasMore,
    loading,
    sentinelRef,
  };
}
