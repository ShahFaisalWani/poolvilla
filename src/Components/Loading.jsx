import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

const Loading = () => {
  return (
    <div className="loading">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
};

export default Loading;
