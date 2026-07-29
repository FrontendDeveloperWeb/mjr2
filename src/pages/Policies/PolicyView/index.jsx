import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Layout from '../../../components/layout/Layout';
import TopBar from '../../../components/shared/TopBar';

/* ------------------------------------------------------------------ *
 * Unified policy content, keyed by URL slug. Adding a new policy is a
 * data change here — no new route or page component required.
 * Swap the placeholder copy for the real legal text when available.
 * ------------------------------------------------------------------ */
const POLICY_CONTENT = {
  'privacy-policy': {
    title: 'Privacy Policy',
    sections: [
      {
        heading: '1. Information We Collect',
        body: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. We collect information you provide directly, such as your name, affiliation, and contact details, along with data generated as you interact with the service.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        body: [
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Your information is used to operate the service, process submissions, communicate decisions, and improve your experience.',
        ],
      },
      {
        heading: '3. Data Sharing and Disclosure',
        body: [
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. We do not sell your personal data. Information may be shared with trusted partners strictly to deliver the services you have requested.',
        ],
      },
      {
        heading: '4. Data Retention and Security',
        body: [
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. We retain personal data only as long as necessary and apply appropriate technical safeguards to protect it.',
        ],
      },
      {
        heading: '5. Your Rights',
        body: [
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. You may request access to, correction of, or deletion of your personal data at any time.',
        ],
      },
    ],
  },
  'terms-and-conditions': {
    title: 'Terms and Conditions',
    sections: [
      {
        heading: '1. Acceptance of Terms',
        body: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. By accessing this service, you agree to be bound by these terms and conditions in full.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. If you do not agree with any part of these terms, you must refrain from using the service.',
        ],
      },
      {
        heading: '2. Use of the Service',
        body: [
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. You agree to use the platform only for lawful purposes and in a manner consistent with all applicable regulations.',
        ],
      },
      {
        heading: '3. Intellectual Property',
        body: [
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. All content, including articles, figures, and metadata, remains the property of the owner or its licensors and is protected by copyright law.',
        ],
      },
      {
        heading: '4. Limitation of Liability',
        body: [
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. We shall not be liable for any indirect or consequential loss arising from the use of this service.',
        ],
      },
      {
        heading: '5. Governing Law',
        body: [
          'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. These terms are governed by and construed in accordance with the laws of the applicable jurisdiction.',
        ],
      },
    ],
  },
};

/* Optional context passed via ?source= — lets the same page reflect whether the
   reader arrived from the Publisher or Aries column, without changing the slug. */
const SOURCE_META = {
  publisher: { label: 'Publisher', name: 'Journal of Advanced Research' },
  aries: { label: 'Aries', name: 'Editorial Manager Platform' },
};

export default function PolicyView() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const content = POLICY_CONTENT[slug];
  const sourceMeta = SOURCE_META[searchParams.get('source')];

  const TopBack = (
    <button type="button" className="pol-back-link" onClick={() => navigate(-1)}>
      <ArrowLeftOutlined /> Back
    </button>
  );

  /* Unknown slug — keep the user oriented instead of showing a blank page. */
  if (!content) {
    return (
      <Layout>
        <TopBar />
        <section className="pol-section">
          <div className="container">
            <div className="pol-doc-wrap">
              <article className="pol-doc-card text-center">
                <span className="pol-eyebrow">Legal &amp; Compliance</span>
                <h1 className="pol-doc-title">Policy not found</h1>
                <p className="pol-doc-text">
                  The policy you are looking for doesn’t exist or may have been moved.
                </p>
                <div className="pol-actions">
                  <Link to="/policies" className="pol-back-btn">
                    <ArrowLeftOutlined /> Back to Policies
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const eyebrow = sourceMeta ? sourceMeta.label : 'Legal & Compliance';

  return (
    <Layout>
      <TopBar />

      <section className="pol-section">
        <div className="container">
          <div className="pol-doc-wrap">

            {/* ---------- Top bar: dynamic back + breadcrumb ---------- */}
            <div className="pol-doc-topbar">
              {TopBack}
              <nav className="pol-breadcrumb">
                <Link to="/policies" className="pol-breadcrumb-link">Policies</Link>
                {sourceMeta && (
                  <>
                    <span className="pol-breadcrumb-sep">/</span>
                    <span>{sourceMeta.label}</span>
                  </>
                )}
                <span className="pol-breadcrumb-sep">/</span>
                <span className="pol-breadcrumb-current">{content.title}</span>
              </nav>
            </div>

            {/* ---------- Document ---------- */}
            <article className="pol-doc-card">
              <header className="pol-doc-head">
                <span className="pol-eyebrow">{eyebrow}</span>
                <h1 className="pol-doc-title">{content.title}</h1>
                <p className="pol-doc-updated">
                  {sourceMeta ? `${sourceMeta.name} · ` : ''}Last updated: January 2026
                </p>
              </header>

              <div className="pol-doc-body">
                {content.sections.map((section) => (
                  <section key={section.heading} className="pol-doc-section">
                    <h2 className="pol-doc-heading">{section.heading}</h2>
                    {section.body.map((paragraph, i) => (
                      <p key={i} className="pol-doc-text">{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>
            </article>

            {/* ---------- Bottom back ---------- */}
            <div className="pol-actions text-center">
              <button type="button" className="pol-back-btn" onClick={() => navigate(-1)}>
                <ArrowLeftOutlined /> Back
              </button>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
