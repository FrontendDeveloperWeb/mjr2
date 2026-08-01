// Placeholder datasets for the author submission status pages that don't yet
// have a real backend (only "Incomplete" is backed by draftStorage.js today).
// Kept as one module so both the status pages and the Author Main Menu counts
// read from the same arrays.

export const SENT_BACK = [
  { id: 'sb-1', title: 'Machine Learning Approaches to Early Cancer Detection', dateBegan: '2026-07-10T14:22:00', statusDate: '2026-07-18T09:15:00', status: 'Sent Back to Author' },
  { id: 'sb-2', title: '(Title not yet Supplied)', dateBegan: '2026-07-05T11:05:00', statusDate: '2026-07-16T16:40:00', status: 'Sent Back to Author' },
];

export const WAITING_APPROVAL = [
  { id: 'wa-1', title: 'Climate Variability and Crop Yield in Sub-Saharan Africa', dateBegan: '2026-07-20T08:30:00', statusDate: '2026-07-27T13:10:00', status: "Awaiting Your Approval" },
];

export const BEING_PROCESSED = [
  { id: 'bp-1', title: 'A Novel Framework for Federated Learning in Healthcare', dateBegan: '2026-07-12T10:00:00', statusDate: '2026-07-29T09:45:00', status: 'Under Review' },
  { id: 'bp-2', title: 'Longitudinal Study of Air Quality in Urban Centers', dateBegan: '2026-07-08T17:12:00', statusDate: '2026-07-28T12:00:00', status: 'With Editor' },
  { id: 'bp-3', title: 'Gut Microbiome Diversity and Metabolic Disorders', dateBegan: '2026-06-30T09:40:00', statusDate: '2026-07-25T15:20:00', status: 'Under Review' },
];

export const REVISIONS_NEEDING = [
  { id: 'rn-1', title: 'Deep Learning for Real-Time Object Detection in Robotics', dateBegan: '2026-06-15T13:00:00', statusDate: '2026-07-22T10:30:00', status: 'Revision Required' },
];

export const REVISIONS_SENT_BACK = [
  { id: 'rsb-1', title: 'Socioeconomic Determinants of Vaccine Hesitancy', dateBegan: '2026-06-10T09:00:00', statusDate: '2026-07-19T11:25:00', status: 'Sent Back to Author' },
];

export const REVISIONS_INCOMPLETE = [
  { id: 'ri-1', title: '(Title not yet Supplied)', dateBegan: '2026-07-21T19:00:00', statusDate: '2026-07-29T08:05:00', status: 'Incomplete', currentStep: 3 },
];

export const REVISIONS_WAITING_APPROVAL = [
  { id: 'rwa-1', title: 'Genomic Markers Associated with Drug Resistance', dateBegan: '2026-06-01T12:15:00', statusDate: '2026-07-26T14:50:00', status: "Awaiting Your Approval" },
];

export const REVISIONS_BEING_PROCESSED = [
  { id: 'rbp-1', title: 'Structural Health Monitoring Using IoT Sensor Networks', dateBegan: '2026-05-28T10:20:00', statusDate: '2026-07-27T09:00:00', status: 'Under Review' },
];

export const REVISIONS_DECLINED = [
  { id: 'rd-1', title: 'Comparative Analysis of Renewable Energy Policies', dateBegan: '2026-05-10T08:00:00', statusDate: '2026-06-30T17:30:00', status: 'Declined' },
];

export const COMPLETED_DECIDED = [
  { id: 'cd-1', title: 'Neural Correlates of Decision-Making Under Uncertainty', dateBegan: '2026-04-15T09:00:00', statusDate: '2026-06-20T10:00:00', status: 'Accepted' },
  { id: 'cd-2', title: 'Antibiotic Resistance Patterns in Hospital-Acquired Infections', dateBegan: '2026-04-02T11:30:00', statusDate: '2026-06-05T15:45:00', status: 'Rejected' },
];
