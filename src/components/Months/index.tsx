import { useEffect, useState, useMemo } from "react";
import "./styles.css";
import { generateCalendarDatesTrimmed } from "../../utils/generateMonth";
import Dates from "../Dates";
import type { SelectDateType, BlockedDates, DayInfo, MinNights, CalendarType } from "../../types/type";
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
  calendarType?: CalendarType;
  cellWidth?: number;
  cellHeight?: number;
  showLeftArrow?: boolean;
  showRightArrow?: boolean;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  showEventsList?: boolean;
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
  
  // Get dates to strike through (blocked by minimum nights restriction)
  const strikethroughDates = useMemo(() => 
    getBlockedDatesFromMinNights(props.date.checkin, props.minNights, props.blockedDates),
    [props.date.checkin, props.minNights, props.blockedDates]
  );

  const cellWidth = props.cellWidth ?? 80;
  const cellHeight = props.cellHeight ?? 80;
  const gap = 2; // Gap between cells

  // Calculate night stay text
  const nightStayText = useMemo(() => {
    if (!props.date.checkin || !props.date.checkout) return null;
    const nights = Math.floor((props.date.checkout.getTime() - props.date.checkin.getTime()) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return null;
    return `${nights}-night stay`;
  }, [props.date.checkin, props.date.checkout]);

  // Filter events for this month (for events list)
  const monthEvents = useMemo(() => {
    if (!props.showEventsList || !props.events) return [];
    
    const monthStart = new Date(props.year, props.month - 1, 1);
    const monthEnd = new Date(props.year, props.month, 0);
    
    return props.events.filter(event => {
      const eventStart = new Date(event.start_date);
      const eventEnd = new Date(event.end_date);
      
      // Event overlaps with this month
      return (eventStart <= monthEnd && eventEnd >= monthStart);
    }).map(event => ({
      ...event,
      start: new Date(event.start_date),
      end: new Date(event.end_date)
    })).sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [props.showEventsList, props.events, props.year, props.month]);

  return (
    <div className="month-container">
      <div className="month-header-wrapper">
        {props.showLeftArrow && (
          <button className="month-nav-arrow left" onClick={props.onPrevMonth}>
            ←
          </button>
        )}
        <span className="month-name-wrapper">
          {months[props.month-1]} {props.year}
        </span>
        {props.showRightArrow && (
          <button className="month-nav-arrow right" onClick={props.onNextMonth}>
            →
          </button>
        )}
      </div>
      <div 
        className="month-wrapper"
        style={{
          gridTemplateColumns: `repeat(7, ${cellWidth}px)`,
          gridAutoRows: `${cellHeight}px`,
          gap: `${gap}px`,
        }}
      >
        {week.map((e) => {
          return (
            <div 
              className="week-wrapper" 
              key={`wk-${e}`}
              style={{ width: `${cellWidth}px` }}
            >
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
                title={label}
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
              cells.push(
                <div 
                  className="filler-date" 
                  key={`f-${idx}`}
                  style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
                ></div>
              );
              
              // Flush any ongoing event label
              if (currentLabel !== null && spanStart >= 0) {
                addEventLabel(spanStart, idx - 1, currentLabel, currentIsMinNights);
                currentLabel = null;
                spanStart = -1;
                currentIsMinNights = false;
              }
              return;
            }

            const dayState = getDateState(date, props.date, props.blockedDates, props.allowPastDates, props.allowSameDay, strikethroughDates, props.calendarType);
            const info = getDayInfo(date, dayInfoMap);
            cells.push(
              <Dates
                key={date.toISOString()}
                date={date}
                dayState={dayState}
                label={null}
                dayInfo={info}
                cellWidth={cellWidth}
                cellHeight={cellHeight}
                onClick={(d) => props.setDate((prev) => nextSelectionOnClick(prev, d, props.blockedDates, props.allowPastDates, props.allowSameDay, props.minNights, strikethroughDates, props.calendarType))}
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
      
      {/* Night stay display */}
      {nightStayText && (
        <div className="night-stay-display">
          {nightStayText}
        </div>
      )}
      
      {/* Events list below month */}
      {props.showEventsList && monthEvents.length > 0 && (
        <div className="month-events-list">
          {monthEvents.map((event, idx) => (
            <div key={idx} className="month-event-item">
              <span className="event-dot">●</span>
              <span className="event-date">
                {event.start.getDate()} {months[event.start.getMonth()]}
                {event.start.getMonth() !== event.end.getMonth() || event.start.getDate() !== event.end.getDate() 
                  ? ` - ${event.end.getDate()} ${months[event.end.getMonth()]}`
                  : ''}
              </span>
              <span className="event-name" title={event.name}>{event.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Months;
