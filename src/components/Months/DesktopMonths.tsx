import { useMemo, useState } from "react";
import "./styles.css";
import Months from ".";
import type { SelectDateType, BlockedDates, DayInfo, MinNights, CalendarType } from "../../types/type";

type DesktopMonthsProps = {
  dates: SelectDateType;
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
  minNights?: MinNights;
  calendarType?: CalendarType;
  cellWidth?: number; // Width of each date cell (default: 80px)
  cellHeight?: number; // Height of each date cell (default: 80px)
  showEventsList?: boolean; // Show events list below each month (desktop only)
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
  const [base, setBase] = useState(() => {
    // If checkin exists, start from checkin month; otherwise use props or today
    if (props.dates.checkin) {
      return normalize(props.dates.checkin.getFullYear(), props.dates.checkin.getMonth() + 1);
    }
    return normalize(props.startYear ?? today.getFullYear(), clampMonth(props.startMonth ?? today.getMonth() + 1));
  });

  const count = props.count ?? 2;
  const cellWidth = props.cellWidth ?? 80;
  const cellHeight = props.cellHeight ?? 80;

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
      <div className="months-grid">
        {ranges.map(({ year, month }, index) => (
          <Months
            key={`${year}-${month}`}
            date={props.dates}
            setDate={(action) => {
              // Handle both function and direct value updates
              const newDates = typeof action === 'function' ? action(props.dates) : action;
              if (props.onChange) {
                props.onChange(newDates);
              }
            }}
            month={month}
            year={year}
            events={props.events}
            onChange={props.onChange}
            showEvents={props.showEvents}
            blockedDates={props.blockedDates}
            allowPastDates={props.allowPastDates}
            allowSameDay={props.allowSameDay}
            dayInfo={props.dayInfo}
            minNights={props.minNights}
            calendarType={props.calendarType}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            showLeftArrow={index === 0}
            showRightArrow={index === ranges.length - 1}
            onPrevMonth={goPrev}
            onNextMonth={goNext}
            showEventsList={props.showEventsList}
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopMonths;

