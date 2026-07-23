
import { AimOutlined, FileTextOutlined, AppstoreOutlined, CalendarOutlined, PercentageOutlined, DatabaseOutlined } from '@ant-design/icons';
import AcceptancePanel from '../../../components/partials/AboutAims/AcceptancePanel';
import Layout from "../../../components/layout/Layout";
import TopBar from '../../../components/shared/TopBar';

const JournalInsights = () => {
  return (
    // 2-Column Layout Container
    <>
      <Layout>
        <TopBar />
        <section className='mt-5'>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="sd-insights-section container-fluid px-4 py-3">
                  {/* Section Title */}
                  <h2 className="sd-insights-main-title mb-4">Journal Insights</h2>

                  {/* STACK CONTAINER */}
                  <div className="d-flex flex-column gap-3">

                    {/* CARD 1: Aims & Scope */}
                    <div className="sd-insight-card bg-white d-flex align-items-stretch">
                      <div className="sd-card-left-col d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="sd-insight-icon-circle mb-2">
                          <img src="/assets/img/journal-1.png" alt="" />
                        </div>
                        <span className="sd-insight-label">Aims & scope</span>
                      </div>
                      <div className="sd-card-divider-line"></div>
                      <div className="sd-card-right-col d-flex flex-column justify-content-center">
                        <h5 className="sd-right-heading mb-2">Peer Review under the responsibility of Cairo University.</h5>
                        <p className="sd-right-desc text-muted mb-2">
                          <span>Journal of Advanced Research</span> (abbreviated as J. Adv. Res.) is an official journal of <span className="sd-text-highlight-gold">Cairo University</span>. It is an applied/natural sciences, peer-reviewed journal with interdisciplinary activity. The journal aims to make significant ...
                        </p>
                        <a href="/about/aims-scope" className="sd-insight-text-link">View full aims & scope</a>
                      </div>
                    </div>

                    {/* CARD 2: ISSN */}
                    <div className="sd-insight-card bg-white d-flex align-items-stretch">
                      <div className="sd-card-left-col d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="sd-insight-icon-circle mb-2">
                          <img src="/assets/img/journal-1.png" alt="" />
                        </div>
                        <span className="sd-insight-label">ISSN</span>
                      </div>
                      <div className="sd-card-divider-line"></div>
                      <div className="sd-card-right-col d-flex align-items-center gap-5">
                        <div className="sd-issn-block">
                          <span className="sd-issn-label">Online ISSN:</span>
                          <span className="sd-issn-value ms-2">2090-1224</span>
                        </div>
                        <div className="sd-issn-block">
                          <span className="sd-issn-label">Linking ISSN:</span>
                          <span className="sd-issn-value ms-2">2090-1232</span>
                        </div>
                      </div>
                    </div>

                    {/* CARD 3: Subject Areas */}
                    <div className="sd-insight-card bg-white d-flex align-items-stretch">
                      <div className="sd-card-left-col d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="sd-insight-icon-circle mb-2">
                          <img src="/assets/img/journal-1.png" alt="" />
                        </div>
                        <span className="sd-insight-label">Subject areas</span>
                      </div>
                      <div className="sd-card-divider-line"></div>
                      <div className="sd-card-right-col d-flex align-items-center ">
                        <span className="sd-issn-block">Chemistry (General), Engineering (General)</span>
                      </div>
                    </div>

                    <div className="sd-insight-card bg-white d-flex align-items-stretch">
                      <div className="sd-card-left-col d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="sd-insight-icon-circle mb-2">
                          <img src="/assets/img/journal-1.png" alt="" />
                        </div>
                        <span className="sd-insight-label">Subject areas</span>
                      </div>
                      <div className="sd-card-divider-line"></div>
                      <div className="sd-card-right-col d-flex align-items-center w-100">
                        <div className="row sd-card-font-style w-100">
                          <div className='col-12 col-md-6'>
                            <h6>21.7</h6>
                            <p>CiteScore</p>
                          </div>
                          <div className='col-12 col-md-6'>
                            <h6>21.7</h6>
                            <p>CiteScore</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="sd-insight-card bg-white d-flex align-items-stretch">
                      <div className="sd-card-left-col d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="sd-insight-icon-circle mb-2">
                          <img src="/assets/img/journal-1.png" alt="" />
                        </div>
                        <span className="sd-insight-label">Article publishing option</span>
                      </div>
                      <div className="sd-card-divider-line"></div>
                      <div className="sd-card-right-col d-flex flex-column justify-content-center">
                        <h5 className="sd-right-heading mb-2">Peer Review under the responsibility of Cairo University.</h5>
                        <p className="sd-right-desc text-muted mb-2">
                          <span>Journal of Advanced Research</span> (abbreviated as J. Adv. Res.) is an official journal of <span className="sd-text-highlight-gold">Cairo University</span>. It is an applied/natural sciences, peer-reviewed journal with interdisciplinary activity. The journal aims to make significant ...
                        </p>
                        <a href="/about/aims-scope" className="sd-insight-text-link">View full aims & scope</a>
                      </div>
                    </div>

                    <div className="sd-insight-card bg-white d-flex align-items-stretch">
                      <div className="sd-card-left-col d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="sd-insight-icon-circle mb-2">
                          <img src="/assets/img/journal-1.png" alt="" />
                        </div>
                        <span className="sd-insight-label">Publishing timeline</span>
                      </div>
                      <div className="sd-card-divider-line"></div>
                      <div className="sd-card-right-col d-flex flex-column justify-content-center">
                        <h4 className="sd-stat-number mb-1">144 days</h4>
                        <span className="sd-stat-desc text-muted">Submission to acceptance</span>
                      </div>
                    </div>

                    {/* CARD 2: Acceptance rate */}
                    <div className="sd-insight-card bg-white d-flex align-items-stretch">
                      <div className="sd-card-left-col d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="sd-insight-icon-circle mb-2">
                          <img src="/assets/img/journal-1.png" alt="" />
                        </div>
                        <span className="sd-insight-label">Acceptance rate</span>
                      </div>
                      <div className="sd-card-divider-line"></div>
                      <div className="sd-card-right-col d-flex flex-column justify-content-center ">
                        <h4 className="sd-stat-number mb-1">6%</h4>
                        <span className="sd-stat-desc text-muted">Acceptance Rate</span>
                      </div>
                    </div>

                    {/* CARD 3: Abstracting and indexing */}
                    <div className="sd-insight-card bg-white d-flex align-items-stretch">
                      <div className="sd-card-left-col d-flex flex-column align-items-center justify-content-center text-center">
                        <div className="sd-insight-icon-circle mb-2">
                          <img src="/assets/img/journal-1.png" alt="" />
                        </div>
                        <span className="sd-insight-label">Abstracting and indexing</span>
                      </div>
                      <div className="sd-card-divider-line"></div>
                      <div className="sd-card-right-col d-flex flex-column justify-content-center ">
                        <ul className="sd-indexing-list m-0 p-0 ps-3">
                          <li className="mb-1">Medline</li>
                          <li className="mb-1">Directory of Open Access Journals (DOAJ)</li>
                          <li className="mb-1">PubMed Central (PMC)</li>
                          <li className="mb-1">Science Citation Index Expanded (SCIE)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <AcceptancePanel />
        </section>
      </Layout>

    </>

  );
};

export default JournalInsights;
