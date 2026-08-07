import React from "react";
import EditorialBoardStaffCard from "./EditorialBoardStaffCard";

/**
 * One `editorial_role_name` section: the role as a heading, followed by every
 * member that shares that role.
 */
const EditorialBoardGroup = ({ role, members = [] }) => {
  if (!members.length) return null;

  return (
    <div className="staff-section">
      {role && <h2 className="staff-role-heading">{role}</h2>}

      {members.map((member) => (
        <EditorialBoardStaffCard key={member.id} staffDetails={member} />
      ))}
    </div>
  );
};

export default EditorialBoardGroup;
