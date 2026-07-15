export default function HeroSection() {
  return (
    <section className="journal-sec">
      <div className="sd-hero-container">

        {/* HERO SECTION WITH TEAL OVERLAY */}
        <div className="sd-hero-bg">
          <div className="container px-5">
            <div className="row align-items-center">

              {/* LEFT SIDE: STANDALONE FLOATING BOOK/JOURNAL COVER */}
              <div className="col-12 col-md-5 col-lg-5 offset-lg-1 d-flex justify-content-center justify-content-md-center">
                <div className="sd-jb-book-cover-shadow-box">
                  <img
                    src="/assets/img/golf-banner.png"
                    alt="Golf Simplified Cover"
                    className="sd-jb-main-cover-img img-fluid"
                  />
                </div>
              </div>

              {/* RIGHT SIDE: METADATA, TITLE, AND METRICS PANEL */}
              <div className="col-12 col-md-7 col-lg-6 text-white ps-md-4 ps-lg-5">
                <div className="sd-jb-meta-content">

                  {/* MINI OPEN ACCESS INDICATOR */}
                  <div className="sd-jb-oa-indicator-pill mb-3">
                    <span className="sd-jb-dash-line">—</span> Open access
                  </div>

                  {/* MAIN HERO JOURNAL TITLES */}
                  <h1 className="sd-jb-main-heading-serif mb-3">
                    <span className="sd-jb-italic-gold-brand">Journal</span> of Advanced Research
                  </h1>

                  {/* DESCRIPTION SUBTEXT SUMMARY */}
                  <p className="sd-jb-body-desc mb-5">
                    Search journals, books and open access content across every discipline — indexed, cross-referenced and ready to cite.
                  </p>

                  {/* METRIC METERS DATA GRID DISPLAY */}
                  <div className="d-flex align-items-baseline gap-5">
                    <div className="sd-jb-metric-stat-box">
                      <div className="sd-jb-metric-huge-num">21.7</div>
                      <div className="sd-jb-metric-label">CiteScore</div>
                    </div>

                    <div className="sd-jb-metric-stat-box">
                      <div className="sd-jb-metric-huge-num">17.1</div>
                      <div className="sd-jb-metric-label">Impact factor</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
