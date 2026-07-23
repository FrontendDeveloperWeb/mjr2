import Layout from '../../components/layout/Layout.jsx';
import AllIssuesArchive from '../../components/partials/AllIssues/AllIssuesArchive.jsx';
import TopBar from '../../components/shared/TopBar/index.jsx';

// Hero / StatsBar / DashboardTopBar are provided by the global <Layout>
// (see router meta). The page is a thin composition of its archive workspace.
export default function AllIssues() {

  return <Layout>
    <TopBar />
    <AllIssuesArchive />
  </Layout>;
}
