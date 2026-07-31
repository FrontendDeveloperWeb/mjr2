import { useEffect, useMemo, useState } from 'react';
import { Modal, Tree, Input, Button, Empty } from 'antd';
import {
  CLASSIFICATION_TREE,
  CLASSIFICATION_LABELS,
  PARENT_KEYS,
  LEAF_KEYS,
} from './classificationData.js';

// Narrow the tree to branches whose leaf title matches the query, and wrap the
// matching substring so it can render in red ("Matching terms display in red").
function filterTree(nodes, query) {
  if (!query) return nodes;
  const q = query.toLowerCase();
  return nodes
    .map((node) => {
      if (node.children) {
        const children = filterTree(node.children, q);
        if (children.length) return { ...node, children };
        return null;
      }
      return node.title.toLowerCase().includes(q) ? node : null;
    })
    .filter(Boolean);
}

// Render a leaf/branch title with the matched search term highlighted in red.
function highlight(title, query) {
  if (!query) return title;
  const idx = title.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="am-cls-match">{title.slice(idx, idx + query.length)}</span>
      {title.slice(idx + query.length)}
    </>
  );
}

/**
 * "Select Submission Classifications" dialog. A checkable tree of available
 * classifications on the left transfers into a Selected box on the right via
 * Add / Remove. Holds a local draft so Cancel discards and Submit commits the
 * chosen leaf codes back to the parent form.
 */
export default function ClassificationsModal({ open, value = [], onSubmit, onCancel }) {
  const [selectedKeys, setSelectedKeys] = useState(value); // committed to the right box
  const [treeChecked, setTreeChecked] = useState([]); // checked in the left tree
  const [rightActive, setRightActive] = useState([]); // highlighted in the right box
  const [search, setSearch] = useState('');
  const [applied, setApplied] = useState('');
  const [expandedKeys, setExpandedKeys] = useState(PARENT_KEYS);

  // Reset the draft to the committed value each time the modal opens.
  useEffect(() => {
    if (open) {
      setSelectedKeys(value);
      setTreeChecked([]);
      setRightActive([]);
      setSearch('');
      setApplied('');
      setExpandedKeys(PARENT_KEYS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const treeData = useMemo(() => {
    const filtered = filterTree(CLASSIFICATION_TREE, applied);
    // Decorate titles with the red match highlight.
    const decorate = (nodes) =>
      nodes.map((n) => ({
        ...n,
        title: highlight(n.title, applied),
        children: n.children ? decorate(n.children) : undefined,
      }));
    return decorate(filtered);
  }, [applied]);

  const handleCheck = (checked) => {
    const keys = Array.isArray(checked) ? checked : checked.checked;
    setTreeChecked(keys.filter((k) => LEAF_KEYS.has(k)));
  };

  const handleAdd = () => {
    const additions = treeChecked.filter((k) => !selectedKeys.includes(k));
    if (!additions.length) return;
    setSelectedKeys((prev) => [...prev, ...additions]);
    setTreeChecked([]);
  };

  const handleRemove = () => {
    if (!rightActive.length) return;
    setSelectedKeys((prev) => prev.filter((k) => !rightActive.includes(k)));
    setRightActive([]);
  };

  const toggleRight = (key) =>
    setRightActive((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const runSearch = () => setApplied(search.trim());
  const clearSearch = () => {
    setSearch('');
    setApplied('');
  };

  return (
    <Modal
      title="Select Submission Classifications"
      open={open}
      onCancel={onCancel}
      width={860}
      className="am-cls-modal"
      destroyOnHidden
      footer={[
        <Button key="cancel" className="am-btn-secondary" onClick={onCancel}>Cancel</Button>,
        <Button
          key="submit"
          className="am-btn-primary"
          disabled={selectedKeys.length === 0}
          onClick={() => onSubmit(selectedKeys)}
        >
          Submit
        </Button>,
      ]}
    >
      <p className="am-cls-hint">
        Please identify your manuscript&rsquo;s areas of interest and specialization by selecting
        one or more classifications from the list below. Click &lsquo;Submit&rsquo; at the bottom
        of the page when you are done.
      </p>
      <p className="am-cls-note">To save changes you must click &ldquo;Submit&rdquo; before you leave this window.</p>

      {/* Search */}
      <div className="am-cls-search-row">
        <span className="am-cls-search-label">Search:</span>
        <Input
          className="am-cls-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onPressEnter={runSearch}
          allowClear
        />
        <Button className="am-btn-grey" size="small" onClick={runSearch}>Search</Button>
        <Button className="am-btn-grey" size="small" onClick={clearSearch}>Clear</Button>
        <span className="am-cls-search-hint">[Matching terms display in red text]</span>
      </div>

      {/* Transfer body */}
      <div className="am-cls-panels">
        {/* Left: available tree */}
        <div className="am-cls-col">
          <div className="am-cls-expand-links">
            <button type="button" className="am-help-link am-linkbtn" onClick={() => setExpandedKeys(PARENT_KEYS)}>Expand All</button>
            <button type="button" className="am-help-link am-linkbtn" onClick={() => setExpandedKeys([])}>Collapse All</button>
          </div>
          <div className="am-cls-box am-cls-tree">
            {treeData.length ? (
              <Tree
                checkable
                selectable={false}
                treeData={treeData}
                checkedKeys={treeChecked}
                expandedKeys={expandedKeys}
                onExpand={setExpandedKeys}
                onCheck={handleCheck}
              />
            ) : (
              <Empty description="No matching classifications" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>

        {/* Middle: transfer buttons */}
        <div className="am-cls-actions">
          <Button className="am-btn-grey am-cls-move" disabled={!treeChecked.length} onClick={handleAdd}>
            Add &rarr;
          </Button>
          <Button className="am-btn-grey am-cls-move" disabled={!rightActive.length} onClick={handleRemove}>
            &larr; Remove
          </Button>
        </div>

        {/* Right: selected box */}
        <div className="am-cls-col">
          <p className="am-cls-selected-title">
            Selected Classifications: <span className="am-cls-required">Select 1 or more Classifications</span>
          </p>
          <div className="am-cls-box am-cls-selected">
            {selectedKeys.length ? (
              selectedKeys.map((k) => (
                <button
                  type="button"
                  key={k}
                  className={`am-cls-selected-item ${rightActive.includes(k) ? 'is-active' : ''}`}
                  onClick={() => toggleRight(k)}
                >
                  {CLASSIFICATION_LABELS[k]}
                </button>
              ))
            ) : (
              <span className="am-muted">(None Selected)</span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
