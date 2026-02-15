---
layout: post.liquid
title: Migration Guide
sort: 3.1
---

# Migration Guide

## Upgrading to v4

### Package Names Changed

The packages have been renamed to use the `@jspicl` scope:

| Old          | New            |
| ------------ | -------------- |
| `jspicl`     | `@jspicl/core` |
| `jspicl-cli` | `@jspicl/cli`  |

Update your imports:

```js
// Before
import {jspicl} from "jspicl";

// After
import {jspicl} from "@jspicl/core";
```

### CLI Now Requires Config File

The CLI no longer accepts all options as command-line arguments. Create a config file instead:

```bash
# Before
jspicl-cli src/game.js game.p8 --spritesheetImagePath sprites.png --watch

# After
jspicl src/game.js game.p8 --config jspicl.config.ts --watch
```

```typescript
// jspicl.config.ts
import type {Config} from "@jspicl/cli/types";

const config: Config = {
  spritesheetImagePath: "sprites.png",
  jsOutput: "build/game.js"
};

export default config;
```

### Rollup Plugin Deprecated

The `rollup-plugin-jspicl` package is no longer maintained. Use `@jspicl/cli` instead, which includes esbuild for bundling.

### PICO-8 Path Configuration

The `customPicoPath` option is now nested under `picoOptions`:

```typescript
// Before
{
  customPicoPath: "/path/to/pico8";
}

// After
{
  picoOptions: {
    executablePath: "/path/to/pico8";
  }
}
```

### Hot Reload Changes

Hot reload now uses PICO-8's cart data mechanism instead of AppleScript-only reload. This adds Linux support.

Configure the cart data path if needed:

```typescript
{
  picoOptions: {
    cartDataPath: "~/.lexaloffle/pico-8/cdata",
    cartDataId: "my_game_hotreload"
  }
}
```
