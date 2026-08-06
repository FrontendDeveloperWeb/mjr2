import { useState } from 'react';
import {
  InfoCircleFilled,
  CheckCircleFilled,
  ExclamationCircleFilled,
  ArrowRightOutlined,
  LikeOutlined,
  DislikeOutlined,
} from '@ant-design/icons';
import Layout from '../../../components/layout/Layout';

/* -------------------------------- Data -------------------------------- */

const FORM_STEPS = [
  { label: 'Article Type Selection', state: 'attention' },
  { label: 'Attach Files', state: 'attention' },
  { label: 'General Information', state: 'done' },
  { label: 'Review Preferences', state: 'done' },
  { label: 'Additional Information', state: 'todo' },
  { label: 'Comments', state: 'todo' },
  { label: 'Manuscript Data', state: 'todo' },
];

const SUBMISSION_STEPS = [
  {
    title: 'Log in to Editorial Manager',
    body: 'Log in to Editorial Manager for the journal you are submitting to.',
  },
  {
    title: 'Confirm your role',
    body: 'Check the upper right of the page that you are logged in under the Author role, and switch roles if needed.',
  },
  {
    title: 'Start a new submission',
    body: 'Click "Submit New Manuscript", or click "Submit Invited Manuscript" if applicable.',
  },
  {
    title: 'If "Submit New Manuscript" does not appear',
    body: 'The publication may have turned off new-submission functionality, or the journal is closed to submissions outside a defined submission/reading period.',
  },
  {
    title: 'Resuming an in-progress submission',
    body: 'If you already have an incomplete submission or revision in progress, you will be asked to confirm this is a separate submission before proceeding.',
  },
  {
    title: 'Select the Article Type',
    body: 'Use the drop-down menu to select the Article Type that best describes the submission. The Article Type must be selected before proceeding.',
  },
  {
    title: 'Attach the primary file',
    body: 'For the first file, the Item Type is pre-selected based on journal configuration. This file is processed to extract the title, abstract, references, and other details. Files from arXiv.org do not need to be uploaded individually.',
  },
  {
    title: 'Attach all remaining files',
    body: 'After the first file uploads, the screen refreshes so you can attach the rest. Archive files (zip, tar, etc.) are generally unpacked automatically, and each extracted file will need an Item Type and Description.',
  },
  {
    title: 'Select an Item Type for each file',
    body: 'Use the drop-down to choose an Item Type. Required items are marked with an asterisk (*). You may also need to upload Conflict of Interest Statements, Funding Source Declarations, Author Agreements, or Permission Notes.',
  },
  {
    title: 'Set a Description and Delivery Method',
    body: 'The Description defaults to the Item Type but can be changed to update the label shown at the top of the PDF page — avoid personal identifiers here. Depending on the Item Type, you may upload from your system or paste a URL to an online resource (with a preview to confirm the link works).',
  },
  {
    title: 'Check and adjust the file list',
    body: 'Items without an Item Type are flagged in red and must be corrected before proceeding. Use "Change Item Type of all" to bulk-set a type for every file with the same extension, and use "Edit Data" to fill in any custom metadata for an Item Type.',
  },
  {
    title: 'General Information',
    body: 'Expand each accordion field to enter or verify Region of Origin, Section/Category, and Classifications as configured by the journal. Required fields are marked with a red asterisk. Click "Proceed" when finished.',
  },
  {
    title: 'Review Preferences',
    body: 'Optionally suggest or oppose potential reviewers and request an editor. These are preferences only — the publication may or may not use the suggestions. Click "Proceed" when finished.',
  },
  {
    title: 'Additional Information',
    body: 'Answer any journal-specific questionnaire; required questions are marked with a red exclamation point. Click "Proceed" when finished.',
  },
  {
    title: 'Comments',
    body: 'Depending on publication configuration, you may enter free-text comments for the editorial office. Click "Proceed" when finished.',
  },
  {
    title: 'Verify Manuscript Data',
    body: 'The system pulls some data automatically from your primary file — review or edit it manually. Full Title and at least one Author are mandatory for every submission; other fields (Abstract, Keywords, Funding Information) depend on journal configuration.',
  },
  {
    title: 'Build and approve the PDF',
    body: 'Click "Build PDF" to have Editorial Manager assemble the submission and route it for your approval. You may return to make corrections and rebuild as needed before giving final approval.',
  },
  {
    title: 'Confirm the submission',
    body: 'Once you approve the built PDF, your manuscript is submitted to the journal and listed as "Submitted" on your Author Main Menu. You will also receive a confirmation email.',
  },
];

const VIDEO_LINKS = [
  { label: 'Automatic Formatting and Organization of Bibliographic Information' },
  { label: 'Drag and Drop Upload' },
  { label: 'Open Funder Registry' },
  { label: 'Adding Co-Authors' },
  { label: 'Institutional Name Normalization' },
];

/* -------------------------------- Helpers -------------------------------- */

const StepIcon = ({ state }) => {
  if (state === 'done') return <CheckCircleFilled className="hlp-diagram-icon hlp-diagram-icon-done" />;
  if (state === 'attention') return <ExclamationCircleFilled className="hlp-diagram-icon hlp-diagram-icon-attention" />;
  return <span className="hlp-diagram-icon hlp-diagram-icon-todo" aria-hidden="true" />;
};

/* -------------------------------- Page -------------------------------- */

export default function HowToSubmitManuscript() {
  const [feedback, setFeedback] = useState(null);

  return (
    <Layout>
      <section className="hlp-section">
        <div className="container">
          <div className="hlp-doc-wrap">
            <article className="hlp-doc-card">

              {/* ---------------- Header ---------------- */}
              <header className="hlp-doc-head">
                <h1 className="hlp-doc-title">
                  How do I submit a manuscript in Editorial Manager?
                </h1>
                <p className="hlp-doc-updated">Last updated on January 08, 2026</p>
              </header>

              {/* ---------------- Video overview callout ---------------- */}
              <div className="hlp-info-callout">
                <InfoCircleFilled className="hlp-info-icon" />
                <p className="hlp-info-text">
                  Watch <a href="#video-overview" className="hlp-link">this short video</a> for an
                  overview of the steps and{' '}
                  <a href="#video-tips" className="hlp-link">this video</a> for five essential
                  submission tips.
                </p>
              </div>

              <p className="hlp-p">To submit your manuscript in Editorial Manager you're required to:</p>
              <ul className="hlp-bullets">
                <li>
                  Prepare your manuscript in Microsoft Word or save as that format from another
                  application. If your manuscript contains heavy math, it may be prepared in{' '}
                  <a href="#latex" className="hlp-link">LaTeX</a>.
                </li>
                <li>
                  Know which journal you want to submit your manuscript to. If you aren't sure, use
                  our <a href="#journal-finder" className="hlp-link">Journal Finder</a>.
                </li>
                <li>
                  Be <a href="#registered" className="hlp-link">registered as an author</a> in the
                  journal's Editorial Manager site.
                </li>
                <li>
                  Be sure that your manuscript complies with the journal-specific submission
                  requirements, found in the Guide for Authors on the journal's homepage.
                </li>
              </ul>

              {/* ---------------- GenAI disclosure callout ---------------- */}
              <div className="hlp-info-callout">
                <InfoCircleFilled className="hlp-info-icon" />
                <p className="hlp-info-text">
                  <strong>Note to authors:</strong> if you have used Generative AI or AI-assisted
                  technology, include the following statement directly before the references at the
                  end of your manuscript:
                  <br />
                  <strong>
                    "During the preparation of this work the author(s) used [NAME TOOL / SERVICE] in
                    order to [REASON]. After using this tool/service, the author(s) reviewed and
                    edited the content as needed and take(s) full responsibility for the content of
                    the publication."
                  </strong>
                </p>
              </div>

              <p className="hlp-p">
                If the Guide for Authors indicates the journal is double-anonymized, prepare your
                files so that identifying details (author names, affiliations, etc.) are in a
                separate file, and make sure your file names do not reveal any author name.
              </p>

              <p className="hlp-p">
                The steps in the Editorial Manager submission interface may vary depending on
                publication configuration and article type, but the general process is the same. A
                progress bar across the top of each page shows which step is active, completed, or
                needs attention.
              </p>

              {/* ---------------- Form flow diagram ---------------- */}
              <div className="hlp-diagram">
                {FORM_STEPS.map((step, i) => (
                  <div className="hlp-diagram-step" key={step.label}>
                    <div className="hlp-diagram-node">
                      <StepIcon state={step.state} />
                      <span className="hlp-diagram-label">{step.label}</span>
                    </div>
                    {i < FORM_STEPS.length - 1 && (
                      <span className="hlp-diagram-connector" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
              <p className="hlp-diagram-legend">
                <CheckCircleFilled className="hlp-diagram-icon hlp-diagram-icon-done" /> Completed
                &nbsp;&nbsp;
                <ExclamationCircleFilled className="hlp-diagram-icon hlp-diagram-icon-attention" /> Needs
                attention &nbsp;&nbsp;
                <span className="hlp-diagram-icon hlp-diagram-icon-todo" /> Not started
              </p>

              <p className="hlp-p">
                Each page may contain a number of accordion fields — expand each to enter or verify
                information. A green checkmark shows beside a field once it's completed
                successfully; a red alert flags any item with missing or incorrectly formatted
                information.
              </p>

              {/* ---------------- Corresponding Author warning ---------------- */}
              <div className="hlp-warn-callout">
                <ExclamationCircleFilled className="hlp-warn-icon" />
                <p className="hlp-warn-text">
                  The submitting Author is automatically designated the Corresponding Author, who is
                  responsible for overseeing the submission and will receive emails as it moves
                  through the editorial process. The Corresponding Author designation{' '}
                  <a href="#change-corresponding" className="hlp-link">may be changed</a>, but a
                  Corresponding Author must be a registered Editorial Manager user. If the
                  designation is changed, the submitting Author loses visibility of the submission
                  until the applicable folder is reached, and the new Corresponding Author must
                  complete and/or approve the submission.
                </p>
              </div>

              <div className="hlp-info-callout">
                <InfoCircleFilled className="hlp-info-icon" />
                <p className="hlp-info-text">
                  If the submission is an invited submission, the Remove Submission link is not
                  available. Once an Author has accepted an invitation to submit a manuscript, the
                  Author must either complete the submission or{' '}
                  <a href="#contact-editorial-office" className="hlp-link">contact the editorial office</a>{' '}
                  and request to be uninvited.
                </p>
              </div>

              {/* ---------------- Comprehensive steps list ---------------- */}
              <h2 className="hlp-h2">Submission steps</h2>
              <ol className="hlp-steps-list">
                {SUBMISSION_STEPS.map((step) => (
                  <li key={step.title} className="hlp-steps-item">
                    <span className="hlp-steps-title">{step.title}</span>
                    <p className="hlp-steps-body">{step.body}</p>
                  </li>
                ))}
              </ol>

              <p className="hlp-p hlp-p-muted">
                After completing these steps, your manuscript is submitted to the journal and listed
                as "Submitted to Journal" on your Author Main Menu, and you'll receive an email
                confirming successful submission.
              </p>

              {/* ---------------- Video / help resources ---------------- */}
              <h2 className="hlp-h2">Video guides &amp; related help</h2>
              <ul className="hlp-video-list">
                {VIDEO_LINKS.map((video) => (
                  <li key={video.label}>
                    <a href="#video-guide" className="hlp-link">{video.label}</a>
                  </li>
                ))}
              </ul>

              {/* ---------------- Feedback footer ---------------- */}
              <div className="hlp-feedback">
                <p className="hlp-feedback-question">Did we answer your question?</p>
                <div className="hlp-feedback-actions">
                  <button
                    type="button"
                    className={`hlp-feedback-btn ${feedback === 'yes' ? 'is-active' : ''}`}
                    onClick={() => setFeedback('yes')}
                  >
                    <LikeOutlined /> Yes
                  </button>
                  <button
                    type="button"
                    className={`hlp-feedback-btn ${feedback === 'no' ? 'is-active' : ''}`}
                    onClick={() => setFeedback('no')}
                  >
                    <DislikeOutlined /> No
                  </button>
                </div>
                {feedback && (
                  <p className="hlp-feedback-thanks">
                    Thanks for letting us know. Still have a question? Contact "Submissions" as the
                    Author role from the drop-down on your Editorial Manager site.
                  </p>
                )}
              </div>

              {/* ---------------- Back to submission ---------------- */}
              <div className="hlp-back-row">
                <button type="button" className="hlp-back-btn" onClick={() => window.close()}>
                  Close &amp; return to submission <ArrowRightOutlined />
                </button>
              </div>

            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}
