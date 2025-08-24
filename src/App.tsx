import React, {useEffect, useState, useRef} from 'react';
import {useInput} from 'ink';
import {defaultTheme, grayTheme} from './theme.js';
import {CalendarView} from './CalendarView.js';
import {Config, WeekStart} from './types.js';
import {generateWindow, mapCells, moveSelection} from './calendar.js';

interface Props { weekStart?: number; hour12?: boolean; themeName?: string; }

export const App = ({weekStart = 1, hour12 = false, themeName}: Props) => {
  const ws = (weekStart as WeekStart);
  const theme = themeName === 'gray' ? grayTheme : defaultTheme;
  const [config] = useState<Config>({
    weekStart: ws,
    hour12,
    theme
  });
  const [win, setWin] = useState(()=>generateWindow(new Date(), ws));
  const [now, setNow] = useState(new Date());
  useEffect(()=>{
    const id = setInterval(()=>setNow(new Date()), 1000);
    return ()=>clearInterval(id);
  },[]);

  useInput((input, key) => {
    if (key.leftArrow) setWin(w => moveSelection(w, -1));
    else if (key.rightArrow) setWin(w => moveSelection(w, 1));
    else if (key.upArrow) setWin(w => moveSelection(w, -7));
    else if (key.downArrow) setWin(w => moveSelection(w, 7));
    else if (key.escape) {
      // Double-escape within threshold exits; single escape resets to today.
      const ESC_WINDOW = 1000; // ms
      const nowTs = Date.now();
      if (!escapeRef.current) {
        escapeRef.current = nowTs;
        setWin(()=>generateWindow(new Date(), ws));
      } else if (nowTs - escapeRef.current < ESC_WINDOW) {
        // Exit application cleanly
        // eslint-disable-next-line no-process-exit
        process.exit(0);
      } else {
        escapeRef.current = nowTs;
        setWin(()=>generateWindow(new Date(), ws));
      }
    }
  });

  // Track last escape key time for double-escape detection
  const escapeRef = useRef<number | null>(null);

  const cells = mapCells(win, config);

  return <CalendarView cells={cells} config={config} weeks={win.weeks} date={now} />;
};

export default App;
