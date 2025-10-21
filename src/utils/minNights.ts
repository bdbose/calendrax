import type { MinNights, CalendarEvent, BlockedDates } from "../types/type";
import { formatDate } from "./dateHelpers";

// Check if any blocked dates exist in the next n days from a date
export function hasBlockedDatesInMinNightsRange(
  checkinDate: Date, 
  minNights: number, 
  blockedDates?: BlockedDates
): boolean {
  if (!blockedDates || blockedDates.length === 0) return false;
  
  const checkinTime = new Date(checkinDate).setHours(0, 0, 0, 0);
  
  // Check each day in the range (excluding check-in day itself)
  for (let i = 1; i <= minNights; i++) {
    const date = new Date(checkinTime + i * 24 * 60 * 60 * 1000);
    const dateStr = formatDate(date);
    if (blockedDates.includes(dateStr)) {
      return true;
    }
  }
  
  return false;
}

// Get minimum nights requirement for a check-in date
// Returns null if there are blocked dates in the range
export function getMinNights(
  checkinDate: Date, 
  minNights?: MinNights, 
  blockedDates?: BlockedDates
): number | null {
  if (!minNights) return null;
  
  const dateStr = formatDate(checkinDate);
  const minRequired = minNights[dateStr];
  
  if (!minRequired) return null;
  
  // Check if there are any blocked dates in the next n nights
  if (hasBlockedDatesInMinNightsRange(checkinDate, minRequired, blockedDates)) {
    return null; // Don't apply minimum nights if there are blocked dates
  }
  
  return minRequired;
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
  minNights?: MinNights,
  blockedDates?: BlockedDates
): boolean {
  if (!checkin || !checkout || !minNights) return true;
  
  const minRequired = getMinNights(checkin, minNights, blockedDates);
  if (minRequired === null) return true;
  
  const nights = calculateNights(checkin, checkout);
  return nights >= minRequired;
}

// Get dates that should be blocked due to minimum nights restriction
export function getBlockedDatesFromMinNights(
  checkin: Date | null,
  minNights?: MinNights,
  blockedDates?: BlockedDates
): string[] {
  if (!checkin || !minNights) return [];
  
  const minRequired = getMinNights(checkin, minNights, blockedDates);
  if (minRequired === null) return [];
  
  const blockedByMinNights: string[] = [];
  const checkinTime = new Date(checkin).setHours(0, 0, 0, 0);
  
  // Block the next (minRequired - 1) dates
  for (let i = 1; i < minRequired; i++) {
    const date = new Date(checkinTime + i * 24 * 60 * 60 * 1000);
    blockedByMinNights.push(formatDate(date));
  }
  
  return blockedByMinNights;
}

// Generate automatic event labels for dates with minimum night restrictions
// Only show for the currently selected check-in date
export function generateMinNightsEvents(
  minNights?: MinNights, 
  checkinDate?: Date | null,
  blockedDates?: BlockedDates
): CalendarEvent[] {
  if (!minNights || !checkinDate) return [];
  
  const checkinStr = formatDate(checkinDate);
  const minRequired = minNights[checkinStr];
  
  if (!minRequired) return [];
  
  // Check if there are blocked dates in range - if so, don't show the event
  if (hasBlockedDatesInMinNightsRange(checkinDate, minRequired, blockedDates)) {
    return [];
  }
  
  return [{
    start_date: checkinStr,
    end_date: checkinStr,
    name: `Min ${minRequired} Night${minRequired > 1 ? 's' : ''}`,
    specific_teams: "minNightsRestriction" // Special marker for styling
  }];
}

