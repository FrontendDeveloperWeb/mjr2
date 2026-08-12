import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps, Input, Button, Checkbox } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MinusOutlined,
  PlusOutlined,
  DownOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
  ExclamationCircleFilled,
  WarningFilled,
} from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import RichTextEditor from '../../../../components/shared/RichTextEditor/RichTextEditor.jsx';
import AddAuthorModal from './AddAuthorModal.jsx';
import AddFundingModal from './AddFundingModal.jsx';
import { SEED_AUTHORS } from './manuscriptData.js';
import { STEP_TITLES } from '../stepTitles.js';
import { setStepData, getManuscriptData, resetManuscriptStore } from '../manuscriptStore.js';
import { openManuscriptPdf } from '../pdfGenerator.js';
import { useDraftId, useDraftAutosave, completeDraft } from '../useManuscriptDraft.js';

const ABSTRACT_WORD_LIMIT = 300;
const KEYWORD_LIMIT = 6;

const countWords = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0);
const countKeywords = (text) => text.split(';').map((k) => k.trim()).filter(Boolean).length;

/** Collapsible card with a header toggle and an optional review warning icon. */
function CollapsibleCard({ title, defaultOpen = true, warn = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`am-panel ${warn ? 'am-panel-error' : ''}`}>
      <button type="button" className="am-panel-head am-panel-toggle" onClick={() => setOpen((o) => !o)}>
        <span className="am-panel-toggle-icon">{open ? <MinusOutlined /> : <PlusOutlined />}</span>
        <span className="am-panel-toggle-title">{title}</span>
        {warn && <ExclamationCircleFilled className="am-panel-warn" />}
      </button>
      {open && <div className="am-panel-body">{children}</div>}
    </div>
  );
}

export default function SubmitManuscriptStep6() {
  const navigate = useNavigate();

  const [fullTitle, setFullTitle] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [keywords, setKeywords] = useState('');
  const [authors, setAuthors] = useState(SEED_AUTHORS);
  const [funders, setFunders] = useState([]);
  const [fundingNA, setFundingNA] = useState(false);

  const [authorModal, setAuthorModal] = useState(false);
  const [fundingModal, setFundingModal] = useState(false);

  const abstractWords = countWords(abstractText);
  const keywordCount = countKeywords(keywords);

  const draftId = useDraftId();
  useDraftAutosave(draftId, 'step6', 6, {
    fullTitle,
    shortTitle,
    abstractText,
    keywords,
    authors,
    funders,
    fundingNA,
  });

  // Section review warnings (mirror the reference warning icons).
  const titleWarn = !fullTitle.trim();
  const abstractWarn = !abstractText.trim();
  const keywordsWarn = !keywords.trim();
  const authorsWarn = authors.some((a) => a.warn);
  const fundingWarn = funders.length === 0 && !fundingNA;

  const addAuthor = (values) => {
    const roles = values.corresponding ? ['Corresponding Author'] : [];
    setAuthors((prev) => [
      ...prev,
      {
        id: `author-${Date.now()}`,
        name: [values.firstName, values.middleName, values.lastName].filter(Boolean).join(' '),
        roles,
        meta: values.institution || 'none',
        warn: false,
      },
    ]);
    setAuthorModal(false);
  };

  const handleBuildPdf = () => {
    setStepData('step6', { fullTitle, shortTitle, abstractText, keywords, authors, funders, fundingNA });
    openManuscriptPdf(getManuscriptData());

    // Submission complete: it's no longer a draft, so clear it and reset the
    // wizard state before sending the author back to the menu.
    completeDraft(draftId);
    resetManuscriptStore();
    navigate('/author/main-menu');
  };

  const addFunder = (values) => {
    setFunders((prev) => [
      ...prev,
      {
        id: `fund-${Date.now()}`,
        funder: values.funder,
        award: values.award || '—',
        recipient: values.recipient || '—',
      },
    ]);
    setFundingModal(false);
  };

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={5}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 6: Manuscript Data</h1>

              <div className="am-attach-topbar">
                <a href="#insert-char" className="am-help-link am-insert-link">Insert Special Character</a>
              </div>

              <div className="row g-4">
                {/* Left rail instructions */}
                <aside className="col-12 col-lg-3">
                  <p className="am-help-strong">
                    When possible these fields will be populated with information collected from your
                    uploaded submission file. Steps requiring review will be marked with a warning
                    icon. Please review these fields to be sure we found the correct information and
                    fill in any missing details.
                  </p>
                  <p className="am6-side-note">
                    Enter Alt + 0 in fields containing rich text formatting options to display
                    accessible, language-localized formatting instructions.
                  </p>
                </aside>

                <div className="col-12 col-lg-9">
                  {/* 1. Title */}
                  <CollapsibleCard title="Title" warn={titleWarn}>
                    <label className="am-field-label">
                      Full Title <span className="am6-muted">(required)</span> <span className="am-req-star">*</span>
                    </label>
                    <RichTextEditor placeholder="Enter the full title" onChange={(_html, text) => setFullTitle(text)} />

                    <label className="am-field-label mt-3">Short Title</label>
                    <Input.TextArea rows={2} value={shortTitle} onChange={(e) => setShortTitle(e.target.value)} />

                    <div className="am-panel-inline-actions">
                      <Button className="am-btn-primary am-btn-sm"><DownOutlined /> Next</Button>
                    </div>
                  </CollapsibleCard>

                  {/* 2. Abstract */}
                  <CollapsibleCard title="Abstract" warn={abstractWarn}>
                    <label className="am-field-label">
                      Abstract <span className="am6-muted">(required)</span> <span className="am-req-star">*</span>
                    </label>
                    <p className="am6-limit">Limit {ABSTRACT_WORD_LIMIT} words</p>
                    <RichTextEditor placeholder="Enter the abstract" minHeight={180} onChange={(_html, text) => setAbstractText(text)} />
                    <p className={`am6-count ${abstractWords > ABSTRACT_WORD_LIMIT ? 'is-over' : ''}`}>
                      Word Count: {abstractWords} / {ABSTRACT_WORD_LIMIT}
                    </p>

                    <div className="am-panel-inline-actions">
                      <Button className="am-btn-primary am-btn-sm"><DownOutlined /> Next</Button>
                    </div>
                  </CollapsibleCard>

                  {/* 3. Keywords */}
                  <CollapsibleCard title="Keywords" warn={keywordsWarn}>
                    <p className="am-panel-desc">
                      Please enter keywords separated by semicolons. Each individual keyword may be up
                      to 256 characters in length.
                    </p>
                    <label className="am-field-label">
                      Required <span className="am-req-star">*</span>{' '}
                      <span className="am6-limit-inline">Limit {KEYWORD_LIMIT} Keywords</span>
                    </label>
                    <Input.TextArea
                      rows={3}
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="keyword one; keyword two; keyword three"
                    />
                    <p className={`am6-count ${keywordCount > KEYWORD_LIMIT ? 'is-over' : ''}`}>
                      Keywords: {keywordCount} / {KEYWORD_LIMIT}
                    </p>

                    <div className="am-panel-inline-actions">
                      <Button className="am-btn-primary am-btn-sm"><DownOutlined /> Next</Button>
                    </div>
                  </CollapsibleCard>

                  {/* 4. Authors */}
                  <CollapsibleCard title="Authors" warn={authorsWarn}>
                    <div className="am6-callout">
                      <InfoCircleFilled className="am6-callout-icon" />
                      <span className="am6-callout-title">Important information about corresponding authors</span>
                      <InfoCircleOutlined className="am6-callout-info" />
                    </div>
                    <p className="am-panel-desc am6-callout-text">
                      The corresponding author will communicate with Elsevier during the editorial
                      process. Their institution determines if any <a href="#agreements" className="am-help-link">publishing agreements</a> are
                      applicable, which can affect the price of publishing open access and who pays.
                      Use their main institution, not their department.
                    </p>
                    <p className="am-panel-desc am6-callout-text">
                      This selection does not prevent additional <a href="#corresponding" className="am-help-link">corresponding authors</a> from
                      being referenced in the final published article.
                    </p>
                    <p className="am6-reorder">Reorder the authors by dragging and dropping them into the correct position.</p>

                    <div className="am6-list">
                      <div className="am6-list-head">
                        <span>Current Author List</span>
                        <button type="button" className="am6-list-add" onClick={() => setAuthorModal(true)}>
                          <PlusOutlined /> Add Another Author
                        </button>
                      </div>
                      {authors.map((a) => (
                        <div key={a.id} className="am6-author-row">
                          <span className="am6-drag-handle" aria-hidden="true">⋮⋮</span>
                          <div className="am6-author-info">
                            <div className="am6-author-name">
                              {a.name}{' '}
                              {a.roles.map((r) => (
                                <span key={r} className="am6-role">[{r}]</span>
                              ))}
                              {a.warn && <WarningFilled className="am6-row-warn" />}
                            </div>
                            <div className="am6-author-meta">{a.meta}</div>
                          </div>
                        </div>
                      ))}
                      <button type="button" className="am6-list-foot-add" onClick={() => setAuthorModal(true)}>
                        <PlusOutlined /> Add Another Author
                      </button>
                    </div>

                    <div className="am-panel-inline-actions">
                      <Button className="am-btn-primary am-btn-sm"><DownOutlined /> Next</Button>
                    </div>
                  </CollapsibleCard>

                  {/* 5. Funding Information */}
                  <CollapsibleCard title="Funding Information" warn={fundingWarn}>
                    <p className="am-panel-desc">Select the funder(s) for this research from the dropdown list</p>
                    <ul className="am6-fund-hints">
                      <li>Funder details help to determine if your manuscript qualifies for reduced OA publishing charges.</li>
                      <li>Two or more funders? Enter the organisation providing the most funding first.</li>
                    </ul>
                    <p className="am-panel-desc">
                      If you cannot find your funder in the dropdown list - please enter the entire funder
                      name, award number (if available) and recipient.
                    </p>

                    <label className="am-field-label">
                      Required <span className="am-req-star">*</span> <InfoCircleOutlined className="am6-callout-info" />
                    </label>

                    <div className="am6-list">
                      <div className="am6-list-head">
                        <span>Current Funding Sources List</span>
                        <button type="button" className="am6-list-add" onClick={() => setFundingModal(true)}>
                          <PlusOutlined /> Add a Funding Source
                        </button>
                      </div>
                      {funders.length ? (
                        funders.map((f) => (
                          <div key={f.id} className="am6-fund-row">
                            <span className="am6-fund-name">{f.funder}</span>
                            <span className="am6-fund-cell">Award: {f.award}</span>
                            <span className="am6-fund-cell">Recipient: {f.recipient}</span>
                          </div>
                        ))
                      ) : (
                        <div className="am6-fund-empty">There are currently no Funding Sources in the list</div>
                      )}
                      <button type="button" className="am6-list-foot-add" onClick={() => setFundingModal(true)}>
                        <PlusOutlined /> Add a Funding Source
                      </button>
                    </div>

                    <Checkbox
                      className="am6-fund-na"
                      checked={fundingNA}
                      onChange={(e) => setFundingNA(e.target.checked)}
                    >
                      Funding information is not available.
                    </Checkbox>
                  </CollapsibleCard>

                  {/* Final actions */}
                  <div className="am-actions am6-final-actions">
                    <Button className="am-btn-secondary" onClick={() => navigate('/author/submit-manuscript/step-5')}>
                      <ArrowLeftOutlined /> Back
                    </Button>
                    <Button className="am-btn-secondary" onClick={() => navigate('/author/main-menu')}>
                      Save &amp; Submit Later
                    </Button>
                    <Button className="am-btn-primary" onClick={handleBuildPdf}>
                      Build PDF for Approval <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddAuthorModal open={authorModal} onCancel={() => setAuthorModal(false)} onSave={addAuthor} />
      <AddFundingModal open={fundingModal} onCancel={() => setFundingModal(false)} onSave={addFunder} />
    </Layout>
  );
}
