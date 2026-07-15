import { Input, Button } from 'antd';
import { DownOutlined, SearchOutlined, LockOutlined } from '@ant-design/icons';


const POPULAR_SEARCH_TAGS = ['Artificial Intelligence', 'Pandemic(Covid -19)', 'Digital Technologies', 'Digital Technologies', 'Digital Technologies'];
export default function SearchPanel() {
    return (

        <section className='search-panale-sec'>
            <div className="container">
                <div className="sd-search-panel">

                    {/* Form Rows with AntD Inputs & Bootstrap Grid */}
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label text-dark fw-semibold mb-1.5 sd-input-label">Find articles with the keywords</label>
                            <Input placeholder="Keywords" />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label text-dark fw-semibold mb-1.5 sd-input-label">In this journal or book title</label>
                            <Input placeholder="Journal/book title" />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label text-dark fw-semibold mb-1.5 sd-input-label">Author(s)</label>
                            <Input placeholder="Author name" />
                        </div>

                        <div className="col-md-2">
                            <Button type="primary" icon={<SearchOutlined />} className="w-100 sd-search-btn">
                                Search here
                            </Button>
                        </div>
                    </div>

                    {/* Popular Badges Row */}
                    <div className="d-flex flex-wrap align-items-center mt-4 pt-3 sd-popular-divider">
                        <span className="text-dark fw-bold me-3 sd-popular-title">Popular :</span>
                        <div className="d-flex flex-wrap gap-2">
                            {POPULAR_SEARCH_TAGS.map((tag, idx) => (
                                <div key={idx} className="sd-badge-pill shadow-sm">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advanced Search Link */}
                    <div className="text-end mt-3">
                        <a href="#advanced" className="text-decoration-none text-dark fw-bold d-inline-flex align-items-center gap-1 sd-advanced-link">
                            Advanced Search <DownOutlined className="sd-icon-nano" />
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}
