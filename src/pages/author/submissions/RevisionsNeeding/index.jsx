import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { REVISIONS_NEEDING } from '../data/dummySubmissions.js';

export default function SubmissionsNeedingRevision() {
  const [data, setData] = useState(REVISIONS_NEEDING);

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Submissions Needing Revision"
        description="These submissions require a revision. Please review the decision letter and reviewer comments, then use Edit Submission to submit your revised manuscript."
        submissionData={data}
        statusType="revisions-needing"
        onRemove={(id) => setData((prev) => prev.filter((r) => r.id !== id))}
      />
    </Layout>
  );
}
