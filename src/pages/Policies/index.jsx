import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BankOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import Layout from '../../components/layout/Layout';
import TopBar from '../../components/shared/TopBar';

/* Two policy owners, each with its own set of documents. Kept as data so the
   markup below stays a single, tidy render loop. */
const POLICY_GROUPS = [
  {
    key: 'publisher',
    title: 'Publisher',
    subtitle: 'Journal of Advanced Research',
    icon: <BankOutlined />,
    links: [
      { label: 'Terms and Conditions', to: '/policies/terms-and-conditions?source=publisher' },
      { label: 'Privacy Policy', to: '/policies/privacy-policy?source=publisher' },
    ],
  },
  {
    key: 'aries',
    title: 'Aries',
    subtitle: 'Editorial Manager Platform',
    icon: <ApartmentOutlined />,
    links: [
      { label: 'Terms and Conditions', to: '/policies/terms-and-conditions?source=aries' },
      { label: 'Privacy Policy', to: '/policies/privacy-policy?source=aries' },
    ],
  },
];

export default function Policies() {
  const navigate = useNavigate();

  return (
    <Layout>
      <TopBar />

      <section className="pol-section">
        <div className="container">

          {/* ============ PAGE HEADER ============ */}
          <header className="pol-header text-center">
            <span className="pol-eyebrow">Legal &amp; Compliance</span>
            <h1 className="pol-title">Publisher and Aries Policies</h1>
            <p className="pol-subtitle">
              Review the terms and privacy commitments that govern the use of this
              journal and its submission platform.
            </p>
          </header>

          {/* ============ POLICY COLUMNS ============ */}
          <div className="row g-4 justify-content-center pol-grid">
            {POLICY_GROUPS.map((group) => (
              <div className="col-12 col-md-6 col-lg-5" key={group.key}>
                <div className="pol-card h-100">
                  <div className="pol-card-head">
                    <span className="pol-card-icon">{group.icon}</span>
                    <div>
                      <h2 className="pol-card-title">{group.title}</h2>
                      <span className="pol-card-subtitle">{group.subtitle}</span>
                    </div>
                  </div>

                  <ul className="pol-link-list">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className="pol-link">
                          <span className="pol-link-label">{link.label}</span>
                          <ArrowRightOutlined className="pol-link-arrow" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* ============ BACK ACTION ============ */}
          <div className="text-center pol-actions">
            <button type="button" className="pol-back-btn" onClick={() => navigate(-1)}>
              <ArrowLeftOutlined /> Back
            </button>
          </div>

        </div>
      </section>
    </Layout>
  );
}
