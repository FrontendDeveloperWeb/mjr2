import { Button, Collapse } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import Layout from '../../components/layout/Layout.jsx';
import StatsBar from '../../components/layout/StatsBar.jsx';
import TopBar from '../../components/shared/TopBar/index.jsx';
import HeroSection from '../../components/partials/Home/HeroSection.jsx';
import ArticlesCarouselSection from '../../components/partials/Home/ArticlesCarouselSection.jsx';
import OpenAccessSection from '../../components/partials/Home/OpenAccessSection.jsx';
import CustomDrawer from '../../components/shared/Drawer/index.jsx';
import CustomTable from '../../components/shared/Table/index.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHomeData } from '@/hooks/queries';
import { useGlobalData } from '@/hooks/queries';

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
  // { name: 'Google Scholar', logo: '/assets/img/google-scholer.png', fallback: 'Google Scholar' },
];

// const INDEXING_LOGOS2 = [
//   { name: 'Google Scholar', logo: '/assets/img/google-scholer.png', fallback: 'Google Scholar' },
//   { name: 'Google Scholar', logo: '/assets/img/google-scholer.png', fallback: 'Google Scholar' },
//   { name: 'Google Scholar', logo: '/assets/img/google-scholer.png', fallback: 'Google Scholar' },
// ];

const columns = [
  {
    title: 'Journal Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    key: 'publisher',
  },
  {
    title: 'APC',
    dataIndex: 'apc',
    key: 'apc',
  },
  {
    title: 'Impact Factor',
    dataIndex: 'impact',
    key: 'impact',
  },
  {
    title: 'CiteScore',
    dataIndex: 'citescore',
    key: 'citescore',
  },


];
const data = [
  {
    key: '1',
    name: <> <span className='font-600'>Multidisciplinary Journal for Research (MJR) </span><p className='italic'>Open Access</p></>,
    publisher: 'Elsevier',
    apc: 'USD 4,400',
    impact: '17.1',
    citescore: '21.7',
  },

];
const items = [
  {
    key: '1',
    label: 'How this feature works',
    children: <div class="apc-info-container my-4 text-start">

      <p class="apc-text">
        <strong>Article Publishing Charges (APCs)</strong> are fees that journals charge to publish articles open access.
      </p>


      <p class="apc-text">
        The APCs used in this feature are standard list prices and do not include discounts. Actual APCs may differ based on individual author circumstances.
      </p>


      <p class="apc-text mb-2">
        This feature also includes <strong>Impact Factor</strong> and <strong>CiteScore</strong>, which are indicators of journal quality.
      </p>

      <ul class="apc-list mb-4">
        <li>
          <strong>Impact Factor</strong> measures the average number of citations received per paper published in the journal during the preceding two years.
        </li>
        <li>
          <strong>CiteScore</strong> measures the average number of citations received per paper published in the journal over a four-year period.
        </li>
      </ul>


      <p class="apc-text">
        <strong>Data source for Elsevier journals:</strong> <i class="fa-regular fa-copyright me-1"></i><a href="#" class="apc-link">Elsevier <i class="fa-solid fa-arrow-up-right-from-square fs-7"></i></a>. Data updated every weekday.
      </p>


      <p class="apc-text">
        <strong>Data source for non-Elsevier journals:</strong> <i class="fa-regular fa-copyright me-1"></i><a href="#" class="apc-link">Delta Think Inc <i class="fa-solid fa-arrow-up-right-from-square fs-7"></i></a>. Data last updated: April 2026. All rights reserved. Reused with permission.
      </p>


      <p class="apc-text mt-4">
        For further information, please <a href="#" class="apc-link">click here. <i class="fa-solid fa-arrow-up-right-from-square fs-7"></i></a>
      </p>
    </div>,
  },

];
export default function Home() {
  const { home } = useHomeData();
  console.log('home', home);
  const correspondingMember = home?.journal_editorial_board?.find(
    (member) => member.is_corresponding === 1
  );
  const user = correspondingMember?.user;



  const [open, setOpen] = useState(false);
  const [openAps, setOpenAps] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const showDrawerAps = () => {
    setOpenAps(true);
  };
  const onCloseAps = () => {
    setOpenAps(false);
  };
  const onChange = key => {
    console.log(key);
  };
  return (
    <Layout>
      <HeroSection />
      <TopBar />

      <section className='about-journal'>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <h2>About the journal</h2>
              <p>Peer Review under the responsibility of Cairo University.</p>
              <p><span className='text-bold'>{home?.title}</span> abbreviated as (MJR) is an official journal of <span> XYZ University</span>. It is an applied/natural sciences, peer-reviewed journal with interdisciplinary activity. The journal aims to make significant …</p>

              <p className='txt-dec cursor-pointer' onClick={showDrawer}>View full aims & scope</p>
            </div>
            <div className="col-12 col-md-4">
              <div className="about-artical-card">
                <h2>Article publishing option</h2>
                <p>{home?.isOpenAccess === false ? 'Subscription' : 'Open Access'}</p>
                <p className='para-f'>Article Publishing Charge (APC): {home?.currency} {home?.apc || '4,400'} (excluding taxes).</p>
                <p className='para-f'>Review <span>this journal’s open access policy.</span></p>
                <Button className='mt-3 sd-btn-submit-article' onClick={showDrawerAps}>Compare APCs for other journals</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBar />

      <OpenAccessSection indexingLogos={INDEXING_LOGOS} />

      <section className='search-panale-sec'>

        <div className="container">
          <div className="sd-search-panel">
            <div className="row">
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h3 className="d-flex align-items-center m-0 fs-5">
                      {correspondingMember?.editorial_role_name || "President of XYZ University"}
                      <span className="bar ps-4">|</span>
                      <span className="d-block ms-3 mt-1 text-muted fs-6 font-weight-normal">
                        <Link to="/about/editorial-board">View full editorial board</Link>
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="d-flex align-items-center mt-3">
                  {user?.profile_photo && (
                    <div className="user-avatar-img">

                      <img
                        src={user.profile_photo}
                        alt={user?.name || correspondingMember?.name || "Member Avatar"}
                      />

                    </div>
                  )}
                  <div>
                    <h2 className="ms-4">{user?.name || "ABC XYZ"}</h2>
                  </div>
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
            </div>
          </div>
        </div>
      </section>openAps
      <CustomDrawer
        title="Aims & Scope"
        onClose={onClose}
        open={open}
        size="560px"
      >
        <div className="aim-drawer">
          {home?.aims_scope ? (
            <div dangerouslySetInnerHTML={{ __html: home.aims_scope }} />
          ) : (
            <>
              <p>No aims and scope available.</p>
            </>
          )}
        </div>
      </CustomDrawer>
      <CustomDrawer
        title="Journals"
        onClose={onCloseAps}
        open={openAps}
        size="780px"
      >
        <div className="aps-drawer">
          <p className='first-para'>Compare article publishing charges (APCs) for other journals</p>
          <p>Add up to 5 journals (from Elsevier or other publishers) to the table below to compare with Journal of <span className='font-600'>Advanced Research.</span></p>
          <CustomTable columns={columns} data={data} className="mt-5 journal-table" />
          <Collapse items={items} defaultActiveKey={['0']} onChange={onChange} className='drawer-collapse' />
        </div>
      </CustomDrawer>
    </Layout>
  );
}
