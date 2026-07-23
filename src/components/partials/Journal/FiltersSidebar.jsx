import { Select, Checkbox } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Option } = Select;

const PUBLICATION_TYPE_COUNTS = [
  { value: 'Journals', label: 'Journals', count: '5,972' },
  { value: 'Books', label: 'Books', count: '31,204' },
  { value: 'Textbooks', label: 'Textbooks', count: '3,118' },
  { value: 'Handbooks', label: 'Handbooks', count: '1,940' },
  { value: 'Reference works', label: 'Reference works', count: '862' },
];

export default function FiltersSidebar({ onFilterChange }) {
  return (
    <div className="col-12 col-md-4 col-lg-3">

      {/* CALL FOR PAPERS BANNER BOX */}
      <aside className='aside'>
        <div className="sd-jl-call-papers-box mb-4">
          <div className="sd-jl-call-body">
            <div className="sd-jl-circle-search-badge mb-2">
              <img src="/assets/img/search-icon.png" alt="" />
            </div>
            <h6 className="sd-jl-banner-prompt-title">Publishing next? <span className="fw-normal text-muted-white">Find the right home for your research before you submit.</span></h6>
          </div>
          <div className="sd-jl-footer">
            <a href="#calls" className="sd-jl-banner-action-link mt-3 d-inline-block">
              Browse calls for papers <ArrowRightOutlined className="ms-1" />
            </a>
          </div>
        </div>

        {/* FILTER CONTROLS ACCORDION BOX */}
        <div className="sd-jl-filter-sidebar-card">
          <div className="select-area">
            <h5 className="sd-jl-filter-main-title pb-2 mb-2">Refine by subject</h5>

            <div className="mb-3">
              <label className="sd-jl-select-lbl">Find articles with the keywords</label>
              <Select defaultValue="All Subjects areas" className="w-100 sd-jl-antd-select">
                <Option value="all">All Subjects areas</Option>
              </Select>
            </div>

            <div className="mb-4">
              <label className="sd-jl-select-lbl">Secondary subject area</label>
              <Select defaultValue="All Secondary subject areas" className="w-100 sd-jl-antd-select">
                <Option value="all">All Secondary subject areas</Option>
              </Select>
            </div>
          </div>

          {/* PUBLICATION TYPE CHECKBOX GROUP */}
          <div className="sd-jl-filter-group mt-3 mb-4">
            <h6 className="sd-jl-group-sub-title mb-3">Publication type</h6>
            <Checkbox.Group className="w-100 d-flex flex-column gap-2" onChange={onFilterChange}>
              {PUBLICATION_TYPE_COUNTS.map((type) => (
                <div key={type.value} className="d-flex justify-content-between align-items-center w-100">
                  <Checkbox value={type.value}>{type.label}</Checkbox><span className="sd-count-lbl">{type.count}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>

          {/* JOURNAL STATUS CHECKBOX */}
          <div className="sd-jl-filter-group border-top  mb-4">
            <h6 className="sd-jl-group-sub-title mb-2">Journal status</h6>
            <div className="d-flex justify-content-between align-items-center w-100">
              <Checkbox value="accepts">Accepts submissions</Checkbox><span className="sd-count-lbl">4,301</span>
            </div>
          </div>

          {/* ACCESS TYPE ACCENT BADGES */}
          <div className="sd-jl-filter-group border-top pt-3">
            <h6 className="sd-jl-group-sub-title mb-2">Access type</h6>
            <div className="d-flex flex-column gap-2 mt-2">
              <span className="sd-filter-badge-pill pill-light-blue">Open access</span>
              <span className="sd-filter-badge-pill pill-gold-tan">Contains open access</span>
              <span className="sd-filter-badge-pill pill-muted-grey">Subscription</span>
            </div>
          </div>

        </div>
      </aside>
    </div>
  );
}
