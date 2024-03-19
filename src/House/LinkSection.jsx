import { Button } from "primereact/button";
import React, { useRef } from "react";

const LinkSection = ({ data }) => {
  const aRef = useRef(null);

  return (
    <>
      <div className="link-section">
        <div className="title">
          <span style={{ fontWeight: 500, color: "black" }}>
            {data.name} {data.district}
          </span>
          <span style={{ color: "#CDD2D4", fontSize: "14px" }}>
            {data.code}
          </span>
          <span>
            เริ่มต้น{" "}
            <span style={{ color: "#ff8c1c", fontSize: "20px" }}>
              {data.lowestPrice.price.toLocaleString("en-US")} ฿
            </span>
          </span>
        </div>
        <div className="buttons">
          <a
            hred="https://line.me/R/ti/p/@231irpmr"
            target="_blank"
            style={{ display: "none" }}
            ref={aRef}
          ></a>
          <Button
            label="จองที่พัก"
            className="line"
            icon="ri-line-line"
            onClick={() => aRef.current.click()}
          />
        </div>
      </div>
      <div className="house-detail">
        <div className="myheader">
          <span>ข้อมูลที่พัก</span>
        </div>
        <div className="list">
          <div>
            <p>
              <i className="ri-time-line"></i>
              เช็คอิน{" "}
              {new Date(data.check_in_time)
                .toLocaleTimeString("th-TH")
                .slice(0, 5)}{" "}
              น.
            </p>
            <p>
              <i className="ri-team-line"></i>รับสูงสุด :{" "}
              {data.accommodate_number} คน
            </p>
            <p>
              {" "}
              <i className="ri-door-closed-line"></i>
              {data.number_of_bathrooms} ห้องน้ำ
            </p>
            <p>
              * กรุณา <span style={{ color: "#ff8c1c" }}>"คลิ๊ก"</span>{" "}
              ปฏิทินเพื่อดูราคา
            </p>
          </div>
          <div>
            <p>
              <i className="ri-time-line"></i>
              เช็คเอาท์ก่อน{" "}
              {new Date(data.check_out_time)
                .toLocaleTimeString("th-TH")
                .slice(0, 5)}{" "}
              น.
            </p>
            <p>
              <i className="ri-hotel-bed-line"></i>
              {data.number_of_bedrooms} ห้องนอน
            </p>
            <p>
              <i className="ri-sailboat-line"></i>ห่างทะเล{" "}
              {data.far_from_sea_waterfall.distance} ก.ม.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkSection;
