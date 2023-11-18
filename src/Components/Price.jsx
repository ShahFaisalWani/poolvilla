import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { SearchContext } from "./SearchForm";

export default function Price() {
  const { clear, price, setPrice } = useContext(SearchContext);
  const [value, setValue] = useState(null);
  const [option, setOption] = useState([]);
  const panelRef = useRef(null);

  useEffect(() => {
    if (typeof value !== "object" && price != null) {
      setValue(`฿${price[0]} - ฿${price[1]}`);
      setOption(`฿${price[0]} - ฿${price[1]}`);
    }
  }, [price]);

  useEffect(() => {
    setValue(null);
    setOption([]);
  }, [clear]);
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            ".price .p-dropdown .p-dropdown-label::before {",
            "  content: 'Price';",
            "}",
          ].join("\n"),
        }}
      ></style>
      <div className="button_input price" style={{ width: "100%" }}>
        <Dropdown
          value={value}
          options={[option]}
          style={{ width: "100%" }}
          optionLabel=""
          placeholder="เลือกช่วงราคา"
          className="w-full md:w-14rem"
          dropdownIcon="ri ri-exchange-dollar-line"
          onClick={(e) => {
            e.preventDefault();
            panelRef.current.toggle(e);
            setValue("฿0 - ฿50000");
            setOption("฿0 - ฿50000");
          }}
        />
      </div>
      <OverlayPanel
        className="price-overlay"
        ref={panelRef}
        style={{ width: "30%" }}
      >
        <div
          className="card flex justify-content-center"
          style={{
            textAlign: "center",
          }}
        >
          <Slider
            step={500}
            value={price}
            onChange={(e) => setPrice(e.value)}
            className="w-14rem"
            range
            min={0}
            max={50000}
          />
          <div style={{ marginTop: "1em", display: "flex", gap: "0.5em" }}>
            <InputText
              type="number"
              value={price ? price[0] : 0}
              onChange={(e) =>
                setPrice((prev) => {
                  return [parseInt(e.target.value), prev[1]];
                })
              }
              style={{ width: 100, height: 25, fontSize: 14 }}
            />
            ถึง
            <InputText
              type="number"
              value={price ? price[1] : 50000}
              onChange={(e) =>
                setPrice((prev) => {
                  return [prev[0], parseInt(e.target.value)];
                })
              }
              style={{ width: 100, height: 25, fontSize: 14 }}
            />
          </div>
        </div>
      </OverlayPanel>
    </>
  );
}
