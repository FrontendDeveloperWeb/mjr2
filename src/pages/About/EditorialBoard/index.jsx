import EditorialBoardCard from "../../../components/partials/AboutEditorial/EditorialBoardCard";
import EditorialBoardContent from "../../../components/partials/AboutEditorial/EditorialBoardContent";
import Layout from "../../../components/layout/Layout";
import TopBar from "../../../components/shared/TopBar";
import EditorialBoardStaffCard from "../../../components/partials/AboutEditorial/EditorialBoardStaffCard";
import AssociateEditorCard from "../../../components/partials/AboutEditorial/AssociateEditorCard";


const editorialBoardData = [
  {
    id: 1,
    head: "Editorial board",
    img: null,
    designation: "President of Cairo University",
    name: "Mohamed Sami Abdelsadek",
  },
  {
    id: 2,
    head: "",
    img: null,
    designation: "Vice President of Cairo University for Graduate Studies and Research",
    name: "Mahmoud El Said Mahmoud",
  },
  {
    id: 3,
    head: "Editor-in-Chief",
    img: null,
    designation: "Cairo University National Cancer Institute, Giza, Egypt",
    expertise: "Area of Expertise - Medical Oncology",
    name: "Hussein M. Khaled, (MD)",
  },
  {
    id: 4,
    head: "Managing Editor",
    img: null,
    designation: "",
    name: "Mohamed Ali Farag, (PhD)",
  },
  {
    id: 5,
    head: "Associate Managing Editor",
    img: "/assets/img/fouad.png",
    designation: "Cairo University Department of Pharmaceutical Chemistry, Cairo, Egypt",
    expertise: "Area of Expertise - Medical Oncology",
    name: "Marwa A. Fouad, PhD",
  },
];
const associateEditorsData = [
  {
    id: "cat-1",
    categoryName: "Medicine",
    editors: [
      {
        id: "m-1",
        img: null,
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "m-2",
        img: null,
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "m-3",
        img: null,
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "m-4",
        img: null,
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "m-5",
        img: null,
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "m-6",
        img: null,
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "m-7",
        img: null,
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "m-8",
        img: null,
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "m-9",
        img: null,
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "m-10",
        img: null,
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "m-11",
        img: null,
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "m-12",
        img: null,
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
    ],
  },
  {
    id: "cat-2",
    categoryName: "Pharmaceutical Sciences",
    editors: [
      {
        id: "p-1",
        img: "/assets/img/pharma1.png",
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "p-2",
        img: "/assets/img/pharma2.png",
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "p-3",
        img: "/assets/img/pharma2.png",
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "p-4",
        img: "/assets/img/pharma3.png",
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "p-5",
        img: "/assets/img/pharma4.png",
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "p-6",
        img: "/assets/img/pharma11.png",
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "p-7",
        img: "/assets/img/pharma5.png",
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "p-8",
        img: "/assets/img/pharma6.png",
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "p-9",
        img: "/assets/img/pharma7.png",
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "p-10",
        img: "/assets/img/pharma8.png",
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
      {
        id: "p-11",
        img: "/assets/img/pharma9.png",
        name: "Andrea Angeli, PhD",
        university: "University of Florence, Florence, Tuscany, Italy",
        expertise: "Area of Expertise - Medicinal Chemistry.",
      },
      {
        id: "p-12",
        img: "/assets/img/pharma10.png",
        name: "Daniela Calina, MD, PharmD, PhD",
        university: "University of Medicine and Pharmacy of Craiova, Craiova, Romania",
        expertise: "Clinical and experimental Pharmacology, Clinical Pharmacy",
      },
    ],
  },
];
const EditorialBoard = () => {
  return (
    // 2-Column Layout Container

    <Layout>
      <TopBar />
      <div className="container">
        <section className="editorial-main-section mt-5">
          {/* Left Sidebar */}
          <div className="editorial-sidebar">
            <EditorialBoardCard />
            <EditorialBoardContent />
          </div>

          {/* Right Main Content */}
          <div className="editorial-main-content">

            <div className="row">
              {editorialBoardData.map((staff) => (
                <div className="col-12" key={staff.id}>
                  <EditorialBoardStaffCard staffDetails={staff} />
                </div>
              ))}
            </div>

            <div className="associate-editors-container">
              <h2 className="main-heading">Associate Editors</h2>

              {/* Category Wise Outer Loop */}
              {associateEditorsData.map((category) => (
                <div className="editor-category-group" key={category.id}>
                  <h3 className="category-heading">{category.categoryName}</h3>

                  <div className="editors-grid">
                    {/* Editors Inner Loop */}
                    {category.editors.map((editor) => (
                      <AssociateEditorCard
                        key={editor.id}
                        editorDetails={editor}
                      />
                    ))}
                  </div>
                </div>
              ))}


            </div>
          </div>
        </section>
      </div>
    </Layout >
  );
};

export default EditorialBoard;
