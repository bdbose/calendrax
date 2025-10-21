import { useEffect, useMemo, useRef, useState } from "react";
import DesktopMonths from "./Months/DesktopMonths";
import MobileMonths from "./Months/MobileMonths";
import type { CalendarEvent, SelectDateType, BlockedDates } from "../types/type";

type DatePickerProps = {
  dates: SelectDateType;
  setDates: React.Dispatch<React.SetStateAction<SelectDateType>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobile?: boolean;
  events?: CalendarEvent[];
  showEvents?: boolean;
  blockedDates?: BlockedDates;
  startMonth?: number;
  startYear?: number;
  count?: number;
  children?: React.ReactNode; // trigger
};

const DatePicker = (props: DatePickerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (!props.open) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({ top: rect.bottom + window.scrollY + 8, left: rect.left + window.scrollX });
  }, [props.open]);

  const content = props.mobile ? (
   
    <MobileMonths
      startMonth={props.startMonth}
      startYear={props.startYear}
      count={props.count}
      events={props.events}
      showEvents={props.showEvents}
      blockedDates={props.blockedDates}
      onChange={props.setDates}
    />

  ) : ( <div
          style={{
            position: "absolute",
            top: coords.top,
            left: coords.left,
            zIndex: 1000,
            background: "#fff",
            boxShadow: "0 6px 22px rgba(0,0,0,0.15)",
            borderRadius: 8,
            padding: 8,
          }}
        >
    <DesktopMonths
      startMonth={props.startMonth}
      startYear={props.startYear}
      count={props.count}
      events={props.events}
      showEvents={props.showEvents}
      blockedDates={props.blockedDates}
      onChange={props.setDates}
    />
    </div>
  );

  return (
    <div ref={containerRef} style={{ display: "inline-block", position: "relative",width:"100%" }}>
      {props.children}
      {props.open ? (
        // <div
        //   style={{
        //     position: "absolute",
        //     top: coords.top,
        //     left: coords.left,
        //     zIndex: 1000,
        //     background: "#fff",
        //     boxShadow: props.mobile ? "none" : "0 6px 22px rgba(0,0,0,0.15)",
        //     borderRadius: props.mobile ? 0 : 8,
        //     padding: props.mobile ? 0 : 8,
        //   }}
        // >
          content
        // </div>
      ) : null}
    </div>
  );
};

export default DatePicker;

