import {  useRef, } from "react";
import DesktopMonths from "./Months/DesktopMonths";
import MobileMonths from "./Months/MobileMonths";
import type { CalendarEvent, SelectDateType, BlockedDates, DayInfo, MinNights, CalendarType } from "../types/type";

type DatePickerProps = {
  dates: SelectDateType;
  setDates: React.Dispatch<React.SetStateAction<SelectDateType>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobile?: boolean;
  events?: CalendarEvent[];
  showEvents?: boolean;
  blockedDates?: BlockedDates;
  allowPastDates?: boolean;
  allowSameDay?: boolean;
  dayInfo?: DayInfo[];
  minNights?: MinNights;
  calendarType?: CalendarType; // "hotel" enables blocked dates as checkout-only
  startMonth?: number;
  startYear?: number;
  count?: number;
  cellWidth?: number; // Width of each date cell in pixels (default: 80, only for desktop)
  cellHeight?: number; // Height of each date cell in pixels (default: 80, only for desktop)
  top?: number; // Top position offset in pixels (default: 0)
  left?: number; // Left position offset in pixels (default: 0)
  children?: React.ReactNode; // trigger
};

const DatePicker = (props: DatePickerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  

  const content = props.mobile ? (
   
    <MobileMonths
      startMonth={props.startMonth}
      startYear={props.startYear}
      count={props.count}
      events={props.events}
      showEvents={props.showEvents}
      blockedDates={props.blockedDates}
      allowPastDates={props.allowPastDates}
      allowSameDay={props.allowSameDay}
      dayInfo={props.dayInfo}
      minNights={props.minNights}
      calendarType={props.calendarType}
      onChange={props.setDates}
    />

  ) : (
    <DesktopMonths
      startMonth={props.startMonth}
      startYear={props.startYear}
      count={props.count}
      events={props.events}
      showEvents={props.showEvents}
      blockedDates={props.blockedDates}
      allowPastDates={props.allowPastDates}
      allowSameDay={props.allowSameDay}
      dayInfo={props.dayInfo}
      minNights={props.minNights}
      calendarType={props.calendarType}
      cellWidth={props.cellWidth}
      cellHeight={props.cellHeight}
      onChange={props.setDates}
    />
  );

  return (
    <div ref={containerRef} style={{ display: "inline-block", position: "relative", width: "100%" }}>
      {props.children}
      {props.open ? (
        <div className={props.mobile ? "mobile-container-calendrax" : "desktop-container-calendrax"}
          style={{
            position:props.mobile ? "relative" : "absolute",
            zIndex: 1000,
            background: "#fff",
            boxShadow: props.mobile ? "none" : "0 6px 22px rgba(0,0,0,0.15)",
            borderRadius: props.mobile ? 0 : 8,
            padding: props.mobile ? 0 : 8,
            width: props.mobile ? "100%" : "fit-content",
            top:props.mobile ? 0 : props.top,
            left:props.mobile ? 0 : props.left,
          }}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
};

export default DatePicker;

