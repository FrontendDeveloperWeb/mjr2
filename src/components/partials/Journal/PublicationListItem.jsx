import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

export default function PublicationListItem({ publication }) {
  return (
    <div className="sd-jl-publication-row-item py-4 border-bottom">
      <div className="d-flex justify-content-between align-items-start">
        <div className="pe-3">
          <h4 className="sd-jl-pub-item-title mb-1">{publication.title}</h4>
          <div className="sd-jl-pub-item-path mb-3">{publication.path}</div>

          {/* BOTTOM BADGE MARKS */}
          <div className="d-flex align-items-center gap-2">
            <span className="sd-item-type-badge">{publication.type}</span>
            {publication.year && <span className="sd-item-year-text">{publication.year}</span>}
            {publication.isOpenAccess && <span className="sd-item-oa-badge-pill">Open access</span>}
          </div>
        </div>

        {/* ACTION CONTROLS ON RIGHT TERMINAL BOUND */}
        <div>
          <Button className="sd-jl-btn-solid-view d-flex align-items-center gap-2">
            View <ArrowUpOutlined style={{ transform: 'rotate(45deg)' }} />
          </Button>
        </div>
      </div>
    </div>
  );
}
