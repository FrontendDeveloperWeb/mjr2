import React from "react";
import EditorialBoardStaffCard from "./EditorialBoardStaffCard";

const EditorialBoardStaffCards = () => {
  return (
    <div className="staff-cards-wrapper">
      <EditorialBoardStaffCard
        staffDetails={{
          head: "Editorial board",
          img: "../../../../../public/assets/img/Abdelsadek.png",
          designation: "President of Cairo University",
          name: "Mohamed Sami Abdelsadek",
        }}
      />
      <EditorialBoardStaffCard
        staffDetails={{
          head: "",
          img: "../../../../../public/assets/img/saidmahmoud.png",
          designation:
            "Vice President of Cairo University for Graduate Studies and Research",
          name: "Mahmoud El Said Mahmoud",
        }}
      />

      <EditorialBoardStaffCard
        staffDetails={{
          head: "Editor-in-Chief",
          img: "../../../../../public/assets/img/khaled.png",
          designation:
            "Cairo University National Cancer Institute, Giza, Egypt",
          expertise: "Area of Expertise - Medical Oncology",
          name: "Hussein M. Khaled, (MD)",
        }}
      />

      <EditorialBoardStaffCard
        staffDetails={{
          head: "Managing Editor",
          img: "../../../../../public/assets/img/alifarag.png",
          designation: "",
          name: "Mohamed Ali Farag, (PhD)",
        }}
      />

      <EditorialBoardStaffCard
        staffDetails={{
          head: "Associate Managing Editor",
          img: "../../../../../public/assets/img/fouad.png",
          designation:
            "Cairo University Department of Pharmaceutical Chemistry, Cairo, Egypt",
          expertise: "Area of Expertise - Medical Oncology",
          name: "Marwa A. Fouad, PhD",
        }}
      />
    </div>
  );
};

export default EditorialBoardStaffCards;
