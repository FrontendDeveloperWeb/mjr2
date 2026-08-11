import { useEffect, useMemo, useState } from 'react';
import { Modal, Tree, Input, Empty, Spin } from 'antd';
import { useQuery } from '@/hooks/reactQuery/index.js';

// The Subjects API returns a nested shape — each parent subject carries its
// sub-subjects in `children` (e.g. Physiotherapy, Orthopedic, Urology under
// their parent). These helpers walk that shape directly rather than
// flattening it, so the modal can render — and let the user check — both
// parents and their children.

// Recurse into every node (parents and children alike) so a subject at any
// depth can be looked up by id when committing the selection.
function buildSubjectIndex(nodes, map = new Map()) {
  nodes.forEach((node) => {
    map.set(node.id, node);
    if (node.children?.length) buildSubjectIndex(node.children, map);
  });
  return map;
}

// Mirror the API's parent/children shape onto antd Tree's title/key/children
// shape, recursively, so nested sub-subjects render as an expandable tree.
function toTreeData(nodes) {
  return nodes.map((node) => ({
    title: node.name,
    key: node.id,
    children: node.children?.length ? toTreeData(node.children) : undefined,
  }));
}

// Narrow the fetched subjects tree to nodes whose name matches the query.
// A parent is kept whole when it matches; otherwise it's kept only if one of
// its children still matches, so searching narrows the tree without losing
// the parent/child grouping.
function filterSubjects(nodes, query) {
  if (!query) return nodes;
  const q = query.toLowerCase();
  return nodes
    .map((node) => {
      if (node.name?.toLowerCase().includes(q)) return node;
      const children = node.children?.length ? filterSubjects(node.children, q) : [];
      return children.length ? { ...node, children } : null;
    })
    .filter(Boolean);
}

/**
 * Modal for choosing Personal Classifications from a searchable, checkable
 * tree fetched from the Subjects API. Holds a local draft so Cancel discards
 * and Submit commits the selected `{ id, name }` subjects (parents and/or
 * children) back to the parent form.
 */
export default function PersonalClassificationsModal({ open, value = [], onSubmit, onCancel }) {
  const [checkedKeys, setCheckedKeys] = useState(value.map((v) => v.id));
  const [search, setSearch] = useState('');

  // Reset the draft to the committed value each time the modal opens.
  useEffect(() => {
    if (open) {
      setCheckedKeys(value.map((v) => v.id));
      setSearch('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { data: subjectsResult, isLoading } = useQuery('getSubjects', { enabled: open });
  const subjects = subjectsResult?.data || [];
  const subjectsById = useMemo(() => buildSubjectIndex(subjects), [subjects]);

  const treeData = useMemo(
    () => toTreeData(filterSubjects(subjects, search)),
    [subjects, search]
  );

  const handleCheck = (checked) => {
    // `checked` is an array (checkStrictly off): checking a parent also
    // checks its children, checking every child checks the parent — either
    // way, `checked` already lists every id that should land in the payload.
    const keys = Array.isArray(checked) ? checked : checked.checked;
    setCheckedKeys(keys);
  };

  const handleSubmit = () => {
    const items = checkedKeys
      .map((id) => subjectsById.get(id))
      .filter(Boolean)
      .map(({ id, name }) => ({ id, name }));
    onSubmit(items);
  };

  return (
    <Modal
      title="Select Personal Classifications"
      open={open}
      onOk={handleSubmit}
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
        {isLoading ? (
          <Spin size="small" />
        ) : treeData.length ? (
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
            {checkedKeys.map((id) => subjectsById.get(id)?.name).filter(Boolean).join(', ')}
          </span>
        )}
      </div>
    </Modal>
  );
}
