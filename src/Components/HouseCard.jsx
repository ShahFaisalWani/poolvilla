import React from "react";

const HouseCard = ({ house }) => {
  const title = house.code + " " + house.district;
  return (
    <a className="house-card" href={"/house/" + house.code} target="_blank">
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
        <div className="top">
          <div className="code">{house.code}</div>
          {house.district && <div className="district">{house.district}</div>}
          <div className="price">
            ราคา ฿ {house.lowestPrice.price.toLocaleString()}
          </div>
        </div>
        <div className="features">
          <div>
            <i className="ri-team-line"></i> สูงสุด {house.accommodate_number}
          </div>
          <div>
            {" "}
            <i className="ri-hotel-bed-line"></i>
            {house.number_of_bedrooms}
          </div>
          <div>
            {" "}
            <i className="ri-door-closed-line"></i>
            {house.number_of_bathrooms}
          </div>
        </div>
      </div>
    </a>
  );
};

export default HouseCard;
