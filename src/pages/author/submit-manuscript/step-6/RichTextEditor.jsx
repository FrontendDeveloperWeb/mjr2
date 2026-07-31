import { useRef } from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
} from '@ant-design/icons';

// Lightweight rich-text editor: a contentEditable surface plus a formatting
// toolbar driven by document.execCommand — enough for the Title/Abstract
// formatting affordances without pulling in a heavy editor dependency.
const TOOLS = [
  { cmd: 'bold', icon: <BoldOutlined />, title: 'Bold' },
  { cmd: 'italic', icon: <ItalicOutlined />, title: 'Italic' },
  { cmd: 'underline', icon: <UnderlineOutlined />, title: 'Underline' },
  { cmd: 'strikeThrough', icon: <StrikethroughOutlined />, title: 'Strikethrough' },
  { cmd: 'superscript', label: 'x²', title: 'Superscript' },
  { cmd: 'subscript', label: 'x₂', title: 'Subscript' },
  { cmd: 'removeFormat', label: 'Tx', title: 'Remove formatting' },
];

export default function RichTextEditor({ onChange, placeholder = '', minHeight = 140 }) {
  const ref = useRef(null);

  const emit = () => {
    const el = ref.current;
    if (el) onChange?.(el.innerHTML, el.innerText);
  };

  const run = (cmd) => {
    // eslint-disable-next-line deprecation/deprecation
    document.execCommand(cmd, false, null);
    ref.current?.focus();
    emit();
  };

  return (
    <div className="am-rte">
      <div className="am-rte-toolbar">
        {TOOLS.map((t) => (
          <button
            type="button"
            key={t.cmd}
            className="am-rte-btn"
            title={t.title}
            aria-label={t.title}
            // preventDefault keeps the current selection while the button is pressed
            onMouseDown={(e) => {
              e.preventDefault();
              run(t.cmd);
            }}
          >
            {t.icon || <span className="am-rte-btn-label">{t.label}</span>}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        className="am-rte-area"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder}
        style={{ minHeight }}
        onInput={emit}
      />
    </div>
  );
}
