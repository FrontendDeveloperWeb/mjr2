import React from "react";

const AssociateEditorCard = ({ editorDetails }) => {
  const { img, name, university, expertise } = editorDetails;

  return (
    <div className="associate-card">
      <div className="associate-img-wrapper">
        <img src={img} alt={name} />
      </div>
      <div className="associate-info">
        <h4 className="associate-name">{name}</h4>
        <p className="associate-university">{university}</p>
        <p className="associate-expertise">{expertise}</p>
      </div>
    </div>
  );
};

export default AssociateEditorCard;