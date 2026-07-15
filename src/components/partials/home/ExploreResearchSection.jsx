import { Carousel, Button } from 'antd';
import { ExperimentOutlined, ArrowRightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Tabs from '../../shared/Tabs/Tabs.jsx';
import PopularArticleCard from './PopularArticleCard.jsx';
import RecentPublicationCard from './RecentPublicationCard.jsx';

export default function ExploreResearchSection({ categories, popularArticles, recentPublications }) {
  return (
    <section>
      <div className="sd-content-section">

        {/* TOP STATS BAR */}


        <div className="container mx-auto px-4 mt-5">

          {/* MAIN TITLE HEADING */}
          <div className="text-center py-3">
            <h2 className="sd-explore-heading sd-serif">
              Explore scientific, technical, <br />
              and medical <span className="sd-title-italic">research</span>
            </h2>
          </div>

          <div className="sd-tabs-section-container py-5">
            <div className="container-fluid" style={{ maxWidth: '1400px' }}>

              {/* TABS HEADER NAVIGATION */}
              <div className="sd-custom-tabs-nav mb-4">
                <Tabs
                  defaultActiveKey="1"
                  tabBarExtraContent={
                    <a href="#all" className="sd-view-all-pub">
                      View all Publications <ArrowRightOutlined className="ms-1" />
                    </a>
                  }
                  items={[
                    { key: '1', label: <span><ExperimentOutlined className="me-2" />Physical Science and Engineering</span> },
                    { key: '2', label: 'Life Sciences' },
                    { key: '3', label: 'Health Sciences' },
                    { key: '4', label: 'Social Sciences and Humanities' },
                  ]}
                />
              </div>

              {/* 3-COLUMN LAYOUT GRID */}
              <div className="row g-4">

                {/* LEFT SIDEBAR: Browse Categories */}
                <div className="col-12 col-md-4 col-lg-3">
                  <div className="sd-sidebar-card h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="sd-sidebar-header-title">Browse journals and books in:</div>
                      <ul className="sd-sidebar-ul">
                        {categories.map((cat, idx) => (
                          <li key={idx} className="sd-sidebar-li-item">
                            <ExperimentOutlined className="sd-li-icon me-2" />
                            <span className="sd-li-text">{cat.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 border-top">
                      <Button className="sd-btn-browse-all w-100 d-flex align-items-center justify-content-center">
                        Browse all titles <ArrowRightOutlined className="ms-2" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* MIDDLE COLUMN: Carousel Banner + Popular Articles */}
                <div className="col-12 col-md-8 col-lg-5">

                  {/* CAROUSEL / SLIDER */}
                  <Carousel autoplay effect="fade" className="sd-middle-carousel">
                    <div>
                      <div className="sd-carousel-slide-item">
                        <div className="sd-carousel-overlay-content">
                          <h3 className="sd-carousel-title">Artificial intelligence in healthcare: A systematic literature review</h3>
                          <p className="sd-carousel-desc">
                            Search journals, books and open access content across every discipline — indexed, cross-referenced and ready to cite.
                          </p>
                          <button className="sd-btn-carousel-oa">
                            <img src="/assets/img/unlock-icon.png" alt="" />
                            Open Access
                          </button>
                        </div>
                      </div>
                    </div>
                  </Carousel>

                  {/* POPULAR ARTICLES SECTION */}
                  <div className="sd-popular-wrapper mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="sd-section-heading-title ">
                        <ClockCircleOutlined className="me-2" /> Popular Articles
                      </span>
                      <a href="#view-all" className="sd-section-heading-link">
                        Vie all articles <ArrowRightOutlined className="ms-1" />
                      </a>
                    </div>

                    <div className="d-flex flex-column gap-3">
                      {popularArticles.map((article) => (
                        <PopularArticleCard
                          key={article.id}
                          title={article.title}
                          meta={article.meta}
                          badgeType={article.badgeType}
                        />
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: Recent Publications */}
                <div className="col-12 col-lg-4">
                  <div className="sd-recent-publications-card h-100">
                    <div className="sd-section-heading-title sd-border-bottom">
                      <ClockCircleOutlined className="me-2" /> Recent Publication
                    </div>

                    <div className="d-flex flex-column gap-3">
                      {recentPublications.map((pub) => (
                        <RecentPublicationCard key={pub.id} publication={pub} />
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* BOTTOM CALL TO ACTION RIBBON */}
              <div className="sd-bottom-ribbon-banner mt-5">
                <div className="sd-ribbon-icon-box">
                  <ArrowRightOutlined />
                </div>
                <div className="sd-ribbon-text-msg">
                  Register now to receive recommended articles based on your activity
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
