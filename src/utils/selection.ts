import type { SelectDateType } from "../types/type";

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const compare = (a: Date, b: Date) => startOfDay(a).getTime() - startOfDay(b).getTime();

export const isBeforeToday = (d: Date) => {
  const today = startOfDay(new Date());
  return compare(d, today) < 0;
};

export type DayState = "blocked" | "checkin" | "checkout" | "inRange" | "default";

export function getDateState(date: Date, selection: SelectDateType): DayState {
  if (isBeforeToday(date)) return "blocked";
  const { checkin, checkout } = selection;
  if (checkin && compare(date, checkin) === 0) return "checkin";
  if (checkout && compare(date, checkout) === 0) return "checkout";
  if (checkin && checkout && compare(date, checkin) > 0 && compare(date, checkout) < 0) return "inRange";
  return "default";
}

export function nextSelectionOnClick(selection: SelectDateType, clicked: Date): SelectDateType {
  const day = startOfDay(clicked);
  // Ignore blocked days
  if (isBeforeToday(day)) return selection;

  const { checkin, checkout } = selection;
  // No selection yet -> set checkin
  if (!checkin && !checkout) {
    return { checkin: day, checkout: null };
  }
  // Only checkin -> set checkout if after or equal; if before, move checkin
  if (checkin && !checkout) {
    if (compare(day, checkin) >= 0) {
      return { checkin, checkout: day };
    }
    return { checkin: day, checkout: null };
  }
  // Both set -> start new selection with new checkin
  return { checkin: day, checkout: null };
}


