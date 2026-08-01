import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { REVISIONS_INCOMPLETE } from '../data/dummySubmissions.js';

export default function RevisionsIncomplete() {
  const [data, setData] = useState(REVISIONS_INCOMPLETE);

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Incomplete Submissions Being Revised"
        description="Use Edit Submission to finish uploading your revised files and metadata before your revision can be sent to the Editorial Office."
        submissionData={data}
        statusType="revisions-incomplete"
        onRemove={(id) => setData((prev) => prev.filter((r) => r.id !== id))}
      />
    </Layout>
  );
}
