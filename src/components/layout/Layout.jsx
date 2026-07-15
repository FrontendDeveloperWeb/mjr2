import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PageHero from './PageHero.jsx';
import StatsBar from './StatsBar.jsx';
import DashboardTopBar from './DashboardTopBar.jsx';
import PageLoader from '../shared/PageLoader/PageLoader.jsx';
import { getRouteMeta } from '../../router/index.jsx';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { hero, stats, topbar } = getRouteMeta(pathname);

  return (
    <>
      <Header />
      <main id="content">
        <Suspense fallback={<PageLoader />}>
          {hero === 'standard' && <PageHero />}
          {stats && (
            <section className="stat-sec">
              <StatsBar />
            </section>
          )}
          {topbar && (
            <section>
              <div className="container">
                <DashboardTopBar />
              </div>
            </section>
          )}
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
