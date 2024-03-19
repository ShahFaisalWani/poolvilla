import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

const ImgGallery = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const images = data.picture_house;
  return (
    <>
      <div className="img-container" onClick={() => setVisible(true)}>
        <div className="img1">
          <img
            src={
              "https://sgp1.digitaloceanspaces.com/villapaza-spaces" + images[0]
            }
            alt=""
          />
        </div>
        <div className="img2">
          <img
            src={
              "https://sgp1.digitaloceanspaces.com/villapaza-spaces" + images[1]
            }
            alt=""
          />
        </div>
        <div className="img3">
          <img
            src={
              "https://sgp1.digitaloceanspaces.com/villapaza-spaces" + images[2]
            }
            alt=""
          />
          <div className="overlay">
            <span>
              + <i className="ri ri-image-line"></i> 28 รูปภาพ
            </span>
          </div>
        </div>
      </div>

      <Dialog
        header="รูปภาพเพิ่มเติม"
        visible={visible}
        style={{ width: window.innerWidth > 1000 ? "60vw" : "80vw" }}
        onHide={() => setVisible(false)}
        className="dialog"
        closeIcon="pi pi-times"
      >
        <div className="pop-img-container">
          {images.map((img_url) => (
            <img
              key={img_url}
              src={
                "https://sgp1.digitaloceanspaces.com/villapaza-spaces" + img_url
              }
            />
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default ImgGallery;
