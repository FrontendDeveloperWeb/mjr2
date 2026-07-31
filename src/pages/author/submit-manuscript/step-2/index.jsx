import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps, Upload, Select, Input, InputNumber, Button, Table, Checkbox } from 'antd';
import {
  InboxOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import { STEP_TITLES } from '../stepTitles.js';
import { setStepData } from '../manuscriptStore.js';
import { useDraftId, useDraftAutosave } from '../useManuscriptDraft.js';

const { Dragger } = Upload;

// Item types offered for each attached file (asterisk = required title page).
const ITEM_TYPES = [
  'Cover Letter',
  '*Title Page with author details',
  'Manuscript without author details',
  'Conflict of interest',
  'Compliance with Ethics Requirements',
  'Graphical Abstract',
  'Research Highlights',
].map((v) => ({ value: v, label: v }));

// Sidebar checklist shown once a file is attached.
const REQUIRED_ITEMS = [
  'Cover Letter',
  'Title Page with author details',
  'Manuscript without author details',
  'Conflict of interest',
  'Compliance with Ethics Requirements',
  'Graphical Abstract',
  'Research Highlights',
];

// Italic guidance notes rendered as cards under the checklist (verbatim).
const SUBMISSION_NOTES = [
  'Note: As an open access journal with no subscription charges, a fee (Article Publishing Charge, APC) is payable by the author or research funder to cover the costs associated with publication. This ensures your article will be immediately and permanently free to access by everyone. The Article Publishing Charge for this journal is $4400.',
  'For title page, please ensure to update the complete list of authors, corresponding affiliation, corresponding author information and footnotes, if any.',
  'Please upload tables in editable format and Kindly ensure that all the references, tables and figures are cited correctly within the text of the article before submitting the revised version.',
  'Authors should note that the acceptance rate in this journal is exceptionally low, around 5%; only the most novel, methodologically rigorous, and impactful manuscripts are selected for peer review.',
];

const DEFAULT_ITEM = ITEM_TYPES[1].value; // "*Title Page with author details"

// Format a file timestamp roughly like the reference ("Jul 29 2026 05:27PM").
function formatDate(ts) {
  const d = new Date(ts || Date.now());
  const date = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const time = d
    .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    .replace(' ', '');
  return `${date} ${time}`;
}

/**
 * Step 2 — Attach Files. Standalone page in the multi-page submission flow.
 * Empty state shows a single drop zone; once files are attached the layout
 * switches to the submission checklist + item controls + a data table.
 */
export default function SubmitManuscriptStep2() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [pendingType, setPendingType] = useState(DEFAULT_ITEM);
  const [pendingDesc, setPendingDesc] = useState(DEFAULT_ITEM.replace('*', ''));
  const [selected, setSelected] = useState([]);
  const [bulkFrom, setBulkFrom] = useState();
  const [bulkTo, setBulkTo] = useState();
  const [note, setNote] = useState('');
  const [error, setError] = useState(false);

  const hasFiles = files.length > 0;

  // Strip the non-serializable `raw` File object before this leaves the page
  // (draft persists to localStorage; File instances don't survive JSON).
  const draftFiles = useMemo(
    () => files.map(({ order, itemType, description, name, size }) => ({ order, itemType, description, name, size })),
    [files],
  );

  const draftId = useDraftId();
  useDraftAutosave(draftId, 'step2', 2, { files: draftFiles });

  // Capture the dropped/browsed file into our own table; returning false keeps
  // antd from actually uploading it (no backend yet). Functional update so a
  // multi-file batch appends every file, not just the last.
  const addFile = (file) => {
    setFiles((prev) => [
      ...prev,
      {
        uid: `${Date.now()}-${file.name}-${prev.length}`,
        order: prev.length + 1,
        itemType: pendingType,
        description: pendingDesc || pendingType.replace('*', ''),
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        lastModified: formatDate(file.lastModified),
        raw: file,
      },
    ]);
    setError(false);
    return false;
  };

  const patchRow = (uid, patch) =>
    setFiles((prev) => prev.map((f) => (f.uid === uid ? { ...f, ...patch } : f)));

  const removeSelected = () => {
    setFiles((prev) => prev.filter((f) => !selected.includes(f.uid)));
    setSelected([]);
  };

  const applyBulkType = () => {
    if (!bulkTo) return;
    setFiles((prev) =>
      prev.map((f) => (!bulkFrom || f.itemType === bulkFrom ? { ...f, itemType: bulkTo } : f)),
    );
  };

  const updateOrder = () =>
    setFiles((prev) =>
      [...prev].sort((a, b) => a.order - b.order).map((f, i) => ({ ...f, order: i + 1 })),
    );

  const toggle = (uid) =>
    setSelected((prev) => (prev.includes(uid) ? prev.filter((u) => u !== uid) : [...prev, uid]));

  const checklistDone = (label) =>
    files.some((f) => f.itemType.replace('*', '').trim() === label);

  // Genuine download of the captured file via an object URL.
  const downloadFile = (row) => {
    const url = URL.createObjectURL(row.raw);
    const a = document.createElement('a');
    a.href = url;
    a.download = row.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadZip = () => {
    if (!selected.length) return;
    setNote(`Preparing a ZIP of ${selected.length} selected file(s)…`);
    setTimeout(() => setNote(''), 4000);
  };

  const handleProceed = () => {
    if (!hasFiles) {
      setError(true);
      return;
    }
    setStepData('step2', { files: draftFiles });
    navigate('/author/submit-manuscript/step-3');
  };

  const allChecked = hasFiles && selected.length === files.length;

  const columns = [
    {
      title: 'Order',
      dataIndex: 'order',
      width: 72,
      render: (val, row) => (
        <InputNumber
          size="small"
          min={1}
          className="am-order-input"
          value={val}
          onChange={(v) => patchRow(row.uid, { order: v || 1 })}
        />
      ),
    },
    {
      title: 'Item',
      dataIndex: 'itemType',
      width: 230,
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
      render: (_, row) => (
        <button type="button" className="am-help-link am-linkbtn" onClick={() => downloadFile(row)}>
          <DownloadOutlined /> Download
        </button>
      ),
    },
    {
      title: (
        <div className="am-select-head">
          <span>Select</span>
          <div className="am-check-links">
            <button type="button" className="am-help-link am-linkbtn" onClick={() => setSelected(files.map((f) => f.uid))}>Check All</button>
            <button type="button" className="am-help-link am-linkbtn" onClick={() => setSelected([])}>Clear All</button>
          </div>
        </div>
      ),
      key: 'select',
      width: 110,
      align: 'center',
      render: (_, row) => (
        <Checkbox checked={selected.includes(row.uid)} onChange={() => toggle(row.uid)} />
      ),
    },
  ];

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={1}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 2: Attach Files</h1>

              <div className="am-attach-topbar">
                <a href="#insert-char" className="am-help-link am-insert-link">Insert Special Character</a>
              </div>

              <div className="row g-4">
                {/* Left rail: helper (empty) or checklist + note cards (populated) */}
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
                        {SUBMISSION_NOTES.map((n, i) => (
                          <p key={i} className="am-note-card">{n}</p>
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

                {/* Right: upload bar + table */}
                <div className="col-12 col-lg-9">
                  <div className={`am-attach-bar ${hasFiles ? 'am-attach-bar-loaded' : 'am-attach-bar-initial'}`}>
                    {hasFiles && (
                      <div className="am-attach-fields">
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
                    )}

                    <Dragger
                      className={`am-drop ${hasFiles ? 'am-drop-compact' : 'am-drop-initial'}`}
                      multiple
                      showUploadList={false}
                      beforeUpload={addFile}
                    >
                      <p className="am-drop-inner">
                        <span className="am-drop-browse">Browse…</span>
                        <span className="am-drop-or">OR</span>
                        <span className="am-drop-dd">
                          <InboxOutlined className="am-drop-icon" /> Drag &amp; Drop Files Here
                        </span>
                      </p>
                    </Dragger>
                  </div>

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
                          allowClear
                          style={{ width: 180 }}
                          value={bulkFrom}
                          options={ITEM_TYPES}
                          onChange={setBulkFrom}
                        />
                        <span>files to</span>
                        <Select
                          size="small"
                          placeholder="Choose"
                          style={{ width: 180 }}
                          value={bulkTo}
                          options={ITEM_TYPES}
                          onChange={setBulkTo}
                        />
                        <Button size="small" className="am-btn-grey" onClick={applyBulkType}>Change Now</Button>
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
                        <Button size="small" className="am-btn-grey" onClick={updateOrder}>Update File Order</Button>
                        <Button size="small" className="am-btn-grey" disabled={!selected.length} onClick={downloadZip}>
                          Download Selections as Zip File
                        </Button>
                        <Button size="small" className="am-btn-grey" disabled={!selected.length} onClick={removeSelected}>
                          Remove
                        </Button>
                      </div>

                      {note && <p className="am-action-note">{note}</p>}
                    </div>
                  )}

                  {error && <p className="am-error-text">Please attach at least one file to continue.</p>}

                  <div className="am-actions">
                    <Button className="am-btn-secondary" onClick={() => navigate('/author/submit-manuscript/step-1')}>
                      <ArrowLeftOutlined /> Back
                    </Button>
                    <Button className="am-btn-primary" onClick={handleProceed}>
                      Proceed <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
