import { useState } from "react";
import "./App.css";
import Months from "./components/Months";
import { DatePicker } from "./index";
import type { SelectDateType, CalendarEvent, DayInfo, MinNights } from "./types/type";

type CalendraxProps = {
  dates: SelectDateType;
  setDates: React.Dispatch<React.SetStateAction<SelectDateType>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function App(props: CalendraxProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState<SelectDateType>({ checkin: null, checkout: null });

  const events: CalendarEvent[] = [
    { start_date: "2025-10-02", end_date: "2025-10-05", name: "Dusshera Weekend", specific_teams: "All Teams" },
    { start_date: "2025-10-18", end_date: "2025-10-22", name: "Diwali Weekend", specific_teams: "All Teams" },
    { start_date: "2025-12-25", end_date: "2025-12-28", name: "Christmas Weekend", specific_teams: "All Teams" },
    { start_date: "2026-01-01", end_date: "2026-01-04", name: "New Year Weekend", specific_teams: "All Teams" },
    { start_date: "2026-01-14", end_date: "2026-01-14", name: "Makar Sankranti", specific_teams: "Team A, Team B, Team C, Team Q, Team D, Team G" },
    { start_date: "2026-01-15", end_date: "2026-01-15", name: "Pongal", specific_teams: "Team F - South" },
    { start_date: "2026-01-24", end_date: "2026-01-26", name: "Republic Day Weekend", specific_teams: "All Teams" },
    { start_date: "2026-02-28", end_date: "2026-03-04", name: "Holi Weekend", specific_teams: "Team A, Team B, Team C, Team Q, Team D, Team G" },
    { start_date: "2026-04-04", end_date: "2026-04-05", name: "Good Friday Weekend", specific_teams: "All Teams" },
    { start_date: "2026-05-01", end_date: "2026-05-03", name: "Maharashtra Day Weekend", specific_teams: "Team A, Team B, Team C, Team Q" },
    { start_date: "2026-07-17", end_date: "2026-07-19", name: "Eid Weekend", specific_teams: "All Teams" },
    { start_date: "2026-08-15", end_date: "2026-08-16", name: "Independence Day Weekend", specific_teams: "All Teams" },
    { start_date: "2026-09-04", end_date: "2026-09-06", name: "Janmashtami Weekend", specific_teams: "All Teams" },
    { start_date: "2026-10-02", end_date: "2026-10-04", name: "Gandhi Jayanti Weekend", specific_teams: "All Teams" }
  ];

  // Example blocked dates - these dates cannot be selected
  const blockedDates: string[] = [
    "2025-10-28",
    "2025-10-29",
    "2025-10-30",
    "2025-11-10",
    "2025-11-11",
  ];

  // Example day info - display prices or other info below dates
  const dayInfoData: DayInfo[] = [
    { date: "2025-10-22", text: "$150", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-23", text: "$180", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-24", text: "$200", textColor: "#cc0000", backgroundColor: "#ffe6e6" },
    { date: "2025-10-25", text: "$180", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-26", text: "$160", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-27", text: "$140", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-31", text: "$220", textColor: "#cc0000", backgroundColor: "#ffe6e6" },
    { date: "2025-11-01", text: "$190", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
  ];

  // Example minimum nights restrictions
  const minNightsRestrictions: MinNights = {
    "2025-10-24": 3,  // Oct 24 requires minimum 3 nights
    "2025-10-31": 2,  // Oct 31 requires minimum 2 nights
    "2025-11-01": 2,  // Nov 1 requires minimum 2 nights
  "2025-12-01":2
  };



  if (props.open) {
    return null;
  }

  return (
    <>
      <DatePicker
        dates={dates}
        setDates={setDates}
        open={open}
        setOpen={setOpen}
        mobile={false}
        events={events}
        showEvents={true}
        blockedDates={blockedDates}
        allowPastDates={false}
        allowSameDay={true}
        dayInfo={dayInfoData}
        minNights={minNightsRestrictions}
        startMonth={today.getMonth() + 1}
        startYear={today.getFullYear()}
        count={2}
        top={100}
        left={100}
        showEventsList={true}
        calendarType={"hotel"}
      >
       
      </DatePicker>
       <button onClick={() => setOpen(!open)}>
          {(dates.checkin && dates.checkin.toDateString()) || "Check-in"} | {(dates.checkout && dates.checkout.toDateString()) || "Check-out"}
        </button>
    </>
  );
}

export default App;
