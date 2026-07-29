import { Select, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { ARTICLE_TYPES } from './submitOptions.js';
import { linkOrcid } from '../../../auth/session.js';

/**
 * Step 1 — Article Type Selection. Picks the article type and, when the user
 * has no ORCID linked yet, shows the ORCID linking notice. `data.orcid` drives
 * that conditional so the box disappears once linked.
 */
export default function StepArticleType({ data, update, onProceed }) {
  const handleLinkOrcid = () => update({ orcid: linkOrcid() });

  return (
    <div className="am-step">
      <div className="row g-4">
        {/* Left helper rail */}
        <aside className="col-12 col-lg-3">
          <p className="am-help-strong">
            Choose the Article Type of your submission from the drop-down menu.
          </p>
          <a href="#how-to-submit" className="am-help-link">How do I submit a manuscript?</a>
        </aside>

        {/* Panel */}
        <div className="col-12 col-lg-9">
          <div className="am-panel">
            <div className="am-panel-head">Select Article Type</div>
            <div className="am-panel-body">
              <Select
                className="am-article-select"
                value={data.articleType}
                onChange={(value) => update({ articleType: value })}
                options={ARTICLE_TYPES}
              />

              <div className="am-orcid-block">
                {data.orcid ? (
                  <p className="am-orcid-linked">
                    Your ORCID iD is authenticated and permanently associated with your
                    account. <strong>ORCID iD:</strong>{' '}
                    <a
                      href={`https://orcid.org/${data.orcid}`}
                      target="_blank"
                      rel="noreferrer"
                      className="am-help-link"
                    >
                      {data.orcid}
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
                        <a href="#what-is-orcid" className="am-help-link">What is ORCID?</a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="am-actions">
            <Button className="am-btn-primary" onClick={onProceed}>
              Proceed <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
