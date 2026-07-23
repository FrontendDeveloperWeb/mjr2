// Spreads {...rest} onto the root node so AntD's Carousel can clone its
// slide-sizing props (style, tabIndex, etc.) straight through to the DOM.
export default function ArticleCarouselCard({ article, ...rest }) {
  return (
    <div className="p-2 d-flex justify-content-center" {...rest}>
      <div
        className={`sd-article-card ${article.isActive ? 'sd-active-dark-card' : 'sd-light-card'}`}
        style={{ margin: '0 auto' }}
      >
        <div className="sd-card-img-box">
          <img src={article.img} alt={article.title} />
          <div className="sd-gold-star-accent">✦</div>
        </div>

        <div className="sd-card-body-content">
          <h4 className="sd-art-card-title">{article.title}</h4>
          <p className="sd-art-card-desc">{article.desc}</p>

          <div className="sd-card-footer-meta d-flex align-items-center justify-content-between pt-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                alt={article.author}
                className="sd-author-avatar"
              />
              <span className="sd-meta-text-info">
                {article.author} <span className="mx-1">|</span> {article.date}
              </span>
            </div>
            <a href="#read" className="sd-read-more-link">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
}
