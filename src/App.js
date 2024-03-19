import React from "react";
import { PrimeReactProvider } from "primereact/api";
import House from "./House/House";
import SearchForm from "./Components/SearchForm";
import { useState } from "react";
import HouseList from "./Components/HouseList";
import "./App.scss";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "remixicon/fonts/remixicon.css";

function App() {
  const [data, setData] = useState(null);
  const [resetPage, setResetPage] = useState(0);
  const onSearchResult = (data) => {
    setData(data);
  };
  const code =
    window.location.pathname?.slice(1)?.split("/")[1]?.toLowerCase() ||
    "search";

  return (
    <PrimeReactProvider>
      {code.includes("city") ? (
        <div className="App">
          <House code={code} />
        </div>
      ) : (
        <div className="App">
          <SearchForm
            onSearchResult={onSearchResult}
            setResetPage={setResetPage}
          />
          <HouseList
            data={data?.results}
            count={data?.count}
            houses_array={data?.houses}
            resetPage={resetPage}
          />
        </div>
      )}
    </PrimeReactProvider>
  );
}

export default App;
