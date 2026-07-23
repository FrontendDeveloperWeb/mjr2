import { Button, Pagination } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import DashboardTopBar from '../../layout/DashboardTopBar.jsx';
import VolumeSidebar from './VolumeSidebar.jsx';
import UpdatesAlertBanner from './UpdatesAlertBanner.jsx';
import EditorialBoardRow from './EditorialBoardRow.jsx';
import ArticleCard from './ArticleCard.jsx';

export default function ArticlesDashboardSection({
  volume,
  pageRange,
  sectionTitle,
  editorialBoard,
  articles,
  articlesForPage,
  pageSize,
  currentPage,
  onPageChange,
  showPreviews,
  onTogglePreviews,
  showContentsIndex = true,
}) {
  const totalPages = Math.ceil(articles.length / pageSize);

  return (
    <section>
      <div className="sd-ae-dashboard-wrapper py-4">
        <div className="container">



          {/* MAIN BODY GRID */}
          <div className="row g-4">

            <VolumeSidebar
              volume={volume}
              pageRange={pageRange}
              showPreviews={showPreviews}
              onTogglePreviews={onTogglePreviews}
              showContentsIndex={showContentsIndex}
            />

            {/* ================= RIGHT CONTENT AREA ================= */}
            <div className="col-12 col-md-8 col-lg-9">
              <UpdatesAlertBanner />

              <div className="sd-ae-articles-dashboard-content">



                <h3 className="sd-ae-section-category-title mb-4 pb-2 mt-5">{sectionTitle}</h3>

                {/* ================= ARRAYS RENDER LOOP WINDOW ================= */}
                {articlesForPage.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}

                {/* ================= MATCHED STYLED ANTD PAGINATION CONTROLLER ================= */}
                <div className="sd-ae-global-footer-pagination d-flex justify-content-center align-items-center mt-5">
                  <Pagination
                    current={currentPage}
                    onChange={onPageChange}
                    total={articles.length}
                    pageSize={pageSize}
                    showSizeChanger={false}
                    className="sd-ae-custom-antd-pagination"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
