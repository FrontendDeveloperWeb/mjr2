import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Steps, Table, Checkbox, Input, Button, Tag, message, Popconfirm } from 'antd';
import { ArrowLeftOutlined, EditOutlined, PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import { useQuery, useMutation } from '../../../../hooks/reactQuery/index.js';
import { OVERVIEW_STEP_TITLES } from '../overviewStepTitles.js';
import { getWizardState, setStep3Data, setStep5Data, clearWizardState } from '../paperDraftStore.js';

// Keys match the final-submission payload's confirm_* fields directly —
// checkbox state doubles as the request body, no separate mapping step.
const CHECKLIST_ITEMS = [
  { key: 'confirm_original', label: 'I confirm that this manuscript is original and has not been submitted elsewhere.' },
  { key: 'confirm_authors', label: 'All authors have reviewed and approved this submission.' },
  { key: 'confirm_policy', label: "I agree to the journal's publication policies." },
];

const DEFAULT_REMARKS = 'Please consider this paper for publication.';

// Removes a deleted file from the cached getPaperFiles response in place, so
// the table updates instantly without an extra GET round-trip. `old` is the
// RAW (pre-select) cache entry — `{ data: <full backend body>, pagination }`
// — mirroring every files-array shape this endpoint's response can take:
// bare array, `{data: [...]}`, `{data: {files: [...]}}` (the shape this
// endpoint actually uses), or `{files: [...]}`.
function removeFileFromFilesCache(old, deletedId) {
  if (!old) return old;
  const apiData = old.data;
  if (Array.isArray(apiData)) {
    return { ...old, data: apiData.filter((f) => f.id !== deletedId) };
  }
  if (Array.isArray(apiData?.data?.files)) {
    return {
      ...old,
      data: {
        ...apiData,
        data: { ...apiData.data, files: apiData.data.files.filter((f) => f.id !== deletedId) },
      },
    };
  }
  if (Array.isArray(apiData?.data)) {
    return { ...old, data: { ...apiData, data: apiData.data.filter((f) => f.id !== deletedId) } };
  }
  if (Array.isArray(apiData?.files)) {
    return { ...old, data: { ...apiData, files: apiData.files.filter((f) => f.id !== deletedId) } };
  }
  return old;
}

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
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (!slug) {
  //     message.warning('Please complete Step 1 first.');
  //     navigate('/author/submit-manuscript/step-1', { replace: true });
  //   }
  // }, [slug, navigate]);

  const wizardState = useMemo(() => getWizardState(), []);
  const authors = wizardState.step2Data || [];

  // Keywords are edited inline here (removal), so they need to live in local
  // state rather than being derived fresh from wizardState on every render —
  // otherwise a removed tag would just reappear. Each entry remembers whether
  // it came from `existingLabels` or `newKeywords` so a removal can be
  // written back to the matching half of step3Data.
  const [keywords, setKeywords] = useState(() => [
    ...(wizardState.step3Data?.existingLabels || []).map((label) => ({ label, source: 'existing' })),
    ...(wizardState.step3Data?.newKeywords || []).map((label) => ({ label, source: 'new' })),
  ]);

  const removeKeyword = (label, source) => {
    setKeywords((prev) => prev.filter((k) => !(k.label === label && k.source === source)));

    // `existingIds`/`existingLabels` are parallel arrays (same index refers
    // to the same keyword) — drop the matching index from both, not just
    // the label, so the id list stays in sync for anything read after this.
    const existingLabels = wizardState.step3Data?.existingLabels || [];
    const existingIds = wizardState.step3Data?.existingIds || [];
    const removeIndex = source === 'existing' ? existingLabels.indexOf(label) : -1;

    const nextStep3Data = {
      existingIds: removeIndex === -1 ? existingIds : existingIds.filter((_, i) => i !== removeIndex),
      existingLabels: removeIndex === -1 ? existingLabels : existingLabels.filter((_, i) => i !== removeIndex),
      newKeywords: (wizardState.step3Data?.newKeywords || []).filter(
        (l) => !(source === 'new' && l === label)
      ),
    };
    wizardState.step3Data = nextStep3Data;
    setStep3Data(nextStep3Data);
  };

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
      id: f.id,
      type: f.file_type_name || '—',
      name: f.original_name || '—',
      version: f.version || '—',
      size: f.file_size || '—',
      url: f.file_path || f.file_url || f.url || f.path || null,
    }))
    : [];

  const { mutate: deleteFile, isPending: isDeletingFile } = useMutation('deletePaperFile', {
    useFormData: false,
    showSuccessNotification: true,
    onSuccess: (_response, variables) => {
      // Update the cached list directly instead of refetching — the delete
      // already succeeded, so there's nothing new to fetch.
      queryClient.setQueryData(['getPaperFiles', slug], (old) =>
        removeFileFromFilesCache(old, variables?.data?.id)
      );
    },
  });

  const handleDeleteFile = (row) => {
    if (files.length === 1) {
      message.warning('At least one file is required.');
      return;
    }
    deleteFile({ slug, data: { id: row.id } });
  };

  const handleViewFile = (row) => {
    if (row.url) window.open(row.url, '_blank', 'noopener,noreferrer');
  };

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
    {
      title: 'Name',
      key: 'name',
      render: (_, a) => a.displayName || [a.first_name, a.last_name].filter(Boolean).join(' ') || '—',
    },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Institution',
      key: 'institution',
      render: (_, a) => a.affiliations?.[0]?.institution_name || '—',
    },
    {
      title: 'Corresponding',
      dataIndex: 'is_corresponding',
      width: 150,
      render: (v) => (v ? <Tag color="green">Yes</Tag> : 'No'),
    },
  ];

  const fileColumns = [
    { title: 'Type', dataIndex: 'type', width: 160 },
    { title: 'File', dataIndex: 'name' },
    { title: 'Version', dataIndex: 'version', width: 100 },
    { title: 'Size', dataIndex: 'size', width: 100 },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, row) => (
        <div className="am-table-actions">
          <button
            type="button"
            className="am-icon-btn"
            aria-label="View file"
            disabled={!row.url}
            onClick={() => handleViewFile(row)}
          >
            <EyeOutlined />
          </button>
          <Popconfirm
            title="Remove this file?"
            okText="Remove"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDeleteFile(row)}
          >
            <button type="button" className="am-icon-btn am-icon-btn-danger" aria-label="Remove file" disabled={isDeletingFile}>
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const { mutate: finalSubmit, isPending: isSubmitting } = useMutation('finalSubmitPaper', {
    useFormData: false,
    // Lets apiClient show the backend's own response message (data.message)
    // as the success notification — fired synchronously before onSuccess
    // runs below, so it's already on screen by the time this navigates away.
    showSuccessNotification: true,
    // apiClient already throws (→ onError, not onSuccess) whenever the body
    // says `status: false`, so reaching here already means `status: true` —
    // no separate check needed.
    onSuccess: (response) => {
      // ThankYouPage has nothing of its own to fetch a completed submission
      // from (final-submission is a one-shot action, not a "get paper"
      // endpoint), so hand it everything it needs to render as router state —
      // the same data this page already assembled for its own summary above,
      // plus whatever the backend's own response body included.
      const responseData = response?.data?.data || response?.data || {};
      const submission = {
        manuscriptNo: responseData.manuscript_no || manuscriptNo,
        journalName: responseData.journal_title || journalName,
        paperTypeName: responseData.paper_type_name || paperTypeName,
        paperTitle: responseData.title || paperTitle,
        submittedAt: responseData.submitted_at || responseData.created_at || new Date().toISOString(),
        subjects: Array.isArray(paperObj.subjects)
          ? paperObj.subjects.map((sub) => sub.name || sub)
          : [],
        keywords: keywords.map((k) => k.label),
        authors,
        files,
        message: response?.data?.message || '',
      };

      clearWizardState();
      navigate('/submission-success', { replace: true, state: { submission } });
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
                      <span className="am-summary-label">
                        Subjects
                        <button
                          type="button"
                          className="am-icon-btn am-inline-edit-btn"
                          aria-label="Edit subjects"
                          onClick={() => navigate('/author/submit-manuscript/step-1')}
                        >
                          <EditOutlined />
                        </button>
                      </span>
                      <span className="am-summary-value">{subjectsText}</span>
                    </div>
                    <div className="am-summary-item">
                      <span className="am-summary-label">
                        Keywords
                        <button
                          type="button"
                          className="am-icon-btn am-inline-edit-btn"
                          aria-label="Add or edit keywords"
                          onClick={() => navigate('/author/submit-manuscript/step-3')}
                        >
                          <PlusOutlined />
                        </button>
                      </span>
                      <div className="am-tag-wrap">
                        {keywords.length
                          ? keywords.map((k) => (
                            <Tag
                              key={`${k.source}-${k.label}`}
                              color="cyan"
                              closable
                              onClose={() => removeKeyword(k.label, k.source)}
                            >
                              {k.label}
                            </Tag>
                          ))
                          : <span className="am-muted">—</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {authors.length > 0 && (
                <>
                  <h2 className="am-section-heading am-mt-24">Authors</h2>
                  <div className="am-panel">
                    <div className="am-panel-body">
                      <Table
                        className="am-file-table"
                        columns={authorColumns}
                        dataSource={authors}
                        rowKey="id"
                        size="small"
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="am-section-heading-row am-mt-24">
                <h2 className="am-section-heading">Uploaded Files</h2>
                <Button
                  className="am-btn-theme"
                  icon={<PlusOutlined />}
                  onClick={() => navigate('/author/submit-manuscript/step-4')}
                >
                  Upload File
                </Button>
              </div>
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
                  {error && <p className="am-error-text">{error}</p>}
                  <label className="am-field-label am-mt-24">Remarks (Optional)</label>
                  <Input.TextArea
                    rows={4}
                    value={remarks}
                    placeholder={DEFAULT_REMARKS}
                    onChange={(e) => handleRemarksChange(e.target.value)}
                  />


                </div>
              </div>

              <div className="am-actions am-mt-24">
                <Button className="am-btn-secondary" onClick={handleBack}>
                  <ArrowLeftOutlined /> Back
                </Button>
                <Button
                  className="am-btn-theme"
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
