import DesktopMonths from "./Months/DesktopMonths";
import MobileMonths from "./Months/MobileMonths";

type MonthViewProps = {
  isMobile?: boolean;
  startMonth?: number;
  startYear?: number;
  count?: number;
  events?: { start_date: string; end_date: string; name: string; specific_teams?: string }[];
  showEvents?: boolean;
};

const MonthView = (props: MonthViewProps) => {
  if (props.isMobile) {
    return (
      <MobileMonths
        startMonth={props.startMonth}
        startYear={props.startYear}
        count={props.count}
        events={props.events}
        showEvents={props.showEvents}
      />
    );
  }
  return (
    <DesktopMonths
      startMonth={props.startMonth}
      startYear={props.startYear}
      count={props.count}
      events={props.events}
      showEvents={props.showEvents}
    />
  );
};

export default MonthView;

