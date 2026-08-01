import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { BEING_PROCESSED } from '../data/dummySubmissions.js';

export default function SubmissionsBeingProcessed() {
  const [data, setData] = useState(BEING_PROCESSED);

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Submissions Being Processed"
        description="These submissions have been received and are currently being processed by the Editorial Office."
        submissionData={data}
        statusType="being-processed"
        onRemove={(id) => setData((prev) => prev.filter((r) => r.id !== id))}
      />
    </Layout>
  );
}
