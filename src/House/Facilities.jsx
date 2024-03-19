import React from "react";

const Facilities = ({ facilities, details, services }) => {
  return (
    <>
      <div className="facilities-detail">
        <div className="header">
          <span>สิ่งอำนวยความสะดวก</span>
        </div>
        <div className="list">
          {facilities.map((facility, i) => (
            <div key={i}>
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
      </div>
      {details && (
        <div>
          <div className="header">
            <span>รายละเอียดเพิ่มเติม</span>
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
