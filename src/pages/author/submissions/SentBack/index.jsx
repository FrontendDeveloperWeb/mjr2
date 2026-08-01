import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { SENT_BACK } from '../data/dummySubmissions.js';

export default function SubmissionsSentBack() {
  const [data, setData] = useState(SENT_BACK);

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Submissions Sent Back to Author"
        description="These submissions have been sent back to you by the Editorial Office. Please review the comments provided and use Edit Submission to revise and resubmit."
        submissionData={data}
        statusType="sent-back"
        onRemove={(id) => setData((prev) => prev.filter((r) => r.id !== id))}
      />
    </Layout>
  );
}
