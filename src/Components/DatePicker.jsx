import React, { useContext, useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { SearchContext } from "./SearchForm";

addLocale("th", {
  firstDayOfWeek: 0,
  showMonthAfterYear: false,
  dayNames: [
    "อาทิตย์", // Sunday
    "จันทร์", // Monday
    "อังคาร", // Tuesday
    "พุธ", // Wednesday
    "พฤหัสบดี", // Thursday
    "ศุกร์", // Friday
    "เสาร์", // Saturday
  ],
  dayNamesShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
  dayNamesMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
  monthNames: [
    "มกราคม", // January
    "กุมภาพันธ์", // February
    "มีนาคม", // March
    "เมษายน", // April
    "พฤษภาคม", // May
    "มิถุนายน", // June
    "กรกฎาคม", // July
    "สิงหาคม", // August
    "กันยายน", // September
    "ตุลาคม", // October
    "พฤศจิกายน", // November
    "ธันวาคม", // December
  ],
  monthNamesShort: [
    "มกรา", // January
    "กุมภา", // February
    "มีนา", // March
    "เมษา", // April
    "พฤษภา", // May
    "มิถุนา", // June
    "กรกฎา", // July
    "สิงหา", // August
    "กันยา", // September
    "ตุลา", // October
    "พฤศจิกา", // November
    "ธันวา", // December
  ],
  today: "วันนี้",
  clear: "ปิด",
});
const today = new Date();
today.setHours(0, 0, 0, 0);

export function CheckIn() {
  const { checkIn, setCheckIn } = useContext(SearchContext);
  const [value, setValue] = useState(null);
  const btnRef = useRef(null);
  useEffect(() => {
    if (checkIn) {
      const select = new Date(checkIn).toLocaleDateString("en-GB");
      setValue(select);
    } else {
      setValue(null);
    }
  }, [checkIn]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            ".check-in .p-dropdown .p-dropdown-label::before {",
            "  content: 'Check-In';",
            "}",
          ].join("\n"),
        }}
      ></style>
      <div className="button_input check-in" style={{ width: "100%" }}>
        <Dropdown
          value={value}
          options={[{ value: value }]}
          style={{ width: "100%" }}
          optionLabel="value"
          placeholder="เลือกวันเข้าพัก"
          className="w-full md:w-14rem"
          dropdownIcon="pi pi-calendar-minus"
          onClick={(e) => {
            e.preventDefault();
            btnRef.current.show();
          }}
        />
      </div>
      <Calendar
        ref={btnRef}
        value={checkIn}
        onChange={(e) => setCheckIn(e.value)}
        locale="th"
        showButtonBar
        dateFormat="dd/mm/yy"
        style={{ width: "50%", display: "none" }}
        panelClassName="check-in-calendar"
        minDate={today}
      />
    </>
  );
}

export function CheckOut() {
  const { checkIn, checkOut, setCheckOut } = useContext(SearchContext);
  const [value, setValue] = useState(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (checkOut) {
      const select = new Date(checkOut).toLocaleDateString("en-GB");
      setValue(select);
    } else {
      setValue(null);
    }
  }, [checkOut]);

  useEffect(() => {
    if (checkIn) {
      const newDate = new Date(checkIn);
      newDate.setDate(new Date(checkIn).getDate() + 1);
      setCheckOut(newDate);
    }
  }, [checkIn]);
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            ".check-out .p-dropdown .p-dropdown-label::before {",
            "  content: 'Check-Out';",
            "}",
          ].join("\n"),
        }}
      ></style>
      <div className="button_input check-out" style={{ width: "100%" }}>
        <Dropdown
          value={value}
          options={[{ value: value }]}
          style={{ width: "100%" }}
          optionLabel="value"
          placeholder="เลือกวันเข้าพัก"
          className="w-full md:w-14rem"
          dropdownIcon="pi pi-calendar-minus"
          onClick={(e) => {
            e.preventDefault();
            btnRef.current.show();
          }}
        />
      </div>
      <Calendar
        ref={btnRef}
        value={checkOut}
        onChange={(e) => setCheckOut(e.value)}
        locale="th"
        showButtonBar
        dateFormat="dd/mm/yy"
        style={{ width: "50%", display: "none" }}
        panelClassName="check-out-calendar"
        minDate={today}
      />
    </>
  );
}
