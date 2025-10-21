import { useEffect, useState, useMemo } from "react";
import "./styles.css";
import { generateCalendarDatesTrimmed } from "../../utils/generateMonth";
import Dates from "../Dates";
import type { SelectDateType, BlockedDates, DayInfo, MinNights } from "../../types/type";
import { getDateState, nextSelectionOnClick, isBeforeToday } from "../../utils/selection";
import { buildEventMap, getEventLabel } from "../../utils/events";
import { buildDayInfoMap, getDayInfo } from "../../utils/dayInfo";
import { generateMinNightsEvents, getBlockedDatesFromMinNights } from "../../utils/minNights";
import { formatDate } from "../../utils/dateHelpers";

const week = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type MonthProps = {
  date: SelectDateType;
  setDate: React.Dispatch<React.SetStateAction<SelectDateType>>;
  month: number;
  year: number;
  events?: { start_date: string; end_date: string; name: string; specific_teams?: string }[];
  onChange?: (selection: SelectDateType) => void;
  showEvents?: boolean;
  blockedDates?: BlockedDates;
  allowPastDates?: boolean;
  allowSameDay?: boolean;
  dayInfo?: DayInfo[];
  minNights?: MinNights;
};

const Months = (props: MonthProps) => {
  const [dates, setDates] = useState<(Date | null)[]>([]);

  useEffect(() => {
    const arr = generateCalendarDatesTrimmed(props.year, props.month);
    setDates(arr);
  }, [props.year, props.month]);

  useEffect(() => {
    props.onChange?.(props.date);
  }, [props.date]);

  // Merge user events with auto-generated minimum nights events
  // Only show minNights event when that date is selected as check-in
  const allEvents = useMemo(() => {
    const minNightsEvents = generateMinNightsEvents(props.minNights, props.date.checkin, props.blockedDates);
    const userEvents = props.events || [];
    return [...minNightsEvents, ...userEvents];
  }, [props.events, props.minNights, props.date.checkin, props.blockedDates]);

  const eventMap = useMemo(() => buildEventMap(allEvents), [allEvents]);
  const dayInfoMap = useMemo(() => buildDayInfoMap(props.dayInfo), [props.dayInfo]);
  
  // Create a map to check if a date has a minNights event
  const minNightsEventDates = useMemo(() => {
    const dates = new Set<string>();
    const minNightsEvents = generateMinNightsEvents(props.minNights, props.date.checkin, props.blockedDates);
    minNightsEvents.forEach(event => {
      dates.add(event.start_date);
    });
    return dates;
  }, [props.minNights, props.date.checkin, props.blockedDates]);
  
  // Get dates blocked by minimum nights restriction
  const blockedByMinNights = useMemo(() => 
    getBlockedDatesFromMinNights(props.date.checkin, props.minNights, props.blockedDates),
    [props.date.checkin, props.minNights, props.blockedDates]
  );
  
  // Combine original blocked dates with minNights blocked dates
  const allBlockedDates = useMemo(() => {
    const original = props.blockedDates || [];
    return [...original, ...blockedByMinNights];
  }, [props.blockedDates, blockedByMinNights]);

  return (
    <div className="month-container">
      <span className="month-name-wrapper">
        {months[props.month-1]} {props.year}
      </span>
      <div className="month-wrapper">
        {week.map((e) => {
          return (
            <div className="week-wrapper" key={`wk-${e}`}>
              {e}
            </div>
          );
        })}
        {(() => {
          // Build event labels with proper row grouping
          const eventLabels: React.ReactNode[] = [];
          const cells: React.ReactNode[] = [];

          let currentLabel: string | null = null;
          let spanStart = -1;
          let currentIsMinNights = false;

          const addEventLabel = (startIdx: number, endIdx: number, label: string, isMinNights: boolean = false) => {
            const span = endIdx - startIdx + 1;
            const startCol = (startIdx % 7) + 1;
            const row = Math.floor(startIdx / 7) + 2; // +2 because: row 1 is weekday headers
            
            eventLabels.push(
              <div
                key={`evt-${startIdx}-${label}`}
                className={`event-label${isMinNights ? ' min-nights' : ''}`}
                style={{
                  gridColumn: `${startCol} / span ${span}`,
                  gridRow: row,
                }}
              >
                {label}
              </div>
            );
          };

          // Process dates and build event labels
          dates.forEach((date, idx) => {
            const isNewRow = idx % 7 === 0;

            // Build cells
            if (!date) {
              cells.push(<div className="filler-date" key={`f-${idx}`}></div>);
              
              // Flush any ongoing event label
              if (currentLabel !== null && spanStart >= 0) {
                addEventLabel(spanStart, idx - 1, currentLabel, currentIsMinNights);
                currentLabel = null;
                spanStart = -1;
                currentIsMinNights = false;
              }
              return;
            }

            const dayState = getDateState(date, props.date, allBlockedDates, props.allowPastDates, props.allowSameDay);
            const info = getDayInfo(date, dayInfoMap);
            cells.push(
              <Dates
                key={date.toISOString()}
                date={date}
                dayState={dayState}
                label={null}
                dayInfo={info}
                onClick={(d) => props.setDate((prev) => nextSelectionOnClick(prev, d, allBlockedDates, props.allowPastDates, props.allowSameDay, props.minNights))}
              />
            );

            // Handle event labels
            const label = props.showEvents !== false && !isBeforeToday(date, props.allowPastDates) ? getEventLabel(date, eventMap) : null;
            
            // Check if this is a minNights event
            const dateStr = formatDate(date);
            const isMinNights = minNightsEventDates.has(dateStr);
            
            if (isNewRow && currentLabel !== null && spanStart >= 0) {
              // Flush previous label at row boundary
              addEventLabel(spanStart, idx - 1, currentLabel, currentIsMinNights);
              currentLabel = null;
              spanStart = -1;
              currentIsMinNights = false;
            }

            if (label) {
              if (label === currentLabel) {
                // Continue current label span
              } else {
                // Start new label
                if (currentLabel !== null && spanStart >= 0) {
                  addEventLabel(spanStart, idx - 1, currentLabel, currentIsMinNights);
                }
                currentLabel = label;
                spanStart = idx;
                currentIsMinNights = isMinNights;
              }
            } else {
              // No label for this date
              if (currentLabel !== null && spanStart >= 0) {
                addEventLabel(spanStart, idx - 1, currentLabel, currentIsMinNights);
                currentLabel = null;
                spanStart = -1;
                currentIsMinNights = false;
              }
            }
          });

          // Flush any remaining label
          if (currentLabel !== null && spanStart >= 0) {
            addEventLabel(spanStart, dates.length - 1, currentLabel, currentIsMinNights);
          }

          return [...eventLabels, ...cells];
        })()}
      </div>
    </div>
  );
};

export default Months;
