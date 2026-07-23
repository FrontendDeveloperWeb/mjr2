import { Button } from 'antd';

export default function EditorialBoardRow({ title, pageLabel }) {
  return (
    <div className="sd-ae-editorial-board-row d-flex justify-content-between align-items-start pb-4 mb-4 ">
      <div className="d-flex align-items-start gap-2">
        <input type="checkbox" className="form-check-input sd-ae-custom-checkbox mt-1" />
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="sd-ae-badge-type">Editorial board</span>
            <span className="sd-ae-badge-oa">Open Access</span>
          </div>
          <h4 className="sd-ae-article-main-headline mb-1">{title}</h4>
          <p className="sd-ae-article-pages-range text-muted small m-0">{pageLabel}</p>
          <Button size="small" className="sd-ae-action-pill-btn mt-2 beige">
            <img src="/assets/img/arrow-down.png" alt="" /> View PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
