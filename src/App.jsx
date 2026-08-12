import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import { routes } from './router/index.jsx';
import { useScrollToTop } from './hooks/useScrollToTop.js';
import NotFound from './pages/NotFound/NotFound.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import GuestRoute from './auth/GuestRoute.jsx';

function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {routes.map(({ path, element: Element, requiresAuth, requiresGuest }) => (
          <Route
            key={path}
            path={path}
            element={
              requiresAuth ? (
                <ProtectedRoute><Element /></ProtectedRoute>
              ) : requiresGuest ? (
                <GuestRoute><Element /></GuestRoute>
              ) : (
                <Element />
              )
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
