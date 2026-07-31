import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps, Input, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import { STEP_TITLES } from '../stepTitles.js';
import { setStepData } from '../manuscriptStore.js';
import { useDraftId, useDraftAutosave } from '../useManuscriptDraft.js';

export default function SubmitManuscriptStep5() {
  const navigate = useNavigate();
  const [comments, setComments] = useState('');

  const draftId = useDraftId();
  useDraftAutosave(draftId, 'step5', 5, { comments });

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={4}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 5: Comments</h1>

              <div className="am-attach-topbar">
                <a href="#insert-char" className="am-help-link am-insert-link">Insert Special Character</a>
              </div>

              <div className="row g-4">
                <aside className="col-12 col-lg-3">
                  <p className="am-help-strong">Please provide the requested information.</p>
                </aside>

                <div className="col-12 col-lg-9">
                  <div className="am-panel">
                    <div className="am-panel-head">Enter Comments</div>
                    <div className="am-panel-body">
                      <p className="am-panel-desc">
                        Please enter any additional comments you would like to send to the publication
                        office. These comments will not appear directly in your submission.
                      </p>
                      <Input.TextArea
                        className="am-comments-textarea"
                        rows={6}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="am-actions">
                    <Button className="am-btn-secondary" onClick={() => navigate('/author/submit-manuscript/step-4')}>
                      <ArrowLeftOutlined /> Back
                    </Button>
                    <Button
                      className="am-btn-primary"
                      onClick={() => {
                        setStepData('step5', { comments });
                        navigate('/author/submit-manuscript/step-6');
                      }}
                    >
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
