import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
import TopBar from '../../../components/shared/TopBar';
import { listDrafts } from '../submit-manuscript/draftStorage.js';
import { clearWizardState } from '../submit-manuscript/paperDraftStore.js';
import {
  SENT_BACK,
  WAITING_APPROVAL,
  BEING_PROCESSED,
  REVISIONS_NEEDING,
  REVISIONS_SENT_BACK,
  REVISIONS_INCOMPLETE,
  REVISIONS_WAITING_APPROVAL,
  REVISIONS_BEING_PROCESSED,
  REVISIONS_DECLINED,
  COMPLETED_DECIDED,
} from '../submissions/data/dummySubmissions.js';

/* ---------------- Center column data ---------------- */
const NEW_SUBMISSIONS_BASE = [
  { label: 'Submissions Sent Back to Author', count: SENT_BACK.length, to: '/author/submissions/sent-back' },
  { label: "Submissions Waiting for Author's Approval", count: WAITING_APPROVAL.length, to: '/author/submissions/waiting-approval' },
  { label: 'Submissions Being Processed', count: BEING_PROCESSED.length, to: '/author/submissions/being-processed' },
];

const REVISIONS = [
  { label: 'Submissions Needing Revision', count: REVISIONS_NEEDING.length, to: '/author/submissions/revisions-needing' },
  { label: 'Revisions Sent Back to Author', count: REVISIONS_SENT_BACK.length, to: '/author/submissions/revisions-sent-back' },
  { label: 'Incomplete Submissions Being Revised', count: REVISIONS_INCOMPLETE.length, to: '/author/submissions/revisions-incomplete' },
  { label: "Revisions Waiting for Author's Approval", count: REVISIONS_WAITING_APPROVAL.length, to: '/author/submissions/revisions-waiting-approval' },
  { label: 'Revisions Being Processed', count: REVISIONS_BEING_PROCESSED.length, to: '/author/submissions/revisions-being-processed' },
  { label: 'Declined Revisions', count: REVISIONS_DECLINED.length, to: '/author/submissions/revisions-declined' },
];

const COMPLETED = [
  { label: 'Submissions with a Decision', count: COMPLETED_DECIDED.length, to: '/author/submissions/completed-decided' },
];

/* ---------------- Right column data ---------------- */
const VIDEO_GUIDES = [
  { text: 'The Author Guide to Editorial Manager', meta: '(3.22 mins)', isNew: true },
  { text: 'New submission experience – An author overview', meta: '(3.45 mins)' },
  { text: 'New peer review experience – An author overview', meta: '(2.40 mins)' },
  { text: 'Five pre-submission tips for Elsevier authors', meta: '(5.04 mins)' },
  { text: 'How to add funding information when submitting', meta: '(1.45 mins)' },
];

const POPULAR_GUIDES = [
  { text: 'Author submission process overview and support article' },
  { text: 'How to download and complete the LaTeX template?', meta: '(5.40 mins)' },
  { text: 'What to include in the cover letter of your submission', meta: '(2.55 mins)' },
  { text: 'Five submission tips', meta: '(5.36 mins)' },
  { text: 'Using the “Track your submission” service', meta: '(2.25 mins)' },
  { text: 'Checking the status of your submission', meta: '(4.08 mins)' },
];

/** A single "label (count)" menu row. */
function MenuRow({ label, count, to }) {
  return (
    <li className="am-menu-row">
      <Link to={to} className="am-menu-link">{label}</Link>
      <span className="am-menu-count">({count})</span>
    </li>
  );
}

export default function AuthorMainMenu() {
  const navigate = useNavigate();

  const newSubmissions = [
    NEW_SUBMISSIONS_BASE[0],
    { label: 'Incomplete Submissions', count: listDrafts().length, to: '/author/submissions/incomplete' },
    ...NEW_SUBMISSIONS_BASE.slice(1),
  ];

  return (
    <Layout>
      <TopBar />

      <section className="am-page">
        <div className="container">
          <h1 className="am-page-title">Author Main Menu</h1>

          <div className="row g-4">
            {/* ============ LEFT: NOTICE ============ */}
            <aside className="col-12 col-lg-3">
              <div className="am-notice-card">
                <a href="#status" className="am-notice-link">
                  How can I find out more about the status of my manuscript?
                </a>
              </div>
              <p className="am-notice-text">
                Authors should note that the acceptance rate in this journal is exceptionally
                low, around 5%; only the most novel, methodologically rigorous, and impactful
                manuscripts are selected for peer review.
              </p>
            </aside>

            {/* ============ CENTER: MENUS ============ */}
            <div className="col-12 col-lg-5">
              <div className="am-menu-card">
                <h2 className="am-menu-title">New Submissions</h2>
                <ul className="am-menu-list">
                  <li className="am-menu-row">
                    <button
                      type="button"
                      className="am-menu-link am-menu-action"
                      onClick={() => {
                        // A fresh submission must start clean — clear any
                        // in-progress draft's wizard state (Overview-first
                        // flow only; completed/submitted papers already
                        // clear this themselves on final submission, and are
                        // otherwise untouched since they live server-side).
                        clearWizardState();
                        navigate('/author/submit-manuscript/step-1');
                      }}
                    >
                      Submit New Manuscript
                    </button>
                  </li>
                  {newSubmissions.map((item) => (
                    <MenuRow key={item.label} {...item} />
                  ))}
                </ul>
              </div>

              <div className="am-menu-card">
                <h2 className="am-menu-title">Revisions</h2>
                <ul className="am-menu-list">
                  {REVISIONS.map((item) => (
                    <MenuRow key={item.label} {...item} />
                  ))}
                </ul>
              </div>

              <div className="am-menu-card">
                <h2 className="am-menu-title">Completed</h2>
                <ul className="am-menu-list">
                  {COMPLETED.map((item) => (
                    <MenuRow key={item.label} {...item} />
                  ))}
                </ul>
              </div>
            </div>

            {/* ============ RIGHT: RESOURCES ============ */}
            <div className="col-12 col-lg-4">
              <div className="am-resources-card">
                <h2 className="am-res-title">Author Resources</h2>
                <ul className="am-res-list">
                  <li>
                    Find a full range of guides, FAQs and 24/7 chat (bottom of page) in our{' '}
                    <a href="#support" className="am-res-link">Support Center.</a>
                  </li>
                  <li>
                    Information on <a href="#open-access" className="am-res-link">Open Access.</a>
                  </li>
                </ul>

                <h3 className="am-res-subtitle">Use of AI by Editors and Reviewers</h3>
                <ul className="am-res-list">
                  <li>
                    Editors and reviewers are not allowed to upload unpublished manuscripts to
                    generative AI tools, but may use AI for language support and literature
                    searches. See{' '}
                    <a href="#ai-policy" className="am-res-link">
                      Elsevier&rsquo;s Generative AI Policies for Journals
                    </a>{' '}
                    for details.
                  </li>
                </ul>

                <h3 className="am-res-subtitle">Language Editing Services</h3>
                <ul className="am-res-list">
                  <li>
                    Ensure your work is written in correct English.{' '}
                    <a href="#language" className="am-res-link">Learn more &amp; get started.</a>
                  </li>
                </ul>

                <h3 className="am-res-subtitle">New video guides</h3>
                <ul className="am-res-list">
                  {VIDEO_GUIDES.map((g) => (
                    <li key={g.text}>
                      {g.isNew && <strong>New! </strong>}
                      <a href="#video" className="am-res-link">{g.text}</a> {g.meta}
                    </li>
                  ))}
                </ul>

                <h3 className="am-res-subtitle">Most popular video guides</h3>
                <ul className="am-res-list">
                  {POPULAR_GUIDES.map((g) => (
                    <li key={g.text}>
                      <a href="#video" className="am-res-link">{g.text}</a> {g.meta || ''}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
