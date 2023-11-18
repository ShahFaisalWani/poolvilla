import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "remixicon/fonts/remixicon.css";
import "./Styles/DropdownButton.scss";

import SearchForm from "./Components/SearchForm";
import { useState } from "react";
import HouseList from "./Components/HouseList";

function App() {
  const [data, setData] = useState(null);
  const onSearchResult = (data) => {
    setData(data);
  };
  return (
    <PrimeReactProvider>
      <div className="App">
        <SearchForm onSearchResult={onSearchResult} />
        <HouseList data={data?.results} count={data?.count} />
      </div>
    </PrimeReactProvider>
  );
}

export default App;
