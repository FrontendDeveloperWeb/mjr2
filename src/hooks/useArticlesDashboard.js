import { useState } from 'react';

/**
 * Shared state for the article-dashboard pages (Latest Issues, Articles in Press):
 * pagination window + preview toggle. Each article card's Abstract/Graphical tab
 * is owned locally by the card itself (see ArticleCard), so it is intentionally
 * NOT tracked here.
 *
 * @param {Array}  articles - full article list to paginate.
 * @param {number} pageSize - cards shown per page.
 */
export function useArticlesDashboard(articles, pageSize = 2) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPreviews, setShowPreviews] = useState(false);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const articlesForPage = articles.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentPage,
    setCurrentPage,
    showPreviews,
    setShowPreviews,
    articlesForPage,
  };
}
