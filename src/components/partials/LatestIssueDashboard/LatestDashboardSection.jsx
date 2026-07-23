import { Button, Pagination } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import DashboardTopBar from '../../layout/DashboardTopBar.jsx';
import VolumeSidebar from './VolumeSidebar.jsx';
import UpdatesAlertBanner from './UpdatesAlertBanner.jsx';
import EditorialBoardRow from './EditorialBoardRow.jsx';
import ArticleCard from './LatestCard.jsx';

export default function LatestDashboardSection({
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
              <div className="d-flex justify-content-end mb-4 gap-2">
                <Button
                  className="sd-ae-btn-volume-switch btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                >
                  <LeftOutlined /> Previous vol/issue
                </Button>
                <Button
                  className="sd-ae-btn-volume-switch btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                >
                  Next vol/issue <RightOutlined />
                </Button>
              </div>
              <div className="sd-ae-articles-dashboard-content">

                <EditorialBoardRow title={editorialBoard.title} pageLabel={editorialBoard.pageLabel} />

                <h3 className="sd-ae-section-category-title mb-4 pb-2">{sectionTitle}</h3>

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
