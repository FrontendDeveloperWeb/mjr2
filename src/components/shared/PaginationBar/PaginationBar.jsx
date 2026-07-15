import { LeftOutlined, RightOutlined } from '@ant-design/icons';

/** A single square page-number button. */
export function PageButton({ children, active = false, onClick }) {
  return (
    <button className={`sd-jl-pag-btn-num${active ? ' active-gold' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

/** The "···" gap marker between page ranges. */
export function PaginationEllipsis() {
  return <span className="sd-jl-pag-ellipse">···</span>;
}

/**
 * Shell for the square pagination bar: the prev/next step arrows wrapping
 * whatever page buttons are passed as `children`. Use directly for decorative /
 * custom bars; the dynamic <PaginationBar> below builds on it.
 */
export function PaginationShell({
  className = 'mt-5',
  prevDisabled = false,
  nextDisabled = false,
  onPrev,
  onNext,
  children,
}) {
  return (
    <div className={`sd-jl-pagination-bar-wrapper d-flex justify-content-center align-items-center ${className}`}>
      <button className="sd-jl-pag-btn-step arrow-left" disabled={prevDisabled} onClick={onPrev}>
        <LeftOutlined />
      </button>

      {children}

      <button className="sd-jl-pag-btn-step arrow-right" disabled={nextDisabled} onClick={onNext}>
        <RightOutlined />
      </button>
    </div>
  );
}

/**
 * Dynamic pagination for real page data. Renders 1..totalPages plus the
 * trailing "··· 42" affordance from the original design when there are many pages.
 */
export default function PaginationBar({ currentPage, totalPages, onPageChange, className = 'mt-5' }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationShell
      className={className}
      prevDisabled={currentPage === 1}
      nextDisabled={currentPage === totalPages}
      onPrev={() => onPageChange(Math.max(currentPage - 1, 1))}
      onNext={() => onPageChange(Math.min(currentPage + 1, totalPages))}
    >
      {pages.map((page) => (
        <PageButton key={page} active={currentPage === page} onClick={() => onPageChange(page)}>
          {page}
        </PageButton>
      ))}
      {totalPages > 3 && <PaginationEllipsis />}
      {totalPages > 3 && <PageButton>42</PageButton>}
    </PaginationShell>
  );
}
