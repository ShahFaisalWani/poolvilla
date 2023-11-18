import React, { createContext, useState } from "react";
import Location from "./Location";
import { CheckIn, CheckOut } from "./DatePicker";
import Guest from "./Guest";
import Price from "./Price";
import Sea from "./Sea";
import Option from "./Option";
import { Button } from "primereact/button";
import axios from "axios";

export const SearchContext = createContext();

const SearchForm = ({ onSearchResult }) => {
  const [location, setLocation] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(null);
  const [price, setPrice] = useState(null);
  const [sea, setSea] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [clear, setClear] = useState(0);

  const handleClear = () => {
    setClear((prev) => !prev);
    setLocation(null);
    setCheckIn(null);
    setCheckOut(null);
    setGuests(null);
    setPrice(null);
    setSea(null);
    setBedrooms(null);
    setFacilities([]);
  };
  function formatDate(date) {
    if (date) {
      return new Date(date)
        .toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/-/g, "-");
    } else {
      return null;
    }
  }
  const handleSubmit = () => {
    const url =
      "https://api.poolvillacity.co.th/next-villapaza/api/customer/house/filter?offset=0&limit=30";
    const data = {
      check_in: formatDate(checkIn),
      check_out: formatDate(checkOut),
      price: {
        min: price ? price[0] : null,
        max: price ? price[1] : null,
      },
      facilities: {
        bedroom: bedrooms,
        etc: facilities,
      },
    };
    if (location) data.location = location._id;
    if (guests) data.guest = guests.name;
    if (sea) data.far_from_sea_waterfall = sea.name;

    axios.post(url, data).then((res) => {
      onSearchResult(res.data.results);
    });
  };

  return (
    <SearchContext.Provider
      value={{
        location,
        setLocation,
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        price,
        setPrice,
        sea,
        setSea,
        bedrooms,
        setBedrooms,
        facilities,
        setFacilities,
        clear,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Location />
        <div style={{ display: "flex", gap: "1em" }}>
          <CheckIn />
          <CheckOut />
        </div>
        <div style={{ display: "flex", gap: "1em" }}>
          <Guest />
          <Price />
        </div>
        <div style={{ display: "flex", gap: "1em" }}>
          <Sea />
          <Option />
        </div>
        <div className="bottom">
          <Button
            label="ค้นหา"
            icon="pi pi-search"
            className="search-button"
            onClick={handleSubmit}
          />
          <Button
            label="ล้างค่า"
            icon="ri ri-loop-left-line"
            className="clear-button"
            onClick={handleClear}
          />
        </div>
      </div>
    </SearchContext.Provider>
  );
};

export default SearchForm;
