export function generateCalendarDatesTrimmed(
  year: number,
  month: number // 1-12 (user-facing month number)
): (Date | null)[] {
  // Convert user-facing month (1-12) to JS month index (0-11)
  const monthIndex = month - 1;
  
  // Compute offset for Monday-start week: Monday=0 ... Sunday=6
  const jsDay = new Date(year, monthIndex, 1).getDay(); // 0=Sun ... 6=Sat
  const firstDayOfMonth = (jsDay + 6) % 7; // shift so Mon=0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  let result: (Date | null)[] = [];

  // Leading nulls for previous month days
  for (let i = 0; i < firstDayOfMonth; i++) {
    result.push(null);
  }

  // Current month days as full Date objects
  for (let day = 1; day <= daysInMonth; day++) {
    result.push(new Date(year, monthIndex, day));
  }

  return result;
}
