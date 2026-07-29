import { useState } from 'react';
import { Upload, Select, Input, Button, Table, Checkbox } from 'antd';
import {
  InboxOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { ITEM_TYPES, REQUIRED_ITEMS, SUBMISSION_NOTES } from './submitOptions.js';

const { Dragger } = Upload;
const DEFAULT_ITEM = ITEM_TYPES[1].value; // "*Title Page with author details"

// Format a file timestamp roughly like the reference ("Jul 28 2026 07:03PM").
function formatDate(ts) {
  const d = new Date(ts || Date.now());
  const date = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' ', '');
  return `${date} ${time}`;
}

/**
 * Step 2 — Attach Files. Empty state shows a single drop zone; once a file is
 * attached the layout switches to the submission checklist + item controls +
 * a data table of everything uploaded. Files live in the parent wizard state.
 */
export default function StepAttachFiles({ data, update, onBack, onProceed }) {
  const files = data.files;
  const hasFiles = files.length > 0;

  const [pendingType, setPendingType] = useState(DEFAULT_ITEM);
  const [pendingDesc, setPendingDesc] = useState(DEFAULT_ITEM.replace('*', ''));
  const [selected, setSelected] = useState([]);
  const [bulkType, setBulkType] = useState();

  // Capture the dropped/browsed file into our own table; returning false keeps
  // antd from actually uploading it (no backend yet).
  const addFile = (file) => {
    const row = {
      uid: `${Date.now()}-${file.name}`,
      order: files.length + 1,
      itemType: pendingType,
      description: pendingDesc || pendingType.replace('*', ''),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      lastModified: formatDate(file.lastModified),
    };
    update({ files: [...files, row] });
    return false;
  };

  const patchRow = (uid, patch) =>
    update({ files: files.map((f) => (f.uid === uid ? { ...f, ...patch } : f)) });

  const removeSelected = () => {
    update({ files: files.filter((f) => !selected.includes(f.uid)) });
    setSelected([]);
  };

  const applyBulkType = () => {
    if (!bulkType) return;
    update({ files: files.map((f) => ({ ...f, itemType: bulkType })) });
  };

  const toggle = (uid) =>
    setSelected((prev) => (prev.includes(uid) ? prev.filter((u) => u !== uid) : [...prev, uid]));

  const checklistDone = (label) =>
    files.some((f) => f.itemType.replace('*', '').trim() === label);

  const columns = [
    { title: 'Order', dataIndex: 'order', width: 64 },
    {
      title: 'Item',
      dataIndex: 'itemType',
      width: 240,
      render: (val, row) => (
        <Select
          size="small"
          className="w-100"
          value={val}
          options={ITEM_TYPES}
          onChange={(v) => patchRow(row.uid, { itemType: v })}
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 200,
      render: (val, row) => (
        <Input
          size="small"
          value={val}
          onChange={(e) => patchRow(row.uid, { description: e.target.value })}
        />
      ),
    },
    { title: 'File Name', dataIndex: 'name', render: (v) => <span className="am-file-name">{v}</span> },
    { title: 'Size', dataIndex: 'size', width: 90 },
    { title: 'Last Modified', dataIndex: 'lastModified', width: 170 },
    {
      title: 'Actions',
      key: 'actions',
      width: 110,
      render: () => (
        <a href="#download" className="am-help-link"><DownloadOutlined /> Download</a>
      ),
    },
    {
      title: <span className="am-select-head">Select</span>,
      key: 'select',
      width: 70,
      align: 'center',
      render: (_, row) => (
        <Checkbox checked={selected.includes(row.uid)} onChange={() => toggle(row.uid)} />
      ),
    },
  ];

  return (
    <div className="am-step">
      <div className="am-attach-topbar">
        <a href="#insert-char" className="am-help-link am-insert-link">Insert Special Character</a>
      </div>

      <div className="row g-4">
        {/* Left rail: helper (empty) or checklist + notes (populated) */}
        <aside className="col-12 col-lg-3">
          {hasFiles ? (
            <>
              <p className="am-help-strong">Required For Submission:</p>
              <ul className="am-checklist">
                {REQUIRED_ITEMS.map((item) => (
                  <li key={item} className={`am-checklist-item ${checklistDone(item) ? 'is-done' : ''}`}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="am-notes">
                {SUBMISSION_NOTES.map((note, i) => (
                  <p key={i} className="am-note">{note}</p>
                ))}
              </div>
            </>
          ) : (
            <p className="am-help-strong">
              Please provide a single file containing your manuscript now. Data included
              in your manuscript may be used to populate information for you later in the
              submission process.
            </p>
          )}
        </aside>

        {/* Right: upload controls */}
        <div className="col-12 col-lg-9">
          {hasFiles && (
            <div className="am-attach-controls">
              <div className="am-attach-field">
                <label className="am-field-label">Select Item Type</label>
                <Select
                  className="w-100"
                  value={pendingType}
                  options={ITEM_TYPES}
                  onChange={(v) => {
                    setPendingType(v);
                    setPendingDesc(v.replace('*', ''));
                  }}
                />
                <label className="am-field-label mt-2">Description</label>
                <Input value={pendingDesc} onChange={(e) => setPendingDesc(e.target.value)} />
              </div>
            </div>
          )}

          <Dragger
            className={`am-drop ${hasFiles ? 'am-drop-compact' : ''}`}
            multiple
            showUploadList={false}
            beforeUpload={addFile}
          >
            <p className="am-drop-icon"><InboxOutlined /></p>
            <p className="am-drop-text">
              <span className="am-drop-browse">Browse…</span> OR Drag &amp; Drop Files Here
            </p>
          </Dragger>

          {hasFiles && (
            <div className="am-file-panel">
              <p className="am-file-hint">
                The order in which the attached items appear in the list will be the order in
                which they appear in the PDF file that is produced. You can re-order the items
                manually if necessary.
              </p>

              <div className="am-bulk-row">
                <span>Change Item Type of all</span>
                <Select
                  size="small"
                  placeholder="Choose"
                  style={{ width: 200 }}
                  value={bulkType}
                  options={ITEM_TYPES}
                  onChange={setBulkType}
                />
                <span>files to</span>
                <Button size="small" className="am-btn-grey" onClick={applyBulkType}>Change Now</Button>
                <div className="am-bulk-links">
                  <a href="#check-all" className="am-help-link" onClick={(e) => { e.preventDefault(); setSelected(files.map((f) => f.uid)); }}>Check All</a>
                  <a href="#clear-all" className="am-help-link" onClick={(e) => { e.preventDefault(); setSelected([]); }}>Clear All</a>
                </div>
              </div>

              <Table
                className="am-file-table"
                columns={columns}
                dataSource={files}
                rowKey="uid"
                pagination={false}
                size="small"
                scroll={{ x: 'max-content' }}
              />

              <div className="am-file-actions">
                <Button size="small" className="am-btn-grey">Update File Order</Button>
                <Button size="small" className="am-btn-grey" disabled={!selected.length}>
                  Download Selections as Zip File
                </Button>
                <Button size="small" className="am-btn-grey" disabled={!selected.length} onClick={removeSelected}>
                  Remove
                </Button>
              </div>
            </div>
          )}

          <div className="am-actions">
            <Button className="am-btn-secondary" onClick={onBack}>
              <ArrowLeftOutlined /> Back
            </Button>
            <Button className="am-btn-primary" onClick={onProceed} disabled={!hasFiles}>
              Proceed <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
