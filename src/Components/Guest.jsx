import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { SearchContext } from "./SearchForm";

export default function Guest() {
  const { guests, setGuests } = useContext(SearchContext);

  const [data, setData] = useState(null);
  const url =
    "https://api.poolvillacity.co.th/next-villapaza/api/lov/customer/filter-menu/guest";

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
            ".guests .p-dropdown .p-dropdown-label::before {",
            "  content: 'Guests';",
            "}",
          ].join("\n"),
        }}
      ></style>
      <div className="button_input guests" style={{ width: "100%" }}>
        <Dropdown
          value={guests}
          onChange={(e) => setGuests(e.value)}
          options={data}
          style={{ minWidth: "100%" }}
          optionLabel="name"
          placeholder="เลือกสถานที่ที่ต้องการ"
          className="w-full md:w-14rem"
          dropdownIcon="ri-group-line"
          panelClassName="guests-dropdown"
        />
      </div>
    </>
  );
}
