import React from "react";
import HouseCard from "./HouseCard";
import "../Styles/HouseList.scss";

const HouseList = ({ data }) => {
  if (!data) return;
  return (
    <div className="house-list">
      {data.map((house) => (
        <HouseCard key={house._id} house={house} />
      ))}
    </div>
  );
};

export default HouseList;
