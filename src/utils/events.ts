import type { CalendarEvent } from "../types/type";

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const toKey = (d: Date) => startOfDay(d).toISOString().slice(0, 10);

export function buildEventMap(events: CalendarEvent[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const ev of events) {
    const start = startOfDay(new Date(ev.start_date));
    const end = startOfDay(new Date(ev.end_date));
    for (let cur = new Date(start); cur <= end; cur.setDate(cur.getDate() + 1)) {
      const key = toKey(cur);
      const list = map.get(key) ?? [];
      if (!list.includes(ev.name)) list.push(ev.name);
      map.set(key, list);
    }
  }
  return map;
}

export function getEventLabel(date: Date, map?: Map<string, string[]>): string | null {
  if (!map) return null;
  const key = toKey(date);
  const names = map.get(key);
  if (!names || names.length === 0) return null;
  return names.join(", ");
}


