import React, { useState } from "react";
import NoneSvg from "../assets/no-data.svg";

const Facilities = ({ facilities, details, services }) => {
  const [selected, setSelected] = useState("function");
  const filteredFacilities = facilities.filter(
    (item) => item.type === selected
  );

  return (
    <>
      <div className="facilities-detail">
        <div className="myheader options">
          <button
            onClick={() => setSelected("function")}
            className={selected === "function" ? "active" : ""}
          >
            ฟังก์ชัน
          </button>
          <button
            onClick={() => setSelected("fun")}
            className={selected === "fun" ? "active" : ""}
          >
            สิ่งอำนวยความสะดวก
          </button>
          <button
            onClick={() => setSelected("kitchenware")}
            className={selected === "kitchenware" ? "active" : ""}
          >
            อุปกรณ์ครัว
          </button>
        </div>
        <div>
          {filteredFacilities.length > 0 ? (
            <div className="list">
              {filteredFacilities.map((facility, i) => (
                <div key={i} className="not-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: facility.path.replace(
                        /var\(--next-color-svg\)/g,
                        "#129fe0"
                      ),
                    }}
                    style={{ color: "#129fe0" }}
                  />
                  <span>{facility.name_th}</span>
                </div>
              ))}
            </div>
          ) : (
            <div class="none">
              <img src={NoneSvg} alt="" />
              <span>ไม่พบข้อมูล</span>
            </div>
          )}
        </div>
      </div>
      {details && (
        <div>
          <div className="myheader" style={{ marginBottom: "1em" }}>
            <h2 className="h2-header">รายละเอียดเพิ่มเติม</h2>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: details,
            }}
            className="html-div"
          />
        </div>
      )}
      {services && (
        <div className="service">
          <span>บริการ</span>
          <div
            dangerouslySetInnerHTML={{
              __html: services
                .split("\n")
                .map((line) => `<p>${line}</p>`)
                .join(""),
            }}
            className="html-service"
          />
        </div>
      )}
    </>
  );
};

export default Facilities;
