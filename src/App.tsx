import { useState } from "react";
import "./App.css";
import Months from "./components/Months";
import { DatePicker } from "./index";
import type { SelectDateType, CalendarEvent } from "./types/type";

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



  if (props.open) {
    return null;
  }

  return (
    <>
      <DatePicker
        dates={dates}
        setDates={setDates}
        open={true}
        setOpen={setOpen}
        mobile={true}
        events={events}
        showEvents={true}
        startMonth={today.getMonth() + 1}
        startYear={today.getFullYear()}
        // count={2}
      >
       
      </DatePicker>
       <button onClick={() => setOpen(!open)}>
          {(dates.checkin && dates.checkin.toDateString()) || "Check-in"} | {(dates.checkout && dates.checkout.toDateString()) || "Check-out"}
        </button>
    </>
  );
}

export default App;
