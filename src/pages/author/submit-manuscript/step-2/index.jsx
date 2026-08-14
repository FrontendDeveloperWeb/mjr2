import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Steps, Button, message } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  InfoCircleFilled,
  InfoCircleOutlined,
} from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import { useMutation } from '../../../../hooks/reactQuery/index.js';
import { OVERVIEW_STEP_TITLES } from '../overviewStepTitles.js';
import { getWizardState, setStep2Data } from '../paperDraftStore.js';
import AddAuthorModal from './AddAuthorModal.jsx';

function newAuthorId() {
  return crypto.randomUUID?.() ?? `author-${Date.now()}-${Math.random()}`;
}

// Default entry shown when the paper has no authors yet — the manuscript's
// creator, named straight off Step 1's /papers/store response
// (`paper.created_by_name`). It's a read-only placeholder (no real
// first_name/last_name to submit) rather than an editable draft — the modal
// collects a much richer shape than "just a name", so letting someone "edit"
// this into a real author would mean silently guessing at every other
// required field. It's excluded from the update-authors payload for the
// same reason (see `filledAuthors` below).
function seedAuthorFromPaper(paperObj) {
  return {
    id: newAuthorId(),
    displayName: paperObj?.created_by_name || '',
    is_corresponding: 1,
    subjects: [],
    affiliations: [],
    isYou: true,
  };
}

function authorFullName(a) {
  return a.displayName || [a.first_name, a.last_name].filter(Boolean).join(' ') || 'Unnamed Author';
}

/**
 * Step 2 — Author. Part of the (new) Overview-first flow (see
 * overviewStepTitles.js). Continues the paper started in Step 1: the `slug`
 * returned by POST /papers/store is required to submit this step, and is
 * read from the URL (`?slug=`) with paperDraftStore as an in-memory fallback
 * for same-session navigation.
 *
 * Authors are entered inline via the "Add New Author" modal, which builds
 * the exact nested payload shape the API expects (personal/identifier/
 * location fields + `subjects: [{id,name}]` + `affiliations: [{...}]`) —
 * rather than picked from a pre-registered author list. This step is
 * entirely optional: Save & Next always proceeds, and only hits the API
 * when at least one real author has been added.
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

  // Step 1's saved paper object — only source for `created_by_name` and the
  // paper's own `authors` list (server-side, distinct from the locally-added
  // ones this page manages before they're saved).
  const paperObj = getWizardState()?.step1Data?.paper || getWizardState()?.step1Data || {};

  // Rehydrate from whatever was last saved via update-authors so a
  // Back-navigation from Step 3 lands with the list already filled in.
  // Older saved drafts (pre-refactor, flat shape with no `affiliations`)
  // can't be rehydrated into this nested shape, so fall through to the
  // paper-seeded default instead of showing broken rows. When the paper
  // itself already has authors (`paper.authors` non-empty), those take
  // priority over the seeded placeholder.
  const [authors, setAuthors] = useState(() => {
    const saved = getWizardState()?.step2Data;
    if (saved?.length && saved.every((a) => 'affiliations' in a)) {
      return saved.map((a) => ({ ...a, id: newAuthorId() }));
    }
    if (Array.isArray(paperObj.authors) && paperObj.authors.length > 0) {
      return paperObj.authors.map((pa, i) => ({
        id: newAuthorId(),
        title: pa.title || '',
        gender: pa.gender || '',
        first_name: pa.first_name || '',
        last_name: pa.last_name || '',
        date_of_birth: pa.date_of_birth || undefined,
        email: pa.email || '',
        phone: pa.phone || '',
        orcid: pa.orcid || '',
        scopus_id: pa.scopus_id || '',
        researcher_id: pa.researcher_id || '',
        country: pa.country || undefined,
        city: pa.city || '',
        address: pa.address || '',
        biography: pa.biography || '',
        author_order: pa.author_order ?? i + 1,
        contribution: pa.contribution || '',
        is_corresponding: pa.is_corresponding ? 1 : 0,
        subjects: pa.subjects || [],
        affiliations: pa.affiliations || [],
        isYou: false,
      }));
    }
    return [seedAuthorFromPaper(paperObj)];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const editingAuthor = authors.find((a) => a.id === editingId) || null;

  const openAddModal = () => {
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    setEditingId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const saveAuthor = (payload) => {
    if (editingId) {
      // Editing replaces the seeded/imported display fields with a real
      // first/last name, so the placeholder `displayName` no longer
      // applies — authorFullName() should use the name fields from here on.
      setAuthors((prev) => prev.map((a) => (a.id === editingId ? { ...a, ...payload, displayName: undefined } : a)));
    } else {
      setAuthors((prev) => [...prev, { id: newAuthorId(), isYou: false, ...payload }]);
    }
    closeModal();
  };

  const removeAuthor = (id) => setAuthors((prev) => prev.filter((a) => a.id !== id));

  const { mutate: updateAuthors, isPending: isSaving } = useMutation('updatePaperAuthors', {
    useFormData: false,
    showSuccessNotification: true,
    onSuccess: () => {
      navigate('/author/submit-manuscript/step-3');
    },
  });

  const handleBack = () => {
    navigate('/author/submit-manuscript/step-1');
  };

  const handleNext = () => {
    setStep2Data(authors);

    // Fully optional — the auto-seeded "You" placeholder doesn't count as a
    // real entry (it has no first_name; it's never editable), so this
    // correctly navigates straight through when the list was left untouched,
    // same as when it's empty.
    const filledAuthors = authors.filter((a) => a.first_name);
    if (!filledAuthors.length) {
      navigate('/author/submit-manuscript/step-3');
      return;
    }

    updateAuthors({
      slug,
      data: {
        authors: filledAuthors.map(({ id, isYou, displayName, ...rest }) => rest),
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
                    author. This step is optional — you can continue without adding anyone.
                  </p>
                </aside>

                <div className="col-12 col-lg-9">
                  <div className="am6-callout">
                    <InfoCircleFilled className="am6-callout-icon" />
                    <span className="am6-callout-title">Important information about corresponding authors</span>
                    <InfoCircleOutlined className="am6-callout-info" />
                  </div>
                  <p className="am-panel-desc am6-callout-text">
                    The corresponding author will communicate during the editorial process. Their
                    institution determines if any publishing agreements are applicable, which can
                    affect the price of publishing open access and who pays. Use their main
                    institution, not their department.
                  </p>
                  <p className="am-panel-desc am6-callout-text">
                    This selection does not prevent additional corresponding authors from being
                    referenced in the final published article.
                  </p>

                  <div className="am6-list">
                    <div className="am6-list-head">
                      <span>Current Author List</span>
                      <button type="button" className="am6-list-add" onClick={openAddModal}>
                        <PlusOutlined /> Add Another Author
                      </button>
                    </div>

                    {authors.map((a, index) => (
                      <div key={a.id} className="am6-author-row">
                        {!a.isYou && (
                          <button
                            type="button"
                            className="am-icon-btn"
                            aria-label={`Edit ${authorFullName(a)}`}
                            onClick={() => openEditModal(a.id)}
                          >
                            <EditOutlined />
                          </button>
                        )}
                        <div className="am6-author-info">
                          <div className="am6-author-name">
                            {authorFullName(a)}{' '}
                            {!!a.is_corresponding && <span className="am6-role">[Corresponding Author]</span>}
                            {index === 0 && <span className="am6-role">[First Author]</span>}
                            {a.isYou && <span className="am6-role">[You]</span>}
                          </div>
                          <div className="am6-author-meta">{a.affiliations?.[0]?.institution_name || 'none'}</div>
                        </div>
                        <button
                          type="button"
                          className="am-icon-btn am-icon-btn-danger"
                          aria-label={`Remove ${authorFullName(a)}`}
                          onClick={() => removeAuthor(a.id)}
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    ))}

                    <button type="button" className="am6-list-foot-add" onClick={openAddModal}>
                      <PlusOutlined /> Add Another Author
                    </button>
                  </div>

                  <div className="am-actions">
                    <Button className="am-btn-secondary" onClick={handleBack}>
                      <ArrowLeftOutlined /> Back
                    </Button>
                    <Button className="am-btn-theme" onClick={handleNext} loading={isSaving}>
                      Save &amp; Next <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AddAuthorModal
        open={modalOpen}
        onCancel={closeModal}
        onSave={saveAuthor}
        initialValues={editingAuthor}
      />
    </Layout>
  );
}
