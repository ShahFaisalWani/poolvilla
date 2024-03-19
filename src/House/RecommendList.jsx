import React from "react";
import HouseCard from "../Components/HouseCard";

const RecommendList = ({ houses }) => {
  return (
    <div>
      <br />
      <div className="myheader">
        <span>ที่พักแนะนำ</span>
      </div>
      <br />
      <div className="house-list">
        {houses.map((house) => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default RecommendList;
