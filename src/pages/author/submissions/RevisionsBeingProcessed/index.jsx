import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { REVISIONS_BEING_PROCESSED } from '../data/dummySubmissions.js';

export default function RevisionsBeingProcessed() {
  const [data, setData] = useState(REVISIONS_BEING_PROCESSED);

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Revisions Being Processed"
        description="These revisions have been received and are currently being processed by the Editorial Office."
        submissionData={data}
        statusType="revisions-being-processed"
        onRemove={(id) => setData((prev) => prev.filter((r) => r.id !== id))}
      />
    </Layout>
  );
}
