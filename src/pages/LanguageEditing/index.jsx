import { Select } from 'antd';
import {
    EditOutlined,
    TranslationOutlined,
    BlockOutlined,
    ReadOutlined,
    TeamOutlined,
    AppstoreOutlined,
    SafetyCertificateOutlined,
    SafetyOutlined,
    CarOutlined,
    CheckCircleOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons';

/* ----------------------------- Static data ----------------------------- */

const WORD_COUNT_OPTIONS = [
    { value: '0-500', label: '0-500' },
    { value: '501-1000', label: '501-1000' },
    { value: '1001-2000', label: '1001-2000' },
    { value: '2001-3000', label: '2001-3000' },
    { value: '3001-5000', label: '3001-5000' },
];

const NAV_TABS = [
    { key: 'language-editing', label: 'Language Editing', icon: <img src="/assets/img/language-pen.png" alt="" />, active: true },
    { key: 'translation', label: 'Translation', icon: <img src="/assets/img/translation-icon.png" alt="" /> },
    { key: 'latex', label: 'LaTeX', icon: <img src="/assets/img/latex-icon.png" alt="" /> },
    { key: 'phd-thesis', label: 'PhD Thesis', icon: <img src="/assets/img/light-pen.png" alt="" /> },
    { key: 'group-deals', label: 'Group Deals', icon: <img src="/assets/img/light-pen.png" alt="" /> },
];

const PLANS = [
    {
        key: 'standard',
        icon: <SafetyCertificateOutlined />,
        title: 'Standard',
        subtitle: 'Ensure that your work is written in correct English before submission.',
        tagline: null,
        badge: '4-25 business days',
        price: '$95',
        cta: 'Online Standard Service',
        ctaVariant: 'outline',
    },
    {
        key: 'express',
        icon: <AppstoreOutlined />,
        title: 'Express',
        subtitle: 'Get the same quality as Standard, but faster!',
        tagline: 'High-speed turnaround',
        badge: '1-4 business days',
        price: '$170',
        cta: 'Online Express Service',
        ctaVariant: 'solid',
    },
    {
        key: 'plus',
        icon: <AppstoreOutlined />,
        title: 'Plus',
        subtitle: 'Improve the flow and writing of your paper and get unlimited editing support.',
        tagline: 'Valid for 12 months',
        badge: '2-22 business days',
        price: '$204',
        cta: 'Online Plus Service',
        ctaVariant: 'outline',
    },
];

const TRUST_BADGES = [
    {
        icon: <img src="/assets/img/delivery-1.png" alt="" />,
        title: 'Timely Delivery',
        desc: 'On-time delivery to meet your deadlines',
    },
    {
        icon: <img src="/assets/img/security-1.png" alt="" />,
        title: 'Secure & Confidential',
        desc: 'Your documents are safe with us.',
    },
    {
        icon: <img src="/assets/img/security-1.png" alt="" />,
        title: 'Expert Editors',
        desc: 'Native English Speaking Editors with Expertise',
    },
    {
        icon: <img src="/assets/img/security-1.png" alt="" />,
        title: 'Quality Guaranteed',
        desc: 'High-quality editing to improve your chances of acceptance',
    },
];

// Comparison matrix: [standard, express, plus] booleans per feature.
const COMPARISON_ROWS = [
    { feature: 'Detailed language check: spelling, grammar, sentence structures and terminology', cells: [true, true, true] },
    { feature: 'Free re-edit or money back in case of rejection based on language', cells: [true, true, true] },
    { feature: 'High-speed turnaround', cells: [true, true, true] },
    { feature: 'Free re-editing support for 12 months', cells: [false, true, true] },
    { feature: 'Focus on logic, structure and the flow of content', cells: [false, false, true] },
    { feature: 'Manuscript formatting as per journal requirements', cells: [false, false, true] },
    { feature: 'References are edited', cells: [false, false, true] },
    { feature: 'Reference check for consistency, completeness and structure', cells: [false, false, true] },
    { feature: 'Cover Letter customized for journal submission', cells: [false, false, true] },
    { feature: 'Assessment report with feedback on paper language and structure', cells: [false, false, true] },
    { feature: 'Word count reduction of up to 20%', cells: [false, false, true] },
];

const COMPARISON_COLS = [
    { title: 'Standard', badge: '4-25 business days', price: '$95', cta: 'Online Standard Service' },
    { title: 'Express', badge: '1-4 business days', price: '$170', cta: 'Online Express Service' },
    { title: 'Plus', badge: '2-22 business days', price: '$204', cta: 'Online Plus Service' },
];

/* ----------------------------- Small helpers ----------------------------- */

const StatusMark = ({ ok }) =>
    ok ? (
        <span className="le-mark le-mark-yes" aria-label="Included">
            <CheckOutlined />
        </span>
    ) : (
        <span className="le-mark le-mark-no" aria-label="Not included">
            <CloseOutlined />
        </span>
    );

/* ----------------------------- Page ----------------------------- */

const LanguageEditing = () => {
    return (
        <section className="le-root">
            <div className="container py-4 py-lg-5">

                {/* ============ SECTION 1: HEADER BANNER ============ */}
                <div className="le-banner d-flex flex-column flex-lg-row justify-content-between align-items-center gap-4 ">
                    <div className="le-banner-text">
                        <h1 className="le-banner-title mb-3">Why Elsevier Language Editing services?</h1>
                        <p className="le-banner-desc mb-0">
                            Getting your manuscript accepted in any journal is challenging. The quality of your
                            writing is important to accurately convey your research. Our Editors have extensive
                            background and expertise in research and editing and will help you increase your
                            chances of being published.
                        </p>
                    </div>
                    <div className="le-banner-illustration flex-shrink-0" aria-hidden="true">
                        <svg viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg" role="img">
                            <ellipse cx="120" cy="150" rx="95" ry="16" fill="#cfe0e6" opacity="0.6" />
                            <circle cx="150" cy="55" r="42" fill="#cfe0e6" opacity="0.7" />
                            {/* Document sheet */}
                            <rect x="118" y="26" width="70" height="86" rx="6" fill="#fdfaf5" stroke="#e4dccb" />
                            <line x1="130" y1="44" x2="176" y2="44" stroke="#d7ccb8" strokeWidth="3" strokeLinecap="round" />
                            <line x1="130" y1="56" x2="176" y2="56" stroke="#d7ccb8" strokeWidth="3" strokeLinecap="round" />
                            <line x1="130" y1="68" x2="164" y2="68" stroke="#d7ccb8" strokeWidth="3" strokeLinecap="round" />
                            {/* Giant pencil */}
                            <g transform="rotate(38 96 96)">
                                <rect x="70" y="86" width="88" height="20" rx="4" fill="#c8a27c" />
                                <rect x="150" y="86" width="16" height="20" fill="#3C4D4B" />
                                <polygon points="70,86 70,106 52,96" fill="#f0e3cf" />
                                <polygon points="59,92 59,100 52,96" fill="#3C4D4B" />
                            </g>
                            {/* Person */}
                            <circle cx="70" cy="70" r="15" fill="#3C4D4B" />
                            <path d="M44 138c0-20 12-34 26-34s26 14 26 34z" fill="#3C4D4B" />
                            <path d="M96 104c8 6 18 10 26 8" stroke="#f0b8a0" strokeWidth="8" strokeLinecap="round" fill="none" />
                        </svg>
                    </div>
                </div>

                {/* ============ SECTION 2: NAV TAB BAR ============ */}
                <nav className="le-tabs mt-4 mt-lg-5">
                    <ul className="le-tabs-list list-unstyled d-flex flex-wrap m-0">
                        {NAV_TABS.map((tab) => (
                            <li key={tab.key} className={`le-tab ${tab.active ? 'le-tab-active' : ''}`}>
                                <span className="le-tab-icon">{tab.icon}</span>
                                <span className="le-tab-label">{tab.label}</span>
                            </li>
                        ))}
                    </ul>
                </nav>

                <p className="le-intro-text mt-5 mb-3">
                    For more than 140 years, Elsevier has supported the work of researchers. Opt for a
                    high-standard language editing service to simplify your academic writing. Tailor the
                    service to your specific needs by specifying the desired type of service and delivery time.
                </p>

                {/* ============ SECTION 3: PRICING CARDS ============ */}
                <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
                    {PLANS.map((plan) => (
                        <div className="col" key={plan.key}>
                            <div className="le-plan-card h-100 d-flex flex-column p-4">
                                <div className="d-flex align-items-start gap-3 mb-3">
                                    <span className="le-plan-icon flex-shrink-0">{plan.icon}</span>
                                    <div>
                                        <h3 className="le-plan-title mb-1">{plan.title}</h3>
                                        <p className="le-plan-subtitle mb-0">{plan.subtitle}</p>
                                    </div>
                                </div>

                                {plan.tagline && (
                                    <div className="le-plan-tagline mb-2">
                                        <span className="le-dot" />
                                        {plan.tagline}
                                    </div>
                                )}

                                <div className="le-plan-badge mb-4">{plan.badge}</div>

                                <div className="le-plan-calc mt-auto">
                                    <span className="le-plan-calc-label">Price calculator</span>
                                    <Select
                                        className="le-select w-100 mt-2"
                                        defaultValue={WORD_COUNT_OPTIONS[0].value}
                                        options={WORD_COUNT_OPTIONS}
                                        aria-label={`${plan.title} word count`}
                                    />
                                </div>

                                <div className="text-center mt-4">
                                    <span className="le-plan-starting d-block">Starting From</span>
                                    <span className="le-plan-price d-block">{plan.price}</span>
                                </div>

                                <button
                                    type="button"
                                    className={`le-plan-cta mt-3 ${plan.ctaVariant === 'solid' ? 'le-plan-cta-solid' : 'le-plan-cta-outline'
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ============ SECTION 4: TRUST BADGE FOOTER ROW ============ */}
                <div className="le-trust-banner mt-5 p-4">
                    <div className="row align-items-center">
                        {TRUST_BADGES.map((item) => (
                            <div className="col" key={item.title}>
                                <div className="d-flex align-items-start gap-3">
                                    <span className="le-trust-icon flex-shrink-0">{item.icon}</span>
                                    <div>
                                        <h4 className="le-trust-title mb-1">{item.title}</h4>
                                        <p className="le-trust-desc mb-0">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ============ SECTION 5: COMPARISON TABLE ============ */}
                <div className="table-responsive mt-5">
                    <table className="le-compare-table">
                        <thead>
                            <tr>
                                <th className="le-compare-corner" />
                                {COMPARISON_COLS.map((col) => (
                                    <th key={col.title} className="le-compare-head text-center">
                                        <span className="le-compare-head-title d-block">{col.title}</span>
                                        <span className="le-compare-head-badge">{col.badge}</span>
                                        <span className="le-compare-head-starting d-block">Starting From</span>
                                        <span className="le-compare-head-price d-block">{col.price}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON_ROWS.map((row) => (
                                <tr key={row.feature}>
                                    <td className="le-compare-feature">{row.feature}</td>
                                    {row.cells.map((ok, i) => (
                                        <td key={i} className="text-center">
                                            <StatusMark ok={ok} />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="le-compare-corner" />
                                {COMPARISON_COLS.map((col) => (
                                    <td key={col.title} className="text-center py-4">
                                        <button type="button" className="le-plan-cta le-plan-cta-footer">
                                            {col.cta}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* ============ SECTION 6: QUALITY GUARANTEE BANNER ============ */}
                <div className="le-guarantee-banner d-flex flex-column flex-md-row align-items-center gap-4 gap-md-5 p-4 p-lg-5 mt-5">
                    <div className="le-guarantee-seal flex-shrink-0 d-flex flex-column align-items-center justify-content-center text-center">
                        <img src="/assets/img/exclusive-img.png" alt="" />
                    </div>
                    <div className="le-guarantee-divider" />
                    <p className="le-guarantee-text mb-0">
                        No matter what service you choose, Elsevier Author services are always guaranteed. If your manuscript is rejected due to an English proofreading issue, we will re-edit your paper for free or give you a full refund.
                    </p>
                </div>

                {/* ============ SECTION 7: WHY ELSEVIER EDITING SERVICES ============ */}
                <div className="row align-items-center g-4 g-lg-5 mt-4 mt-lg-5">
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        <h2 className="le-why-title mb-3">Why Elsevier Editing Services?</h2>
                        <p className="le-why-text">
                            Once you finish your manuscript, it is helpful to have it reviewed by an
                            expert in your field whose first language is English. This will increase
                            your chances to get published.
                        </p>
                        <p className="le-why-text">
                            Language-edited papers are published more often, have a higher FWCI, and
                            are published with Elsevier more often than regular papers.*
                        </p>
                        <p className="le-why-text">
                            With over 140 years of professional publishing experience, Elsevier is a
                            trusted authority in the industry. We understand the standards upheld by
                            reputable journals. Our language editing service comes with a quality
                            guarantee, ensuring that your manuscript will meet the highest standards.
                        </p>
                        <p className="le-why-source mb-0">* (Source: Elsevier internal data)</p>
                    </div>
                    <div className="col-12 col-lg-5 offset-lg-1 order-1 order-lg-2">
                        <img
                            className="le-why-img w-100"
                            src="/assets/img/service-img.png"
                            alt="Language editing expert reviewing a manuscript on a laptop"
                        />
                    </div>
                </div>

            </div>

            {/* ============ SECTION 8: NEED SOMETHING DIFFERENT (full-bleed) ============ */}
            <div className="le-need-band mt-5">
                <div className="container">
                    <h2 className="le-need-title text-center mb-4 mb-lg-5">Need something different?</h2>
                    <div className="row g-4 g-lg-0">
                        <div className="col-12 col-md-6 le-need-col">
                            <h3 className="le-need-heading mb-2">Language Editing PhD Thesis</h3>
                            <p className="le-need-desc mb-3">
                                Our experts will improve the language of your PhD Thesis helping you
                                reach the highest academic standards.
                            </p>
                            <a href="#" className="le-need-link">Find our more</a>
                        </div>
                        <div className="col-12 col-md-6 le-need-col le-need-col-right">
                            <h3 className="le-need-heading mb-2">Language Editing LaTeX</h3>
                            <p className="le-need-desc mb-3">
                                Make sure your LaTeX manuscript is written in correct English before
                                you submit.
                            </p>
                            <a href="#" className="le-need-link">Find our more</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LanguageEditing;
