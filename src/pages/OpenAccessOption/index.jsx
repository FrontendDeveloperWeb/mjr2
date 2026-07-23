import {
  FileTextOutlined,
  SafetyCertificateOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import Layout from '../../components/layout/Layout';
import TopBar from '../../components/shared/TopBar';


/* --------------------------------- Data --------------------------------- */

const SIDEBAR_GROUPS = [
  {
    title: 'Open Access information',
    active: true,
    items: [{ label: 'Introduction', active: true }],
  },
  {
    title: 'Open Access information',
    items: [
      { label: 'User rights' },
      { label: 'Creative Commons Attribution (CC BY)' },
      { label: 'Creative Commons Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)' },
    ],
  },
  {
    title: 'Article Publishing Charge(APC)',
    items: [
      { label: 'Research4Life' },
      { label: 'Best price promise' },
      { label: 'Open access agreements' },
      { label: 'Funding arrangements' },
      { label: 'Open access agreements' },
      { label: 'Responsible sharing' },
      { label: 'Open access agreements' },
    ],
  },
  {
    title: 'Author Resources and Support',
    items: [{ label: 'Learn more about' }, { label: 'Contact details' }],
  },
];

const RESOURCE_CARDS = [
  'Benefits of publishing open access with Elsevier',
  'Open access agreements',
  'Funding arrangements',
  'Open access license policy',
  'Open access pricing policy',
];

/* ------------------------------- Helpers -------------------------------- */

const SectionHeading = ({ icon, children }) => (
  <div className="oao-section-heading d-flex align-items-center gap-2 mb-3">
    <span className="oao-heading-icon">{icon}</span>
    <h2 className="oao-h2 m-0">{children}</h2>
  </div>
);

/* --------------------------------- Page --------------------------------- */

const OpenAccessOption = () => {
  return (
    <Layout>
      <TopBar />
      <section className="oao-root mt-5">
        <div className="container py-4 py-lg-5">
          <div className="row g-4 g-lg-5">

            {/* ===================== LEFT SIDEBAR ===================== */}
            <aside className="col-12 col-lg-3">
              <div className="oao-sidebar">
                {SIDEBAR_GROUPS.map((group, gi) => (
                  <div
                    key={gi}
                    className={`oao-side-card ${group.active ? 'oao-side-card-active' : ''}`}
                  >
                    <div className="oao-side-card-head">{group.title}</div>
                    <ul className="oao-side-list list-unstyled m-0">
                      {group.items.map((item, ii) => (
                        <li
                          key={ii}
                          className={`oao-side-item ${item.active ? 'oao-side-item-active' : ''}`}
                        >
                          {item.active ? (
                            <span className="oao-radio" aria-hidden="true" />
                          ) : (
                            <span className="oao-bullet" aria-hidden="true" />
                          )}
                          <span className="oao-side-item-label">{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

            {/* ===================== MAIN CONTENT ===================== */}
            <main className="col-12 col-lg-9">
              <div className="oao-content">

                {/* Title with trailing rule */}
                <div className="oao-title-row d-flex align-items-center gap-3 mb-4">
                  <h1 className="oao-h1 m-0">Open access options</h1>
                  <span className="oao-title-rule flex-grow-1" />
                </div>

                {/* Introduction */}
                <SectionHeading icon={<FileTextOutlined />}>Introduction</SectionHeading>
                <div className="oao-note-box mb-4">
                  Journal of Advanced Research is a peer reviewed, open access journal.
                </div>

                {/* Open Access Licences */}
                <SectionHeading icon={<SafetyCertificateOutlined />}>
                  Open Access Licences
                </SectionHeading>

                <h3 className="oao-h3">User rights</h3>
                <p className="oao-p">
                  All articles published open access will be immediately and permanently free for
                  everyone to read and download, copy and distribute. We offer authors a choice of{' '}
                  <a href="#user-licenses" className="oao-link">user licenses</a>, which define the
                  permitted reuse of articles. We currently offer the following license(s) for this
                  journal:
                </p>

                <h3 className="oao-h3">Creative Commons Attribution (CC BY)</h3>
                <p className="oao-p">
                  Allows users to: distribute and copy the article; create extracts, abstracts, and
                  other revised versions, adaptations or derivative works of or from an article (such
                  as a translation); include in a collective work (such as an anthology); and text or
                  data mine the article. These uses are permitted even for commercial purposes,
                  provided the user: gives appropriate credit to the author(s) (with a link to the
                  formal publication through the relevant DOI); includes a link to the license;
                  indicates if changes were made; and does not represent the author(s) as endorsing
                  the adaptation of the article or modify the article in such a way as to damage the
                  authors' honor or reputation.
                </p>

                <h3 className="oao-h3">
                  Creative Commons Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)
                </h3>
                <p className="oao-p">
                  Allows users to: distribute and copy the article, and include in a collective work
                  (such as an anthology). These uses are permitted only for non-commercial purposes,
                  and provided the user: gives appropriate credit to the author(s) (with a link to the
                  formal publication through the relevant DOI); provides a link to the license; and
                  does not alter or modify the article.
                </p>

                <p className="oao-p">
                  If you need to comply with your funding body policy you can apply for a CC BY license
                  after your manuscript is accepted for publication.
                </p>

                <h3 className="oao-h3">Article Publishing Charge (APC)</h3>
                <p className="oao-p">
                  As an open access journal with no subscription charges, a fee (Article Publishing
                  Charge, APC) is payable by the authors, or their institution or funders, to cover the
                  costs associated with publication. This ensures your article will be immediately and
                  permanently free to access by everyone.
                </p>

                {/* APC table */}
                <SectionHeading icon={<FileTextOutlined />}>
                  The Article Publishing Charge for this journal is:
                </SectionHeading>
                <div className="table-responsive mb-4">
                  <table className="oao-table">
                    <thead>
                      <tr>
                        <th>Article type</th>
                        <th>Article Publishing Charge (excl. taxes)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>All articles</td>
                        <td>USD 4400</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Policies */}
                <SectionHeading icon={<SafetyCertificateOutlined />}>Policies</SectionHeading>

                <h3 className="oao-h3">Research4Life</h3>
                <p className="oao-p">
                  We automatically apply Article Publishing Charge waivers or discounts to those
                  articles in open access journals for which all authors are based in a country
                  eligible for the Research4Life program. Find out more about the{' '}
                  <a href="#waiver" className="oao-link">APC waiver and discount eligibility</a>.
                </p>

                <h3 className="oao-h3">Best price promise</h3>
                <p className="oao-p">
                  Our Online Author Communication System (OACS) ensures you are offered the{' '}
                  <a href="#lowest-price" className="oao-link">lowest possible Article Publishing Charge</a>{' '}
                  to publish an article in your chosen journal. During submission you will be presented
                  with a personalized OA Article Publishing Charge based on your individual context
                  (your country, institutional affiliation, and any society membership for example) as
                  well as considering the journal involved.
                </p>
                <p className="oao-p">
                  <strong>Learn more about</strong>{' '}
                  <a href="#pricing-policy" className="oao-link">Elsevier's pricing policy.</a>
                </p>

                <h3 className="oao-h3">Open access agreements</h3>
                <p className="oao-p">
                  Elsevier has reached open access agreements with an increasing number of institutions
                  and university consortia around the world. Find out what this means for authors on our{' '}
                  <a href="#agreements" className="oao-link">open access agreements</a> page.
                </p>

                <h3 className="oao-h3">Funding arrangements</h3>
                <p className="oao-p">
                  Elsevier partners with funding bodies to provide guidance for authors on how to comply
                  with funding body open access policies. Find out more on our{' '}
                  <a href="#funding" className="oao-link">funding arrangements</a> page.
                </p>

                <h3 className="oao-h3">Responsible sharing</h3>
                <p className="oao-p">
                  Find out how you can <a href="#share" className="oao-link">share your research</a>{' '}
                  published in Elsevier journals.
                </p>

                {/* Author Resources and Support */}
                <h2 className="oao-h2 oao-h2-plain mt-5 mb-2">Author Resources and Support</h2>
                <p className="oao-muted mb-4">Learn more about</p>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                  {RESOURCE_CARDS.map((title, i) => (
                    <div className="col" key={i}>
                      <div className="oao-resource-card h-100 d-flex flex-column align-items-center text-center">
                        <span className="oao-resource-icon">
                          <ReadOutlined />
                        </span>
                        <p className="oao-resource-title">{title}</p>
                        <span className="oao-resource-rule" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact details */}
                <h3 className="oao-h3 mt-5">Contact details</h3>
                <p className="oao-p mb-0">
                  Frequently asked questions and answers are available in the{' '}
                  <a href="#support" className="oao-link">Journal Article Publishing Support Centre</a>.
                  If you have any further questions, you can also chat with an agent using the chat box
                  available on the site.
                </p>

              </div>
            </main>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OpenAccessOption;
