import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Alert, Select, Dropdown, Tag, Empty, Modal, message } from 'antd';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { formatSubmissionDate } from '../../../utils/formatDate.js';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

/** Best-effort color for whatever status string a page passes in. */
function statusColor(status = '') {
  const s = status.toLowerCase();
  if (s.includes('declin') || s.includes('reject')) return 'red';
  if (s.includes('sent back')) return 'orange';
  if (s.includes('approval')) return 'gold';
  if (s.includes('process') || s.includes('review')) return 'blue';
  if (s.includes('revision')) return 'purple';
  if (s.includes('decision') || s.includes('accept') || s.includes('complete')) return 'green';
  return 'default';
}

/**
 * Generic table shell shared by every author "submission status" page
 * (Incomplete, Sent Back, Revisions, Completed, ...). Pages own their data —
 * this component only renders it, so a status page never has to re-implement
 * the header / alert / pagination-bar / table chrome.
 */
export default function SubmissionTableLayout({
  pageTitle,
  description,
  submissionData = [],
  statusType,
  onEdit,
  onView,
  onRemove,
  getEditPath,
}) {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const total = submissionData.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = submissionData.slice(0, pageSize);

  const handleEdit = (record) => {
    if (onEdit) return onEdit(record);
    const path = getEditPath ? getEditPath(record) : `/author/submit-manuscript/step-${record.currentStep || 1}`;
    navigate(path);
  };

  const handleView = (record) => {
    if (onView) return onView(record);
    message.info(`Viewing "${record.title || '(Title not yet Supplied)'}"`);
  };

  const handleRemove = (record) => {
    Modal.confirm({
      title: 'Remove submission?',
      content: `This will remove "${record.title || '(Title not yet Supplied)'}" from your ${statusType} list.`,
      okText: 'Remove',
      okButtonProps: { danger: true },
      onOk: () => onRemove?.(record.id),
    });
  };

  const actionMenu = (record) => ({
    items: [
      { key: 'edit', label: 'Edit Submission' },
      { key: 'view', label: 'View Submission' },
      { key: 'remove', label: 'Remove Submission', danger: true },
    ],
    onClick: ({ key }) => {
      if (key === 'edit') handleEdit(record);
      if (key === 'view') handleView(record);
      if (key === 'remove') handleRemove(record);
    },
  });

  const columns = [
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Dropdown menu={actionMenu(record)} trigger={['click']}>
          <a className="ast-action-link" onClick={(e) => e.preventDefault()}>
            Action Links <DownOutlined className="ast-action-caret" />
          </a>
        </Dropdown>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title) => (
        <span className={title ? '' : 'ast-title-placeholder'}>
          {title || '(Title not yet Supplied)'}
        </span>
      ),
    },
    {
      title: 'Date Submission Began',
      dataIndex: 'dateBegan',
      key: 'dateBegan',
      render: (value) => formatSubmissionDate(value),
    },
    {
      title: 'Status Date',
      dataIndex: 'statusDate',
      key: 'statusDate',
      render: (value) => formatSubmissionDate(value),
    },
    {
      title: 'Current Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColor(status)}>{status}</Tag>,
    },
  ];

  const PaginationBar = () => (
    <div className="ast-pagination-bar">
      <span className="ast-pagination-summary">
        Page: 1 of {totalPages} ({total} total submission{total === 1 ? '' : 's'})
      </span>
      <label className="ast-pagesize-label">
        Results per page{' '}
        <Select
          value={pageSize}
          onChange={setPageSize}
          options={PAGE_SIZE_OPTIONS.map((n) => ({ value: n, label: n }))}
          className="ast-pagesize-select"
          size="small"
        />
      </label>
    </div>
  );

  return (
    <section className="ast-page">
      <div className="container">
        <div className="ast-header-row">
          <button
            type="button"
            className="ast-back-btn"
            aria-label="Back"
            onClick={() => navigate('/author/main-menu')}
          >
            <ArrowLeftOutlined />
          </button>
          <h1 className="ast-title">{pageTitle}</h1>
        </div>

        {description && (
          <Alert type="info" className="ast-alert" title={description} showIcon={false} />
        )}

        <PaginationBar />

        <Table
          columns={columns}
          dataSource={pageData}
          rowKey="id"
          pagination={false}
          className="ast-table"
          locale={{
            emptyText: <Empty description="No submissions found in this category." />,
          }}
        />

        <PaginationBar />
      </div>
    </section>
  );
}
