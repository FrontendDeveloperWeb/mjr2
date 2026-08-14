import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Steps, Select, Button, Input, Table, message, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  FileOutlined,
} from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import { useQuery, useMutation } from '../../../../hooks/reactQuery/index.js';
import { OVERVIEW_STEP_TITLES } from '../overviewStepTitles.js';
import { getWizardState, setStep4Data } from '../paperDraftStore.js';

// useQuery's default `select` already tries to normalize a GET response
// into `{ data: [...] }`, but that assumes the backend wraps its array as
// `{ data: [...] }` too — if it instead sends the array bare, or wraps it as
// `{ data: { data: [...] } }` / `{ data: { files: [...] } }`, `.data` ends
// up holding a non-array object and any `.map()` on it throws. Try every
// shape actually seen from this backend before giving up to `[]`.
function toArray(queryResult) {
  const raw = queryResult?.data;
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw?.files)) return raw.files;
  return [];
}

// Removes a deleted file from the cached getPaperFiles response in place, so
// the table updates instantly without an extra GET round-trip. `old` is the
// RAW (pre-select) cache entry — `{ data: <full backend body>, pagination }`
// — so this mirrors every files-array shape toArray() tolerates post-select,
// one level deeper: bare array, `{data: [...]}`, `{data: {files: [...]}}`
// (the shape this endpoint actually uses), or `{files: [...]}`.
function removeFileFromFilesCache(old, deletedId) {
  if (!old) return old;
  const apiData = old.data;
  if (Array.isArray(apiData)) {
    return { ...old, data: apiData.filter((f) => f.id !== deletedId) };
  }
  if (Array.isArray(apiData?.data?.files)) {
    return {
      ...old,
      data: {
        ...apiData,
        data: { ...apiData.data, files: apiData.data.files.filter((f) => f.id !== deletedId) },
      },
    };
  }
  if (Array.isArray(apiData?.data)) {
    return { ...old, data: { ...apiData, data: apiData.data.filter((f) => f.id !== deletedId) } };
  }
  if (Array.isArray(apiData?.files)) {
    return { ...old, data: { ...apiData, files: apiData.files.filter((f) => f.id !== deletedId) } };
  }
  return old;
}

function emptyRow() {
  return {
    id: crypto.randomUUID?.() ?? `row-${Date.now()}-${Math.random()}`,
    fileTypeId: undefined,
    file: null,
  };
}

// Backend file records aren't a fixed shape — cover the field names likely
// to appear (same fallback-chain approach as formatAuthorLabel in Step 2).
function formatFileRow(f) {
  return {
    id: f.id,
    type: f.file_type_name || f.file_type?.name || f.type || '—',
    name: f.file_name || f.name || f.original_name || 'File',
    version: f.version || 'v1',
    size: f.size || f.file_size || '—',
    uploadedAt: f.created_at || f.uploaded_at || '',
    url: f.file_path || f.file_url || f.url || f.path || null,
  };
}

/**
 * Step 4 — Upload Files. Part of the (new) Overview-first flow (see
 * overviewStepTitles.js).
 *
 * Unlike the local-only version of this page, the Uploaded Files table is
 * now backend-driven (GET papers/get-files/{slug}) rather than mirrored in
 * frontend state — that's what makes Back/Forward safe here: the table
 * always reflects what's actually saved server-side on every mount, instead
 * of a client-side copy that could drift or vanish on reload. Only the
 * *pending, not-yet-uploaded* rows (file type + file picked but not saved
 * yet) are ordinary transient form state, same as any unsaved field
 * elsewhere in this wizard.
 */
export default function SubmitManuscriptStep4() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug') || getWizardState()?.slug || null;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!slug) {
      message.warning('Please complete Step 1 first.');
      navigate('/author/submit-manuscript/step-1', { replace: true });
    }
  }, [slug, navigate]);

  const { data: fileTypesResult, isLoading: fileTypesLoading } = useQuery('getFileTypes');
  const fileTypeOptions = useMemo(
    () => toArray(fileTypesResult).map((t) => ({ value: t.id, label: t.name })),
    [fileTypesResult]
  );

  const {
    data: filesResult,
    isLoading: filesLoading,
    refetch: refetchFiles,
  } = useQuery('getPaperFiles', { slug, enabled: Boolean(slug) });
  const uploadedFiles = useMemo(
    () => toArray(filesResult).map(formatFileRow),
    [filesResult]
  );

  // Keeps Step 5's summary in sync with whatever the table currently shows,
  // any time the backend list changes (initial fetch, after upload, after delete).
  // Stores the RAW backend records (not the display-mapped `uploadedFiles`)
  // so Step 5 can map file_type_name/original_name/version/file_size itself,
  // same as it does with step1Data — no separate normalized shape to drift
  // out of sync with what the backend actually calls these fields.
  useEffect(() => {
    if (filesResult) {
      setStep4Data(toArray(filesResult));
    }
  }, [filesResult]);

  const [rows, setRows] = useState([emptyRow()]);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);
  const removeRow = (id) => setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  const updateRow = (id, patch) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const { mutate: deleteFile, isPending: isDeleting } = useMutation('deletePaperFile', {
    useFormData: false,
    showSuccessNotification: true,
    onSuccess: (_response, variables) => {
      // Update the cached list directly instead of refetching — the delete
      // already succeeded, so there's nothing new to fetch.
      queryClient.setQueryData(['getPaperFiles', slug], (old) =>
        removeFileFromFilesCache(old, variables?.data?.id)
      );
    },
  });

  const viewFile = (row) => {
    if (row.url) window.open(row.url, '_blank', 'noopener,noreferrer');
  };

  const filteredFiles = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return uploadedFiles;
    return uploadedFiles.filter(
      (f) => f.name.toLowerCase().includes(q) || f.type.toLowerCase().includes(q)
    );
  }, [uploadedFiles, search]);

  const columns = [
    { title: 'SL', dataIndex: 'sl', width: 60, render: (_, __, i) => i + 1 },
    { title: 'File', dataIndex: 'file', width: 60, render: () => <FileOutlined className="am-file-icon" /> },
    { title: 'File Type', dataIndex: 'type', width: 160 },
    { title: 'File Name', dataIndex: 'name', render: (v) => <span className="am-file-name">{v}</span> },
    { title: 'Version', dataIndex: 'version', width: 90 },
    { title: 'Size', dataIndex: 'size', width: 100 },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, row) => (
        <div className="am-table-actions">
          <button
            type="button"
            className="am-icon-btn"
            aria-label="View file"
            disabled={!row.url}
            onClick={() => viewFile(row)}
          >
            <EyeOutlined />
          </button>
          <Popconfirm
            title="Remove this file?"
            okText="Remove"
            okButtonProps={{ danger: true }}
            onConfirm={() => deleteFile({ slug, data: { id: row.id } })}
          >
            <button type="button" className="am-icon-btn am-icon-btn-danger" aria-label="Remove file" disabled={isDeleting}>
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const { mutate: uploadFiles, isPending: isUploading } = useMutation('updatePaperFiles', {
    useFormData: true,
    showSuccessNotification: true,
    // apiClient already throws (→ onError, not onSuccess) whenever the body
    // says `status: false`, so reaching here means the backend accepted the
    // upload — no need to re-check `status` ourselves.
    onSuccess: () => {
      // Navigate the moment the upload itself resolves — Step 5 fetches
      // its own fresh copy of the files list, so there's no need to wait
      // on a refetch here first. Kick it off in the background purely to
      // keep paperDraftStore's step4Data snapshot current for anyone who
      // navigates Back into this page later.
      refetchFiles().then((refetched) => setStep4Data(toArray(refetched)));

      setRows([emptyRow()]);
      navigate('/author/submit-manuscript/step-5');
    },
  });

  const handleBack = () => {
    navigate('/author/submit-manuscript/step-3');
  };

  const handleNext = () => {
    const ready = rows.filter((r) => r.fileTypeId && r.file);

    if (!ready.length) {
      // Nothing new picked this visit — the table above already reflects
      // everything saved so far, so just move on, unless it's empty too:
      // at least one file (new or already-saved) is required to proceed.
      if (!uploadedFiles.length) {
        const msg = 'Please upload at least one required file to proceed.';
        setError(msg);
        message.error(msg);
        return;
      }
      navigate('/author/submit-manuscript/step-5');
      return;
    }

    // Backend expects each row nested under files[i][...] rather than flat
    // file_type_id[i]/file[i] keys — it reassembles this into the
    // { files: [{ file_type_id, file_type_name, file }] } shape server-side.
    const formData = new FormData();
    ready.forEach((r, index) => {
      const typeName = fileTypeOptions.find((o) => o.value === r.fileTypeId)?.label || '';
      formData.append(`files[${index}][file_type_id]`, r.fileTypeId);
      formData.append(`files[${index}][file_type_name]`, typeName);
      formData.append(`files[${index}][file]`, r.file, r.file.name);
    });
    setError('');
    uploadFiles({ slug, data: formData });
  };

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={3}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={OVERVIEW_STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 4: Upload Files</h1>

              <h2 className="am-section-heading">Files</h2>
              <div className="am-panel am-upload-card">
                <div className="am-panel-body">
                  {rows.map((row) => (
                    <div key={row.id} className="am-upload-row">
                      <div className="am-upload-field">
                        <label className="am-field-label">File Type</label>
                        <Select
                          className="w-100"
                          placeholder="Select File Type"
                          options={fileTypeOptions}
                          loading={fileTypesLoading}
                          value={row.fileTypeId}
                          onChange={(value) => updateRow(row.id, { fileTypeId: value })}
                        />
                      </div>

                      <div className="am-upload-field">
                        <label className="am-field-label">Upload File</label>
                        <div className="am-file-picker">
                          <input
                            type="file"
                            id={`file-input-${row.id}`}
                            className="am-file-native-input-hidden"
                            onChange={(e) => updateRow(row.id, { file: e.target.files?.[0] || null })}
                          />
                          <label htmlFor={`file-input-${row.id}`} className="am-file-picker-btn">
                            Choose file
                          </label>
                          <span className="am-file-picker-name">
                            {row.file?.name || 'No file chosen'}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="am-author-delete"
                        icon={<DeleteOutlined />}
                        disabled={rows.length === 1 && !row.fileTypeId && !row.file}
                        onClick={() => removeRow(row.id)}
                        aria-label="Remove row"
                      />
                    </div>
                  ))}

                  {error && <p className="am-error-text">{error}</p>}

                  <div className="am-author-actions">
                    <Button className="am-btn-theme" icon={<PlusOutlined />} onClick={addRow}>
                      Add More
                    </Button>
                  </div>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <>
                  <h2 className="am-section-heading am-mt-24">Uploaded Files</h2>
                  <div className="am-panel">
                    <div className="am-panel-body">
                      <div className="am-table-toolbar">
                        <div className="am-entries-control">
                          <span>Show</span>
                          <Select
                            size="small"
                            value={pageSize}
                            style={{ width: 72 }}
                            options={[10, 25, 50, 100].map((n) => ({ value: n, label: n }))}
                            onChange={setPageSize}
                          />
                          <span>entries</span>
                        </div>
                        <div className="am-search-control">
                          <span>Search:</span>
                          <Input
                            size="small"
                            style={{ width: 220 }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      </div>

                      <Table
                        className="am-file-table"
                        columns={columns}
                        dataSource={filteredFiles}
                        loading={filesLoading}
                        rowKey="id"
                        size="small"
                        pagination={{ pageSize }}
                        scroll={{ x: 'max-content' }}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="am-actions am-mt-24">
                <Button className="am-btn-secondary" onClick={handleBack}>
                  <ArrowLeftOutlined /> Back
                </Button>
                <Button className="am-btn-theme" onClick={handleNext} loading={isUploading}>
                  Save &amp; Next <ArrowRightOutlined />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
