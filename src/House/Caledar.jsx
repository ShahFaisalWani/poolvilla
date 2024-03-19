import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import thLocale from "@fullcalendar/core/locales/th";
import multiMonthPlugin from "@fullcalendar/multimonth";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import saleImg from "../new-sale.png";

function getDatesInRange(startDate, endDate) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate < new Date(endDate)) {
    dateArray.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

export default function Calendar({ data }) {
  const [visible, setVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [width, setWidth] = useState(750);
  const house = data.house;
  const toast = useRef(null);

  const house_price = {};
  data.every_day.map((day, i) => {
    house_price[i] = {
      sum: parseInt(day.sum),
      accommodate_number: day.accommodate_number,
    };
  });

  const events = [];
  data.book.map((event) => {
    if (event.date_start !== event.date_end) {
      const alldates = getDatesInRange(event.date_start, event.date_end);
      alldates.map((dates, i) => {
        events.push({
          id: event._id + i,
          start: new Date(dates).toISOString().replace(/T.*$/, ""),
          status: event.status.name_en,
        });
      });
    } else {
      events.push({
        id: event._id,
        start: new Date(event.date_start).toISOString().replace(/T.*$/, ""),
        status: event.status.name_en,
      });
    }
  });
  data.holiday.forEach((hol) => {
    const startDate = new Date(hol.date[0]).toISOString().replace(/T.*$/, "");

    const isDateExist = events.some((event) => event.start === startDate);

    if (!isDateExist) {
      hol.date.map((dates, i) => {
        events.push({
          id: hol._id + i,
          start: new Date(dates).toISOString().replace(/T.*$/, ""),
          status: "holiday",
          price: hol.sum,
          accommodate_number: hol.accommodate_number,
        });
      });
    }
  });

  data.promotion.forEach((hol) => {
    const startDate = new Date(hol.date[0]).toISOString().replace(/T.*$/, "");
    const day_of_week = new Date(hol.date[0]).getDay();
    const isDateExist = events.some((event) => event.start === startDate);

    if (!isDateExist) {
      hol.date.map((dates, i) => {
        events.push({
          id: hol._id + i,
          start: new Date(dates).toISOString().replace(/T.*$/, ""),
          status: "promotion",
          old: house_price[day_of_week].sum,
          sum: hol.sum,
          accommodate_number: hol.accommodate_number,
        });
      });
    }
  });

  const eventRender = (info) => {
    let div = document.createElement("div");
    const status = info.event.extendedProps.status;

    let backgroundColor = "";
    let borderColor = "";
    switch (status) {
      case "maintenance":
        backgroundColor = "rgb(254, 240, 231)";
        borderColor = "rgb(152, 68, 8)";
        break;
      case "deposit already paid":
        backgroundColor = "rgb(248, 229, 231)";
        borderColor = "red";
        break;
      case "waiting for transfer":
        backgroundColor = "rgb(252, 239, 222)";
        borderColor = "#FB8D00";
        break;
      case "holiday":
        backgroundColor = "rgb(255, 253, 234)";
        borderColor = "#ffcc1a";
        break;
      default:
        backgroundColor = "#fff";
        borderColor = "#fff";
    }

    const eventDate = info.event.start.toISOString().split("T")[0];
    const cell = document.querySelector(
      `td[data-date='${eventDate}'] .fc-daygrid-day-frame`
    );

    if (cell) {
      cell.style.backgroundColor = backgroundColor;
      cell.style.borderColor = borderColor;

      let img = cell.querySelector("img");

      if (!img && status === "promotion") {
        const div = document.createElement("div");
        div.className = "sale-div";

        img = document.createElement("img");
        img.className = "sale-img";
        img.style.width = "100%";
        img.style.padding = "1em";
        img.style.paddingBottom = "4em";
        div.appendChild(img);
        cell.appendChild(div);
        img.src = saleImg;
        cell.style.border = "4px solid #ffcc1a";
      }
    }

    let arrayOfDomNodes = [div];
    return { domNodes: arrayOfDomNodes };
  };

  const handleEventClick = (e) => {
    const event = events.find((event) => event.start === e.dateStr);

    let selected_event = null;
    if (event) {
      selected_event = {
        code: house.code,
        date: new Date(event.start).toLocaleDateString("en-GB"),
        price: event.price || event.sum,
        accommodate_number:
          event.accommodate_number || house.accommodate_number,
        status: event.status,
        old: event.old,
      };
    } else {
      selected_event = {
        code: house.code,
        date: new Date(e.dateStr).toLocaleDateString("en-GB"),
        day_of_week: new Date(e.dateStr).getDay(),
      };
    }
    setSelectedEvent(selected_event);
    setVisible(true);
  };

  function renderSwitch() {
    const status = selectedEvent.status;
    const day_of_week = selectedEvent.day_of_week;
    switch (status) {
      case "maintenance":
        return (
          <span
            style={{
              fontSize: "1.2em",
              color: "rgb(152, 68, 8)",
              fontWeight: 500,
            }}
          >
            ปิดปรับปรุง
          </span>
        );
      case "deposit already paid":
        return (
          <span
            style={{
              fontSize: "1.2em",
              color: "red",
              fontWeight: 500,
            }}
          >
            ติดจอง
          </span>
        );
      case "waiting for transfer":
        return (
          <span
            style={{
              fontSize: "1.2em",
              color: "rgb(91, 205, 105)",
              fontWeight: 500,
            }}
          >
            รอชำระ
          </span>
        );
      case "holiday":
        return (
          <span
            style={{
              fontSize: "1.2em",
              color: "#FF8818",
              fontWeight: 500,
            }}
          >
            {selectedEvent.price.toLocaleString()} บาท /{" "}
            {selectedEvent.accommodate_number} ท่าน
          </span>
        );
      case "promotion":
        return (
          <>
            <p style={{ fontSize: "1.25em", fontWeight: 500 }}>
              <span>ลดราคาจาก</span>
              <span
                style={{
                  textDecoration: "line-through",
                  marginLeft: "0.5em",
                  color: "red",
                }}
              >
                {selectedEvent.old.toLocaleString()} บาท /{" "}
                {selectedEvent.accommodate_number} ท่าน
              </span>
            </p>
            <span
              style={{
                fontSize: "1.2em",
                color: "#FF8818",
                fontWeight: 500,
              }}
            >
              {selectedEvent.price.toLocaleString()} บาท /{" "}
              {selectedEvent.accommodate_number} ท่าน
            </span>
          </>
        );
      default:
        return (
          <span
            style={{
              fontSize: "1.2em",
              color: "#FF8818",
              fontWeight: 500,
            }}
          >
            {house_price[day_of_week].sum.toLocaleString()} บาท /{" "}
            {house_price[day_of_week].accommodate_number} ท่าน
          </span>
        );
    }
  }

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "คัดลอก",
      icon: "pi pi-check",
      closeIcon: "pi pi-times",
    });
  };
  const copyLink = () => {
    const price =
      selectedEvent.price || house_price[selectedEvent.day_of_week].sum;
    const accommodate_number =
      selectedEvent.accommodate_number ||
      house_price[selectedEvent.day_of_week].accommodate_number;

    const text = `${house.code} ${selectedEvent.date} ${price} บาท / ${accommodate_number} ท่าน`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        show();
      })
      .catch((err) => {
        console.error("Error in copying text: ", err);
      });
  };

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 1000) setWidth(750);
    else setWidth(window.innerWidth * 1.5);
  }, [window.innerWidth]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
      console.log(newWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="calendar">
      {screenWidth}
      {screenWidth > 900 ? (
        <FullCalendar
          timeZone="Asia/Bangkok"
          plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
          locale={thLocale}
          initialView="multiMonthThreeMonth"
          multiMonthMaxColumns={3}
          views={{
            multiMonthThreeMonth: {
              type: "multiMonth",
              duration: { months: 3 },
            },
          }}
          firstDay={0}
          eventContent={eventRender}
          events={events}
          dayCellClassNames={"cell"}
          height={width}
          dateClick={handleEventClick}
        />
      ) : (
        <FullCalendar
          timeZone="Asia/Bangkok"
          plugins={[dayGridPlugin, interactionPlugin]}
          locale={thLocale}
          initialView="dayGridMonth"
          views={""}
          firstDay={0}
          eventContent={eventRender}
          events={events}
          dayCellClassNames={"cell"}
          height={width}
          dateClick={handleEventClick}
        />
      )}
      {/* <div className="multiCalendar">
        <FullCalendar
          timeZone="Asia/Bangkok"
          plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
          locale={thLocale}
          initialView="multiMonthThreeMonth"
          multiMonthMaxColumns={3}
          views={{
            multiMonthThreeMonth: {
              type: "multiMonth",
              duration: { months: 3 },
            },
          }}
          firstDay={0}
          eventContent={eventRender}
          events={events}
          dayCellClassNames={"cell"}
          height={width}
          dateClick={handleEventClick}
        />
      </div>
      <div className="singleCalendar">
        <FullCalendar
          timeZone="Asia/Bangkok"
          plugins={[dayGridPlugin, interactionPlugin]}
          locale={thLocale}
          initialView="dayGridMonth"
          firstDay={0}
          eventContent={eventRender}
          events={events}
          dayCellClassNames={"cell"}
          height={width}
          dateClick={handleEventClick}
        />
      </div> */}

      <div className="below-calendar">
        <div className="circles">
          <div>
            <div className="circle" style={{ backgroundColor: "red" }}></div>
            <span>ติดจอง</span>
          </div>
          <div>
            <div
              className="circle"
              style={{ backgroundColor: "#FF8818" }}
            ></div>
            <span>รอชำระ</span>
          </div>
          <div>
            <div
              className="circle"
              style={{ backgroundColor: "rgb(152, 68, 8)" }}
            ></div>
            <span>ปิดปรับปรุง</span>
          </div>
          <div>
            <div
              className="circle"
              style={{ backgroundColor: "#ffcc1b" }}
            ></div>
            <span>วันหยุดนักขัตฤกษ์</span>
          </div>
          <div className="sale">
            <img
              src={saleImg}
              style={{ width: "50px", marginRight: "0.5em" }}
            />
            <span>ลดราคา</span>
          </div>
        </div>
        <div className="extra">
          <p>
            เสริมท่านละ {house.additional_stay_information.extra_per_person} บาท
          </p>
          <p>พักได้สูงสุด {house.accommodate_number} ท่าน</p>
          <p>
            ประกันความเสียหาย{" "}
            {house.additional_stay_information.damage_insurance} บาท
          </p>
        </div>
      </div>
      {visible && (
        <Dialog
          header={house.code}
          headerStyle={{ textAlign: "center" }}
          visible={visible}
          closable={false}
          style={{
            width: window.innerWidth > 1000 ? "50vw" : "90vw",
          }}
          className="calendar-dialog"
          draggable={false}
          closeIcon="pi pi-times"
        >
          <div className="content">
            <p>{selectedEvent.date}</p>
            <p className="price">
              {renderSwitch()}{" "}
              {selectedEvent.status !== "deposit already paid" &&
                selectedEvent.status !== "maintenance" &&
                selectedEvent.status !== "waiting for transfer" && (
                  <button onClick={copyLink} className="copy-button">
                    <i className="ri-file-copy-line"></i>
                  </button>
                )}
            </p>
            <Button
              label="ปิด"
              className="button"
              onClick={() => setVisible(false)}
            />
          </div>
        </Dialog>
      )}
      <Toast ref={toast} className="toast" />
    </div>
  );
}
