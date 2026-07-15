import { Select } from 'antd';
import PublicationListItem from './PublicationListItem.jsx';
import PaginationBar from '../../shared/PaginationBar/PaginationBar.jsx';

const { Option } = Select;

export default function PublicationsList({
  publications,
  totalItems,
  sortBy,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="col-12 col-md-8 col-lg-9 ps-lg-4">

      {/* HEADER INTERFACES */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="sd-jl-all-titles-head m-0">All Titles <span className="text-muted fw-normal font-sans">({totalItems})</span></h2>
        <div className="d-flex align-items-center gap-2">
          <span className="sd-jl-sort-label text-muted">Sort by</span>
          <Select value={sortBy} onChange={onSortChange} className="sd-jl-sort-dropdown" style={{ width: 110 }}>
            <Option value="A-Z">Title, A-Z</Option>
            <Option value="Z-A">Title, Z-A</Option>
          </Select>
        </div>
      </div>

      {/* SEPARATOR ALPHABET SIGNIFIER MARKS */}
      <div className="sd-jl-alphabet-divider mb-4">A</div>

      {/* DYNAMIC LIST ITERATION */}
      <div className="sd-jl-items-stack d-flex flex-column">
        {publications.length > 0 ? (
          publications.map((publication) => (
            <PublicationListItem key={publication.id} publication={publication} />
          ))
        ) : (
          <div className="py-5 text-center text-muted">No items found matching the filter matrix.</div>
        )}
      </div>

      <PaginationBar currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />

    </div>
  );
}
