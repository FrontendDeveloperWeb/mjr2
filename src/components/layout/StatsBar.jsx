const STATS = [
  { icon: '/assets/img/articles-chapters.png', value: '25M+', label: 'Articles & Chapters' },
  { icon: '/assets/img/peer-reviewed.png', value: '4000+', label: 'Peer-reviewed journals' },
  { icon: '/assets/img/open-journals.png', value: '5000+', label: 'Open Access Journals' },
  { icon: '/assets/img/downloads.png', value: '100M+', label: 'Downloads' },
];

export default function StatsBar() {
  return (
    <div className="sd-stats-bar">
      <div className="sd-stats-container">
        {STATS.map((stat) => (
          <div className="sd-stat-item" key={stat.label}>
            <img src={stat.icon} alt="" />
            <div>
              <p className="sd-title">{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
