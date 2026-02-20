---
layout: post.liquid
title: Debugging with printh
description: Output debug messages from PICO-8 to your terminal using printh and pipeOutputToConsole.
sort: 5.1
---

# Debugging with printh

This recipe shows how to use PICO-8's `printh()` function to output debug information to your terminal.

## Setup

Enable `pipeOutputToConsole` in your config:

```typescript
// jspicl.config.ts
import type {Config} from "@jspicl/cli/types";

const config: Config = {
  pipeOutputToConsole: true,
  spritesheetImagePath: "assets/sprites.png",
  jsOutput: "build/game.js"
  // ...
};

export default config;
```

## Usage

Use `printh()` anywhere in your game code:

```js
function _update() {
  if (btn(0)) {
    player.x -= 1;
    printh("Player moved left: " + player.x);
  }
}
```

## Output

When running in watch mode, you'll see the output in your terminal:

```
Player moved left: 63
Player moved left: 62
Player moved left: 61
```

## Tips

- Use `printh()` for debugging values that change frequently (positions, states, etc.)
- Unlike `print()`, `printh()` doesn't appear on the PICO-8 screen
- Combine with watch mode for a rapid debug-fix-test cycle
- Remove or comment out `printh()` calls before publishing your game to avoid unnecessary overhead
