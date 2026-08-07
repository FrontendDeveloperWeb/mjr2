import React from "react";

/**
 * One editorial board member. Fully prop-driven — the API shape is flattened
 * upstream on the Editorial Board page.
 */
const EditorialBoardStaffCard = ({ staffDetails }) => {
  const { image, name, title, description, subject } = staffDetails;

  return (
    <div className="staff-card d-flex align-items-center mb-3">
      {/* No image and no profile photo => the avatar wrapper is not rendered at all */}
      {image && (
        <div className="staff-img-box">
          <img src={image} alt={name} />
        </div>
      )}

      <div className="staff-info-box">
        {title && <p className="staff-designation mb-2">{title}</p>}
        {name && <h3 className="staff-name mb-2">{name}</h3>}
        {description && <p className="staff-description mb-1">{description}</p>}
        {subject && <span className="staff-expertise">{subject}</span>}
      </div>
    </div>
  );
};

export default EditorialBoardStaffCard;
