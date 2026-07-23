import { Button } from 'antd';

export default function VolumeStatusCard({ volume, pageRange }) {
  return (
    <div className="sd-ae-volume-status-card mb-3 text-white">
      <div className="sd-jl-call-body">
        <div className="sd-jl-circle-search-badge mb-2">
          <img src="/assets/img/search-icon.png" alt="" />
        </div>
        <h4 className="m-0 sd-jl-title font-serif">{volume}</h4>
        <p className="sd-ae-volume-date mb-2">{pageRange}</p>
      </div>
      <div className="sd-jl-footer">
        <Button className="w-100 sd-ae-btn-khaki-gold-solid d-flex align-items-center justify-content-center gap-2">
          <img src="/assets/img/arrow-down.png" alt="" /> Download full issue
        </Button>
      </div>
    </div>
  );
}
