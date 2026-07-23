import React from "react";
import AssociateEditorCard from "./AssociateEditorCard";
// import "./AssociateEditors.css"; 

const AssociateEditorsList = () => {
  return (
    <div className="associate-editors-container">
      <h2 className="main-heading">Associate Editors</h2>

      {/* ========================================= */}
      {/* CATEGORY 1: MEDICINE                        */}
      {/* ========================================= */}
      <div className="editor-category-group">
        <h3 className="category-heading">Medicine</h3>
        
        <div className="editors-grid">
          {/* Row 1 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor1.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor2.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 2 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor10.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 3 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor4.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor5.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 4 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/placeholder-grey.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor2.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 5 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor7.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor8.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 6 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor6.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/medicine-editor9.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />
        </div>
      </div>

      {/* ========================================= */}
      {/* CATEGORY 2: PHARMACEUTICAL SCIENCES         */}
      {/* ========================================= */}
      <div className="editor-category-group">
        <h3 className="category-heading">Pharmaceutical Sciences</h3>
        
        <div className="editors-grid">
          {/* Row 1 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma1.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma2.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 2 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma2.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma3.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 3 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma4.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma11.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 4 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma5.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma6.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 5 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma7.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma8.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />

          {/* Row 6 */}
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma9.png", 
              name: "Andrea Angeli, PhD",
              university: "University of Florence, Florence, Tuscany, Italy",
              expertise: "Area of Expertise - Medicinal Chemistry.",
            }}
          />
          <AssociateEditorCard
            editorDetails={{
              img: "../../../../../public/assets/img/pharma10.png",
              name: "Daniela Calina, MD, PharmD, PhD",
              university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
              expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
            }}
          />
        </div>
      </div>

      {/* ========================================= */}
      {/* PAGINATION SECTION                          */}
      {/* ========================================= */}
      <div className="pagination-wrapper">
        <button className="page-btn prev-btn">&#8592;</button> {/* Left Arrow */}
        <button className="page-btn active-page">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <span className="page-dots">...</span>
        <button className="page-btn">42</button>
        <button className="page-btn next-btn">&#8594;</button> {/* Right Arrow */}
      </div>
      
    </div>
  );
};

export default AssociateEditorsList;