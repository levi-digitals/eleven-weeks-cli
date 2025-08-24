# eleven-weeks-cli

A command that will generate a calendar in the cli which displays 11 weeks worth.
The calendar dsplayed will also be used to display the current time by using the date background color.

## Goal

- A command that will generate a calendar worth 11 weeks (+1 row header, +1 column).
  - Header will the days of the week
  - The 1st, 2nd and 3rd row are the previous weeks
  - The 4th row will be the current week
  - The 5th to 11th weeks will be the upcoming weeks
  - The 8th column will indicate the current month of the week
- The calendar dsplayed will also be used to display the current time like a digital watch by using the dates background color.
  - The time will only have the minute and hour
  - Both minute and hour have leading zeros
  - The minute and hour will use the 1st, 2nd, 3rd, 5th, 6th and 7th columns
  - The minute will use the 1st, 2nd, 3rd, 4th, 5th rows
  - Th hour will use the 7th, 8th, 9th, 10th and 11th rows
- The days will be traversible using the arrow keys from the keyboard
  - By default, the current day is selected and the starting point
- Provision so that the following are configurables
  - Overall color theme (by default dark monotone)
  - Starting day of the week
  - Current day color
    - Bright border and text
  - Time color theme
  - Time can be 12-hour or 24 hour (24 hour default)

## Tech stack

- NodeJS
- TypeScript
- [InkJS](https://github.com/vadimdemedes/ink)

## Coding Rules

- Always use TypeScript when generating codes
- Always use Types
