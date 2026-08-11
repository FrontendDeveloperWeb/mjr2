import { useEffect, useState } from 'react';
import { Modal, Input, Button, Tag, Empty, Spin } from 'antd';
import { MIN_KEYWORDS } from './registerOptions.js';
import { useQuery } from '@/hooks/reactQuery/index.js';

const { CheckableTag } = Tag;

// A keyword entry is either an existing API keyword `{ id, name }` or a
// plain string the user typed in (a new/custom keyword).
function isSameKeyword(a, b) {
  if (typeof a === 'string' || typeof b === 'string') {
    return typeof a === typeof b && a === b;
  }
  return a.id === b.id;
}

/**
 * Modal for building the Personal Keywords list. Lets the user pick from the
 * existing keywords fetched from the Keywords API and/or type new custom
 * ones. Keeps a local draft array (mixing `{ id, name }` and plain strings);
 * Submit commits the list back to the parent form.
 */
export default function PersonalKeywordsModal({ open, value = [], onSubmit, onCancel }) {
  const [keywords, setKeywords] = useState(value);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (open) {
      setKeywords(value);
      setDraft('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { data: keywordsResult, isLoading: isLoadingKeywords } = useQuery('getKeywords', {
    enabled: open,
  });
  const availableKeywords = keywordsResult?.data || [];

  const toggleExistingKeyword = (keyword) => {
    setKeywords((prev) =>
      prev.some((k) => isSameKeyword(k, keyword))
        ? prev.filter((k) => !isSameKeyword(k, keyword))
        : [...prev, keyword]
    );
  };

  const addKeyword = () => {
    const next = draft.trim();
    if (!next) return;
    // Case-insensitive de-dupe so "Golf" and "golf" don't both land.
    const exists = keywords.some((k) => (typeof k === 'string' ? k : k.name).toLowerCase() === next.toLowerCase());
    if (!exists) setKeywords((prev) => [...prev, next]);
    setDraft('');
  };

  const removeKeyword = (target) => {
    setKeywords((prev) => prev.filter((k) => !isSameKeyword(k, target)));
  };

  const remaining = Math.max(0, MIN_KEYWORDS - keywords.length);

  return (
    <Modal
      title="Edit Personal Keywords"
      open={open}
      onOk={() => onSubmit(keywords)}
      onCancel={onCancel}
      okText="Submit"
      okButtonProps={{ disabled: keywords.length < MIN_KEYWORDS, className: 'auth-primary-btn' }}
      width={560}
      className="reg-modal"
      destroyOnHidden
    >
      <p className="reg-modal-hint">
        Select from the existing keywords below, or add your own. Enter at least {MIN_KEYWORDS} keywords.
      </p>

      <div className="reg-keyword-list reg-modal-search">
        {isLoadingKeywords ? (
          <Spin size="small" />
        ) : availableKeywords.length ? (
          availableKeywords.map((kw) => (
            <CheckableTag
              key={kw.id}
              checked={keywords.some((k) => isSameKeyword(k, kw))}
              onChange={() => toggleExistingKeyword(kw)}
              className="reg-keyword-tag"
            >
              {kw.name}
            </CheckableTag>
          ))
        ) : (
          <span className="reg-selector-empty">No existing keywords found</span>
        )}
      </div>

      <div className="reg-keyword-row">
        <Input
          placeholder="New keyword"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onPressEnter={(e) => {
            e.preventDefault();
            addKeyword();
          }}
        />
        <Button className="auth-primary-btn reg-keyword-add" onClick={addKeyword}>
          Add
        </Button>
      </div>

      <div className="reg-keyword-list">
        {keywords.length ? (
          keywords.map((k) => {
            const key = typeof k === 'string' ? k : `id-${k.id}`;
            const label = typeof k === 'string' ? k : k.name;
            return (
              <Tag key={key} closable onClose={() => removeKeyword(k)} className="reg-keyword-tag">
                {label}
              </Tag>
            );
          })
        ) : (
          <Empty description="No keywords added yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>

      <div className="reg-modal-selected">
        <span className="reg-modal-selected-label">
          {keywords.length} added
          {remaining > 0 ? ` — ${remaining} more required` : ' — requirement met'}
        </span>
      </div>
    </Modal>
  );
}
