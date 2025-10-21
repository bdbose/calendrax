import { useMemo, useState } from "react";
import "./styles.css";
import Months from ".";
import type { SelectDateType, BlockedDates, DayInfo } from "../../types/type";

type DesktopMonthsProps = {
  startMonth?: number; // 1-12
  startYear?: number;
  count?: number; // number of months to render
  events?: { start_date: string; end_date: string; name: string; specific_teams?: string }[];
  onChange?: (selection: SelectDateType) => void;
  showEvents?: boolean;
  blockedDates?: BlockedDates;
  allowPastDates?: boolean;
  allowSameDay?: boolean;
  dayInfo?: DayInfo[];
};

const clampMonth = (month: number) => {
  if (month < 1) return 1;
  if (month > 12) return 12;
  return month;
};

const normalize = (year: number, month: number) => {
  const d = new Date(year, month - 1, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
};

const DesktopMonths = (props: DesktopMonthsProps) => {
  const today = new Date();
  const [base, setBase] = useState(() =>
    normalize(props.startYear ?? today.getFullYear(), clampMonth(props.startMonth ?? today.getMonth() + 1))
  );
  const [selection, setSelection] = useState<SelectDateType>({ checkin: null, checkout: null });

  const count = props.count ?? 2;

  const ranges = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const d = new Date(base.year, base.month - 1 + i, 1);
      return { year: d.getFullYear(), month: d.getMonth() + 1 };
    });
  }, [base, count]);

  const goPrev = () => {
    const d = new Date(base.year, base.month - 2, 1);
    setBase({ year: d.getFullYear(), month: d.getMonth() + 1 });
  };

  const goNext = () => {
    const d = new Date(base.year, base.month, 1);
    setBase({ year: d.getFullYear(), month: d.getMonth() + 1 });
  };

  return (
    <div className="desktop-months">
      <div className="calendar-header">
        <button onClick={goPrev}>←</button>
        <button onClick={goNext}>→</button>
      </div>
      <div className="months-grid">
        {ranges.map(({ year, month }) => (
          <Months
            key={`${year}-${month}`}
            date={selection}
            setDate={setSelection}
            month={month}
            year={year}
            events={props.events}
            onChange={props.onChange}
            showEvents={props.showEvents}
            blockedDates={props.blockedDates}
            allowPastDates={props.allowPastDates}
            allowSameDay={props.allowSameDay}
            dayInfo={props.dayInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopMonths;

