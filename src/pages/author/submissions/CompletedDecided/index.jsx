import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { COMPLETED_DECIDED } from '../data/dummySubmissions.js';

export default function SubmissionsWithDecision() {
  const [data, setData] = useState(COMPLETED_DECIDED);

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Submissions with a Decision"
        description="A final decision has been made on these submissions. Click View Submission to see full details and any decision letters."
        submissionData={data}
        statusType="completed-decided"
        onRemove={(id) => setData((prev) => prev.filter((r) => r.id !== id))}
      />
    </Layout>
  );
}
