const CONTENTS_LINKS = [
  { id: 'agri', label: 'Agricultural Sciences', active: true },
  { id: 'basic', label: 'Basic and Biological Sciences' },
  { id: 'dent', label: 'Dentistry' },
  { id: 'math', label: 'Mathematics, Engineering...' },
  { id: 'med', label: 'Medicine' },
  { id: 'pharma', label: 'Pharmaceutical Sciences' },
  { id: 'vet', label: 'Veterinary Medicine' },
];

export default function ContentsIndex() {
  return (
    <div className="sd-ae-sidebar-contents-box p-3 border rounded bg-white">
      <h6 className="sd-ae-panel-label-title mb-3">Contents</h6>
      <ul className="sd-ae-contents-index-links">
        {CONTENTS_LINKS.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} className={link.active ? 'active-item' : ''}>
              <img src="/assets/img/bar-icon.png" alt="" className="me-2" /> {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
