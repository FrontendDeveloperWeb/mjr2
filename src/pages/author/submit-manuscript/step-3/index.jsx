import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps, Select, Button, Tag } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
  MinusOutlined,
  PlusOutlined,
  CheckOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import ClassificationsModal from './ClassificationsModal.jsx';
import { SECTION_OPTIONS, CLASSIFICATION_LABELS } from './classificationData.js';
import { STEP_TITLES } from '../stepTitles.js';
import { setStepData } from '../manuscriptStore.js';
import { useDraftId, useDraftAutosave } from '../useManuscriptDraft.js';

/** Collapsible card matching the reference panels (header toggles the body). */
function CollapsibleCard({ title, defaultOpen = true, invalid = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`am-panel ${invalid ? 'am-panel-error' : ''}`}>
      <button type="button" className="am-panel-head am-panel-toggle" onClick={() => setOpen((o) => !o)}>
        <span className="am-panel-toggle-icon">{open ? <MinusOutlined /> : <PlusOutlined />}</span>
        <span className="am-panel-toggle-title">{title}</span>
        {invalid && <ExclamationCircleFilled className="am-panel-warn" />}
      </button>
      {open && <div className="am-panel-body">{children}</div>}
    </div>
  );
}

export default function SubmitManuscriptStep3() {
  const navigate = useNavigate();

  const [section, setSection] = useState('None');
  const [classifications, setClassifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const sectionMissing = !section || section === 'None';
  const classMissing = classifications.length === 0;

  const draftId = useDraftId();
  useDraftAutosave(draftId, 'step3', 3, { section, classifications });

  const handleProceed = () => {
    if (sectionMissing || classMissing) {
      setShowErrors(true);
      return;
    }
    setStepData('step3', { section, classifications });
    navigate('/author/submit-manuscript/step-4');
  };

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={2}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 3: General Information</h1>

              <div className="am-attach-topbar">
                <a href="#insert-char" className="am-help-link am-insert-link">Insert Special Character</a>
              </div>

              <div className="row g-4">
                {/* Left helper rail */}
                <aside className="col-12 col-lg-3">
                  <p className="am-help-strong">Please provide the requested information.</p>
                </aside>

                {/* Cards */}
                <div className="col-12 col-lg-9">
                  {/* Section / Category */}
                  <CollapsibleCard title="Section/Category" invalid={showErrors && sectionMissing}>
                    <p className="am-panel-desc">
                      Select the Section or Category related to your manuscript from the drop-down
                      menu below.
                    </p>

                    <label className="am-field-label am-req-label">
                      Required
                      {!sectionMissing && <CheckOutlined className="am-req-ok" />}
                      {showErrors && sectionMissing && <span className="am-req-star"> *</span>}
                    </label>
                    <Select
                      className="am-section-select"
                      value={section}
                      options={SECTION_OPTIONS}
                      onChange={(value) => {
                        setSection(value);
                        if (value !== 'None') setShowErrors((s) => s && classMissing);
                      }}
                      status={showErrors && sectionMissing ? 'error' : ''}
                    />
                    {showErrors && sectionMissing && (
                      <p className="am-error-text">Please select a Section/Category to continue.</p>
                    )}

                    <div className="am-panel-inline-actions">
                      <Button className="am-btn-primary am-btn-sm">
                        <DownOutlined /> Next
                      </Button>
                    </div>
                  </CollapsibleCard>

                  {/* Classifications */}
                  <CollapsibleCard title="Classifications" invalid={showErrors && classMissing}>
                    <p className="am-panel-desc">
                      Please identify your submission&rsquo;s areas of interest and specialization by
                      selecting one or more classifications.
                    </p>

                    <p className="am-field-label am-req-label">
                      Required <span className="am-req-star">*</span> Select 1 or more Classifications
                    </p>
                    <div className="am-class-summary">
                      {classifications.length ? (
                        <div className="am-tag-wrap">
                          {classifications.map((k) => (
                            <Tag key={k} className="am-class-tag">{CLASSIFICATION_LABELS[k]}</Tag>
                          ))}
                        </div>
                      ) : (
                        <span className="am-muted">(None Selected)</span>
                      )}
                    </div>
                    {showErrors && classMissing && (
                      <p className="am-error-text">Please select at least one classification.</p>
                    )}

                    <Button className="am-btn-primary am-btn-sm" onClick={() => setModalOpen(true)}>
                      Add Classifications
                    </Button>
                  </CollapsibleCard>

                  <div className="am-actions">
                    <Button className="am-btn-secondary" onClick={() => navigate('/author/submit-manuscript/step-2')}>
                      <ArrowLeftOutlined /> Back
                    </Button>
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

      <ClassificationsModal
        open={modalOpen}
        value={classifications}
        onCancel={() => setModalOpen(false)}
        onSubmit={(keys) => {
          setClassifications(keys);
          setModalOpen(false);
          setShowErrors((s) => s && sectionMissing);
        }}
      />
    </Layout>
  );
}
