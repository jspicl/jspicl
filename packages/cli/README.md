# @jspicl/cli

Build PICO-8 games in JavaScript with hot reload, PNG spritesheets, and a streamlined workflow.

## Features

- **Hot reload** - See changes instantly in PICO-8
- **PNG spritesheets** - Use your favorite image editor instead of PICO-8's built-in tools
- **JavaScript transpilation** - Write modern JS, output PICO-8 Lua
- **Tree-shaking** - Automatic dead code elimination to save tokens

## Installation

```bash
npm install -D @jspicl/cli
```

## Quick Start

1. Create a config file:

```typescript
// jspicl.config.ts
import type {Config} from "@jspicl/cli/types";

const config: Config = {
  spritesheetImagePath: "assets/sprites.png", // 128x128 PNG
  jsOutput: "build/game.js"
};

export default config;
```

2. Write your game in JavaScript:

```javascript
// src/game.js
function _init() {
  x = 64;
  y = 64;
}

function _update() {
  if (btn(0)) x -= 1;
  if (btn(1)) x += 1;
  if (btn(2)) y -= 1;
  if (btn(3)) y += 1;
}

function _draw() {
  cls();
  circfill(x, y, 4, 8);
}
```

3. Build and run:

```bash
jspicl src/game.js build/game.p8 --config jspicl.config.ts --watch
```

PICO-8 launches automatically. Edit your code, save, and watch it reload instantly.

## Documentation

Visit [jspicl.github.io](https://jspicl.github.io/reference/cli/) for the full CLI reference, config options, and guides.
