import React, { useState } from "react";
import CustomDrawer from '../../shared/Drawer/index';
const countriesData = [
  // Top 6 (Vertical List)
  { id: 1, country: "Egypt", count: 29 },
  { id: 2, country: "United States", count: 26 },
  { id: 3, country: "China", count: 7 },
  { id: 4, country: "Brazil", count: 6 },
  { id: 5, country: "Germany", count: 5 },
  { id: 6, country: "Italy", count: 5 },

  // Remaining Countries (Inline Paragraph)
  { id: 7, country: "Canada", count: 3 },
  { id: 8, country: "Saudi Arabia", count: 3 },
  { id: 9, country: "Spain", count: 3 },
  { id: 10, country: "Greece", count: 2 },
  { id: 11, country: "India", count: 2 },
  { id: 12, country: "Japan", count: 2 },
  { id: 13, country: "Korea, Republic of", count: 2 },
  { id: 14, country: "Poland", count: 2 },
  { id: 15, country: "Singapore", count: 2 },
  { id: 16, country: "South Africa", count: 2 },
  { id: 17, country: "United Kingdom", count: 2 },
  { id: 18, country: "Bangladesh" },
  { id: 19, country: "Belgium" },
  { id: 20, country: "Czech Republic" },
  { id: 21, country: "Denmark" },
  { id: 22, country: "France" },
  { id: 23, country: "Lebanon" },
  { id: 24, country: "Malaysia" },
  { id: 25, country: "Mexico" },
  { id: 26, country: "Netherlands" },
  { id: 27, country: "New Zealand" },
  { id: 28, country: "Nigeria" },
  { id: 29, country: "Pakistan" },
  { id: 30, country: "Romania" },
  { id: 31, country: "Switzerland" },
  { id: 32, country: "Taiwan" },
  { id: 33, country: "Türkiye" },
  { id: 34, country: "United Arab Emirates" },
];
const EditorialBoardContent = () => {
  const topCountries = countriesData.slice(0, 6);
  const remainingCountries = countriesData.slice(6);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };



  return (
    <>
      <div className="editorial-contents-box">
        <div className="contents-header">
          <h3>Contents</h3>
        </div>

        <div className="contents-list">
          {topCountries.map((item, index) => (
            <div className="contents-item" key={item.id}>
              <div className="contents-left">
                {/* Numbering ke liye index + 1 ya item.id use kar sakte hain */}
                <span className="contents-no">{index + 1}</span>
                <span
                  className={`contents-country ${item.isActive ? "active-country" : ""
                    }`}
                >
                  {item.country}
                </span>
              </div>
              <span className="contents-count">({item.count})</span>
            </div>
          ))}
        </div>

        <div className="contents-footer" onClick={showDrawer}>
          <p>See more editors by country/region <img src="../../../../../public/assets/img/rightarrow-icon.png" alt="arrow" /></p>
        </div>
      </div>
      <CustomDrawer
        title="Editorial board by country/region"
        onClose={onClose}
        open={open}
        size="560px"
      >
        <div className="aim-drawer editorial-drawer ">
          <p className="p-1">120 editors and editorial board members in 34 countries/regions</p>
          <div className="top-countries-list">
            {topCountries.map((item) => (
              <div className="top-country-item" key={item.id}>
                <span className="country-name">{item.country}</span>
                <span className="country-count"> ({item.count})</span>
              </div>
            ))}
          </div>


          {remainingCountries.length > 0 && (
            <p className="remaining-countries-text mt-4 ">
              {remainingCountries.map((item, index) => (
                <React.Fragment key={item.id} className="pb-2">
                  {item.country}
                  {item.count ? ` (${item.count})` : ""}
                  {index < remainingCountries.length - 1 ? ", " : ""}
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      </CustomDrawer>
    </>

  );
};

export default EditorialBoardContent;