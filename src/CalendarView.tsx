import React, {useEffect, useState, ReactElement} from 'react';
import {Box, Text} from 'ink';
import {CalendarCell, Config} from './types.js';
import {isTimePixelLit} from './digits.js';
import {monthLabelForWeek, startOfDay} from './calendar.js';

interface Props {
  cells: CalendarCell[];
  config: Config;
  weeks: Date[][];
  date: Date;
}

const dayNames = (weekStart: number) => {
  const base = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return [...base.slice(weekStart), ...base.slice(0, weekStart)];
};

export const CalendarView = ({cells, config, weeks, date}: Props): ReactElement => {
  const [now, setNow] = useState(date);
  useEffect(() => {
    const update = () => setNow(new Date());
    const ms = 60000 - (Date.now() % 60000) + 50; // fudge 50ms
    const t = setTimeout(() => {
      update();
      const interval = setInterval(update, 60000);
      return () => clearInterval(interval);
    }, ms);
    return () => clearTimeout(t);
  }, []);
  const lit = new Set<string>();
  const timeSet = isTimePixelLit; // wrapper
  // Convert cells to matrix by weekIndex/dayIndex
  const matrix: CalendarCell[][] = Array.from({length:11},()=>Array(7));
  cells.forEach(c => { matrix[c.weekIndex][c.dayIndex] = c; });
  const monthLabels = weeks.map(w => monthLabelForWeek(w));
  // Determine first week index for each month label to show it only once.
  const shownMonthAt: Record<string, number> = {};
  const showLabelForWeek: boolean[] = monthLabels.map((label, idx) => {
    if (shownMonthAt[label] === undefined) {
      shownMonthAt[label] = idx;
      return true;
    }
    return false;
  });

  // Helper to compute week starts for identifying current week (today's week).
  const weekStartOf = (d: Date) => {
    const shift = (d.getDay() - config.weekStart + 7) % 7;
    return startOfDay(new Date(d.getFullYear(), d.getMonth(), d.getDate() - shift));
  };
  const todayWeekStart = weekStartOf(startOfDay(new Date()));

  return (
    <Box flexDirection="column">
      {/* Header */}
      <Box>
        {dayNames(config.weekStart).map((n, idx) => {
          // Determine original weekday index (0=Sun..6=Sat) after shift
          const originalIndex = (config.weekStart + idx) % 7;
          const isWeekend = originalIndex === 0 || originalIndex === 6;
          const weekendColor = config.theme.weekendHeaderTextColor;
          const textColor = isWeekend ? '#000' : undefined;
          const backgroundColor = isWeekend ? weekendColor : undefined;
          return (
            <Box key={n} width={4} justifyContent="center"><Text color={textColor} backgroundColor={backgroundColor}>{n}</Text></Box>
          );
        })}
  <Box width={6} justifyContent="center"><Text></Text></Box>
      </Box>
      {matrix.map((week, wIdx) => {
        const firstCellDate = week[0]?.date ?? new Date();
        const thisWeekStart = weekStartOf(firstCellDate);
        const isCurrentCalendarWeek = thisWeekStart.getTime() === todayWeekStart.getTime();
        return (
        <Box key={wIdx}>
          {week.map((cell, dIdx) => {
            const rowForTime = wIdx; // 0..10
            const litOn = timeSet(rowForTime, dIdx, now, config.hour12);
            const isSeparatorRow = wIdx === 5; // row 6 visual
            let bg: string | undefined;
            if (isSeparatorRow) {
              bg = undefined;
            } else {
              const cmp = thisWeekStart.getTime() - todayWeekStart.getTime();
              if (cell.isToday && config.theme.todayBg) {
                bg = config.theme.todayBg; // strongest highlight stays on today regardless
              } else if (litOn) {
                bg = config.theme.timeOnBg;
              } else if (cmp === 0) {
                bg = config.theme.currentWeekBg; // actual current week
              } else if (cmp < 0) {
                bg = config.theme.pastBg;
              } else {
                bg = config.theme.futureBg;
              }
            }
            const dayNum = cell.date.getDate();
            let content = dayNum.toString().padStart(2,' ');
            let color: string | undefined;
            if (cell.isToday) color = config.theme.todayTextColor;
            // Revert borders: only selected day shows square brackets, others have spaces.
            const borderLeft = cell.isSelected ? '[' : ' ';
            const borderRight = cell.isSelected ? ']' : ' ';
            return (
              <Box key={dIdx} width={4} justifyContent="center">
                <Text color={color} backgroundColor={bg}>{borderLeft}{content}{borderRight}</Text>
              </Box>
            );
          })}
          {/* Month label column */}
          <Box width={6} justifyContent="center">
            <Text>
              {showLabelForWeek[wIdx] ? (
                <Text color={config.theme.monthColTextColor}>{monthLabels[wIdx]} </Text>
              ) : null}
              {isCurrentCalendarWeek && (
                <Text color={config.theme.currentWeekBg}>●</Text>
              )}
            </Text>
          </Box>
        </Box>
      )})}
    </Box>
  );
};
