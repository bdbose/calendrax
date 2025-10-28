import { useState } from "react";
import DesktopMonths from "./Months/DesktopMonths";
import MobileMonths from "./Months/MobileMonths";
import type { SelectDateType } from "../types/type";

type MonthViewProps = {
  isMobile?: boolean;
  startMonth?: number;
  startYear?: number;
  count?: number;
  events?: { start_date: string; end_date: string; name: string; specific_teams?: string }[];
  showEvents?: boolean;
};

const MonthView = (props: MonthViewProps) => {
  const [dates, setDates] = useState<SelectDateType>({ checkin: null, checkout: null });
  
  if (props.isMobile) {
    return (
      <MobileMonths
        dates={dates}
        startMonth={props.startMonth}
        startYear={props.startYear}
        count={props.count}
        events={props.events}
        showEvents={props.showEvents}
        onChange={setDates}
      />
    );
  }
  return (
    <DesktopMonths
      dates={dates}
      startMonth={props.startMonth}
      startYear={props.startYear}
      count={props.count}
      events={props.events}
      showEvents={props.showEvents}
      onChange={setDates}
    />
  );
};

export default MonthView;

