import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Steps, Select, Switch, Button, message } from 'antd';
import { DeleteOutlined, MailOutlined, PlusOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import RichTextEditor from '../../../../components/shared/RichTextEditor/RichTextEditor.jsx';
import { useQuery, useMutation } from '../../../../hooks/reactQuery/index.js';
import { OVERVIEW_STEP_TITLES } from '../overviewStepTitles.js';
import { getWizardState, setStep2Data } from '../paperDraftStore.js';

// Backend author records aren't a fixed shape across environments — cover
// the field names we've seen elsewhere in this app (userSelectors.js does
// the same fallback chain for the logged-in user).
function formatAuthorLabel(a) {
  const first = a.first_name?.trim();
  const last = a.last_name?.trim();
  if (first || last) return [first, last].filter(Boolean).join(' ');
  return a.name || a.user_name || a.email || `Author #${a.id}`;
}

function emptyAuthor(isCorresponding = false) {
  return {
    id: crypto.randomUUID?.() ?? `author-${Date.now()}-${Math.random()}`,
    authorId: undefined,
    isCorresponding,
    contributionHtml: '',
    contributionText: '',
  };
}

/**
 * Step 2 — Author. Part of the (new) Overview-first flow (see
 * overviewStepTitles.js). Continues the paper started in Step 1: the `slug`
 * returned by POST /papers/store is required to submit this step, and is
 * read from the URL (`?slug=`) with paperDraftStore as an in-memory fallback
 * for same-session navigation.
 */
export default function SubmitManuscriptStep2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug') || getWizardState()?.slug || null;

  // Step 2 is meaningless without a paper to attach authors to — bounce back
  // to Step 1 rather than letting the user fill this out and hit a guaranteed
  // failure on submit.
  useEffect(() => {
    if (!slug) {
      message.warning('Please complete Step 1 first.');
      navigate('/author/submit-manuscript/step-1', { replace: true });
    }
  }, [slug, navigate]);

  const { data: authorsResult, isLoading: authorsLoading } = useQuery('getAuthors');
  const authorOptions = useMemo(
    () => (authorsResult?.data || []).map((a) => ({ value: a.id, label: formatAuthorLabel(a) })),
    [authorsResult]
  );

  // Rehydrate from whatever was last successfully saved via
  // update-authors — read once via a lazy initializer so a Back-navigation
  // from Step 3 lands with every author block already filled in. Falls back
  // to a single blank corresponding-author block for a first-time visit.
  const [authors, setAuthors] = useState(() => {
    const saved = getWizardState()?.step2Data;
    if (saved?.length) {
      return saved.map((a) => ({
        id: crypto.randomUUID?.() ?? `author-${Date.now()}-${Math.random()}`,
        authorId: a.authorId,
        isCorresponding: a.isCorresponding,
        contributionHtml: a.contributionHtml || '',
        contributionText: a.contributionText || '',
      }));
    }
    // The first block represents the logged-in submitter and defaults to
    // corresponding author; every block (including this one) stays freely
    // toggleable — no locking, unlike an earlier iteration of this page.
    return [emptyAuthor(true)];
  });

  const addAuthor = () => setAuthors((prev) => [...prev, emptyAuthor(false)]);

  const removeAuthor = (id) =>
    setAuthors((prev) => (prev.length > 1 ? prev.filter((a) => a.id !== id) : prev));

  const updateAuthorField = (id, field, value) =>
    setAuthors((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));

  const { mutate: updateAuthors, isPending: isSaving } = useMutation('updatePaperAuthors', {
    useFormData: false,
    showSuccessNotification: false,
    onSuccess: () => {
      message.success('Authors saved.');
      navigate('/author/submit-manuscript/step-3');
    },
  });

  const handleBack = () => {
    navigate('/author/submit-manuscript/step-1');
  };

  const handleNext = () => {
    // Step 2 is optional: only authors the user actually picked count.
    // Blank/untouched blocks are dropped rather than blocking navigation.
    const filledAuthors = authors.filter((a) => a.authorId);

    // Stores authorId + contributionHtml too (not just display fields) so
    // this same data can re-hydrate the form on the next visit, not just
    // populate Step 5's read-only summary.
    setStep2Data(
      filledAuthors.map((a) => ({
        authorId: a.authorId,
        name: authorOptions.find((o) => o.value === a.authorId)?.label || '',
        isCorresponding: a.isCorresponding,
        contributionHtml: a.contributionHtml,
        contributionText: a.contributionText,
      }))
    );

    if (!filledAuthors.length) {
      navigate('/author/submit-manuscript/step-3');
      return;
    }

    updateAuthors({
      slug,
      data: {
        authors: filledAuthors.map((a) => ({
          author_id: Number(a.authorId),
          is_corresponding: a.isCorresponding,
          contribution: a.contributionHtml,
        })),
      },
    });
  };

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={1}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={OVERVIEW_STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 2: Author</h1>

              <div className="row g-4">
                {/* Left helper rail */}
                <aside className="col-12 col-lg-3">
                  <p className="am-help-strong">
                    Add every author on this manuscript and mark which one is the corresponding
                    author. Describe each author&rsquo;s contribution below their entry.
                  </p>
                </aside>

                {/* Author cards */}
                <div className="col-12 col-lg-9">
                  {authors.map((author, index) => (
                    <div key={author.id} className="am-author-card">
                      <div className="am-author-card-head">
                        <h2 className="am-author-card-title">Author</h2>
                        <Button
                          className="am-author-delete"
                          icon={<DeleteOutlined />}
                          disabled={authors.length === 1}
                          onClick={() => removeAuthor(author.id)}
                          aria-label="Remove author"
                        />
                      </div>

                      <div className="am-author-row">
                        <div className="am-author-field">
                          <label className="am-field-label">Author</label>
                          <Select
                            className="w-100"
                            placeholder="Select an author"
                            showSearch
                            optionFilterProp="label"
                            suffixIcon={<MailOutlined />}
                            value={author.authorId}
                            options={authorOptions}
                            loading={authorsLoading}
                            onChange={(value) => updateAuthorField(author.id, 'authorId', value)}
                          />
                        </div>

                        <div className="am-author-field am-author-field-toggle">
                          <label className="am-field-label">Corresponding</label>
                          <div className="am-corresponding-toggle">
                            <span className={!author.isCorresponding ? 'is-active' : ''}>No</span>
                            <Switch
                              checked={author.isCorresponding}
                              onChange={(checked) =>
                                updateAuthorField(author.id, 'isCorresponding', checked)
                              }
                            />
                            <span className={author.isCorresponding ? 'is-active' : ''}>Yes</span>
                          </div>
                        </div>
                      </div>

                      <label className="am-field-label">Contribution</label>
                      <RichTextEditor
                        placeholder="Describe this author's contribution"
                        minHeight={180}
                        defaultValue={author.contributionHtml}
                        onChange={(html, text) => {
                          updateAuthorField(author.id, 'contributionHtml', html);
                          updateAuthorField(author.id, 'contributionText', text);
                        }}
                      />
                    </div>
                  ))}

                  <div className="am-author-actions">
                    <Button className="am-btn-blue" icon={<PlusOutlined />} onClick={addAuthor}>
                      Add More
                    </Button>
                    <div className="am-author-actions-right">
                      <Button className="am-btn-secondary" onClick={handleBack}>
                        <ArrowLeftOutlined /> Back
                      </Button>
                      <Button className="am-btn-blue" onClick={handleNext} loading={isSaving}>
                        Save &amp; Next <ArrowRightOutlined />
                      </Button>
                    </div>
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
