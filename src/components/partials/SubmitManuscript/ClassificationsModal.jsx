import { useEffect, useMemo, useState } from 'react';
import { Modal, Tree, Input, Empty } from 'antd';
import { CLASSIFICATION_TREE, CLASSIFICATION_LABELS } from './submitOptions.js';

// Selectable leaf keys — checking a parent in antd's Tree also reports the
// parent key, so we keep only leaves in the committed value.
const LEAF_KEYS = new Set(Object.keys(CLASSIFICATION_LABELS));

// Recursively narrow the tree to branches whose leaf title matches the query.
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

/**
 * "Add Classifications" dialog: a searchable, checkable tree. Holds a local
 * draft so Cancel discards and Submit commits the leaf codes to the parent.
 */
export default function ClassificationsModal({ open, value = [], onSubmit, onCancel }) {
  const [checkedKeys, setCheckedKeys] = useState(value);
  const [search, setSearch] = useState('');

  // Reset the draft to the committed value each time the modal opens.
  useEffect(() => {
    if (open) {
      setCheckedKeys(value);
      setSearch('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const treeData = useMemo(() => filterTree(CLASSIFICATION_TREE, search), [search]);

  const handleCheck = (checked) => {
    const keys = Array.isArray(checked) ? checked : checked.checked;
    setCheckedKeys(keys.filter((k) => LEAF_KEYS.has(k)));
  };

  return (
    <Modal
      title="Add Classifications"
      open={open}
      onOk={() => onSubmit(checkedKeys)}
      onCancel={onCancel}
      okText="Submit"
      okButtonProps={{ disabled: checkedKeys.length === 0, className: 'am-btn-primary' }}
      width={640}
      className="am-modal"
      destroyOnHidden
    >
      <p className="am-modal-hint">
        Identify your submission&rsquo;s areas of interest and specialization by
        selecting one or more classifications below.
      </p>

      <Input.Search
        placeholder="Search classifications"
        allowClear
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="am-modal-search"
      />

      <div className="am-tree-scroll">
        {treeData.length ? (
          <Tree
            checkable
            selectable={false}
            treeData={treeData}
            checkedKeys={checkedKeys}
            onCheck={handleCheck}
            defaultExpandAll
          />
        ) : (
          <Empty description="No matching classifications" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>

      <div className="am-modal-selected">
        <span className="am-modal-selected-label">Selected: {checkedKeys.length}</span>
        {checkedKeys.length > 0 && (
          <span className="am-modal-selected-list">
            {checkedKeys.map((k) => CLASSIFICATION_LABELS[k]).join(', ')}
          </span>
        )}
      </div>
    </Modal>
  );
}
