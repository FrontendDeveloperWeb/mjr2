import { Input } from 'antd';
import { SearchOutlined, CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { PaginationShell, PageButton, PaginationEllipsis } from '../../shared/PaginationBar/PaginationBar.jsx';

export default function CollectionsList({ collections }) {
  return (
    <div className="col-12 col-md-8 col-lg-9">

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="sd-sic-page-title m-0">All special issues and article collections</h2>
        <Input
          placeholder="Search Collections"
          prefix={<SearchOutlined />}
          className="sd-sic-search-input"
          style={{ maxWidth: '260px' }}
        />
      </div>

      <div className="sd-sic-collections-stack">
        {collections.length > 0 ? (
          collections.map((collection) => (
            <div key={collection.id} className="sd-sic-collection-card border-bottom py-4">
              <span className={collection.bgColor + " sd-sic-type-badge"}>{collection.type}</span>
              <h4 className="sd-sic-card-title mt-2 mb-1">{collection.title}</h4>
              <p className="sd-sic-card-subtitle mb-2">{collection.subtitle}</p>

              {collection.editors && (
                <div className="sd-sic-editors-row mb-2">
                  <span className="sd-sic-editors-label">Edited by</span>
                  {collection.editors.map((editor) => (
                    <span key={editor} className="sd-sic-editor-pill">{editor}</span>
                  ))}
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-2 border-top-pt-3">
                <span className="sd-sic-update-text">
                  <CalendarOutlined className="me-2" /> Last update {collection.lastUpdate}
                </span>
                <a
                  href={`#collection-${collection.id}`}
                  className="sd-sic-arrow-link"
                  aria-label={`Open ${collection.title}`}
                >
                  <img src="/assets/img/arrow-beige.png" alt="" className='arrow-inactive' />
                  <img src="/assets/img/arrow-bg.png" alt="" className='arrow-active' />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="py-5 text-center text-muted">No collections found matching this filter.</div>
        )}
      </div>

      {/* Decorative pagination — reuses the shared Journal pagination primitives */}
      <PaginationShell className="mt-4" prevDisabled>
        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PaginationEllipsis />
        <PageButton>42</PageButton>
      </PaginationShell>

    </div >
  );
}
