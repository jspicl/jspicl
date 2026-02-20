---
layout: post.liquid
title: Reference - CLI
description: Complete CLI reference for @jspicl/cli. Config options, watch mode, hot reload, spritesheet setup, and PICO-8 integration.
sort: 4.2
---

# CLI Reference

## Installation

```bash
npm install -D @jspicl/cli
```

## Usage

```bash
jspicl <input> <output> --config <config-file> [--watch]
```

**Example:**

```bash
jspicl src/game.js build/game.p8 --config jspicl.config.ts --watch
```

## CLI Options

| Name             | Description                    |
| ---------------- | ------------------------------ |
| `--config`, `-c` | Path to config file (required) |
| `--watch`, `-w`  | Watch for changes and rebuild  |

## Config File

Create a config file (JavaScript or TypeScript):

```typescript
// jspicl.config.ts
import type {Config} from "@jspicl/cli/types";

const config: Config = {
  spritesheetImagePath: "assets/sprites.png",
  jsOutput: "build/game.js",
  showStats: true,
  picoOptions: {
    executablePath: "/Applications/PICO-8.app/Contents/MacOS/pico8"
  }
};

export default config;
```

**Note:** Config file paths (`jsOutput`, `luaOutput`, `spritesheetImagePath`) are resolved relative to the config file's directory unless an absolute path is specified.

### Config Options

| Name                   | Type     | Required | Description                                         |
| ---------------------- | -------- | -------- | --------------------------------------------------- |
| `spritesheetImagePath` | string   | Yes      | Path to PNG spritesheet (must be 128x128 pixels)    |
| `jsOutput`             | string   | Yes      | Path to output bundled JavaScript (for debugging)   |
| `includeBanner`        | boolean  | No       | Include jspicl info comment in output               |
| `luaOutput`            | string   | No       | Path to output transpiled Lua (for debugging)       |
| `minify`               | boolean  | No       | Experimental: Minify bundled JavaScript via esbuild |
| `pipeOutputToConsole`  | boolean  | No       | Pipe PICO-8 output to terminal                      |
| `showStats`            | boolean  | No       | Display build statistics                            |
| `jspiclOptions`        | object   | No       | Options passed to @jspicl/core (prettify, etc.)     |
| `polyfillTransform`    | function | No       | Custom function to transform polyfill output        |
| `picoOptions`          | object   | No       | PICO-8 configuration (see below)                    |

### picoOptions

| Name             | Type   | Description                                               |
| ---------------- | ------ | --------------------------------------------------------- |
| `executablePath` | string | Custom path to PICO-8 executable                          |
| `cartDataPath`   | string | Path to PICO-8 cart data directory                        |
| `cartDataId`     | string | Cart data ID for hot reload (default: "jspicl_hotreload") |

## Debugging with printh

When `pipeOutputToConsole` is enabled, any `printh()` calls in your PICO-8 code will output to the CLI's terminal. This is useful for debugging without cluttering the PICO-8 console.

```typescript
const config: Config = {
  pipeOutputToConsole: true
  // ...
};
```

In your game code:

```js
printh("Player position: " + player.x + ", " + player.y);
```

The output will appear in your terminal where the CLI is running.

## Hot Reload and Cartdata

The CLI uses PICO-8's `cartdata()` mechanism to achieve hot reloading during watch mode. This allows your game to automatically refresh when you save changes.

### Using Your Own Cartdata

PICO-8 only allows **one `cartdata()` call per cart**. If you need to use cartdata yourself (for high scores, save data, etc.), the CLI can share the same cartdata slot.

Configure `cartDataId` to match your game's cartdata ID:

```typescript
const config: Config = {
  picoOptions: {
    cartDataId: "mygame" // Must match your cartdata("mygame") call
  }
  // ...
};
```

**Important:** The CLI reserves the last index (`dget(63)`) for hot reload signals. Avoid using this index in your game code.

See the [Cartdata with Hot Reload](/recipes/cartdata-hot-reload/) recipe for a complete example.

## Watch Mode

The CLI will listen for changes when the `--watch` option is passed.

<video width="640" controls loop src="https://github.com/AgronKabashi/assets/raw/refs/heads/master/jspicl/hotreloading.mp4"></video>

This applies for the spritesheet as well. Simply save your image and your changes will be reloaded in PICO-8.

<video width="640" controls loop src="https://github.com/AgronKabashi/assets/raw/refs/heads/master/jspicl/hotreloading2.mp4"></video>

**Note:** Automatic PICO-8 reload is supported on macOS and Linux. On Windows, PICO-8 will launch but you'll need to press Ctrl+R to reload manually.

## Spritesheets

Your spritesheet must be a **128x128 pixel PNG** image. The CLI will:

1. Parse the PNG file
2. Match each pixel to the closest PICO-8 palette color
3. Embed the result in the cartridge's `__gfx__` section

Use any image editor (Aseprite, Photoshop, GIMP, etc.) to create your sprites. When you save the file in watch mode, PICO-8 reloads automatically.

## Cartridge Sections

When building a cartridge, the CLI only modifies:

- `__lua__` - Your transpiled game code
- `__gfx__` - Your spritesheet

All other PICO-8 sections are preserved if the output file already exists:

- `__gff__` - Sprite flags
- `__map__` - Map data
- `__sfx__` - Sound effects
- `__music__` - Music patterns

This means you can edit sound effects and music directly in PICO-8, and the CLI won't overwrite them.
