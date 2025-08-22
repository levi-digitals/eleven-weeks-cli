import {DigitFont, Position} from './types.js';

// 3x5 font (width 3, height 5). Use '#' for ON pixel, ' ' for off.
export const FONT: DigitFont = {
  '0': [
    '###',
    '# #',
    '# #',
    '# #',
    '###'
  ],
  '1': [
    ' ##',
    '  #',
    '  #',
    '  #',
    ' ###'
  ],
  '2': [
    '###',
    '  #',
    '###',
    '#  ',
    '###'
  ],
  '3': [
    '###',
    '  #',
    ' ##',
    '  #',
    '###'
  ],
  '4': [
    '# #',
    '# #',
    '###',
    '  #',
    '  #'
  ],
  '5': [
    '###',
    '#  ',
    '###',
    '  #',
    '###'
  ],
  '6': [
    '###',
    '#  ',
    '###',
    '# #',
    '###'
  ],
  '7': [
    '###',
    '  #',
    '  #',
    '  #',
    '  #'
  ],
  '8': [
    '###',
    '# #',
    '###',
    '# #',
    '###'
  ],
  '9': [
    '###',
    '# #',
    '###',
    '  #',
    '###'
  ]
};

// Map hour/minute digits to calendar positions.
// Hours: rows 0-4 (top five), Minutes: rows 6-10 (bottom five) after reversal.
// Columns sets: left digit cols 0-2, right digit cols 4-6.
export function timePositions(date: Date, hour12: boolean): Set<string> {
  let h = date.getHours();
  if (hour12) {
    h = h % 12; // 0..11 (show 0 as 0 for now)
  }
  const m = date.getMinutes();
  const digits = [
    Math.floor(h / 10),
    h % 10,
    Math.floor(m / 10),
    m % 10
  ].map(d => d.toString());
  const positions = new Set<string>();
  // digit ordering: hours tens, hours ones, minutes tens, minutes ones
  digits.forEach((digit, idx) => {
    const pattern = FONT[digit];
  const isHour = idx < 2;
  const baseRow = isHour ? 0 : 6; // hours top, minutes bottom
    const digitOffset = idx % 2; // 0 or 1 within its pair
    const baseCol = digitOffset === 0 ? 0 : 4; // 0-2 or 4-6
    for (let r = 0; r < 5; r++) {
      const line = pattern[r];
      for (let c = 0; c < 3; c++) {
        if (line[c] === '#') {
          const row = baseRow + r;
            const col = baseCol + c;
            // row 5 (separator) is skipped intentionally; mapping ensures rows 0-4 and 6-10 only
            positions.add(`${row},${col}`);
        }
      }
    }
  });
  return positions;
}

export function isTimePixelLit(row: number, col: number, date: Date, hour12: boolean): boolean {
  const set = timePositions(date, hour12);
  return set.has(`${row},${col}`);
}
