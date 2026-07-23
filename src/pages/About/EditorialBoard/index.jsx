import EditorialBoardCard from "../../../components/partials/AboutEditorial/EditorialBoardCard";
import EditorialBoardContent from "../../../components/partials/AboutEditorial/EditorialBoardContent";
import EditorialBoardStaffCards from "../../../components/partials/AboutEditorial/EditorialBoardStaffCards";
import AssociateEditorsList from "../../../components/partials/AboutEditorial/AssociateEditorsList";
import Layout from "../../../components/layout/Layout";
import TopBar from "../../../components/shared/TopBar";

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
            <EditorialBoardStaffCards />
            <AssociateEditorsList />
          </div>
        </section>
      </div>
    </Layout >
  );
};

export default EditorialBoard;
