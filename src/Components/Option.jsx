import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { SearchContext } from "./SearchForm";

export default function Option() {
  const { bedrooms, setBedrooms, facilities, setFacilities } =
    useContext(SearchContext);

  const bedroomOptions = [3, 6, 9, 10];
  const [facilitieOptions, setFacilitieOptions] = useState([]);

  const panelRef = useRef(null);
  const facility_url =
    "https://api.poolvillacity.co.th/next-villapaza/api/facility/get-facility-lov";

  useEffect(() => {
    fetch(facility_url)
      .then((res) => res.json())
      .then((data) => {
        setFacilitieOptions(data);
      });
  }, []);

  const onFacilityChange = (e) => {
    let _ingredients = [...facilities];

    if (e.checked) _ingredients.push(e.value);
    else _ingredients.splice(_ingredients.indexOf(e.value), 1);

    setFacilities(_ingredients);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            ".option .p-dropdown .p-dropdown-label::before {",
            "  content: 'Option';",
            "}",
          ].join("\n"),
        }}
      ></style>
      <div className="option" style={{ width: "100%" }}>
        <Dropdown
          style={{ width: "100%" }}
          optionLabel="name"
          placeholder="เลือกช่วงราคา"
          className="w-full md:w-14rem"
          dropdownIcon="ri ri-equalizer-line"
          onClick={(e) => {
            e.preventDefault();
            panelRef.current.toggle(e);
          }}
        />
      </div>
      <OverlayPanel
        className="option-overlay"
        ref={panelRef}
        style={{ width: "40%" }}
      >
        <p className="title">
          <i className="ri ri-equalizer-line"></i> ตัวกรองเพิ่มเติม
        </p>
        <div className="container">
          <p>จำนวนห้องนอน</p>
          <div className="grid-container top">
            {bedroomOptions.map((option) => (
              <div className="flex align-items-center grid-item" key={option}>
                <RadioButton
                  inputId={option}
                  name={option}
                  value={option}
                  onChange={(e) => setBedrooms(parseInt(e.value))}
                  checked={bedrooms === option}
                />
                <label htmlFor={option} className="ml-2">
                  {option !== 10
                    ? `${option - 2}-${option}`
                    : `${option} ห้องขึ้นไป`}
                </label>
              </div>
            ))}
          </div>
          <hr className="line"></hr>
          <p>สิ่งอำนวยความสะดวก</p>
          <div className="grid-container">
            {facilitieOptions.map((option) => (
              <div
                className="flex align-items-center grid-item"
                key={option._id}
              >
                <Checkbox
                  inputId={option._id}
                  name={option.name_th}
                  value={option._id}
                  onChange={onFacilityChange}
                  checked={facilities.includes(option._id)}
                  className={`${
                    facilities.includes(option._id) ? "checked" : ""
                  }`}
                />
                <label htmlFor="ingredient1" className="ml-2">
                  {option.name_th}
                </label>
              </div>
            ))}
          </div>
        </div>
      </OverlayPanel>
    </>
  );
}
