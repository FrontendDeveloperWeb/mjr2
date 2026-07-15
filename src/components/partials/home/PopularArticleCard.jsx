import StatusPill from '../../shared/StatusPill/StatusPill.jsx';

export default function PopularArticleCard({ title, meta, badgeType = 'research-article' }) {
  const isOpenAccess = badgeType === 'open-access';

  return (
    <div className="sd-article-item-card">
      <h5 className="sd-art-title">{title}</h5>
      <div className="sd-art-meta">{meta}</div>
      <StatusPill variant={isOpenAccess ? 'open-access' : 'research'} />
    </div>
  );
}
