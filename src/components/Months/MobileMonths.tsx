import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import Months from ".";
import type { SelectDateType, BlockedDates, DayInfo, MinNights, CalendarType } from "../../types/type";

type MobileMonthsProps = {
  dates: SelectDateType;
  startMonth?: number; // 1-12
  startYear?: number;
  count?: number; // initial number of months to render
  chunkSize?: number; // how many months to add when near edge
  maxHeightPx?: number; // container height
  events?: { start_date: string; end_date: string; name: string; specific_teams?: string }[];
  onChange?: (selection: SelectDateType) => void;
  showEvents?: boolean;
  blockedDates?: BlockedDates;
  allowPastDates?: boolean;
  allowSameDay?: boolean;
  dayInfo?: DayInfo[];
  minNights?: MinNights;
  calendarType?: CalendarType;
};

const MobileMonths = (props: MobileMonthsProps) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  
  const base = useMemo(() => {
    let startYear = props.startYear ?? currentYear;
    let startMonth = (props.startMonth ?? currentMonth);
    
    // If allowPastDates is false, ensure we don't start before current month
    if (!props.allowPastDates) {
      const startDate = new Date(startYear, startMonth - 1, 1);
      const todayDate = new Date(currentYear, currentMonth - 1, 1);
      if (startDate < todayDate) {
        startYear = currentYear;
        startMonth = currentMonth;
      }
    }
    
    const d = new Date(startYear, startMonth - 1, 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  }, [props.startMonth, props.startYear, props.allowPastDates, currentMonth, currentYear]);

  const initialCount = props.count ?? 6;
  const chunkSize = props.chunkSize ?? Math.max(3, Math.floor(initialCount / 2));

  // Offsets from base month: 0, 1, 2 ...; allow negatives for previous months only if allowPastDates is true
  const [offsets, setOffsets] = useState<number[]>(() =>
    Array.from({ length: initialCount }, (_, i) => i)
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Helper to compute year/month from offset
  const getYearMonthByOffset = (offset: number) => {
    const d = new Date(base.year, base.month - 1 + offset, 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  };

  // Extend upwards (prepend negatives) and preserve scroll position to avoid jump
  const prependMore = () => {
    // If allowPastDates is false, don't prepend months before current month
    if (!props.allowPastDates) {
      const minOffset = offsets[0] ?? 0;
      const firstMonthDate = new Date(base.year, base.month - 1 + minOffset, 1);
      const todayDate = new Date(currentYear, currentMonth - 1, 1);
      
      // If the first month would be before today, don't prepend
      if (firstMonthDate <= todayDate) {
        return;
      }
    }
    
    const node = containerRef.current;
    if (!node) return;
    const prevScrollHeight = node.scrollHeight;
    const minOffset = offsets[0] ?? 0;
    const newOffsets = Array.from({ length: chunkSize }, (_, i) => minOffset - (i + 1)).reverse();
    setOffsets((cur) => [...newOffsets, ...cur]);
    // Next frame after DOM updates, adjust scrollTop by height delta
    requestAnimationFrame(() => {
      const delta = node.scrollHeight - prevScrollHeight;
      node.scrollTop += delta;
    });
  };

  // Extend downwards (append positive offsets)
  const appendMore = () => {
    const maxOffset = offsets[offsets.length - 1] ?? 0;
    const newOffsets = Array.from({ length: chunkSize }, (_, i) => maxOffset + (i + 1));
    setOffsets((cur) => [...cur, ...newOffsets]);
  };

  // On mount, center scroll roughly to middle to give space for both directions
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    // Small timeout to ensure layout measured
    const id = requestAnimationFrame(() => {
      node.scrollTop = Math.floor(node.scrollHeight * 0.1);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const onScroll = () => {
    const node = containerRef.current;
    if (!node) return;
    const threshold = 200; // px
    if (node.scrollTop < threshold) {
      prependMore();
    } else if (node.scrollHeight - (node.scrollTop + node.clientHeight) < threshold) {
      appendMore();
    }
  };

  const height = props.maxHeightPx ?? 640;

  return (
    <div
      className="mobile-months"
      ref={containerRef}
      onScroll={onScroll}
      style={{ overflowY: "auto", maxHeight: `${height}px` }}
    >
      {offsets.map((off) => {
        const { year, month } = getYearMonthByOffset(off);
        
        // Skip rendering past months if allowPastDates is false
        if (!props.allowPastDates) {
          const monthDate = new Date(year, month - 1, 1);
          const todayDate = new Date(currentYear, currentMonth - 1, 1);
          if (monthDate < todayDate) {
            return null;
          }
        }
        
        return (
          <Months
            key={`${year}-${month}`}
            date={props.dates}
            setDate={(action) => {
              // Handle both function and direct value updates
              const newDates = typeof action === 'function' ? action(props.dates) : action;
              if (props.onChange) {
                props.onChange(newDates);
              }
            } }
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
            calendarType={props.calendarType} isMobile={true}          />
        );
      })}
    </div>
  );
};

export default MobileMonths;

