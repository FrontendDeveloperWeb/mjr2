import React from "react";

const AssociateEditorCard = ({ editorDetails }) => {
  const { img, name, university, expertise } = editorDetails;

  return (
    <div className="associate-card">
      {/* 
        Image tabhi render hogi jab 'img' exist karegi.
        Null, undefined, ya empty string hone par ye div render nahi hoga.
      */}
      {img && (
        <div className="associate-img-wrapper">
          <img src={img} alt={name} />
        </div>
      )}

      <div className="associate-info">
        <h4 className="associate-name">{name}</h4>
        {/* Baki fields ko bhi safe side render karna behtar hai */}
        {university && <p className="associate-university">{university}</p>}
        {expertise && <p className="associate-expertise">{expertise}</p>}
      </div>
    </div>
  );
};

export default AssociateEditorCard;