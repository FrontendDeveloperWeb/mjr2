import React from "react";

const EditorialBoardStaffCard = ({ staffDetails }) => {
  const { head, img, designation, expertise, name } = staffDetails;

  return (
    <div className="staff-section">
      {/* Only render the heading if it exists */}
      {head && <h2 className="staff-role-heading">{head}</h2>}

      <div className="staff-card">
        <div className="staff-img-box">
          <img src={img} alt={name} />
        </div>
        <div className="staff-info-box">
          <p className="staff-designation">{designation}</p>
          <h3 className="staff-name">{name}</h3>
          {expertise && <span className="staff-expertise">{expertise}</span>}
        </div>
      </div>
    </div>
  );
};

export default EditorialBoardStaffCard;