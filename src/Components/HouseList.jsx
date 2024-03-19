import React, { useEffect, useState } from "react";
import HouseCard from "./HouseCard";
import "../Styles/HouseList.scss";
import { Paginator } from "primereact/paginator";
import axios from "axios";
import Loading from "./Loading";

const HouseList = ({ data, count, houses_array, resetPage }) => {
  const [first, setFirst] = useState(0);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHouses(data);
  }, [data]);

  useEffect(() => {
    setFirst(0);
  }, [resetPage]);

  function getItems(first_house) {
    const pageSize = 30;
    return houses_array.slice(first_house, first_house + pageSize);
  }

  const onPageChange = (event) => {
    setLoading(true);
    setFirst(event.first);
    const url =
      "https://api.poolvillacity.co.th/next-villapaza/api/customer/house/filter/pages";
    const houses_id = getItems(parseInt(event.first));

    const houses = houses_id.map((item) => item._id);
    axios
      .post(url, { houses })
      .then((res) => {
        setHouses(res.data.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  if (!houses) return;
  return (
    <div className="house-list-container">
      {loading && <Loading />}
      <div>
        <p>บ้านพักทั้งหมด</p>
        <p>{count} รายการ</p>
      </div>
      <div className="house-list">
        {houses.map((house) => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
      <div className="pagination">
        <Paginator
          first={first}
          rows={30}
          totalRecords={count}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default HouseList;
