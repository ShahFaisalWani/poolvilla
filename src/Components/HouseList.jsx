import React from "react";
import HouseCard from "./HouseCard";
import "../Styles/HouseList.scss";

const HouseList = ({ data, count }) => {
  if (!data) return;
  return (
    <div className="house-list-container">
      <div>
        <p>บ้านพักทั้งหมด</p>
        <p>{count} รายการ</p>
      </div>
      <div className="house-list">
        {data.map((house) => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default HouseList;
