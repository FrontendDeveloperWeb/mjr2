import EditorialBoardCard from "../../../components/partials/about-editorial/EditorialBoardCard";
import EditorialBoardContent from "../../../components/partials/about-editorial/EditorialBoardContent";
import EditorialBoardStaffCards from "../../../components/partials/about-editorial/EditorialBoardStaffCards";
import AssociateEditorsList from "../../../components/partials/about-editorial/AssociateEditorsList";

const EditorialBoard = () => {
  return (
    // 2-Column Layout Container
    <section className="editorial-main-section">
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
  );
};

export default EditorialBoard;
