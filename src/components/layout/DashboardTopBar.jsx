import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const articlesItems = [
  { key: 'latest', label: <Link to="/latest-issues" className="sd-drop-link">Latest Issue</Link> },
  { key: 'all-issues', label: <Link to="/all-issues" className="sd-drop-link">All Issues</Link> },
  { key: 'articles-press', label: <Link to="/articles-press" className="sd-drop-link">Articles in Press</Link> },
  { key: 'special-issues', label: <Link to="/special-issue-article-collection" className="sd-drop-link">Special issues and article collections</Link> },
];

const aboutItems = [
  { key: 'journal', label: <Link to="/about/journal" className="sd-drop-link">About the Journal</Link> },
  { key: 'editorial', label: <Link to="/about/editorial-board" className="sd-drop-link">Editorial Board</Link> },
];

const publishItems = [
  { key: 'author-guide', label: <Link to="/publish/guide" className="sd-drop-link">Author Information Pack</Link> },
  { key: 'submit-info', label: <Link to="/publish/submit" className="sd-drop-link">Open Access Details</Link> },
];

export default function DashboardTopBar() {
  return (
    <div className="sd-topbar-wrapper bg-white w-100">
      <div className="d-flex align-items-center justify-content-between flex-wrap ">

        {/* LEFT NAV BAR: Dropdowns Trigger on HOVER */}
        <div className="d-flex align-items-center gap-4 sd-nav-dropdown-group">
          <Dropdown menu={{ items: articlesItems }} trigger={['hover']} placement="bottomLeft">
            <span className="sd-nav-item">
              Articles & Issues <DownOutlined className="sd-chevron-icon" />
            </span>
          </Dropdown>

          <Dropdown menu={{ items: aboutItems }} trigger={['hover']} placement="bottomLeft">
            <span className="sd-nav-item">
              About <DownOutlined className="sd-chevron-icon" />
            </span>
          </Dropdown>

          <Dropdown menu={{ items: publishItems }} trigger={['hover']} placement="bottomLeft">
            <span className="sd-nav-item">
              Publish <DownOutlined className="sd-chevron-icon" />
            </span>
          </Dropdown>
        </div>

        {/* RIGHT ACTIONS BAR: Embedded Search, Action Button & Guide Anchor */}
        <div className="d-flex align-items-center gap-3 sd-actions-group flex-grow-1 justify-content-end max-width-800">

          {/* Exact Flush Pill Search Group */}
          <div className="sd-search-composite-pill d-flex align-items-center">
            <Input
              placeholder="Search in this journal"
              className="sd-search-pill-input"
              bordered={false}
            />
            <button className="sd-search-pill-btn px-4">
              Search
            </button>
          </div>

          {/* Muted Beige Button */}
          <Button className="sd-btn-submit-article px-3 h-100">
            Submit your article
          </Button>

          {/* Author Anchor Guide Link */}
          <a href="/publish/guide" className="sd-author-guide-link text-decoration-underline ms-1">
            Guide for authors
          </a>
        </div>

      </div>
    </div>
  );
}
