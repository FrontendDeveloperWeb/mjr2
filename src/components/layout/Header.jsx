import { useState } from 'react';
import { Link } from 'react-router-dom';



export default function Header() {


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
                {/* <img src="/assets/img/logo.png" alt="" /> */}
                <h2>XYZ Logo</h2>
              </div>
            </Link>
            <div>
              <ul className='list-area d-flex align-items-center justify-content-between'>
                <li><Link to="/journals-and-books">Journal & Books</Link></li>
                <li><a href="#">
                  <img src="/assets/img/nav-q.png" alt="" /></a></li>
                <li><a href="#">

                  <img src="/assets/img/h-back-icon.png" alt="" />
                </a></li>
                <li>
                  <button className='custom-btn transparent-btn'>Register</button>
                </li>
                <li>
                  <button className='custom-btn yellow-btn'>Sign In</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
