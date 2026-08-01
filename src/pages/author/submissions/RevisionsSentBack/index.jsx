import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { REVISIONS_SENT_BACK } from '../data/dummySubmissions.js';

export default function RevisionsSentBack() {
  const [data, setData] = useState(REVISIONS_SENT_BACK);

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Revisions Sent Back to Author"
        description="These revisions have been sent back to you by the Editorial Office. Please review the comments provided and resubmit."
        submissionData={data}
        statusType="revisions-sent-back"
        onRemove={(id) => setData((prev) => prev.filter((r) => r.id !== id))}
      />
    </Layout>
  );
}
