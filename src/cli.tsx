#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './App.js';

const cli = meow(`\nUsage\n  $ eleven-weeks-cli [options]\n\nOptions\n  --week-start <0-6>  Week start day (0=Sun)\n  --hour12            Use 12-hour clock\n  --theme <name>      Theme name (default, gray)\n\n`, {
  importMeta: import.meta,
  flags: {
  weekStart: { type: 'number', default: 1 },
  hour12: { type: 'boolean', default: false },
  theme: { type: 'string', default: 'default' }
  }
});

render(<App weekStart={cli.flags.weekStart as number} hour12={cli.flags.hour12 as boolean} themeName={cli.flags.theme as string} />);
