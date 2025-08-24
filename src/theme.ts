import {Theme} from './types.js';

// Default theme updated to user-provided palette:
// Green:  #5EBD3E
// Yellow: #FFB900
// Orange: #F78200
// Red:    #E23838
// Purple: #973999
// Blue:   #009CDF
// Mapping rationale:
//  - pastBg: calmer Green
//  - currentWeekBg: emphasis Yellow
//  - futureBg: Orange progression
//  - timeOnBg: Blue (contrasts with warm backgrounds)
//  - selection & today accents use Red for high visibility; today fill uses Purple.
export const defaultTheme: Theme = {
  pastBg: '#333',             // Gray for inactive (past) days
  currentWeekBg: '#FFB900',   // Yellow for current week emphasis
  futureBg: '#333',           // Same gray for inactive (future) days
  timeOnBg: '#009CDF',        // Blue (active time pixels)
  timeOffBg: '#222',          // Neutral dark fallback
  selectionBorderColor: '#E23838', // Red border for selection
  todayBorderColor: '#E23838',     // Red border for today
  todayTextColor: '#E23838',       // Red text for today
  monthColTextColor: '#973999',    // Purple
  todayBg: '#973999'               // Purple fill for today overriding time color
};
