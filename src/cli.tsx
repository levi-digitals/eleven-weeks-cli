#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './App.js';

const cli = meow(`\nUsage\n  $ eleven-weeks-cli\n\nOptions\n  --week-start <0-6>  Week start day (0=Sun)\n  --hour12            Use 12-hour clock\n\n`, {
  importMeta: import.meta,
  flags: {
    weekStart: { type: 'number', default: 1 },
    hour12: { type: 'boolean', default: false }
  }
});

render(<App weekStart={cli.flags.weekStart as number} hour12={cli.flags.hour12 as boolean} />);
