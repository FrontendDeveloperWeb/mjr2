import { Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

export default function CollectionsSidebar({ filterTypes, activeFilter, onFilterChange }) {
  return (
    <div className="col-12 col-md-4 col-lg-3">

      {/* Compact page-title card — same dark shell used for the Volume card elsewhere */}
      <div className="sd-ae-volume-status-card mb-3 text-white">
        <div className="sd-jl-call-body">
          <h4 className="m-0 sd-jl-title font-serif sd-sic-title-heading">
            All special issues and article collections
          </h4>
          <p>
            This page contains a list of all available article collections, special issues and supplements published within the journal.
          </p>
        </div>
      </div>

      <div className="sd-sic-filter-card mb-3">
        <div className="">
          <h6 className="sd-ae-panel-label-title mb-2">About this page</h6>
          <p className="text-muted small m-0">
            This page contains a list of all available article collections, special issues and supplements
            published within the journal — from thematic research collections to conference abstract sets.
          </p>
        </div>

        <div className="mt-3">
          <h6 className="sd-ae-panel-label-title font-change mb-3">Filter by type</h6>
          <ul className="sd-sic-filter-list">
            {filterTypes.map((filter) => (
              <li key={filter.id}>
                <button
                  type="button"
                  className={`sd-sic-filter-item ${activeFilter === filter.id ? 'is-active' : ''}`}
                  onClick={() => onFilterChange(filter.id)}
                >
                  <span>{filter.label}</span>
                  {filter.count ? (
                    <span className="sd-sic-filter-count">{filter.count}</span>
                  ) : (
                    <CloseCircleOutlined className="sd-sic-filter-clear-icon" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Button block className="sd-sic-btn-propose">
          Propose a special issue
        </Button>
      </div>


    </div>
  );
}
