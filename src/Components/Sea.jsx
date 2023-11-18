import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { SearchContext } from "./SearchForm";

export default function Sea() {
  const { sea, setSea } = useContext(SearchContext);
  const [data, setData] = useState(null);
  const url =
    "https://api.poolvillacity.co.th/next-villapaza/api/customer/lov/waterfall-filter-menu";

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
            ".sea .p-dropdown .p-dropdown-label::before {",
            "  content: 'Sea';",
            "}",
          ].join("\n"),
        }}
      ></style>
      <div className="button_input sea" style={{ width: "100%" }}>
        <Dropdown
          value={sea}
          onChange={(e) => setSea(e.value)}
          options={data}
          style={{ minWidth: "100%" }}
          optionLabel="name"
          placeholder="เลือกสถานที่ที่ต้องการ"
          className="w-full md:w-14rem"
          dropdownIcon="ri ri-sailboat-line"
          panelClassName="sea-dropdown"
        />
      </div>
    </>
  );
}
