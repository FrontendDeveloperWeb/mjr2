import React from "react";

const AcceptancePanel = () => {
  return (
    <div className="acceptance-panel">
      <div className="badge-wrapper">
        <img
          src="../../../../../public/assets/img/acceptance-rate.png"
          alt="acceptance rate"
        />
      </div>

      {/* Right Side: Text Description with Left Border */}
      <div className="acceptance-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut laboredolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulatur.
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium.
        </p>
      </div>
    </div>
  );
};

export default AcceptancePanel;
