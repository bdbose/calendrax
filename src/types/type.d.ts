export type SelectDateType = {
  checkin: Date | null;
  checkout: Date | null;
};

export type MonthArrType = {
  month: number;
  year: number;
};

export type CalendarEvent = {
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  name: string;
  specific_teams?: string;
};

export type BlockedDates = string[]; // Array of dates in 'YYYY-MM-DD' format

export type DayInfo = {
  date: string; // YYYY-MM-DD
  text: string; // Text to display below the date
  textColor?: string; // Optional text color (default: inherit)
  backgroundColor?: string; // Optional background color for the info badge
};

export type MinNights = {
  [date: string]: number; // Key: 'YYYY-MM-DD', Value: minimum nights required
};
