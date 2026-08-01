import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { REVISIONS_DECLINED } from '../data/dummySubmissions.js';

export default function RevisionsDeclined() {
  const [data, setData] = useState(REVISIONS_DECLINED);

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Declined Revisions"
        description="These revisions were declined by the Editorial Office. Click View Submission to see the decision and any accompanying comments."
        submissionData={data}
        statusType="revisions-declined"
        onRemove={(id) => setData((prev) => prev.filter((r) => r.id !== id))}
      />
    </Layout>
  );
}
