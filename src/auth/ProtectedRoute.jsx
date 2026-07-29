import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './session.js';

/**
 * Route guard for the author area. Unauthenticated visitors are bounced to
 * /login, remembering where they were headed so login can send them back.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
