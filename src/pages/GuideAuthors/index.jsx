import { ReadOutlined, FileTextOutlined } from '@ant-design/icons';
import Layout from '../../components/layout/Layout';
import TopBar from '../../components/shared/TopBar';

/* -------------------------------- Sidebar data -------------------------------- */

const SIDEBAR_GROUPS = [
  {
    title: 'Before you begin',
    active: true,
    items: [
      { label: 'Editorial policy and general information', active: true },
      { label: 'Articles types' },
      { label: 'Ethics in publishing' },
      { label: 'Ethical approval' },
      { label: 'Studies in humans and animals' },
      { label: 'Human and animal rights' },
      { label: 'Conflict of Interest (mandatory)' },
      { label: 'Declaration of generative AI in scientific writing' },
      { label: 'Submission declaration and verification' },
      { label: 'Use of inclusive language' },
      { label: 'Reporting sex- and gender-based analyses' },
      { label: 'Author contributions' },
      { label: 'Changes to authorship' },
      { label: 'Clinical trial results' },
      { label: 'Reporting clinical trials' },
      { label: 'Registration of clinical trials' },
      { label: 'Copyright' },
      { label: 'Responsible sharing' },
      { label: 'Role of the funding source' },
      { label: 'Open access' },
      { label: 'Elsevier Researcher Academy' },
      { label: 'Language' },
      { label: 'Submission' },
      { label: 'Submit your article' },
      { label: 'Suggesting reviewers' },
      { label: 'General information' },
      { label: 'Queries' },
      { label: 'Double anonymized review' },
      { label: 'Article structure' },
      { label: 'Subdivision' },
      { label: 'Material and methods (Experimental or Methodology or Patient' },
      { label: 'Results' },
      { label: 'Discussion' },
      { label: 'Conclusion(s)' },
      { label: 'Essential title page information' },
      { label: 'Abstract' },
      { label: 'Keywords' },
      { label: 'Introduction' },
      { label: 'Acknowledgements' },
      { label: '(Nomenclature and ) Units' },
      { label: 'Illustrations' },
      { label: 'Color Artwork' },
      { label: 'Tables' },
      { label: 'References' },
      { label: 'Web References' },
      { label: 'Preprint references' },
      { label: 'Research data' },
      { label: 'Data linking' },
      { label: 'Submission Checklist' },
    ],
  },
  {
    title: 'After acceptance',
    items: [
      { label: 'Availability of accepted article' },
      { label: 'Proofs' },
      { label: 'Offprints' },
      { label: 'Additional information' },
    ],
  },
  {
    title: 'Author inquiries',
    items: [{ label: 'Author Inquiries' }],
  },
];

/* -------------------------------- Helpers -------------------------------- */

const SectionHeading = ({ children }) => (
  <div className="ga-section-heading d-flex align-items-center gap-2">
    <span className="ga-heading-icon">
      <FileTextOutlined />
    </span>
    <h2 className="ga-h2 m-0">{children}</h2>
  </div>
);

/* -------------------------------- Page -------------------------------- */

const GuideAuthors = () => {
  return (
    <Layout>
      <TopBar />
      <section className="ga-root mt-5">
        <div className="container gx-0">
          <div className="row  g-lg-5">

            {/* ===================== LEFT SIDEBAR ===================== */}
            <aside className="col-12 col-lg-3">
              <div className="ga-sidebar">
                {/* Dark title card */}
                <div className="ga-side-title">
                  <span className="ga-side-title-icon">
                    <ReadOutlined />
                  </span>
                  Guide for authors
                </div>

                {/* Grouped navigation */}
                {SIDEBAR_GROUPS.map((group, gi) => (
                  <div className="ga-side-group" key={gi}>
                    <div
                      className={`ga-side-group-head ${group.active ? 'ga-side-group-active' : ''}`}
                    >
                      <FileTextOutlined className="ga-side-group-icon" />
                      <span>{group.title}</span>
                    </div>
                    <ul className="ga-side-list list-unstyled m-0">
                      {group.items.map((item, ii) => (
                        <li
                          key={ii}
                          className={`ga-side-item ${item.active ? 'ga-side-item-active' : ''}`}
                        >
                          <span className="ga-bullet" aria-hidden="true" />
                          <span className="ga-side-item-label">{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

            {/* ===================== MAIN CONTENT ===================== */}
            <main className="col-12 col-lg-9">
              <div className="ga-content">

                {/* ---------------- Before you begin ---------------- */}
                <SectionHeading>Before you begin</SectionHeading>

                <h3 className="ga-h3">Editorial policy and general information</h3>
                <p className="ga-p">
                  The Journal of Advanced Research (JAR) publishes original articles in the fields
                  of the basic sciences, applied sciences and technology, biomedical sciences, and
                  related disciplines. JAR seeks to publish high-quality papers that: 1) describe
                  significant and novel findings; and 2) advanced knowledge in a diversity of
                  scientific fields in the form of original articles, short communications, reviews,
                  case reports, or letters to the editor.
                </p>

                <h3 className="ga-h3">Review process</h3>
                <p className="ga-p">
                  Manuscripts are evaluated on the basis that they present new insight into the
                  investigated topic and are likely to contribute to research progress or a change
                  in clinical practice. It is understood that all authors listed on a manuscript
                  have agreed to its submission. The signature of the corresponding author on the
                  letter of submission signifies that these conditions have been fulfilled. Received
                  manuscripts will initially be examined by the JAR editorial office and those deemed
                  to have insufficient grounds for publication may be rejected without external
                  evaluation. Manuscripts not prepared in the advised style described below will be
                  sent back to authors for correction. The authors will be notified when once the
                  manuscript has been assigned to an Editor. The assigned manuscripts will be sent to
                  2-4 independent experts for scientific evaluation. The evaluation process commonly
                  takes an average of 1-3 months. Editors are not involved in decisions about papers
                  which they have written themselves or have been written by family members or
                  colleagues or which relate to products or services in which the editor has an
                  interest. Any such submission is subject to all of the journal's usual procedures,
                  with peer review handled independently of the relevant editor and their research
                  groups.
                </p>

                <h3 className="ga-h3">Permissions</h3>
                <p className="ga-p">
                  Authors wishing to include figures, tables, or text that have already been
                  published elsewhere are required to obtain permission from the copyright owner(s)
                  for both the print and online format and to include evidence that such permission
                  has been granted when submitting their papers. Any received material lacking such
                  evidence will be assumed to originate from the authors.
                </p>

                <h3 className="ga-h3">Disclaimer</h3>
                <p className="ga-p">
                  Every effort is made by the publisher and editorial board to ensure that no
                  inaccurate or misleading data or statements appear in the Journal of Advanced
                  Research. However, they wish to make it clear that the data and opinions appearing
                  in the articles herein are the responsibility of the authors concerned.
                  Accordingly, the publisher and the editorial board accept no liability whatsoever
                  for the consequences of any inaccurate or misleading data or statements,
                  intentional or not.
                </p>

                <h3 className="ga-h3">Articles types</h3>
                <p className="ga-p">
                  JAR seeks to publish experimental and theoretical research results of outstanding
                  significance in the form of original articles, short communications and reviews.
                </p>
                <ol className="ga-ol">
                  <li>
                    <strong>Original articles:</strong> Articles which represent in-depth research
                    in various scientific disciplines.
                  </li>
                  <li>
                    <strong>Review articles:</strong> Should normally comprise less than 10,000
                    words; contain structured abstract and includes up-to-date references.
                    Meta-analyses are considered as reviews. Special attention will be paid to the
                    teaching value of review papers.
                  </li>
                </ol>

                {/* ---------------- Ethics in publishing ---------------- */}
                <SectionHeading>Ethics in publishing</SectionHeading>
                <p className="ga-p ga-p-lead">
                  Please see our information on{' '}
                  <a href="#ethics" className="ga-link">Ethics in publishing</a>.
                </p>

                <h3 className="ga-h3">Ethical approval</h3>
                <p className="ga-p">
                  Studies on patients or volunteers require Ethics Committee and/or Independent
                  Review Board (IRB) approval, and, where relevant, the patients' written informed
                  consent, which should be documented in the Methods section of the paper with the
                  approval number. If such a study was not approved by the appropriate Ethics
                  Committee or IRB, a statement as to why it was exempted should be included. The
                  Editors reserve the right to refuse publications where the required ethical
                  approval/patient consent is lacking.
                </p>

                <h3 className="ga-h3">Studies in humans and animals</h3>
                <p className="ga-p">
                  If the work involves the use of human subjects, the author should ensure that the
                  work described has been carried out in accordance with{' '}
                  <a href="#wma" className="ga-link">
                    The Code of Ethics of the World Medical Association
                  </a>{' '}
                  (Declaration of Helsinki) for experiments involving humans. The manuscript should
                  be in line with the{' '}
                  <a href="#recommendations" className="ga-link">
                    Recommendations for the Conduct, Reporting, Editing and Publication of Scholarly
                    Work in Medical Journals
                  </a>{' '}
                  and aim for the inclusion of representative human populations (sex, age and
                  ethnicity) as per those recommendations. The terms{' '}
                  <a href="#sex-gender" className="ga-link">sex and gender</a> should be used
                  correctly.
                </p>
                <p className="ga-p">
                  The author should ensure that the manuscript contains a statement that all
                  procedures were performed in compliance with relevant laws and institutional
                  guidelines and have been approved by the appropriate institutional committee(s).
                  This statement should contain the date and reference number of the ethical
                  approval(s) obtained. Authors should also include a statement in the manuscript
                  that informed consent was obtained for experimentation with human subjects. The
                  privacy rights of human subjects must always be observed.
                </p>
                <p className="ga-p">
                  The journal will not accept manuscripts that contain data derived from unethically
                  sourced organs or tissue, including from executed prisoners or prisoners of
                  conscience, consistent with recommendations from{' '}
                  <a href="#grc" className="ga-link">
                    Global Rights Compliance on Mitigating Human Rights Risks in Transplantation
                    Medicine
                  </a>. For all studies that use human organs or tissues authors must provide
                  sufficient evidence that they were procured in line with{' '}
                  <a href="#who" className="ga-link">
                    WHO Guiding Principles on Human Cell, Tissue and Organ Transplantation
                  </a>. The source of the organs or tissues used in clinical research must be
                  transparent and traceable. Authors of manuscripts describing organ transplantation
                  must additionally declare within the manuscript:
                </p>
                <ol className="ga-ol ga-ol-alpha">
                  <li>
                    that autonomous consent free from coercion was obtained from the donor(s) or
                    their next of kin; and
                  </li>
                  <li>
                    that organs/tissues were not sourced from executed prisoners or prisoners of
                    conscience.
                  </li>
                </ol>
                <p className="ga-p">
                  All animal experiments should comply with the{' '}
                  <a href="#arrive" className="ga-link">ARRIVE guidelines</a> and should be carried
                  out in accordance with the U.K. Animals (Scientific Procedures) Act, 1986 and
                  associated guidelines,{' '}
                  <a href="#eu" className="ga-link">EU Directive 2010/63/EU for animal experiments</a>,
                  or the National Research Council's{' '}
                  <a href="#guide" className="ga-link">
                    Guide for the Care and Use of Laboratory Animals
                  </a>{' '}
                  and the authors should clearly indicate in the manuscript that such guidelines have
                  been followed. The sex of animals must be indicated, and where appropriate, the
                  influence (or association) of sex on the results of the study.
                </p>

                {/* ---------------- Human and animal rights ---------------- */}
                <SectionHeading>Human and animal rights</SectionHeading>
                <p className="ga-p">
                  The JAR editors endorse the principles embodied in the revised Declaration of
                  Helsinki (2008) (59th WMA General Assembly, Seoul, Republic of Korea, October 2008)
                  and expect that all investigations involving humans would have been performed in
                  accordance with these principles. For animal experimentation, it is expected that
                  investigators have abided by the Interdisciplinary Principles and Guidelines for
                  the Use of Animals in Research, Testing, and Education issued by the New York
                  Academy of Sciences Adhoc Committee on Animal Research. All human and animal
                  studies must have been approved by the investigator's Institutional review board.
                </p>
                <p className="ga-p ga-p-link-row">
                  For studies involving human subjects, download the letter form from{' '}
                  <a href="#letter-human" className="ga-link">here</a>
                </p>
                <p className="ga-p ga-p-link-row">
                  For studies involving animals (fisheries), download the letter form from{' '}
                  <a href="#letter-animal" className="ga-link">here</a>
                </p>
                <p className="ga-p ga-p-link-row">
                  For studies that do not involve human or animal subjects (Basic sciences), download
                  the letter form from <a href="#letter-basic" className="ga-link">here</a>
                </p>

                {/* ---------------- Conflict of Interest ---------------- */}
                <SectionHeading>Conflict of Interest (mandatory)</SectionHeading>
                <p className="ga-p">
                  A conflict of interest may exist when an author or the author's institution has
                  financial or other affiliations with people or organizations that may
                  inappropriately influence the author's work. A conflict can be actual or potential
                  and full disclosure to the journal is the safest course. All submissions to the
                  journal must include disclosure of any relationships that could be viewed as
                  potential conflicts of interest. The journal may use such information as a basis
                  for editorial decisions and may publish such disclosures if they are believed to be
                  important to readers in judging the manuscript. This declaration (with the heading
                  "Conflict of interests") should be uploaded among the files submitted to Editorial
                  Manager. Additional information regarding conflicts of interest can be found at{' '}
                  <a href="http://www.wame.org/conflict-of-interest-editorialref1" className="ga-link">
                    http://www.wame.org/conflict-of-interest-editorialref1
                  </a>. Download the statement from <a href="#coi" className="ga-link">here</a>
                </p>




              </div>
              {/* ---------------- Pagination ---------------- */}

            </main>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GuideAuthors;
