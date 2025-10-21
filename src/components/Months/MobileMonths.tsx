import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import Months from ".";
import type { SelectDateType, BlockedDates } from "../../types/type";

type MobileMonthsProps = {
  startMonth?: number; // 1-12
  startYear?: number;
  count?: number; // initial number of months to render
  chunkSize?: number; // how many months to add when near edge
  maxHeightPx?: number; // container height
  events?: { start_date: string; end_date: string; name: string; specific_teams?: string }[];
  onChange?: (selection: SelectDateType) => void;
  showEvents?: boolean;
  blockedDates?: BlockedDates;
};

const MobileMonths = (props: MobileMonthsProps) => {
  const today = new Date();
  const base = useMemo(() => {
    const d = new Date(
      props.startYear ?? today.getFullYear(),
      (props.startMonth ?? today.getMonth() + 1) - 1,
      1
    );
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  }, [props.startMonth, props.startYear]);

  const initialCount = props.count ?? 6;
  const chunkSize = props.chunkSize ?? Math.max(3, Math.floor(initialCount / 2));

  // Offsets from base month: 0, 1, 2 ...; allow negatives for previous months
  const [offsets, setOffsets] = useState<number[]>(() =>
    Array.from({ length: initialCount }, (_, i) => i)
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selection, setSelection] = useState<SelectDateType>({ checkin: null, checkout: null });

  // Helper to compute year/month from offset
  const getYearMonthByOffset = (offset: number) => {
    const d = new Date(base.year, base.month - 1 + offset, 1);
    return { year: d.getFullYear(), month: d.getMonth() + 1 };
  };

  // Extend upwards (prepend negatives) and preserve scroll position to avoid jump
  const prependMore = () => {
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
        return (
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
          />
        );
      })}
    </div>
  );
};

export default MobileMonths;

