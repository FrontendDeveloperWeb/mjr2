import { Button, Collapse } from 'antd';
import {
  SearchOutlined,
  ArrowDownOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';

/* ============================================================
   MOCKUP DATASETS
   ============================================================ */

// Compact square volume shortcuts (85 -> 74). `85` carries the active state.
const VOLUME_SHORTCUTS = [85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74];

// A single reusable sub-issue row shape, repeated inside each year group.
const buildIssues = (count, groupKey) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${groupKey}-issue-${i + 1}`,
    volume: 'Volume 85',
    meta: 'Pages 1–1222 (July 2026)',
    access: 'Open Access',
  }));

// Collapsible calendar-year archive groups.
const ARCHIVE_YEARS = [
  { key: '2026-primary', year: '2026', range: 'Volumes 79-85', issues: buildIssues(5, 'g1') },
  { key: '2026-secondary', year: '2026', range: 'Volumes 79-85', issues: buildIssues(4, 'g2') },
  { key: '2026-tertiary', year: '2026', range: 'Volumes 79-85', issues: buildIssues(4, 'g3') },
];

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

// One issue row: 4px charcoal accent strip -> meta -> access pill -> Download PDF link.
function IssueRow({ issue }) {
  return (
    <div className="sd-ai-issue-row d-flex align-items-center justify-content-between gap-3">
      <div className="d-flex align-items-stretch flex-grow-1">
        <span className="sd-ai-issue-accent-bar" />
        <div className="sd-ai-issue-meta ps-3">
          <h5 className="sd-ai-issue-title mb-1">{issue.volume}</h5>
          <p className="sd-ai-issue-subtext m-0">{issue.meta}</p>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3 flex-shrink-0">
        <span className="sd-ai-access-pill">
          <span className="sd-ai-access-dot" />
          {issue.access}
        </span>
        <a
          href="#download"
          className="sd-ai-download-link d-inline-flex align-items-center gap-2"
          aria-label={`Download PDF for ${issue.volume}`}
        >
          <img src="/assets/img/pdf-download.png" alt="" />
        </a>
      </div>
    </div>
  );
}

// Custom circular chevron used as the accordion expand indicator.
const renderExpandIcon = ({ isActive }) => (
  <span className="sd-ai-accordion-chevron">
    {isActive ? <UpOutlined /> : <DownOutlined />}
  </span>
);

/* ============================================================
   ALL ISSUES ARCHIVE — inner body workspace grid.
   Header / Hero / StatsBar / DashboardTopBar / Footer are owned by the
   global <Layout> (see router meta), so this partial only renders the
   sidebar + chronological archive feed.
   ============================================================ */

export default function AllIssuesArchive() {
  // Build the antd Collapse `items` payload from the mockup dataset.
  const accordionItems = ARCHIVE_YEARS.map((group) => ({
    key: group.key,
    label: (
      <div className="sd-ai-accordion-label d-flex align-items-baseline gap-2">
        <span className="sd-ai-accordion-year">{group.year}</span>
        <span className="sd-ai-accordion-range">- {group.range}</span>
      </div>
    ),
    children: (
      <div className="sd-ai-issue-stack">
        {group.issues.map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </div>
    ),
  }));

  return (
    <section className="sd-ai-allissues-root">
      <div className="container">
        <div className="row g-4">

          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="col-12 col-md-4 col-lg-3">
            <div className="sd-ai-sidebar-sticky">

              {/* Widget 1 — Charcoal status tracker box */}
              <div className="sd-ai-volume-box mb-4">
                <div className="sd-ai-volume-box-body p-4">
                  <span className="sd-ai-search-badge mb-3">
                    <SearchOutlined />
                  </span>
                  <h3 className="sd-ai-volume-heading m-0">Volume 85</h3>
                  <p className="sd-ai-volume-range m-0">Pages 1–1222 (July 2026)</p>
                </div>
                <div className="sd-ai-volume-box-footer p-4 pt-0">
                  <Button
                    block
                    className="sd-ai-btn-download-all d-flex align-items-center justify-content-center gap-2"
                    icon={<ArrowDownOutlined />}
                  >
                    Download full issue
                  </Button>
                </div>
              </div>

              {/* Widget 2 — Jump to volume matrix */}
              <div className="sd-ai-card sd-ai-jump-card p-3 mb-4">
                <h6 className="sd-ai-card-title mb-3">Jump to volume</h6>
                <div className="sd-ai-volume-grid">
                  {VOLUME_SHORTCUTS.map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`sd-ai-volume-chip${num === 85 ? ' is-active' : ''}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Widget 3 — New issue alert trigger (bell + outline button) */}
              <div className="sd-ai-card sd-ai-alert-card sd-card-issue">
                <div className="sd-card-issue-body">
                  <div className="d-flex align-items-center gap-2 mb-2">

                    <h6 className="sd-ai-card-title m-0">Get new issue alerts.</h6>
                  </div>
                  <p className="sd-ai-alert-desc mb-3">
                    Be notified by email the moment a new volume of the journal is published.
                  </p>
                </div>
                <div className="sd-card-issue-footer">
                  <Button block className="sd-ai-btn-alert d-flex align-items-center justify-content-center gap-2">
                    Set up alert
                  </Button>
                </div>
              </div>

            </div>
          </aside>

          {/* ================= RIGHT MAIN FEED ================= */}
          <main className="col-12 col-md-8 col-lg-9">

            {/* Top title banner bar */}
            <div className="sd-ai-feed-topbar d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <h2 className="sd-ai-feed-title m-0">All issues</h2>
              <Button
                className="sd-ai-btn-find-volume d-flex align-items-center gap-2"
                icon={<SearchOutlined />}
              >
                Find a volume
              </Button>
            </div>

            {/* Chronological archive accordions */}
            <Collapse
              items={accordionItems}
              defaultActiveKey={[ARCHIVE_YEARS[0].key]}
              expandIconPlacement="end"
              expandIcon={renderExpandIcon}
              className="sd-ai-archive-accordion"
            />

            {/* End feed action row */}
            <Button block className="sd-ai-btn-load-earlier mt-4">
              Load earlier years (2021 and before)
            </Button>

          </main>

        </div>
      </div>
    </section>
  );
}
