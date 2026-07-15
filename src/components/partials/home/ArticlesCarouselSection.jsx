import { useRef } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ArticleCarouselCard from './ArticleCarouselCard.jsx';
import { useNavigate } from 'react-router-dom';

const CAROUSEL_RESPONSIVE_SETTINGS = [
  { breakpoint: 1200, settings: { slidesToShow: 3 } }, // Screens smaller than 1200px
  { breakpoint: 992, settings: { slidesToShow: 2 } },  // Screens smaller than 992px
  { breakpoint: 768, settings: { slidesToShow: 1 } },  // Screens smaller than 768px
];

export default function ArticlesCarouselSection({ articles, title = "Article" }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  return (
    <section className="artical-sec">
      <div className="sd-articles-section py-5">
        <div className="container" style={{ maxWidth: '1380px' }}>

          {/* SECTION TITLE */}
          <div className="text-center mb-5">
            <h2 className="sd-articles-main-heading">{title}</h2>
          </div>

          {/* ANT DESIGN CAROUSEL / SLIDER */}
          <div className="sd-articles-carousel-wrapper">
            <Carousel
              ref={carouselRef}
              dots={false}
              infinite={true}
              slidesToShow={3}
              responsive={CAROUSEL_RESPONSIVE_SETTINGS}
              arrows={false}
            >
              {articles.map((article) => (
                <ArticleCarouselCard key={article.id} article={article} />
              ))}
            </Carousel>
          </div>
          <div className='d-flex align-items-center justify-content-end mt-3'>
            <button
              className="read-more-btn"
              onClick={() => navigate("/news")}
            >
              Read More
            </button>
          </div>
          {/* CUSTOM CONTROLS / PAGINATION BUTTONS Linked with Carousel Actions */}
          <div className="d-flex justify-content-center align-items-center mt-5 gap-1">
            <button
              className="sd-btn-pag-arrow sd-arrow-left"
              onClick={() => carouselRef.current.prev()}
            >
              <LeftOutlined />
            </button>
            <button
              className="sd-btn-pag-arrow sd-arrow-right active"
              onClick={() => carouselRef.current.next()}
            >
              <RightOutlined />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
