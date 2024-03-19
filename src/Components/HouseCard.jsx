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
        <p className="title">
          {title.length > 23 ? title.substring(0, 23) + ".." : title}
        </p>
        <p className="price">
          ราคา ฿ {house.lowestPrice.price.toLocaleString()}
        </p>
        <div className="line" />
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
    </a>
  );
};

export default HouseCard;
