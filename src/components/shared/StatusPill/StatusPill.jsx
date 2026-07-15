import { BookOutlined } from '@ant-design/icons';


const VARIANTS = {
  'open-access': {
    colorClass: 'oa-color',
    icon: <img src="/assets/img/unlock-borderless.png" alt="" className="me-1" />,
    label: 'Open Access',
  },
  research: {
    colorClass: 'ra-color',
    icon: <BookOutlined className="me-1" />,
    label: 'Research Articles',
  },
};

export default function StatusPill({ variant = 'research', label, className = '' }) {
  const preset = VARIANTS[variant] ?? VARIANTS.research;
  const classes = ['sd-badge-pill-status', preset.colorClass, className].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {preset.icon}{label ?? preset.label}
    </span>
  );
}
