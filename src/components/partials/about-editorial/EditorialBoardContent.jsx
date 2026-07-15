import React from "react";

const EditorialBoardContent = () => {
  return (
    <div className="editorial-contents-box">
      <div className="contents-header">
        <h3>Contents</h3>
      </div>
      
      <div className="contents-list">
        <div className="contents-item">
          <div className="contents-left">
            <span className="contents-no">1</span>
            <span className="contents-country active-country">Egypt</span>
          </div>
          <span className="contents-count">(3)</span>
        </div>
        <div className="contents-item">
          <div className="contents-left">
            <span className="contents-no">2</span>
            <span className="contents-country">United States</span>
          </div>
          <span className="contents-count">(42)</span>
        </div>
        <div className="contents-item">
          <div className="contents-left">
            <span className="contents-no">3</span>
            <span className="contents-country">China</span>
          </div>
          <span className="contents-count">(33)</span>
        </div>
        <div className="contents-item">
          <div className="contents-left">
            <span className="contents-no">4</span>
            <span className="contents-country">Brazil</span>
          </div>
          <span className="contents-count">(33)</span>
        </div>
        <div className="contents-item">
          <div className="contents-left">
            <span className="contents-no">5</span>
            <span className="contents-country">Germany</span>
          </div>
          <span className="contents-count">(13)</span>
        </div>
        <div className="contents-item">
          <div className="contents-left">
            <span className="contents-no">6</span>
            <span className="contents-country">Italy</span>
          </div>
          <span className="contents-count">(33)</span>
        </div>
      </div>

      <div className="contents-footer">
        <p>See more editors by country/region <img src="../../../../../public/assets/img/rightarrow-icon.png" alt="arrow" /></p>
      </div>
    </div>
  );
};

export default EditorialBoardContent;