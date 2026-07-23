import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Tabs from '../../shared/Tabs/index.jsx';

// Gold "file" heading shown at the top of the Abstract pane.
function PaneHeading({ children }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-3 text-khaki-gold font-weight-bold small">
      <div className="d-flex align-items-center gap-2">
        <div className="sd-ae-abstract-icon-frame d-flex align-items-center justify-content-center me-2">
          <img src="/assets/img/file-icon.png" alt="" />
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
}

function AbstractPane({ sections }) {
  return (
    <div className="sd-ae-abstract-inner-text-flow pt-2">
      <PaneHeading>Abstract</PaneHeading>
      <div className="sd-ae-abstract-section">
        {sections.map((section, index) => (
          <div key={`${section.heading}-${index}`}>
            <h6 className="sd-ae-body-sub-title mb-2">{section.heading}</h6>
            <p className="sd-ae-body-paragraph-text text-secondary mb-3">{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LatestCard({ article }) {
  // Each card owns its own tab state (via the isolated <Tabs>), so toggling
  // one card's Abstract/Graphical view never affects sibling cards.
  const tabItems = [
    { key: 'abstract', label: 'Abstract', children: <AbstractPane sections={article.abstractSections} /> },
    // Graphical abstract view is intentionally disabled pending final assets.
    { key: 'graphical', label: 'Graphical abstract', children: <img src={article.graphicalAbstract} alt="" /> },
  ];

  return (
    <div className="sd-ae-main-article-card-box mb-4">

      {/* Card Header Layer */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <input type="checkbox" defaultChecked className="form-check-input sd-ae-custom-checkbox" />
          <span className="sd-ae-badge-type">Research article</span>
          <span className="sd-ae-badge-oa">Open Access</span>
        </div>
        <div className="d-flex gap-2">
          <Button size="small" className="sd-ae-action-pill-btn beige">  <img src="/assets/img/arrow-down.png" alt="" /> View PDF</Button>
          <Button size="small" className="sd-ae-action-pill-btn transparent"><EyeOutlined /> Article preview</Button>
        </div>
      </div>

      {/* Dynamic Heading Title targeting requested row */}
      <h4 className="sd-ae-article-main-headline mb-2">{article.title}</h4>
      <p className="sd-ae-article-authors-text mb-1 text-muted">{article.authors}</p>
      <p className="sd-ae-article-pages-range text-muted small mb-4">{article.pages}</p>

      {/* Isolated tab system — self-contained state per card */}
      <div className="sd-ae-interactive-tabs-container">
        <Tabs defaultActiveKey="abstract" className="sd-ae-custom-antd-tabs" items={tabItems} />
      </div>

    </div>
  );
}
