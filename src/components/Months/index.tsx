import { useEffect, useState, useMemo } from "react";
import "./styles.css";
import { generateCalendarDatesTrimmed } from "../../utils/generateMonth";
import Dates from "../Dates";
import type { SelectDateType } from "../../types/type";
import { getDateState, nextSelectionOnClick, isBeforeToday } from "../../utils/selection";
import { buildEventMap, getEventLabel } from "../../utils/events";

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

  const eventMap = useMemo(() => (props.events ? buildEventMap(props.events) : undefined), [props.events]);

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

          const addEventLabel = (startIdx: number, endIdx: number, label: string) => {
            const span = endIdx - startIdx + 1;
            const startCol = (startIdx % 7) + 1;
            const row = Math.floor(startIdx / 7) + 2; // +2 because: row 1 is weekday headers
            
            eventLabels.push(
              <div
                key={`evt-${startIdx}-${label}`}
                className="event-label"
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
                addEventLabel(spanStart, idx - 1, currentLabel);
                currentLabel = null;
                spanStart = -1;
              }
              return;
            }

            const dayState = getDateState(date, props.date);
            cells.push(
              <Dates
                key={date.toISOString()}
                date={date}
                dayState={dayState}
                label={null}
                onClick={(d) => props.setDate((prev) => nextSelectionOnClick(prev, d))}
              />
            );

            // Handle event labels
            const label = props.showEvents !== false && !isBeforeToday(date) ? getEventLabel(date, eventMap) : null;
            
            if (isNewRow && currentLabel !== null && spanStart >= 0) {
              // Flush previous label at row boundary
              addEventLabel(spanStart, idx - 1, currentLabel);
              currentLabel = null;
              spanStart = -1;
            }

            if (label) {
              if (label === currentLabel) {
                // Continue current label span
              } else {
                // Start new label
                if (currentLabel !== null && spanStart >= 0) {
                  addEventLabel(spanStart, idx - 1, currentLabel);
                }
                currentLabel = label;
                spanStart = idx;
              }
            } else {
              // No label for this date
              if (currentLabel !== null && spanStart >= 0) {
                addEventLabel(spanStart, idx - 1, currentLabel);
                currentLabel = null;
                spanStart = -1;
              }
            }
          });

          // Flush any remaining label
          if (currentLabel !== null && spanStart >= 0) {
            addEventLabel(spanStart, dates.length - 1, currentLabel);
          }

          return [...eventLabels, ...cells];
        })()}
      </div>
    </div>
  );
};

export default Months;
