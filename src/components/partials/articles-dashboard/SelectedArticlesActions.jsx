import { Button, Switch } from 'antd';

export default function SelectedArticlesActions({ showPreviews, onTogglePreviews }) {
  return (
    <div className="sd-ae-sidebar-action-box p-3 border rounded bg-white mb-3">
      <h6 className="sd-ae-panel-label-title mb-2">Actions for selected articles</h6>
      <p className="text-muted small mb-3">Select all/Deselect all</p>
      <div className="d-flex flex-column gap-2 mb-3">
        <Button className="w-100 d-flex align-items-center justify-content-center gap-2 sd-ae-btn-light">
          <img src="/assets/img/arrow-down.png" alt="" /> Download full issue
        </Button>
        <Button className="w-100 d-flex align-items-center justify-content-center gap-2 sd-ae-btn-light">
          <img src="/assets/img/arrow-down.png" alt="" /> Export citations
        </Button>
      </div>
      <div className="pt-2 border-top">
        <Switch size="small" checked={showPreviews} onChange={onTogglePreviews} /> <span className="small text-secondary font-weight-medium">Show all article previews</span>
      </div>
    </div>
  );
}
