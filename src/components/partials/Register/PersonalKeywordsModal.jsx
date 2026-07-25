import { useEffect, useState } from 'react';
import { Modal, Input, Button, Tag, Empty } from 'antd';
import { MIN_KEYWORDS } from './registerOptions.js';

/**
 * Modal for building the Personal Keywords list. Keeps a local draft array;
 * Add appends a trimmed, de-duplicated keyword, tags are individually
 * removable, and Submit commits the list back to the parent form.
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

  const addKeyword = () => {
    const next = draft.trim();
    if (!next) return;
    // Case-insensitive de-dupe so "Golf" and "golf" don't both land.
    const exists = keywords.some((k) => k.toLowerCase() === next.toLowerCase());
    if (!exists) setKeywords((prev) => [...prev, next]);
    setDraft('');
  };

  const removeKeyword = (target) => {
    setKeywords((prev) => prev.filter((k) => k !== target));
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
        Add your own keywords one at a time. Enter at least {MIN_KEYWORDS} keywords.
      </p>

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
          keywords.map((k) => (
            <Tag key={k} closable onClose={() => removeKeyword(k)} className="reg-keyword-tag">
              {k}
            </Tag>
          ))
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
