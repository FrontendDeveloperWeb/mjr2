import { useMemo } from "react";
import EditorialBoardCard from "../../../components/partials/AboutEditorial/EditorialBoardCard";
import EditorialBoardContent from "../../../components/partials/AboutEditorial/EditorialBoardContent";
import Layout from "../../../components/layout/Layout";
import TopBar from "../../../components/shared/TopBar";
import EditorialBoardGroup from "../../../components/partials/AboutEditorial/EditorialBoardGroup";
import AssociateEditorCard from "../../../components/partials/AboutEditorial/AssociateEditorCard";
import { useHomeData } from "@/hooks/queries";

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
/**
 * Flattens one API board row into the flat prop shape the cards render.
 * The API is inconsistent about where the person's details live — sometimes on
 * the nested `user` object, sometimes denormalised onto the row itself — so both
 * are read here and the cards stay dumb.
 */
const normalizeMember = (item, index) => {
  const user = item?.user || {};

  return {
    id: item?.id ?? user?.id ?? `member-${index}`,
    name: user.name || item?.user_name || "",
    title: user.title || "",
    description: item?.description || "",
    subject: item?.subject_name || "",
    // A row-level image overrides the user's own photo; null when neither exists
    // so the card can skip the avatar markup entirely.
    image: item?.image || user.profile_photo || null,
  };
};

/**
 * Groups board rows by `editorial_role_name` — every row sharing a role name
 * lands under one section header — and returns them as an array to map over.
 *
 * @param {Array} board - Raw `journal_editorial_board` rows.
 * @returns {Array<{ role: string, members: Array }>}
 */
const groupByEditorialRole = (board = []) => {
  const groups = new Map();

  // The backend controls presentation order via display_order; ties keep the
  // order the API sent them in.
  const ordered = [...board]
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        (a.item?.display_order ?? Number.MAX_SAFE_INTEGER) -
          (b.item?.display_order ?? Number.MAX_SAFE_INTEGER) ||
        a.index - b.index
    )
    .map(({ item }) => item);

  ordered.forEach((item, index) => {
    const role = (item?.editorial_role_name || "").trim() || "Editorial Board";

    if (!groups.has(role)) {
      groups.set(role, { role, members: [] });
    }

    groups.get(role).members.push(normalizeMember(item, index));
  });

  return Array.from(groups.values());
};

const EditorialBoard = () => {
  // Same query the Home page uses — React Query serves it from the one shared
  // cache entry, so this page adds no extra request.
  const { home, isLoading, isError } = useHomeData();

  const board = home?.journal_editorial_board;
  const groups = useMemo(
    () => groupByEditorialRole(Array.isArray(board) ? board : []),
    [board]
  );

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
              <div className="col-12">
                {isLoading && (
                  <p className="text-muted mb-3">Loading editorial board…</p>
                )}

                {!isLoading && isError && (
                  <p className="text-danger mb-3">
                    Unable to load the editorial board right now.
                  </p>
                )}

                {!isLoading &&
                  !isError &&
                  groups.map((group) => (
                    <EditorialBoardGroup
                      key={group.role}
                      role={group.role}
                      members={group.members}
                    />
                  ))}
              </div>
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
