export type WeekStart = 0|1|2|3|4|5|6; // 0 = Sunday

export interface Theme {
  pastBg: string;
  currentWeekBg: string;
  futureBg: string;
  timeOnBg: string;
  timeOffBg: string;
  selectionBorderColor: string;
  todayBorderColor: string;
  todayTextColor: string;
  monthColTextColor: string;
  todayBg?: string; // optional distinct today background that overrides time color
  weekendHeaderTextColor?: string; // lighter color for weekend day names in header
}

export interface CalendarCell {
  date: Date;
  weekIndex: number; // 0..10 within the visible window
  dayIndex: number; // 0..6 within the week (relative to configured start)
  isToday: boolean;
  isSelected: boolean;
  isCurrentWeek: boolean;
}

export interface Position { row: number; col: number; }

export interface DigitFont {
  [digit: string]: string[]; // each string length 3 of ' #' characters, 5 rows per digit
}

export interface Config {
  weekStart: WeekStart;
  hour12: boolean;
  theme: Theme;
}
