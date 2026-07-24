import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Carousel, Badge, Input, Button, Select } from 'antd';
import {
    FileTextOutlined,
    BookOutlined,
    BarChartOutlined,
    DownloadOutlined,
    ExperimentOutlined,
    ArrowRightOutlined,
    ClockCircleOutlined,
    LockOutlined,
    DownOutlined,
    SearchOutlined,
    GlobalOutlined,
    LeftOutlined,
    RightOutlined,
    FileSearchOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    EyeOutlined,
    InstagramOutlined,
    DatabaseOutlined
} from '@ant-design/icons';

export default function AdminFooter() {



    return (
        <footer className="sd-main-footer-section">
            <div className="container position-relative">

                {/* 1. FLOATING SEARCH RIBBON PANEL */}
                <div className="sd-footer-search-ribbon">
                    <div className="sd-ribbon-dots-right"></div>
                    <div className="row align-items-center g-3 position-relative" style={{ zIndex: 3 }}>
                        <div className="col-12 col-xl-12 d-flex  gap-3">
                            <div className="sd-ribbon-icon-circle">
                                <img src="/assets/img/need-icon.png" alt="" />
                            </div>
                            <div>
                                <h4 className="sd-ribbon-title m-0">Need help finding something?</h4>
                                <p className="sd-ribbon-subtext m-0 mt-1">
                                    Our open access journals ensure that every published article is freely available to researchers, educators, students, and the public worldwide.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-xl-12">
                            <div className="sd-search-inputs-row d-flex flex-wrap flex-sm-nowrap gap-2">
                                <Input
                                    placeholder="Search here articles..."
                                    prefix={<img src='/assets/img/search-icon.png' />}
                                    className="sd-custom-search-input"
                                />
                                <Select defaultValue="All Topics" className="sd-custom-select-topic">
                                    <Option value="All Topics">All Topics</Option>
                                    <Option value="Science">Science</Option>
                                    <Option value="Health">Health</Option>
                                    <Option value="Technology">Technology</Option>
                                </Select>
                                <Button className="sd-btn-search-trigger d-flex align-items-center justify-content-center">
                                    <SearchOutlined className="me-1" /> Search here
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. MAIN FOOTER CONTENT LINKS */}
                <div className="row sd-footer-links-grid">

                    {/* BRAND COLUMN */}
                    <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                        <div className="sd-footer-brand-logo mb-3">
                            <img
                                src="/assets/img/footer-logo.png"
                                alt="Logo Accent Tree"
                                className="sd-footer-logo-tree me-2"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                        <p className="sd-brand-description-para mb-4">
                            Our open access journals ensure that every published article is freely available to researchers, educators, students, and the public worldwide.
                        </p>

                        <div className="sd-social-connect-block">
                            <h6 className="sd-social-title mb-3">Stay Connected</h6>
                            <div className="d-flex gap-2">
                                <a href="#linkedin" className="sd-social-icon-circle">

                                    <img src="/assets/img/inded-icon.png" alt="" />
                                </a>
                                <a href="#twitter" className="sd-social-icon-circle">
                                    <img src="/assets/img/twiter-icon.png" alt="" /></a>
                                <a href="#link" className="sd-social-icon-circle"><img src="/assets/img/upwork-icon.png" alt="" /></a>
                                <a href="#instagram" className="sd-social-icon-circle"><img src="/assets/img/insta-icon.png" alt="" /></a>
                            </div>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div className="col-6 col-md-2 col-lg-2 offset-lg-1 mb-4 mb-md-0">
                        <h5 className="sd-footer-col-heading">Quick Links</h5>
                        <ul className="sd-footer-ul-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#submit">Submit</a></li>
                            <li><a href="#articles">Articles</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* AUTHOR GUIDE */}
                    <div className="col-6 col-md-3 col-lg-2 mb-4 mb-md-0">
                        <h5 className="sd-footer-col-heading">Author Guide</h5>
                        <ul className="sd-footer-ul-links">
                            <li><a href="#authors">For Authors</a></li>
                            <li><a href="#structure">Structure Of Manuscript</a></li>
                            <li><a href="#checklist">Manuscript Checklist</a></li>
                            <li><a href="#evaluation">Manuscripts Evaluation</a></li>
                            <li><a href="#policies">Policies On Article Publication</a></li>
                        </ul>
                    </div>

                    {/* CONTACT US */}
                    <div className="col-12 col-md-3 col-lg-3">
                        <h5 className="sd-footer-col-heading">Contact Us</h5>
                        <ul className="sd-footer-ul-links">
                            <li className="sd-contact-highlight-li">+1 234 56 78 910</li>
                            <li className="sd-contact-highlight-li">example123@gmail.com</li>
                            <li><a href="#checklist">Manuscript Checklist</a></li>
                            <li><a href="#evaluation">Manuscripts Evaluation</a></li>
                            <li><a href="#policies">Policies On Article Publication</a></li>
                        </ul>
                    </div>

                </div>

                {/* 3. BOTTOM BASEBAR */}
                <div className="sd-footer-bottom-basebar d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div></div>
                    <div className="sd-copyright-text">
                        Copyright © 2025 . All rights reserved.
                    </div>
                    <div className="sd-basebar-links-row d-flex gap-4 mt-3 mt-md-0">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms & Condition</a>
                        <a href="#legal">Legal</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}
