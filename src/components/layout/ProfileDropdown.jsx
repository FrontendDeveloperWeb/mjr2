import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { getUserInitials, getUserRole } from '../../auth/userSelectors.js';

/**
 * Header's logged-in profile control: an avatar + name trigger that toggles
 * a small card (username/role/language + a link to update profile info).
 * `user` is the flat object session.getUser() returns.
 */
export default function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = getUserInitials(user);
  // const displayName = getUserDisplayName(user);

  return (
    <div className="profile-dropdown-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="profile-dropdown-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="avatar-circle">{initials}</span>
        {/* <span>{displayName}</span> */}
        <DownOutlined className="profile-dropdown-caret" />
      </button>

      {open && (
        <div className="profile-dropdown-card">
          <div className="profile-dropdown-row">
            <span className="profile-dropdown-label">Username</span>
            <span className="profile-dropdown-value">{user?.user_name}</span>
          </div>
          <div className="profile-dropdown-row">
            <span className="profile-dropdown-label">Role</span>
            <span className="profile-dropdown-value">{getUserRole(user?.role)}</span>
          </div>
          <Link
            to="/author/update-information"
            className="profile-dropdown-link"
            onClick={() => setOpen(false)}
          >
            Update My Information
          </Link>
        </div>
      )}
    </div>
  );
}
