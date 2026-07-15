import { Input, Button } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';



export default function HeroSection() {
  return (
    <section>
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
                    31M+ peer-reviewed articles
                  </span>
                </div>

                <h1 className="display-5 mb-4 text-white sd-serif sd-main-title">
                  Find The <span className="sd-title-italic">research</span> that actually answer your question
                </h1>

                <p className="text-white-50 lh-base sd-sub-desc">
                  Search journals, books and open access content across every discipline — indexed, cross-referenced and ready to cite.
                </p>
              </div>

              {/* RIGHT SIDE ACCURATE ROTATED CARDS */}
              <div className="col-12 col-md-6 col-lg-7 mt-5 mt-lg-0">
                <div className="sd-cards-wrapper">
                  <img src="/assets/img/" alt="" />

                  {/* <div className="sd-card-base sd-card-1">
                    <div className="d-flex justify-content-between align-items-center text-muted sd-card-meta">
                      <span>VOL. 12 NO. 1</span>
                      <span className="badge text-dark border px-2 py-1 sd-card-badge">Open Access</span>
                    </div>
                    <h6 className="sd-serif fw-bold text-dark my-2 sd-card-title">
                      Artificial intelligence in healthcare: A systematic literature review
                    </h6>
                    <p className="text-muted mb-0 sd-card-footer-text">J. Healthcare Informatics - 2026</p>
                  </div>


                  <div className="sd-card-base sd-card-2">
                    <div className="text-dark opacity-75 sd-card-meta">
                      VOL. 12 NO. 1
                    </div>
                    <h6 className="sd-serif fw-bold text-dark my-2 sd-card-title">
                      Artificial intelligence in healthcare: A systematic literature review
                    </h6>
                    <p className="text-dark opacity-75 mb-0 sd-card-footer-text">J. Healthcare Informatics - 2026</p>
                  </div>


                  <div className="sd-card-base sd-card-3">
                    <div className="text-muted sd-card-meta">
                      VOL. 12 NO. 1
                    </div>
                    <h6 className="sd-serif fw-bold text-dark my-2 sd-card-title">
                      Artificial intelligence in healthcare: A systematic literature review
                    </h6>
                    <p className="text-muted mb-0 sd-card-footer-text">J. Healthcare Informatics - 2026</p>
                  </div> */}

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* FLOATING TAN SEARCH CONTAINER */}


      </div>
    </section>
  );
}
