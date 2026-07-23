import Layout from "../../../components/layout/Layout";
import AcceptancePanel from "../../../components/partials/AboutAims/AcceptancePanel";
import PeerCard from "../../../components/partials/AboutAims/PeerCard";
import { PeerReview } from "../../../components/partials/AboutAims/PeerReview";
import PeerReview2 from "../../../components/partials/AboutAims/PeerReview2";
import TopBar from "../../../components/shared/TopBar";

const cardsData = [
  {
    no: 1,
    icon: "/assets/img/medicine-icon.png",
    description: "Medicine",
  },
  {
    no: 2,
    icon: "/assets/img/pharmaceutical-icon.png",
    description: "Pharmaceutical Sciences",
  },
  {
    no: 3,
    icon: "/assets/img/teeth-icon.png",
    description: "Dentistry",
  },
  {
    no: 4,
    icon: "/assets/img/physical-therapy.png",
    description: "Physical Therapy",
  },
  {
    no: 5,
    icon: "/assets/img/veterinary-icon.png",
    description: "Veterinary Medicine",
  },
  {
    no: 6,
    icon: "/assets/img/biological-sci-icon.png",
    description:
      "Basic and Biological Sciences such as: biology, molecular biology, biotechnology, chemistry, physics, biophysics, geology, astronomy, biophysics and environmental science.",
  },
  {
    no: 7,
    icon: "/assets/img/math-engr-icon.png",
    description: "Mathematics, Engineering, and Computer Sciences",
  },
  {
    no: 8,
    icon: "/assets/img/tree-icon.png",
    description: "Agricultural Science",
  },
];

export default function AimsAndScope() {

  return (

    <Layout>
      <TopBar />
      <div className="container">
        <section className="peer-review-sec mt-5">
          <PeerReview />
        </section>
        <section>
          <div className="container">
            <div className="row">
              {cardsData.map((item) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item.no}>
                  <PeerCard props={item} />
                </div>
              ))}

            </div>
          </div>
        </section>
        <section>
          <PeerReview2 />
        </section>
        <section>
          <AcceptancePanel />
        </section>
      </div>
    </Layout >


  );
}
