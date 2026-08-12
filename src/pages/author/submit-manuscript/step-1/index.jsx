import { useEffect, useMemo, useState } from 'react';
import { Steps, Select, Input, Button, message } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import RichTextEditor from '../../../../components/shared/RichTextEditor/RichTextEditor.jsx';
import { useQuery, useMutation } from '../../../../hooks/reactQuery/index.js';
import { useGlobalData } from '../../../../hooks/queries/index.js';
import { setPaperDraft } from '../paperDraftStore.js';

// Local to this page (not the shared stepTitles.js) — steps 2-6 still run
// their own separate flow/title set, so this can't reuse that shared list
// without changing their step bar too.
const OVERVIEW_STEP_TITLES = ['Overview', 'Author', 'Keywords', 'Upload Files', 'Final Submission'];

// The Subjects API returns a parent/children tree (see PersonalClassificationsModal
// for the same shape) — flattened here since this field is a plain tag
// multi-select, not a tree.
function flattenSubjects(nodes = []) {
  return nodes.flatMap((node) => [
    { value: node.id, label: node.name },
    ...(node.children?.length ? flattenSubjects(node.children) : []),
  ]);
}

/**
 * Step 1 — Overview. Uses the same <Steps>/am-panel/am-field-label shell as
 * every other submit-manuscript step page — only the fields inside the panel
 * are new. Journal comes from the shared global journal-data cache (this app
 * only has one journal); Paper Type and Subject are fetched live. Save/Save &
 * Next both POST to /papers/store; on success the returned paper (with its
 * slug) is stashed in paperDraftStore.js for the not-yet-built later steps.
 */
export default function SubmitManuscriptStep1() {
  const { data: journal, isLoading: journalLoading } = useGlobalData();
  const journalOptions = useMemo(
    () => (journal?.id ? [{ value: journal.id, label: journal.title }] : []),
    [journal]
  );

  const [journalId, setJournalId] = useState(undefined);
  const [paperTypeId, setPaperTypeId] = useState(undefined);
  const [subjects, setSubjects] = useState([]);
  const [title, setTitle] = useState('');
  const [abstractHtml, setAbstractHtml] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [errors, setErrors] = useState({});
  // Tracks which button triggered the in-flight save, so only that button
  // shows a spinner (both call the same mutation).
  const [pendingAction, setPendingAction] = useState(null);

  // Single-journal system — auto-select the only journal once it loads,
  // same as a pre-filled (not user-editable) dropdown would behave.
  useEffect(() => {
    if (journal?.id && journalId === undefined) {
      setJournalId(journal.id);
    }
  }, [journal, journalId]);

  const { data: subjectsResult, isLoading: subjectsLoading } = useQuery('getSubjects');
  const subjectOptions = useMemo(
    () => flattenSubjects(subjectsResult?.data || []),
    [subjectsResult]
  );

  const { data: paperTypesResult, isLoading: paperTypesLoading } = useQuery('getPaperTypes');
  const paperTypeOptions = useMemo(
    () => (paperTypesResult?.data || []).map((pt) => ({ value: pt.id, label: pt.name })),
    [paperTypesResult]
  );

  const { mutate: storePaper, isPending: isSaving } = useMutation('storePaper', {
    useFormData: false,
    onSuccess: (response) => {
      const paper = response?.data?.data || response?.data || {};
      setPaperDraft(paper);
      message.success('Overview saved.');
      setPendingAction(null);
      // The Author step isn't built yet, so "Save & Next" has nowhere to
      // navigate to — the draft (with its slug) is ready for it once that
      // page exists.
    },
    onError: () => setPendingAction(null),
  });

  const buildPayload = () => {
    const selectedJournal = journalOptions.find((o) => o.value === journalId);
    const selectedPaperType = paperTypeOptions.find((o) => o.value === paperTypeId);
    const selectedSubjects = subjects
      .map((id) => subjectOptions.find((o) => o.value === id))
      .filter(Boolean)
      .map((o) => ({ id: o.value, name: o.label }));

    return {
      journal_id: journalId,
      journal_title: selectedJournal?.label,
      paper_type_id: paperTypeId,
      paper_type_name: selectedPaperType?.label,
      title,
      abstract: abstractHtml,
      // No "Remarks" field in this UI today — sent empty to match the API's
      // expected payload shape without adding a new form field.
      remarks: '',
      subjects: selectedSubjects,
    };
  };

  const validate = () => {
    const nextErrors = {};
    if (!journalId) nextErrors.journal = 'Please select a journal';
    if (!paperTypeId) nextErrors.paperType = 'Please select a paper type';
    if (!subjects.length) nextErrors.subjects = 'Please select at least one subject';
    if (!title.trim()) nextErrors.title = 'Please enter a title';
    if (!abstractText.trim()) nextErrors.abstract = 'Please enter an abstract';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setPendingAction('save');
    storePaper({ data: buildPayload() });
  };

  const handleSaveNext = () => {
    if (!validate()) return;
    setPendingAction('next');
    storePaper({ data: buildPayload() });
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
            items={OVERVIEW_STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 1: Overview</h1>

              <div className="row g-4">
                {/* Left helper rail */}
                <aside className="col-12 col-lg-3">
                  <p className="am-help-strong">
                    Provide the journal, paper type, subject area, title and abstract for your
                    submission.
                  </p>
                  <a
                    href="/help/how-to-submit-manuscript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="am-help-link"
                  >
                    How do I submit a manuscript?
                  </a>
                </aside>

                {/* Panel */}
                <div className="col-12 col-lg-9">
                  <div className="am-panel">
                    <div className="am-panel-head">Overview</div>
                    <div className="am-panel-body">
                      <div className="row g-4">
                        {/* Row 1 */}
                        <div className="col-12 col-md-6">
                          <label className="am-field-label">
                            Journal <span className="am-req-star">*</span>
                          </label>
                          <Select
                            className="am-article-select"
                            style={{ width: '100%' }}
                            value={journalId}
                            onChange={(value) => {
                              setJournalId(value);
                              setErrors((e) => ({ ...e, journal: undefined }));
                            }}
                            options={journalOptions}
                            loading={journalLoading}
                            status={errors.journal ? 'error' : ''}
                          />
                          {errors.journal && <p className="am-error-text">{errors.journal}</p>}
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="am-field-label">
                            Paper Type <span className="am-req-star">*</span>
                          </label>
                          <Select
                            className="am-article-select"
                            style={{ width: '100%' }}
                            placeholder="Select Paper Type"
                            value={paperTypeId}
                            onChange={(value) => {
                              setPaperTypeId(value);
                              setErrors((e) => ({ ...e, paperType: undefined }));
                            }}
                            options={paperTypeOptions}
                            loading={paperTypesLoading}
                            status={errors.paperType ? 'error' : ''}
                          />
                          {errors.paperType && <p className="am-error-text">{errors.paperType}</p>}
                        </div>

                        {/* Row 2 */}
                        <div className="col-12 col-md-6">
                          <label className="am-field-label">
                            Subject <span className="am-req-star">*</span>
                          </label>
                          <Select
                            className="am-article-select"
                            style={{ width: '100%' }}
                            mode="multiple"
                            placeholder="Select one or more subjects"
                            value={subjects}
                            onChange={(value) => {
                              setSubjects(value);
                              setErrors((e) => ({ ...e, subjects: undefined }));
                            }}
                            options={subjectOptions}
                            loading={subjectsLoading}
                            status={errors.subjects ? 'error' : ''}
                          />
                          {errors.subjects && <p className="am-error-text">{errors.subjects}</p>}
                        </div>

                        <div className="col-12 col-md-6">
                          <label className="am-field-label">
                            Title <span className="am-req-star">*</span>
                          </label>
                          <Input
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);
                              setErrors((err) => ({ ...err, title: undefined }));
                            }}
                            status={errors.title ? 'error' : ''}
                            placeholder="Enter the paper title"
                          />
                          {errors.title && <p className="am-error-text">{errors.title}</p>}
                        </div>

                        {/* Row 3 */}
                        <div className="col-12">
                          <label className="am-field-label">
                            Abstract <span className="am-req-star">*</span>
                          </label>
                          <RichTextEditor
                            placeholder="Enter the abstract"
                            minHeight={250}
                            onChange={(html, text) => {
                              setAbstractHtml(html);
                              setAbstractText(text);
                              setErrors((e) => ({ ...e, abstract: undefined }));
                            }}
                          />
                          {errors.abstract && <p className="am-error-text">{errors.abstract}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="am-actions">
                    <Button
                      className="am-btn-secondary"
                      onClick={handleSave}
                      loading={isSaving && pendingAction === 'save'}
                      disabled={isSaving && pendingAction !== 'save'}
                    >
                      Save
                    </Button>
                    <Button
                      className="am-btn-primary"
                      onClick={handleSaveNext}
                      loading={isSaving && pendingAction === 'next'}
                      disabled={isSaving && pendingAction !== 'next'}
                    >
                      Save &amp; Next <ArrowRightOutlined />
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
