import { useState } from 'react';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import SubmissionTableLayout from '../../../../components/shared/SubmissionTableLayout/SubmissionTableLayout';
import { listDrafts, removeDraft } from '../../submit-manuscript/draftStorage.js';

export default function IncompleteSubmissions() {
  const [drafts, setDrafts] = useState(() => listDrafts());

  const handleRemove = (id) => {
    removeDraft(id);
    setDrafts(listDrafts());
  };

  const getEditPath = (record) => `/author/submit-manuscript/step-${record.currentStep || 1}`;

  return (
    <Layout>
      <TopBar />
      <SubmissionTableLayout
        pageTitle="Incomplete Submissions"
        description="The 'Edit Submission' link allows you to fix or alter your submission. Please use Edit Submission to make changes to the meta-data and to remove and upload new files that make up your submission."
        submissionData={drafts}
        statusType="incomplete"
        getEditPath={getEditPath}
        onRemove={handleRemove}
      />
    </Layout>
  );
}
