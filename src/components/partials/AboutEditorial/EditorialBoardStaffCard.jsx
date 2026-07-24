import React from "react";

const EditorialBoardStaffCard = ({ staffDetails }) => {
  const { head, img, designation, name, expertise } = staffDetails;

  return (
    <div className="staff-section">
      {/* Heading optional rendering */}
      {head && <h2 className="staff-role-heading">{head}</h2>}

      <div className="staff-card">
        {/* Sirf tabhi render hoga jab img exist karegi aur null/empty nahi hogi */}
        {img && (
          <div className="staff-img-box">
            <img src={img} alt={name} />
          </div>
        )}

        <div className="staff-info-box">
          {designation && <p className="staff-designation">{designation}</p>}
          <h3 className="staff-name">{name}</h3>
          {expertise && <span className="staff-expertise">{expertise}</span>}
        </div>
      </div>
    </div>
  );
};

export default EditorialBoardStaffCard;