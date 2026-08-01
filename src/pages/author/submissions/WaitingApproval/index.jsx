import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { WAITING_APPROVAL } from '../data/dummySubmissions.js';

export default function SubmissionsWaitingApproval() {
  const [data, setData] = useState(WAITING_APPROVAL);

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Submissions Waiting for Author's Approval"
        description="These submissions are complete and awaiting your final approval before they are sent to the Editorial Office."
        submissionData={data}
        statusType="waiting-approval"
        onRemove={(id) => setData((prev) => prev.filter((r) => r.id !== id))}
      />
    </Layout>
  );
}
