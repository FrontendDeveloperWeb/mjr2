import React from "react";

const PeerCard = ({ props }) => {
  const { icon, no, description } = props;

  return (
    <div className="peer-card">
      <div className="peer-icon-container">
        {icon && (
          <div className="peer-icon-circle">

            <img src={icon} alt={`Icon for ${description}`} />
          </div>
        )}

      </div>
      <div className="peer-number-badge">{no}</div>
      <h3 className="peer-description">{description}</h3>
      <div className="peer-divider"></div>
    </div>
  );
};

export default PeerCard;
