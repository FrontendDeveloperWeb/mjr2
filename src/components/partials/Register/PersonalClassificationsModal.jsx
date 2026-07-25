import { useEffect, useMemo, useState } from 'react';
import { Modal, Tree, Input, Empty } from 'antd';
import { CLASSIFICATION_TREE, CLASSIFICATION_LABELS } from './registerOptions.js';

// All selectable leaf keys — used to keep only leaves in the committed value
// (checking a parent in antd's Tree also reports the parent key).
const LEAF_KEYS = new Set(Object.keys(CLASSIFICATION_LABELS));

// Recursively filter the tree to branches whose leaf title matches the query,
// so searching narrows the list the way the reference dialog does.
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
 * Modal for choosing Personal Classifications from a searchable, checkable
 * tree. Holds a local draft so Cancel discards and Submit commits the leaf
 * codes back to the parent form.
 */
export default function PersonalClassificationsModal({ open, value = [], onSubmit, onCancel }) {
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
    // `checked` is an array (checkStrictly off); keep only real leaf codes.
    const keys = Array.isArray(checked) ? checked : checked.checked;
    setCheckedKeys(keys.filter((k) => LEAF_KEYS.has(k)));
  };

  return (
    <Modal
      title="Select Personal Classifications"
      open={open}
      onOk={() => onSubmit(checkedKeys)}
      onCancel={onCancel}
      okText="Submit"
      okButtonProps={{ disabled: checkedKeys.length === 0, className: 'auth-primary-btn' }}
      width={640}
      className="reg-modal"
      destroyOnHidden
    >
      <p className="reg-modal-hint">
        Identify your areas of interest and specialization by selecting one or
        more classifications below. You must select at least one.
      </p>

      <Input.Search
        placeholder="Search classifications"
        allowClear
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="reg-modal-search"
      />

      <div className="reg-tree-scroll">
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

      <div className="reg-modal-selected">
        <span className="reg-modal-selected-label">
          Selected: {checkedKeys.length}
        </span>
        {checkedKeys.length > 0 && (
          <span className="reg-modal-selected-list">
            {checkedKeys.map((k) => CLASSIFICATION_LABELS[k]).join(', ')}
          </span>
        )}
      </div>
    </Modal>
  );
}
