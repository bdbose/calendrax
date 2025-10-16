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
