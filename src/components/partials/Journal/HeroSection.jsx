import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function HeroSection() {
  return (
    <section className="journal-sec">
      <div className="sd-hero-container">

        {/* HERO SECTION WITH TEAL OVERLAY */}
        <div className="sd-hero-bg">
          <div className="container px-5">
            <div className="row">

              {/* LEFT CONTENT AREA */}
              <div className="col-12 col-md-6 col-lg-5 sd-left-content">
                <div className="d-flex align-items-center mb-3">
                  <div className="sd-gold-line"></div>
                  <span className="sd-stat-text">
                    5,972 journals · 38,542 books
                  </span>
                </div>

                <h1 className="display-5 mb-4 text-white sd-serif sd-main-title">
                  <span className="sd-title-italic"> Browse</span>  the shelf, not
                  the noise.
                </h1>

                <p className="text-white-50 lh-base sd-sub-desc">
                  Search journals, books and open access content across every discipline — indexed, cross-referenced and ready to cite.
                </p>
              </div>

            </div>
          </div>
          <div className="container px-5 mt-5">
            <div className="sd-search-panel">

              {/* Form Rows with AntD Inputs & Bootstrap Grid */}
              <div className="row g-3 align-items-end">
                <div className="col-md-5">
                  <label className="form-label text-dark fw-semibold mb-1.5 sd-input-label">Journal or book title</label>
                  <Input placeholder="e.g. Alzheimer’s Research" />
                </div>

                <div className="col-md-5">
                  <label className="form-label text-dark fw-semibold mb-1.5 sd-input-label">Subject area</label>
                  <Input placeholder="All subject areas" />
                </div>

                <div className="col-md-2">
                  <Button type="primary" icon={<SearchOutlined />} className="w-100 sd-search-btn">
                    Search here
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
