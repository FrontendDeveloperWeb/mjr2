import { useState } from 'react';
import { Select, Button, Tag } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, DownOutlined } from '@ant-design/icons';
import ClassificationsModal from './ClassificationsModal.jsx';
import { SECTION_OPTIONS, CLASSIFICATION_LABELS } from './submitOptions.js';

/**
 * Step 3 — General Information. Two panels: a required Section/Category select
 * and a Classifications picker backed by the tree modal. Proceed is blocked
 * until a real section (not "None") is chosen, mirroring the required marker.
 */
export default function StepGeneralInfo({ data, update, onBack, onProceed }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const sectionMissing = !data.section || data.section === 'None';
  const classifications = data.classifications || [];

  const handleProceed = () => {
    if (sectionMissing) {
      setShowError(true);
      return;
    }
    onProceed();
  };

  return (
    <div className="am-step">
      <div className="row g-4">
        <aside className="col-12 col-lg-3">
          <p className="am-help-strong">Please provide the requested information.</p>
        </aside>

        <div className="col-12 col-lg-9">
          {/* Section / Category */}
          <div className={`am-panel ${showError && sectionMissing ? 'am-panel-error' : ''}`}>
            <div className="am-panel-head">Section/Category</div>
            <div className="am-panel-body">
              <p className="am-panel-desc">
                Select the Section or Category related to your manuscript from the drop-down
                menu below.
              </p>
              <label className="am-field-label am-required">Required</label>
              <Select
                className="am-section-select"
                value={data.section || 'None'}
                options={SECTION_OPTIONS}
                onChange={(value) => {
                  update({ section: value });
                  if (value && value !== 'None') setShowError(false);
                }}
                status={showError && sectionMissing ? 'error' : ''}
              />
              {showError && sectionMissing && (
                <p className="am-error-text">Please select a Section/Category to continue.</p>
              )}
              <div className="am-panel-inline-actions">
                <Button className="am-btn-primary am-btn-sm">
                  <DownOutlined /> Next
                </Button>
              </div>
            </div>
          </div>

          {/* Classifications */}
          <div className="am-panel">
            <div className="am-panel-head">Classifications</div>
            <div className="am-panel-body">
              <p className="am-panel-desc">
                Please identify your submission&rsquo;s areas of interest and specialization by
                selecting one or more classifications.
              </p>

              <p className="am-field-label">Select any number of Classifications</p>
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

              <Button className="am-btn-primary am-btn-sm" onClick={() => setModalOpen(true)}>
                Add Classifications
              </Button>
            </div>
          </div>

          <div className="am-actions">
            <Button className="am-btn-secondary" onClick={onBack}>
              <ArrowLeftOutlined /> Back
            </Button>
            <Button className="am-btn-primary" onClick={handleProceed}>
              Proceed <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </div>

      <ClassificationsModal
        open={modalOpen}
        value={classifications}
        onCancel={() => setModalOpen(false)}
        onSubmit={(keys) => {
          update({ classifications: keys });
          setModalOpen(false);
        }}
      />
    </div>
  );
}
