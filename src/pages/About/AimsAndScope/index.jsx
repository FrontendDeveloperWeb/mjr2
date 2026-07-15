import AcceptancePanel from "../../../components/partials/about-aims/AcceptancePanel";
import PeerIconCards from "../../../components/partials/about-aims/PeerIconCards";
import { PeerReview } from "../../../components/partials/about-aims/PeerReview";
import PeerReview2 from "../../../components/partials/about-aims/PeerReview2";

export default function AimsAndScope() {
  return (
    <>
      <section className="peer-review-sec">
        <PeerReview />
      </section>
      <section>
        <PeerIconCards />
      </section>
      <section>
        <PeerReview2 />
      </section>
      <section>
        <AcceptancePanel />
      </section>
    </>
  );
}
