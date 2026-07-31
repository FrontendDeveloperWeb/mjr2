import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps, Select, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import { getOrcid, linkOrcid } from '../../../../auth/session.js';
import { STEP_TITLES } from '../stepTitles.js';
import { setStepData } from '../manuscriptStore.js';
import { useDraftId, useDraftAutosave } from '../useManuscriptDraft.js';

const ARTICLE_TYPES = [
  'Original Manuscript',
  'Review Article',
  'Short Communication',
  'Case Report',
  'Editorial',
  'Letter to the Editor',
].map((v) => ({ value: v, label: v }));

/**
 * Step 1 — Select Article Type. Standalone page in the multi-page submission
 * flow. Picks the article type and, when the user has no ORCID linked, shows
 * the ORCID linking notice. Proceed validates the selection then advances to
 * the Step 2 route.
 */
export default function SubmitManuscriptStep1() {
  const navigate = useNavigate();
  const [articleType, setArticleType] = useState('Original Manuscript');
  const [orcid, setOrcid] = useState(getOrcid());
  const [error, setError] = useState(false);

  const draftId = useDraftId();
  useDraftAutosave(draftId, 'step1', 1, { articleType, orcid });

  const handleLinkOrcid = () => setOrcid(linkOrcid());

  const handleProceed = () => {
    if (!articleType) {
      setError(true);
      return;
    }
    setStepData('step1', { articleType, orcid });
    navigate('/author/submit-manuscript/step-2');
  };

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={0}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 1: Article Type Selection</h1>

              <div className="row g-4">
                {/* Left helper rail */}
                <aside className="col-12 col-lg-3">
                  <p className="am-help-strong">
                    Choose the Article Type of your submission from the drop-down menu.
                  </p>
                  <a href="#how-to-submit" className="am-help-link">
                    How do I submit a manuscript?
                  </a>
                </aside>

                {/* Panel */}
                <div className="col-12 col-lg-9">
                  <div className="am-panel">
                    <div className="am-panel-head">Select Article Type</div>
                    <div className="am-panel-body">
                      <Select
                        className="am-article-select"
                        value={articleType}
                        onChange={(value) => {
                          setArticleType(value);
                          setError(false);
                        }}
                        options={ARTICLE_TYPES}
                        status={error ? 'error' : ''}
                        placeholder="Select Article Type"
                      />
                      {error && (
                        <p className="am-error-text">Please select an Article Type to continue.</p>
                      )}

                      <div className="am-orcid-block">
                        {orcid ? (
                          <p className="am-orcid-linked">
                            Your ORCID iD is authenticated and permanently associated with your
                            account. <strong>ORCID iD:</strong>{' '}
                            <a
                              href={`https://orcid.org/${orcid}`}
                              target="_blank"
                              rel="noreferrer"
                              className="am-help-link"
                            >
                              {orcid}
                            </a>
                          </p>
                        ) : (
                          <>
                            <p>
                              Before submitting your manuscript, we encourage you to link your
                              ORCID iD and authenticate it. This will allow you to share
                              information with other systems, ensure you get recognition for all
                              your contributions and reduce the risk of errors. Once
                              authenticated, you can login to this journal using your ORCID iD as
                              well.
                            </p>
                            <p>
                              You will only need to do this once in this journal to permanently
                              associate your ORCID iD with your EM user record.
                            </p>
                            <div className="am-orcid-row">
                              <span className="am-orcid-label">
                                ORCID iD: <em>(None)</em>
                              </span>
                              <div className="am-orcid-actions">
                                <Button className="am-btn-grey" onClick={handleLinkOrcid}>
                                  Link to ORCID Record
                                </Button>
                                <a href="#what-is-orcid" className="am-help-link">
                                  What is ORCID?
                                </a>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="am-actions">
                    <Button className="am-btn-primary" onClick={handleProceed}>
                      Proceed <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
