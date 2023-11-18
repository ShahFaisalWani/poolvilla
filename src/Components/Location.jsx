import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { SearchContext } from "./SearchForm";

export default function Location() {
  const { location, setLocation } = useContext(SearchContext);
  const [data, setData] = useState(null);
  const url =
    "https://api.poolvillacity.co.th/next-villapaza/api/customer/location/lov";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data) return;
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            ".location .p-dropdown .p-dropdown-label::before {",
            "  content: 'Location';",
            "}",
          ].join("\n"),
        }}
      ></style>
      <div className="button_input location card flex justify-content-center">
        <Dropdown
          value={location}
          onChange={(e) => setLocation(e.value)}
          options={data}
          style={{ minWidth: "100%" }}
          optionLabel="name"
          placeholder="เลือกสถานที่ที่ต้องการ"
          className="w-full md:w-14rem"
          dropdownIcon="pi pi-map-marker"
        />
      </div>
    </>
  );
}
