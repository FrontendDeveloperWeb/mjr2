import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Steps, Table, Checkbox, Input, Button, Tag, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import { useQuery, useMutation } from '../../../../hooks/reactQuery/index.js';
import { OVERVIEW_STEP_TITLES } from '../overviewStepTitles.js';
import { getWizardState, setStep5Data, clearWizardState } from '../paperDraftStore.js';

// Keys match the final-submission payload's confirm_* fields directly —
// checkbox state doubles as the request body, no separate mapping step.
const CHECKLIST_ITEMS = [
  { key: 'confirm_original', label: 'I confirm that this manuscript is original and has not been submitted elsewhere.' },
  { key: 'confirm_authors', label: 'All authors have reviewed and approved this submission.' },
  { key: 'confirm_policy', label: "I agree to the journal's publication policies." },
];

const DEFAULT_REMARKS = 'Please consider this paper for publication.';

/**
 * Step 5 — Final Submission. Part of the (new) Overview-first flow (see
 * overviewStepTitles.js) — replaces the old step-5 "Comments" page from the
 * separate step-1..step-6 flow at this same route.
 *
 * Paper Overview, Authors, and Keywords are read straight out of wizardState
 * (Steps 1-3's saved data) — no fetch. Uploaded Files is the one section
 * that comes from an API response: Step 4's existing getPaperFiles
 * (GET papers/get-files/{slug}), reused here rather than added anew, since
 * there's no wizardState equivalent for the files list. "Submit Paper"
 * posts to papers/final-submission/{slug} with the three confirm_* flags
 * plus remarks (defaulting to DEFAULT_REMARKS when left blank).
 */
export default function SubmitManuscriptStep5() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug') || getWizardState()?.slug || null;

  // useEffect(() => {
  //   if (!slug) {
  //     message.warning('Please complete Step 1 first.');
  //     navigate('/author/submit-manuscript/step-1', { replace: true });
  //   }
  // }, [slug, navigate]);

  const wizardState = useMemo(() => getWizardState(), []);
  const authors = wizardState.step2Data || [];
  const keywords = [...(wizardState.step3Data?.existingLabels || []), ...(wizardState.step3Data?.newKeywords || [])];

  // Step 1 Data Extraction — wizardState.step1Data is `{ id, slug, paper: {...} }`;
  // the actual overview fields live under the nested `paper` object, not
  // top-level (confirmed against a real console log of the stored state).
  const paperObj = wizardState.step1Data?.paper || wizardState.step1Data || {};
  const journalName = paperObj.journal_title || paperObj.journal_name || '—';
  const paperTypeName = paperObj.paper_type_name || '—';
  const paperTitle = paperObj.title || '—';
  const manuscriptNo = paperObj.manuscript_no || wizardState.step1Data?.slug || '—';
  // Subjects arrive as an array of objects (e.g. [{ name: 'Zoology' }, ...]).
  const subjectsText = Array.isArray(paperObj.subjects)
    ? paperObj.subjects.map((sub) => sub.name || sub).join(', ')
    : '—';

  // Same endpoint Step 4 already calls — reused here, not a new request.
  // Only the `files` array is taken from this response; overview fields
  // above come from wizardState.step1Data instead.
  const { data: filesResult } = useQuery('getPaperFiles', { slug, enabled: Boolean(slug) });
  const overviewData = filesResult?.data?.data || filesResult?.data || {};

  const files = Array.isArray(overviewData?.files)
    ? overviewData.files.map((f) => ({
      type: f.file_type_name || '—',
      name: f.original_name || '—',
      version: f.version || '—',
      size: f.file_size || '—',
    }))
    : [];

  // Rehydrate the checklist/remarks too, same as every other step, in case
  // the user comes back here after navigating away without submitting.
  const [checked, setChecked] = useState(() => wizardState.step5Data?.checked || {});
  const [remarks, setRemarks] = useState(() => wizardState.step5Data?.remarks || '');
  const [error, setError] = useState('');

  const toggleCheck = (key, value) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: value };
      setStep5Data({ checked: next, remarks });
      return next;
    });
    setError('');
  };

  const handleRemarksChange = (value) => {
    setRemarks(value);
    setStep5Data({ checked, remarks: value });
  };

  const authorColumns = [
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Corresponding',
      dataIndex: 'isCorresponding',
      width: 150,
      render: (v) => (v ? <Tag color="green">Yes</Tag> : 'No'),
    },
    { title: 'Contribution', dataIndex: 'contributionText' },
  ];

  const fileColumns = [
    { title: 'Type', dataIndex: 'type', width: 160 },
    { title: 'File', dataIndex: 'name' },
    { title: 'Version', dataIndex: 'version', width: 100 },
    { title: 'Size', dataIndex: 'size', width: 100 },
  ];

  const { mutate: finalSubmit, isPending: isSubmitting } = useMutation('finalSubmitPaper', {
    useFormData: false,
    showSuccessNotification: false,
    // apiClient already throws (→ onError, not onSuccess) whenever the body
    // says `status: false`, so reaching here already means `status: true` —
    // no separate check needed.
    onSuccess: () => {
      clearWizardState();
      navigate('/author/main-menu', { replace: true });
    },
  });

  const handleBack = () => {
    navigate('/author/submit-manuscript/step-4');
  };

  const allChecked = CHECKLIST_ITEMS.every((item) => checked[item.key]);

  const handleSubmit = () => {
    // Belt-and-suspenders with the Submit button's own `disabled` below —
    // this guard still matters since `disabled` alone doesn't stop a form
    // submit triggered another way (e.g. pressing Enter in a field).
    if (!allChecked) {
      setError('Please confirm every item in the submission checklist.');
      message.error('Please confirm every item in the submission checklist.');
      return;
    }
    finalSubmit({
      slug,
      data: {
        confirm_original: !!checked.confirm_original,
        confirm_authors: !!checked.confirm_authors,
        confirm_policy: !!checked.confirm_policy,
        remarks: remarks.trim() || DEFAULT_REMARKS,
      },
    });
  };

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
            items={OVERVIEW_STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Final Submission</h1>

              <h2 className="am-section-heading">Paper Overview</h2>
              <div className="am-panel">
                <div className="am-panel-body am-summary-grid">
                  <div className="am-summary-col">
                    <div className="am-summary-item">
                      <span className="am-summary-label">Journal</span>
                      <span className="am-summary-value">{journalName}</span>
                    </div>
                    <div className="am-summary-item">
                      <span className="am-summary-label">Title</span>
                      <span className="am-summary-value">{paperTitle}</span>
                    </div>
                    <div className="am-summary-item">
                      <span className="am-summary-label">Manuscript No.</span>
                      <span className="am-summary-value">{manuscriptNo}</span>
                    </div>
                  </div>
                  <div className="am-summary-col">
                    <div className="am-summary-item">
                      <span className="am-summary-label">Paper Type</span>
                      <span className="am-summary-value">{paperTypeName}</span>
                    </div>
                    <div className="am-summary-item">
                      <span className="am-summary-label">Subjects</span>
                      <span className="am-summary-value">{subjectsText}</span>
                    </div>
                    <div className="am-summary-item">
                      <span className="am-summary-label">Keywords</span>
                      <div className="am-tag-wrap">
                        {keywords.length
                          ? keywords.map((k) => <Tag key={k} color="cyan">{k}</Tag>)
                          : <span className="am-muted">—</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="am-section-heading am-mt-24">Authors</h2>
              <div className="am-panel">
                <div className="am-panel-body">
                  <Table
                    className="am-file-table"
                    columns={authorColumns}
                    dataSource={authors}
                    rowKey="name"
                    size="small"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                  />
                </div>
              </div>

              <h2 className="am-section-heading am-mt-24">Uploaded Files</h2>
              <div className="am-panel">
                <div className="am-panel-body">
                  <Table
                    className="am-file-table"
                    columns={fileColumns}
                    dataSource={files}
                    rowKey="name"
                    size="small"
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                  />
                </div>
              </div>

              <h2 className="am-section-heading am-mt-24">Submission Checklist</h2>
              <div className="am-panel">
                <div className="am-panel-body">
                  {CHECKLIST_ITEMS.map((item) => (
                    <div key={item.key} className="am-checklist-row">
                      <Checkbox
                        required
                        checked={!!checked[item.key]}
                        onChange={(e) => toggleCheck(item.key, e.target.checked)}
                      >
                        {item.label} <span className="am-req-star">*</span>
                      </Checkbox>
                    </div>
                  ))}

                  <label className="am-field-label am-mt-24">Remarks (Optional)</label>
                  <Input.TextArea
                    rows={4}
                    value={remarks}
                    placeholder={DEFAULT_REMARKS}
                    onChange={(e) => handleRemarksChange(e.target.value)}
                  />

                  {error && <p className="am-error-text">{error}</p>}
                </div>
              </div>

              <div className="am-actions am-mt-24">
                <Button className="am-btn-secondary" onClick={handleBack}>
                  <ArrowLeftOutlined /> Back
                </Button>
                <Button
                  className="am-btn-blue"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                >
                  Submit Paper
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
