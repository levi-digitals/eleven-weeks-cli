import {CalendarCell, Config, WeekStart} from './types.js';

export function startOfDay(d: Date): Date { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

export function addDays(d: Date, days: number): Date { const nd = new Date(d); nd.setDate(d.getDate() + days); return nd; }

function getWeekdayShifted(date: Date, weekStart: WeekStart): number {
  const wd = date.getDay();
  return (wd - weekStart + 7) % 7; // 0..6 relative to configured week start
}

export interface CalendarWindow {
  weeks: Date[][]; // 11 arrays of 7 Date objects
  anchorWeekIndex: number; // index (0..10) of current week (should be 3 per spec after generation)
  selectedDate: Date;
}

export function generateWindow(today: Date, weekStart: WeekStart): CalendarWindow {
  // Determine current week Monday/Sunday/etc based on weekStart
  const shift = getWeekdayShifted(today, weekStart); // position within week
  const weekStartDate = addDays(startOfDay(today), -shift);
  // We want 3 previous weeks, 0-based index 3 will be current week
  const firstVisibleWeekStart = addDays(weekStartDate, -7 * 3);
  const weeks: Date[][] = [];
  for (let w = 0; w < 11; w++) {
    const ws = addDays(firstVisibleWeekStart, w * 7);
    const days: Date[] = [];
    for (let d = 0; d < 7; d++) days.push(addDays(ws, d));
    weeks.push(days);
  }
  return { weeks, anchorWeekIndex: 3, selectedDate: today };
}

export function mapCells(win: CalendarWindow, config: Config): CalendarCell[] {
  const today = startOfDay(new Date());
  const selDay = startOfDay(win.selectedDate);
  return win.weeks.flatMap((week, wIdx) => week.map((date, dIdx) => {
    const dateDay = startOfDay(date);
    return {
      date,
      weekIndex: wIdx,
      dayIndex: dIdx,
      isToday: dateDay.getTime() === today.getTime(),
      isSelected: dateDay.getTime() === selDay.getTime(),
      isCurrentWeek: wIdx === win.anchorWeekIndex
    } satisfies CalendarCell;
  }));
}

export function moveSelection(win: CalendarWindow, deltaDays: number): CalendarWindow {
  const newSelected = addDays(win.selectedDate, deltaDays);
  // If selection drifts outside visible window (beyond first or last week) we shift window
  const first = win.weeks[0][0];
  const last = win.weeks[win.weeks.length - 1][6];
  if (newSelected < first) {
    // shift up by weeks until included
    const diffDays = Math.floor((first.getTime() - newSelected.getTime()) / 86400000);
    const weeksToAdd = Math.ceil(diffDays / 7);
    return regenerate(newSelected, win, -weeksToAdd);
  }
  if (newSelected > last) {
    const diffDays = Math.floor((newSelected.getTime() - last.getTime()) / 86400000);
    const weeksToAdd = Math.ceil(diffDays / 7);
    return regenerate(newSelected, win, weeksToAdd);
  }
  return { ...win, selectedDate: newSelected };
}

function regenerate(anchorDate: Date, old: CalendarWindow, directionWeeks: number): CalendarWindow {
  // Recompute window so that anchorDate's week is still at index 3
  return generateWindow(anchorDate,  (old.weeks[0][0].getDay() as WeekStart));
}

export function monthLabelForWeek(week: Date[]): string {
  // Use Thursday as representative (ISO style mid-week). Thursday index relative to weekStart unknown; simpler: pick 4th day index 3
  const representative = week[3];
  return representative.toLocaleDateString(undefined, { month: 'short' });
}
