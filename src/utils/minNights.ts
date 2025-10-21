import type { MinNights, CalendarEvent } from "../types/type";
import { formatDate } from "./dateHelpers";

// Get minimum nights requirement for a check-in date
export function getMinNights(checkinDate: Date, minNights?: MinNights): number | null {
  if (!minNights) return null;
  
  const dateStr = formatDate(checkinDate);
  return minNights[dateStr] ?? null;
}

// Calculate number of nights between check-in and check-out
export function calculateNights(checkin: Date, checkout: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const checkinTime = new Date(checkin).setHours(0, 0, 0, 0);
  const checkoutTime = new Date(checkout).setHours(0, 0, 0, 0);
  return Math.round((checkoutTime - checkinTime) / msPerDay);
}

// Validate if checkout date meets minimum nights requirement
export function meetsMinNights(
  checkin: Date | null,
  checkout: Date | null,
  minNights?: MinNights
): boolean {
  if (!checkin || !checkout || !minNights) return true;
  
  const minRequired = getMinNights(checkin, minNights);
  if (minRequired === null) return true;
  
  const nights = calculateNights(checkin, checkout);
  return nights >= minRequired;
}

// Generate automatic event labels for dates with minimum night restrictions
export function generateMinNightsEvents(minNights?: MinNights): CalendarEvent[] {
  if (!minNights) return [];
  
  const events: CalendarEvent[] = [];
  
  Object.entries(minNights).forEach(([date, nights]) => {
    events.push({
      start_date: date,
      end_date: date,
      name: `Min ${nights} Night${nights > 1 ? 's' : ''}`,
      specific_teams: "Min Stay Requirement"
    });
  });
  
  return events;
}

