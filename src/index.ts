export { default as Months } from "./components/Months";
export { default as Dates } from "./components/Dates";
export { generateCalendarDatesTrimmed } from "./utils/generateMonth";

export type { SelectDateType, MonthArrType, CalendarEvent } from "./types/type";
export { default as MonthView } from "./components/MonthView";
export { default as DesktopMonths } from "./components/Months/DesktopMonths";
export { default as MobileMonths } from "./components/Months/MobileMonths";
export { getDateState, nextSelectionOnClick } from "./utils/selection";
export { buildEventMap, getEventLabel } from "./utils/events";
export { default as DatePicker } from "./components/DatePicker";

