import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// const articlesItems = [
// 	{ key: 'latest', label: <Link to="/latest-issues" className="sd-drop-link">Latest Issue</Link> },
// 	{ key: 'all-issues', label: <Link to="/all-issues" className="sd-drop-link">All Issues</Link> },
// 	{ key: 'articles-press', label: <Link to="/articles-press" className="sd-drop-link">Articles in Press</Link> },
// 	{ key: 'special-issues', label: <Link to="/special-issue-article-collection" className="sd-drop-link">Special issues and article collections</Link> },
// ];
const articlesItems = [
	{ key: 'latest', label: <Link to="#" className="sd-drop-link">Latest Issue</Link> },
	{ key: 'all-issues', label: <Link to="#" className="sd-drop-link">All Issues</Link> },
	{ key: 'articles-press', label: <Link to="#" className="sd-drop-link">Articles in Press</Link> },
	{ key: 'special-issues', label: <Link to="#" className="sd-drop-link">Special issues and article collections</Link> },
];
const aboutItems = [
	{ key: 'journal', label: <Link to="#" className="sd-drop-link">About the Journal</Link> },
	{ key: 'editorial', label: <Link to="#" className="sd-drop-link">Editorial Board</Link> },
];
// const aboutItems = [
// 	{ key: 'journal', label: <Link to="/about/journal" className="sd-drop-link">About the Journal</Link> },
// 	{ key: 'editorial', label: <Link to="/about/editorial-board" className="sd-drop-link">Editorial Board</Link> },
// ];

const publishItems = [
	{ key: 'author-guide', label: <Link to="/publish/guide" className="sd-drop-link">Author Information Pack</Link> },
	{ key: 'submit-info', label: <Link to="/publish/submit" className="sd-drop-link">Open Access Details</Link> },
];

export default function TopBar() {
	const [isSticky, setIsSticky] = useState(false);
	const sentinelRef = useRef(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		// IntersectionObserver instead of a scroll listener: it never reads layout
		// synchronously (no `offsetTop` per scroll tick => no scroll jank/stutter),
		// and observing a sentinel ABOVE the header makes it loop-immune.
		// When the sentinel scrolls off the top of the viewport, the header is stuck.
		const observer = new IntersectionObserver(
			([entry]) => setIsSticky(!entry.isIntersecting),
			{ root: null, threshold: 0 }
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, []);

	return (
		// Fragment: a zero-height sentinel sits just above the sticky wrapper so the
		// observer can detect exactly when the header reaches top: 0.
		<>
			<div ref={sentinelRef} className="sd-sticky-sentinel" aria-hidden="true" />

			{/* Is wrapper class ke zariye hum dono sections ko ek sath top par stick karenge.
			    position: sticky keeps the header in normal flow, so it reserves its own
			    space — there is no layout jump when it sticks (no placeholder needed). */}
			<div className={`sd-sticky-header-wrapper ${isSticky ? 'is-sticky' : ''}`}>

				{/* SECTION 1: Journal Title & Submit Button */}
				{/* Grid-based collapse: `.on-hover-top__inner` is the overflow-hidden grid child
			    so the reveal animates to its natural height without layout jank. */}
				<section className='on-hover-top  border-bottom'>
					<div className="on-hover-top__inner">
						<div className="container">
							<div className="row">
								<div className="col-12">
									<div className="d-flex align-items-center justify-content-between">
										<div>
											<h3 className='d-flex align-items-center m-0 fs-5'>
												Journal of Advanced Research
												<span className='d-block ms-3 mt-1 text-muted fs-6 font-weight-normal'> | Open access</span>
											</h3>
										</div>
										<div>
											<Button className='submit-your-artical'>
												Submit Your Article
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* SECTION 2: Navigation Links & Search Bar */}
				<section className='sd-nav-section pt-4 bg-white'>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<div className="sd-topbar-wrapper  w-100  pb-3">
									<div className="d-flex align-items-center justify-content-between flex-wrap ">

										{/* LEFT NAV BAR */}
										<div className="d-flex align-items-center gap-4 sd-nav-dropdown-group">
											<Dropdown menu={{ items: articlesItems }} trigger={['hover']} placement="bottomLeft">
												<span className="sd-nav-item cursor-pointer">
													Articles & Issues <DownOutlined className="sd-chevron-icon" />
												</span>
											</Dropdown>

											<Dropdown menu={{ items: aboutItems }} trigger={['hover']} placement="bottomLeft">
												<span className="sd-nav-item cursor-pointer">
													About <DownOutlined className="sd-chevron-icon" />
												</span>
											</Dropdown>

											<Dropdown menu={{ items: publishItems }} trigger={['hover']} placement="bottomLeft">
												<span className="sd-nav-item cursor-pointer">
													Publish <DownOutlined className="sd-chevron-icon" />
												</span>
											</Dropdown>
										</div>

										{/* RIGHT ACTIONS BAR */}
										<div className="d-flex align-items-center gap-3 sd-actions-group flex-grow-1 justify-content-end max-width-800">

											{/* Search Group */}
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

											{/* Submit Button */}
											<Button className="sd-btn-submit-article px-3 h-100">
												Submit your article
											</Button>

											{/* Guide Link */}
											<a href="/publish/guide" className="sd-author-guide-link text-decoration-underline ms-1">
												Guide for authors
											</a>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

			</div>
		</>
	);
}