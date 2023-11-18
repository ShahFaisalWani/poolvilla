import React, { useState } from "react";
import { CascadeSelect } from "primereact/cascadeselect";

import { Dropdown } from "primereact/dropdown";

export default function SearchButton() {
  const [selectedCity, setSelectedCity] = useState(null);
  const countries = [
    {
      name: "Australia",
      code: "AU",
    },
    {
      name: "Canada",
      code: "CN",
    },
    {
      name: "USA",
      code: "US",
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={countries}
        style={{ minWidth: "80vw" }}
        optionLabel="name"
        placeholder="Select a City"
        className="w-full md:w-14rem"
        dropdownIcon="pi pi-map-marker"
      />
    </div>
  );
}
