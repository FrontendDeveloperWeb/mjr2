import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './session.js';

/**
 * Inverse of ProtectedRoute: public auth pages (login/register/...) that an
 * already-authenticated user shouldn't be able to revisit.
 */
export default function GuestRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/author/main-menu" replace />;
  }
  return children;
}
