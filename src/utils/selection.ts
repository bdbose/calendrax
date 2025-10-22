import type { SelectDateType, BlockedDates, MinNights, CalendarType } from "../types/type";
import { meetsMinNights } from "./minNights";
import { formatDate } from "./dateHelpers";

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

// Re-export for backwards compatibility
export { formatDate };

// Check if a date is in the blocked dates list
export const isDateBlocked = (date: Date, blockedDates?: BlockedDates): boolean => {
  if (!blockedDates || blockedDates.length === 0) return false;
  const dateStr = formatDate(date);
  return blockedDates.includes(dateStr);
};

// Check if any blocked dates exist in a date range (inclusive)
// For hotel mode: exclude the end date from check (end date can be blocked as checkout)
export const hasBlockedDateInRange = (start: Date, end: Date, blockedDates?: BlockedDates, calendarType?: CalendarType): boolean => {
  if (!blockedDates || blockedDates.length === 0) return false;
  
  const current = new Date(start);
  const endTime = end.getTime();
  const isHotelMode = calendarType === "hotel";
  
  while (current.getTime() <= endTime) {
    // For hotel mode: allow end date to be blocked (checkout date)
    const isEndDate = current.getTime() === endTime;
    if (isHotelMode && isEndDate) {
      current.setDate(current.getDate() + 1);
      continue;
    }
    
    if (isDateBlocked(current, blockedDates)) {
      return true;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return false;
};

// Find first blocked date in range (used for hotel mode to auto-set checkout)
export const findFirstBlockedDateInRange = (start: Date, end: Date, blockedDates?: BlockedDates): Date | null => {
  if (!blockedDates || blockedDates.length === 0) return null;
  
  const current = new Date(start);
  const endTime = end.getTime();
  
  // Start checking from day after start
  current.setDate(current.getDate() + 1);
  
  while (current.getTime() <= endTime) {
    if (isDateBlocked(current, blockedDates)) {
      return new Date(current);
    }
    current.setDate(current.getDate() + 1);
  }
  
  return null;
};

export type DayState = "blocked" | "checkin" | "checkout" | "inRange" | "strikethrough" | "default";

export function getDateState(
  date: Date, 
  selection: SelectDateType, 
  blockedDates?: BlockedDates,
  allowPastDates?: boolean,
  allowSameDay?: boolean,
  strikethroughDates?: string[],
  calendarType?: CalendarType
): DayState {
  const isHotelMode = calendarType === "hotel";
  const { checkin, checkout } = selection;
  const dateIsBlocked = isDateBlocked(date, blockedDates);
  
  // For hotel mode: blocked date can be checkout if we have checkin selected
  if (dateIsBlocked && isHotelMode && checkin && !checkout) {
    // This blocked date could be a potential checkout
    if (compare(date, checkin) > 0) {
      return "default"; // Allow selection as checkout
    }
  }
  
  // Regular blocking logic
  if (isBeforeToday(date, allowPastDates) || dateIsBlocked) return "blocked";
  
  // Check if this date should be struck through (can't select as checkout but can click through)
  if (strikethroughDates && strikethroughDates.length > 0) {
    const dateStr = formatDate(date);
    if (strikethroughDates.includes(dateStr)) return "strikethrough";
  }
  
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
  allowSameDay?: boolean,
  minNights?: MinNights,
  strikethroughDates?: string[],
  calendarType?: CalendarType
): SelectDateType {
  const day = startOfDay(clicked);
  const isHotelMode = calendarType === "hotel";
  const { checkin, checkout } = selection;
  const dayIsBlocked = isDateBlocked(day, blockedDates);
  
  // For hotel mode: allow blocked date as checkout if we have checkin
  if (dayIsBlocked && isHotelMode && checkin && !checkout) {
    if (compare(day, checkin) > 0) {
      // This is a valid checkout on a blocked date
      // Check if there are blocked dates between checkin and this date (excluding this date)
      const dayBefore = new Date(day);
      dayBefore.setDate(dayBefore.getDate() - 1);
      
      if (hasBlockedDateInRange(checkin, dayBefore, blockedDates, calendarType)) {
        // There's a blocked date in between, can't use this as checkout
        return { checkin: day, checkout: null }; // Start new selection
      }
      
      // Check minimum nights
      if (!meetsMinNights(checkin, day, minNights, blockedDates)) {
        return selection;
      }
      
      return { checkin, checkout: day };
    }
  }
  
  // Regular blocked day handling
  if (isBeforeToday(day, allowPastDates) || dayIsBlocked) return selection;

  // If clicking a strikethrough date when we have check-in but no checkout, ignore it
  if (strikethroughDates && strikethroughDates.length > 0 && checkin && !checkout) {
    const dateStr = formatDate(day);
    if (strikethroughDates.includes(dateStr)) {
      return selection;
    }
  }
  
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
        if (meetsMinNights(checkin, day, minNights, blockedDates)) {
          return { checkin, checkout: day };
        }
        return selection;
      }
      return selection;
    }
    
    // After checkin
    if (comparison > 0) {
      // For hotel mode: check if there's a blocked date before the clicked date
      // If yes, make that blocked date the checkout
      if (isHotelMode) {
        const firstBlocked = findFirstBlockedDateInRange(checkin, day, blockedDates);
        if (firstBlocked) {
          // Found a blocked date, use it as checkout
          if (!meetsMinNights(checkin, firstBlocked, minNights, blockedDates)) {
            return selection;
          }
          return { checkin, checkout: firstBlocked };
        }
      }
      
      // Check if there are any blocked dates between checkin and clicked date
      if (hasBlockedDateInRange(checkin, day, blockedDates, calendarType)) {
        // Can't select this as checkout, start new selection
        return { checkin: day, checkout: null };
      }
      
      // Check minimum nights requirement
      if (!meetsMinNights(checkin, day, minNights, blockedDates)) {
        return selection;
      }
      
      return { checkin, checkout: day };
    }
    
    // Before checkin - move checkin
    return { checkin: day, checkout: null };
  }
  
  // Both set -> start new selection with new checkin
  return { checkin: day, checkout: null };
}


