import { lazy } from 'react';


const Home = lazy(() => import('../pages/Home/index.jsx'));
const Journal = lazy(() => import('../pages/Journal/index.jsx'));
const LatestIssues = lazy(() => import('../pages/LatestIssues/index.jsx'));
const AimsAndScope = lazy(() => import('../pages/About/AimsAndScope/index.jsx'));
const AllIssues = lazy(() => import('../pages/AllIssues/index.jsx'));
const EditorialBoard = lazy(() => import('../pages/About/EditorialBoard/index.jsx'));
const ArticlesPress = lazy(() => import('../pages/ArticlesPress/index.jsx'));
const SpecialIssueArticleCollection = lazy(() => import('../pages/SpecialIssueArticleCollection/index.jsx'));
const JournalInsights = lazy(() => import('../pages/About/JournalInsights/index.jsx'));
const News = lazy(() => import('../pages/About/News/index.jsx'));
const LanguageEditing = lazy(() => import('../pages/LanguageEditing/index.jsx'));
const SubmitArticle = lazy(() => import('../pages/SubmitArticle/index.jsx'));
const OpenAccessOption = lazy(() => import('../pages/OpenAccessOption/index.jsx'));
const GuideAuthors = lazy(() => import('../pages/GuideAuthors/index.jsx'));
const Login = lazy(() => import('../pages/Auth/Login/index.jsx'));
const Register = lazy(() => import('../pages/Auth/Register/index.jsx'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword/index.jsx'));
const LoginHelp = lazy(() => import('../pages/Auth/loginHelp/index.jsx'));

/**
 * Route table. `meta` drives the shared page chrome that <Layout> renders
 * automatically, so individual pages never re-import the hero / stats / topbar:
 *   - hero:   'standard' renders the shared <PageHero>; pages with a bespoke
 *             hero (Home, Journal) keep it inside the page and set hero: null.
 *   - stats:  renders the shared <StatsBar> band.
 *   - topbar: renders the shared <DashboardTopBar> band. Pages whose topbar is
 *             structurally nested inside their own content (Journal, Special
 *             Issues) keep it in-page and leave this false.
 */
export const routes = [
  { path: '/', element: Home, },
  { path: '/journals-and-books', element: Journal, },
  { path: '/latest-issues', element: LatestIssues, meta: { hero: 'standard', stats: true, topbar: false } },
  { path: '/all-issues', element: AllIssues, meta: { hero: 'standard', stats: true, topbar: true } },
  { path: '/articles-press', element: ArticlesPress, meta: { hero: 'standard', stats: true, topbar: false } },
  { path: '/special-issue-article-collection', element: SpecialIssueArticleCollection, meta: { hero: 'standard', stats: true, topbar: false } },
  { path: '/about/aims-and-scope', element: AimsAndScope, meta: { hero: 'standard', stats: true, topbar: true } },
  { path: '/about/editorial-board', element: EditorialBoard, meta: { hero: 'standard', stats: true, topbar: true } },
  { path: '/about/journal-insights', element: JournalInsights, meta: { hero: 'standard', stats: true, topbar: true } },
  { path: '/news', element: News, meta: { hero: 'standard', stats: true, topbar: true } },
  { path: '/language-editing', element: LanguageEditing, meta: { hero: 'standard', stats: true, topbar: true } },
  { path: '/submit-article', element: SubmitArticle, meta: { hero: 'standard', stats: true, topbar: true } },
  { path: '/open-access-Option', element: OpenAccessOption, meta: { hero: 'standard', stats: true, topbar: true } },
  { path: '/guide-for-author', element: GuideAuthors, meta: { hero: 'standard', stats: true, topbar: true } },
  // Auth Route
  { path: '/login', element: Login, },
  { path: '/register', element: Register, },
  { path: '/forgot-password', element: ForgotPassword, },
  { path: '/login-help', element: LoginHelp, },


];



const DEFAULT_META = { hero: null, stats: false, topbar: false };

/** Resolve the layout chrome config for a given pathname. */
export function getRouteMeta(pathname) {
  return routes.find((route) => route.path === pathname)?.meta ?? DEFAULT_META;
}
