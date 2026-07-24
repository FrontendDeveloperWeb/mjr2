import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';



const aboutItems = [
    { key: 'journal', label: <Link to="/journals-and-books" className="sd-drop-link">Journal Overview </Link> },
    { key: 'instructions', label: <Link to="" className="sd-drop-link">Instructions For Auther</Link> },
    { key: 'contact', label: <Link to="" className="sd-drop-link">Contact</Link> },
    { key: 'polices', label: <Link to="" className="sd-drop-link">Polices</Link> },
];


const helpItems = [
    { key: 'system', label: <Link to="" className="sd-drop-link">System Help</Link> },
    { key: 'tutorials', label: <Link to="" className="sd-drop-link">Video Tutorials </Link> },

];

export default function AdminHeader() {


    return (
        <div className='auth-header'>
            <header>

                <div className="header auth-header">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <Link to="/">
                                <div className='web-logo'>
                                    {/* <img src="/assets/img/logo.png" alt="" /> */}
                                    <h2>Journal of Advanced Research</h2>
                                </div>
                            </Link>
                            <div>
                                <ul className='list-area d-flex align-items-center justify-content-between'>
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
            <section className='sd-nav-section pt-4 bg-white'>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="sd-topbar-wrapper  w-100  pb-3">
                                <div className="d-flex align-items-center justify-content-between flex-wrap ">

                                    {/* LEFT NAV BAR */}
                                    <div className="d-flex align-items-center gap-5 sd-nav-dropdown-group">
                                        <span className="sd-nav-item cursor-pointer">
                                            Home
                                        </span>
                                        <span className="sd-nav-item cursor-pointer">
                                            Submit a Manuscript
                                        </span>

                                        <Dropdown menu={{ items: aboutItems }} trigger={['hover']} placement="bottomLeft">
                                            <span className="sd-nav-item cursor-pointer">
                                                About <DownOutlined className="sd-chevron-icon" />
                                            </span>
                                        </Dropdown>

                                        <Dropdown menu={{ items: helpItems }} trigger={['hover']} placement="bottomLeft">
                                            <span className="sd-nav-item cursor-pointer">
                                                Help <DownOutlined className="sd-chevron-icon" />
                                            </span>
                                        </Dropdown>
                                    </div>




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}
