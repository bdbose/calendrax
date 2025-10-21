import type { DayInfo } from "../types/type";
import { formatDate } from "./selection";

export function buildDayInfoMap(dayInfoArray?: DayInfo[]): Map<string, DayInfo> | undefined {
  if (!dayInfoArray || dayInfoArray.length === 0) return undefined;
  
  const map = new Map<string, DayInfo>();
  dayInfoArray.forEach((info) => {
    map.set(info.date, info);
  });
  
  return map;
}

export function getDayInfo(date: Date, dayInfoMap?: Map<string, DayInfo>): DayInfo | null {
  if (!dayInfoMap) return null;
  
  const dateStr = formatDate(date);
  return dayInfoMap.get(dateStr) || null;
}

