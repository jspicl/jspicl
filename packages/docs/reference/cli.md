---
layout: post.liquid
title: Reference - CLI
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
| `spritesheetImagePath` | string   | Yes      | Path to PNG spritesheet                             |
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

## Watch Mode

The CLI will listen for changes when the `--watch` option is passed.

<video width="640" controls loop src="https://github.com/AgronKabashi/assets/raw/refs/heads/master/jspicl/hotreloading.mp4"></video>

This applies for the spritesheet as well. Simply save your image and your changes will be reloaded in PICO-8.

<video width="640" controls loop src="https://github.com/AgronKabashi/assets/raw/refs/heads/master/jspicl/hotreloading2.mp4"></video>

**Note:** Automatic PICO-8 reload is supported on macOS and Linux. On Windows, PICO-8 will launch but you'll need to press Ctrl+R to reload manually.
