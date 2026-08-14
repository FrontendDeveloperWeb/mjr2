import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { clearWizardState } from '../submit-manuscript/paperDraftStore.js';

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function authorName(a) {
  return a.displayName || [a.first_name, a.last_name].filter(Boolean).join(' ') || 'Unnamed Author';
}

/**
 * Thank You / Submission Success page. Standalone by design — no <Layout>,
 * no <Header>/<Footer>/<TopBar> — because it's a one-shot confirmation
 * screen, not a page in the normal site or dashboard chrome.
 *
 * Only reachable by actually completing Step 5: the submission summary is
 * handed over as router state (`location.state.submission`) by Step 5's
 * finalSubmit onSuccess, since final-submission is a one-shot POST with no
 * "get completed paper" endpoint this page could otherwise fetch from. A
 * direct visit / refresh has no router state, so it's treated the same as
 * an invalid visit and bounced to the Author Main Menu.
 */
export default function ThankYouPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const submission = location.state?.submission || null;

  useEffect(() => {
    if (!submission) {
      navigate('/author/main-menu', { replace: true });
    }
  }, [submission, navigate]);

  const handleBackToMenu = () => {
    clearWizardState();
    navigate('/author/main-menu');
  };

  if (!submission) return null;

  return (
    <div className="am-ty-page">
      <header className="am-ty-topbar">
        <div className="container">
          <Link to="/" className="am-ty-logo">
            <img src="/assets/img/logo.png" alt="Journal logo" />
          </Link>
        </div>
      </header>

      <main className="am-ty-content">
        <div className="container">
          <div className="am-ty-hero">
            <CheckCircleFilled className="am-ty-check-icon" />
            <h1 className="am-ty-heading">Thank You for Your Submission!</h1>
            <p className="am-ty-subheading">
              Your manuscript has been submitted successfully and is under review.
            </p>
          </div>

          <div className="am-ty-card">
            <div className="am-ty-grid">
              <div>
                <span className="am-ty-label">Manuscript No.</span>
                <span className="am-ty-badge">{submission.manuscriptNo || '—'}</span>
              </div>
              <div>
                <span className="am-ty-label">Journal Title</span>
                <span className="am-ty-value">{submission.journalName || '—'}</span>
              </div>
              <div>
                <span className="am-ty-label">Paper Type</span>
                <span className="am-ty-value">{submission.paperTypeName || '—'}</span>
              </div>
              <div>
                <span className="am-ty-label">Submission Date</span>
                <span className="am-ty-value">{formatDate(submission.submittedAt)}</span>
              </div>
              <div className="am-ty-field-full">
                <span className="am-ty-label">Paper Title</span>
                <span className="am-ty-value">{submission.paperTitle || '—'}</span>
              </div>
              <div>
                <span className="am-ty-label">Subjects</span>
                <div className="am-ty-tag-wrap">
                  {submission.subjects?.length
                    ? submission.subjects.map((s) => (
                      <span key={s} className="am-ty-tag">{s}</span>
                    ))
                    : <span className="am-ty-value">—</span>}
                </div>
              </div>
              <div>
                <span className="am-ty-label">Keywords</span>
                <div className="am-ty-tag-wrap">
                  {submission.keywords?.length
                    ? submission.keywords.map((k) => (
                      <span key={k} className="am-ty-tag">{k}</span>
                    ))
                    : <span className="am-ty-value">—</span>}
                </div>
              </div>
            </div>

            {submission.authors?.length > 0 && (
              <>
                <h2 className="am-ty-section-title">Authors</h2>
                <div className="am-ty-list">
                  {submission.authors.map((a, index) => (
                    <div key={a.id || a.email || index} className="am-ty-author-row">
                      <div>
                        <div className="am-ty-author-name">{authorName(a)}</div>
                        {a.email && <div className="am-ty-author-email">{a.email}</div>}
                      </div>
                      <div className="am-ty-author-badges">
                        {index === 0 && <span className="am-ty-role-badge">First Author</span>}
                        {!!a.is_corresponding && (
                          <span className="am-ty-role-badge">Corresponding Author</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {submission.files?.length > 0 && (
              <>
                <h2 className="am-ty-section-title">Uploaded Files</h2>
                <div className="am-ty-list">
                  {submission.files.map((f, index) => (
                    <div key={f.id || index} className="am-ty-file-row">
                      <span className="am-ty-file-type">{f.type || 'File'}</span>
                      <span>{f.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="am-ty-actions">
            <Button className="am-btn-theme" onClick={handleBackToMenu}>
              Back to Author Main Menu
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
