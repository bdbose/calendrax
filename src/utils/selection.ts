import type { SelectDateType, BlockedDates } from "../types/type";

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const compare = (a: Date, b: Date) => startOfDay(a).getTime() - startOfDay(b).getTime();

export const isBeforeToday = (d: Date, allowPastDates?: boolean) => {
  if (allowPastDates) return false;
  const today = startOfDay(new Date());
  return compare(d, today) < 0;
};

// Helper to convert Date to 'YYYY-MM-DD' format
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Check if a date is in the blocked dates list
export const isDateBlocked = (date: Date, blockedDates?: BlockedDates): boolean => {
  if (!blockedDates || blockedDates.length === 0) return false;
  const dateStr = formatDate(date);
  return blockedDates.includes(dateStr);
};

// Check if any blocked dates exist in a date range (inclusive)
export const hasBlockedDateInRange = (start: Date, end: Date, blockedDates?: BlockedDates): boolean => {
  if (!blockedDates || blockedDates.length === 0) return false;
  
  const current = new Date(start);
  const endTime = end.getTime();
  
  while (current.getTime() <= endTime) {
    if (isDateBlocked(current, blockedDates)) {
      return true;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return false;
};

export type DayState = "blocked" | "checkin" | "checkout" | "inRange" | "default";

export function getDateState(
  date: Date, 
  selection: SelectDateType, 
  blockedDates?: BlockedDates,
  allowPastDates?: boolean,
  allowSameDay?: boolean
): DayState {
  if (isBeforeToday(date, allowPastDates) || isDateBlocked(date, blockedDates)) return "blocked";
  const { checkin, checkout } = selection;
  if (checkin && compare(date, checkin) === 0) return "checkin";
  if (checkout && compare(date, checkout) === 0) {
    // If same day check-in/checkout allowed and it's the same date, show as checkout
    return "checkout";
  }
  if (checkin && checkout && compare(date, checkin) > 0 && compare(date, checkout) < 0) return "inRange";
  return "default";
}

export function nextSelectionOnClick(
  selection: SelectDateType, 
  clicked: Date, 
  blockedDates?: BlockedDates,
  allowPastDates?: boolean,
  allowSameDay?: boolean
): SelectDateType {
  const day = startOfDay(clicked);
  // Ignore blocked days
  if (isBeforeToday(day, allowPastDates) || isDateBlocked(day, blockedDates)) return selection;

  const { checkin, checkout } = selection;
  // No selection yet -> set checkin
  if (!checkin && !checkout) {
    return { checkin: day, checkout: null };
  }
  // Only checkin -> set checkout if after or equal; if before, move checkin
  if (checkin && !checkout) {
    const comparison = compare(day, checkin);
    
    // Same day selection
    if (comparison === 0) {
      if (allowSameDay) {
        return { checkin, checkout: day };
      }
      // If same day not allowed, do nothing
      return selection;
    }
    
    // After checkin
    if (comparison > 0) {
      // Check if there are any blocked dates between checkin and clicked date
      if (hasBlockedDateInRange(checkin, day, blockedDates)) {
        // Can't select this as checkout, start new selection
        return { checkin: day, checkout: null };
      }
      return { checkin, checkout: day };
    }
    
    // Before checkin - move checkin
    return { checkin: day, checkout: null };
  }
  // Both set -> start new selection with new checkin
  return { checkin: day, checkout: null };
}


