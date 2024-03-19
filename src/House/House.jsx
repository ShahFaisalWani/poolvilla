import { useEffect, useState } from "react";
import axios from "axios";
import ImgGallery from "./ImgGallery";
import LinkSection from "./LinkSection";
import Calendar from "./Caledar";
import Facilities from "./Facilities";
import { Helmet } from "react-helmet";
import RecommendList from "./RecommendList";
import Loading from "../Components/Loading";

const nullSearch = {
  check_in: null,
  check_out: null,
  guest: null,
  price: {
    min: null,
    max: null,
  },
  far_from_sea_waterfall: null,
  facilities: {
    bedroom: null,
    etc: [],
  },
};

function House({ code }) {
  const [data, setData] = useState(null);
  const [recommendation, setRecommendation] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (code) => {
    const url =
      "https://api.poolvillacity.co.th/next-villapaza/api/customer/house/info/" +
      code.toUpperCase();
    await axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchRecommend = async () => {
    const url =
      "https://api.poolvillacity.co.th/next-villapaza/api/customer/house/filter?offset=0&limit=6";
    await axios
      .post(url, nullSearch)
      .then((res) => {
        if (res.status === 200) {
          setRecommendation(res.data.results);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchFunction = async () => {
      setLoading(true);
      await fetchData(code);
      await fetchRecommend();
      setLoading(false);
    };
    fetchFunction();
  }, [code]);

  if (loading) return <Loading />;
  console.log(data.house);
  return (
    <div className="House">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${data.house.name} ${data.house.location?.name} ${data.house.code} | ${data.house.number_of_bedrooms} ห้องนอน BaanPuck`}</title>
      </Helmet>
      <ImgGallery data={data.house} />
      <LinkSection data={data.house} />
      <Calendar data={data.priceHouse} />
      <Facilities
        facilities={data.house.facilities}
        details={data.priceHouse.house.detail}
        services={data.priceHouse.house.additional_stay_information.service}
      />
      {recommendation?.length > 0 && <RecommendList houses={recommendation} />}
    </div>
  );
}

export default House;
