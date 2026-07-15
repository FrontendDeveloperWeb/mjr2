import React from "react";
import PeerCard from "./PeerCard";

const PeerIconCards = () => {
  return (
    <div className="peer-cards-grid">
      <PeerCard
        props={{
          icon: "../../../../../public/assets/img/medicine-icon.png",
          no: 1,
          description: "Medicine",
        }}
      />
      <PeerCard
        props={{
          icon: "../../../../../public/assets/img/pharmaceutical-icon.png",
          no: 2,
          description: "Pharmaceutical Sciences",
        }}
      />
      <PeerCard
        props={{
          icon: "../../../../../public/assets/img/teeth-icon.png",
          no: 3,
          description: "Dentistry",
        }}
      />
      <PeerCard
        props={{
          icon: "../../../../../public/assets/img/physical-therapy.png",
          no: 4,
          description: "Physical Therapy",
        }}
      />
      <PeerCard
        props={{
          icon: "../../../../../public/assets/img/veterinary-icon.png",
          no: 5,
          description: "Veterinary Medicine",
        }}
      />
      <PeerCard
        props={{
          icon: "../../../../../public/assets/img/biological-sci-icon.png",
          no: 6,
          description:
            "Basic and Biological Sciences such as: biology, molecular biology, biotechnology, chemistry, physics, biophysics, geology, astronomy, biophysics and environmental science.",
        }}
      />
      <PeerCard
        props={{
          icon: "../../../../../public/assets/img/math-engr-icon.png",
          no: 7,
          description: "Mathematics, Engineering, and Computer Sciences",
        }}
      />
      <PeerCard
        props={{
          icon: "../../../../../public/assets/img/tree-icon.png",
          no: 8,
          description: "Agricultural Science",
        }}
      />
    </div>
  );
};

export default PeerIconCards;
