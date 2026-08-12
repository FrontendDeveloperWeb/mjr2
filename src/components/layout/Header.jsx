import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, getUser, logout } from '../../auth/session.js';
import ProfileDropdown from './ProfileDropdown.jsx';

export default function Header() {
  const navigate = useNavigate();
  // useLocation() re-renders Header on every navigation so the logged-in
  // state (read from localStorage, not React state) stays in sync — e.g.
  // right after login/logout redirects to a different route.
  useLocation();
  const isLoggedIn = isAuthenticated();
  const user = isLoggedIn ? getUser() : null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <nav className='nav-bar'>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p>For institutions, researchers and clinicians</p>
            </div>
            <div>
              <span>English  </span>
              <span>· My account</span>
              <span>· Help</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/">
              <div className='web-logo'>
                <img src="/assets/img/logo.png" alt="" />
              </div>
            </Link>
            <div>
              <ul className='list-area d-flex align-items-center justify-content-between'>
                <li><Link to="/journals-and-books">Journal & Books</Link></li>

                {isLoggedIn && user ? (
                  <li>
                    <div className="d-flex align-items-center header-account">
                      <ProfileDropdown user={user} />
                      <span className="header-account-sep">|</span>
                      <button
                        type="button"
                        className="header-logout-link"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                ) : (
                  <>
                    <li>
                      <button className='custom-btn transparent-btn' onClick={() => navigate("/register")}>Register</button>
                    </li>
                    <li>
                      <button className='custom-btn yellow-btn' onClick={() => navigate("/login")}>Sign In</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
