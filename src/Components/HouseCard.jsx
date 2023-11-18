import React from "react";

const HouseCard = ({ house }) => {
  console.log(house);
  return (
    <div className="house-card">
      <p className="tag">{house.location.name}</p>
      <div className="house-image">
        <img
          src={
            "https://sgp1.digitaloceanspaces.com/villapaza-spaces" +
            house.picture_house[0]
          }
          alt={`House ${house.code}`}
        />
      </div>
      <div className="house-details">
        <p>
          {house.code} {house.district}
        </p>
        <p className="price">฿{house.lowestPrice.price.toLocaleString()}</p>
        <div className="features">
          <p>
            <i className="ri-team-line"></i> สูงสุด {house.accommodate_number}
          </p>
          <p>
            {" "}
            <i className="ri-hotel-bed-line"></i>
            {house.number_of_bedrooms}
          </p>
          <p>
            {" "}
            <i className="ri-door-closed-line"></i>
            {house.number_of_bathrooms}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
