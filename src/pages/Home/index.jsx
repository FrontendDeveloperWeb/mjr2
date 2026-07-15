import { Input, Button } from 'antd';
import { DownOutlined, SearchOutlined, LockOutlined } from '@ant-design/icons';
import HeroSection from '../../components/partials/home/HeroSection.jsx';
import ExploreResearchSection from '../../components/partials/home/ExploreResearchSection.jsx';
import ArticlesCarouselSection from '../../components/partials/home/ArticlesCarouselSection.jsx';
import OpenAccessSection from '../../components/partials/home/OpenAccessSection.jsx';
import DashboardTopBar from '../../components/layout/DashboardTopBar.jsx';
import TopBar from '../../components/shared/topbar/index.jsx';
import StatsBar from '../../components/layout/StatsBar.jsx';
import SearchPanel from '../../components/shared/SearchPanel/index.jsx';

const CATEGORIES = [
  { name: 'Chemical Engineering' },
  { name: 'Chemistry' },
  { name: 'Computer Science' },
  { name: 'Earth and Planetary Science' },
  { name: 'Energy' },
  { name: 'Engineering' },
  { name: 'Material Science' },
  { name: 'Mathematics' },
  { name: 'Physics and astronomy' },
];

const POPULAR_ARTICLES = [
  {
    id: 1,
    title: 'Artificial intelligence in healthcare: A systematic literature review',
    meta: 'Expert Systems with Applications  •  Volume 242, Part A',
    badgeType: 'open-access',
  },
  {
    id: 2,
    title: 'Artificial intelligence in healthcare: A systematic literature review',
    meta: 'Expert Systems with Applications  •  Volume 242, Part A',
    badgeType: 'research-article',
  },
];

const RECENT_PUBLICATIONS = [
  {
    id: 1,
    title: 'Quantum computing advances in 2024',
    meta: 'Physics Today  ·  Volume 77, Issue 1',
    img: '/assets/img/publication-card-1.png',
  },
  {
    id: 2,
    title: 'Sustainable Material advances in 2024',
    meta: 'Physics Today  ·  Volume 77, Issue 1',
    img: '/assets/img/publication-card-2.png',
  },
  {
    id: 3,
    title: 'Chemical Research advances in 2024',
    meta: 'Physics Today  ·  Volume 77, Issue 1',
    img: '/assets/img/publication-card-3.png',
  },
];

const CAROUSEL_ARTICLES = [
  {
    id: 1,
    title: 'New technology awarness.',
    desc: 'Ameliorative Effects of Honey on Petrol Vapor-Induced Oxidative Stress in the Reproductive System of Female Wistar Rats',
    author: 'Jane Cooper',
    date: '2nd January,2022',
    img: '/assets/img/slider-img.png',
    isActive: false,
  },
  {
    id: 2, // Center Card - Dark Variant
    title: 'New technology awarness.',
    desc: 'Ameliorative Effects of Honey on Petrol Vapor-Induced Oxidative Stress in the Reproductive System of Female Wistar Rats',
    author: 'Jane Cooper',
    date: '2nd January,2022',
    img: '/assets/img/slider-img.png',
    isActive: true,
  },
  {
    id: 3,
    title: 'New technology awarness.',
    desc: 'Ameliorative Effects of Honey on Petrol Vapor-Induced Oxidative Stress in the Reproductive System of Female Wistar Rats',
    author: 'Jane Cooper',
    date: '2nd January,2022',
    img: '/assets/img/slider-img.png',
    isActive: false,
  },
  {
    id: 4,
    title: 'New technology awarness.',
    desc: 'Ameliorative Effects of Honey on Petrol Vapor-Induced Oxidative Stress in the Reproductive System of Female Wistar Rats',
    author: 'Jane Cooper',
    date: '2nd January,2022',
    img: '/assets/img/slider-img.png',
    isActive: false,
  },
];

const INDEXING_LOGOS = [
  { name: 'Google Scholar', logo: '/assets/img/google-scholer.png', fallback: 'Google Scholar' },
  { name: 'Google Scholar', logo: '/assets/img/google-scholer.png', fallback: 'Google Scholar' },

];
const INDEXING_LOGOS2 = [
  { name: 'Google Scholar', logo: '/assets/img/google-scholer.png', fallback: 'Google Scholar' },
  { name: 'Google Scholar', logo: '/assets/img/google-scholer.png', fallback: 'Google Scholar' },
  { name: 'Google Scholar', logo: '/assets/img/google-scholer.png', fallback: 'Google Scholar' },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <ExploreResearchSection
        categories={CATEGORIES}
        popularArticles={POPULAR_ARTICLES}
        recentPublications={RECENT_PUBLICATIONS}
      /> */}
      <TopBar />
      <section className='about-journal'>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <h2>About the journal</h2>
              <p>Peer Review under the responsibility of Cairo University.</p>
              <p><span className='text-bold'>Journal of Advanced Research </span>(abbreviated as J. Adv. Res.) is an official journal of <span> XYZ University</span>. It is an applied/natural sciences, peer-reviewed journal with interdisciplinary activity. The journal aims to make significant …</p>
              <p className='txt-dec'>View full aims & scope</p>
            </div>
            <div className="col-12 col-md-4">
              <div className="about-artical-card">
                <h2>Article publishing option</h2>
                <p>Open Access
                </p>
                <p className='para-f'>Article Publishing Charge (APC): USD 4,400 (excluding taxes).</p>
                <p className='para-f'>Review <span>this journal’s open access policy.</span></p>
                <Button className='mt-3 sd-btn-submit-article'>Compare APCs for other journals</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StatsBar />



      <OpenAccessSection indexingLogos={INDEXING_LOGOS} indexingLogos2={INDEXING_LOGOS2} />
      <section className='search-panale-sec'>
        <div className="container">
          <div className="sd-search-panel">

            <div className="row">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3 className='d-flex align-items-center m-0 fs-5'>
                      President of XYZ University
                      <span className='bar ps-4'>|</span>
                      <span className='d-block ms-3 mt-1 text-muted fs-6 font-weight-normal'>
                        View full editorial board</span>
                    </h3>
                  </div>
                  <div>

                  </div>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <div className='user-avatar-img'>
                    <img src="/assets/img/khaled.png" alt="" />
                  </div>
                  <div><h2 className='ms-4'>ABC XYZ </h2></div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      <ArticlesCarouselSection articles={CAROUSEL_ARTICLES} />
      <section className="sd-oa-section-wrapper">
        <div className="sd-oa-top-banner">

          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-lg-8">
                <div className="d-flex align-items-start gap-3">
                  <div className="sd-oa-lock-icon-box">
                    <LockOutlined />
                  </div>
                  <div>
                    <h2 className="sd-oa-banner-heading">
                      <span className="sd-oa-highlight-gold">1.1 million</span> articles on XYZ are open access
                    </h2>
                    <p className="sd-oa-banner-subtext">
                      Our open access journals ensure that every published article is freely available to researchers,
                      educators, students, and the public worldwide. All manuscripts undergo a rigorous peer-review
                      process to maintain high academic standards, while authors retain greater visibility
                      and reach through unrestricted online access.
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="col-12 col-lg-12 text-lg-end mt-3 mt-lg-0 ps-lg-5 ms-4">
                <div className="d-flex flex-wrap align-items-center gap-3 mt-4">
                  <Button className="sd-oa-btn-gold">
                    View open access journals
                  </Button>
                  <a href="#publishing-choices" className="sd-oa-banner-link">
                    Read about publishing choices <ArrowRightOutlined className="ms-1" />
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
