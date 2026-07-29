import { useState } from 'react';
import { Steps, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Layout from '../../../components/layout/Layout';
import TopBar from '../../../components/shared/TopBar';
import StepArticleType from '../../../components/partials/SubmitManuscript/StepArticleType.jsx';
import StepAttachFiles from '../../../components/partials/SubmitManuscript/StepAttachFiles.jsx';
import StepGeneralInfo from '../../../components/partials/SubmitManuscript/StepGeneralInfo.jsx';
import { getOrcid } from '../../../auth/session.js';

// Full stepper mirrors the reference; steps 1–3 are interactive, the rest are
// placeholders so the progress bar reads correctly end to end.
const STEP_TITLES = [
  'Article Type Selection',
  'Attach Files',
  'General Information',
  'Review Preferences',
  'Additional Information',
  'Comments',
  'Manuscript Data',
];

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function SubmitManuscript() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    articleType: 'Original Manuscript',
    orcid: getOrcid(),
    files: [],
    section: 'None',
    classifications: [],
  });

  const update = (patch) => setData((prev) => ({ ...prev, ...patch }));
  const next = () => { setStep((s) => Math.min(s + 1, STEP_TITLES.length - 1)); scrollTop(); };
  const back = () => { setStep((s) => Math.max(s - 1, 0)); scrollTop(); };

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={step}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            {step === 0 && <StepArticleType data={data} update={update} onProceed={next} />}
            {step === 1 && <StepAttachFiles data={data} update={update} onBack={back} onProceed={next} />}
            {step === 2 && <StepGeneralInfo data={data} update={update} onBack={back} onProceed={next} />}

            {step > 2 && (
              <div className="am-step">
                <div className="am-panel">
                  <div className="am-panel-head">{STEP_TITLES[step]}</div>
                  <div className="am-panel-body">
                    <p className="am-panel-desc">
                      This step is part of the full submission flow and will be available soon.
                    </p>
                  </div>
                </div>
                <div className="am-actions">
                  <Button className="am-btn-secondary" onClick={back}>
                    <ArrowLeftOutlined /> Back
                  </Button>
                  {step < STEP_TITLES.length - 1 && (
                    <Button className="am-btn-primary" onClick={next}>
                      Proceed <ArrowRightOutlined />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
