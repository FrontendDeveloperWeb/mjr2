import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export default function PaginationBar({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="sd-jl-pagination-bar-wrapper d-flex justify-content-center align-items-center mt-5">
      <button
        className="sd-jl-pag-btn-step arrow-left"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      >
        <LeftOutlined />
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`sd-jl-pag-btn-num ${currentPage === pageNumber ? 'active-gold' : ''}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {/* Ellipsis placeholder block to keep strict asset alignment configuration from design */}
      {totalPages > 3 && <span className="sd-jl-pag-ellipse">···</span>}
      {totalPages > 3 && (
        <button className="sd-jl-pag-btn-num">42</button>
      )}

      <button
        className="sd-jl-pag-btn-step arrow-right"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      >
        <RightOutlined />
      </button>
    </div>
  );
}
