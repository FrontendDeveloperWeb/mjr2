import VolumeStatusCard from './VolumeStatusCard.jsx';
import SelectedArticlesActions from './SelectedArticlesActions.jsx';
import ContentsIndex from './ContentsIndex.jsx';

export default function VolumeSidebar({ volume, pageRange, showPreviews, onTogglePreviews, showContentsIndex = true }) {
  return (
    <div className="col-12 col-md-4 col-lg-3">
      <VolumeStatusCard volume={volume} pageRange={pageRange} />
      <SelectedArticlesActions showPreviews={showPreviews} onTogglePreviews={onTogglePreviews} />
      {showContentsIndex && <ContentsIndex />}
    </div>
  );
}
