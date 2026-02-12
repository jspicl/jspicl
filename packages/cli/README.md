# @jspicl/cli

A command-line tool that simplifies PICO-8 game development in JavaScript.

**Features:**

- Built-in build pipeline powered by esbuild
- JavaScript to PICO-8 Lua transpilation via [@jspicl/core](../core)
- Tree-shaking to minimize token count
- PNG spritesheet support - use your favorite image editor
- Live reloading with watch mode

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

### Config Options

| Name                   | Type     | Required | Description                                       |
| ---------------------- | -------- | -------- | ------------------------------------------------- |
| `spritesheetImagePath` | string   | Yes      | Path to PNG spritesheet                           |
| `jsOutput`             | string   | Yes      | Path to output bundled JavaScript (for debugging) |
| `includeBanner`        | boolean  | No       | Include jspicl info comment in output             |
| `luaOutput`            | string   | No       | Path to output transpiled Lua (for debugging)     |
| `pipeOutputToConsole`  | boolean  | No       | Pipe PICO-8 output to terminal                    |
| `showStats`            | boolean  | No       | Display build statistics                          |
| `jspiclOptions`        | object   | No       | Options passed to @jspicl/core (prettify, etc.)   |
| `polyfillTransform`    | function | No       | Custom function to transform polyfill output      |
| `picoOptions`          | object   | No       | PICO-8 configuration (see below)                  |

#### picoOptions

| Name             | Type   | Description                                    |
| ---------------- | ------ | ---------------------------------------------- |
| `executablePath` | string | Custom path to PICO-8 executable               |
| `cartDataPath`   | string | Path to PICO-8 cart data directory             |
| `cartDataId`     | string | Cart data ID for hot reload (default: "jspicl_hotreload") |

## CLI Options

| Name             | Description                    |
| ---------------- | ------------------------------ |
| `--config`, `-c` | Path to config file (required) |
| `--watch`, `-w`  | Watch for changes and rebuild  |

## Watch Mode

With `--watch`, the CLI rebuilds automatically when source files change:

![](https://i.imgur.com/QYj4Xga.gif)

This applies for the spritesheet as well. Simply save your image and your changes will be reloaded in PICO-8.

![](https://github.com/AgronKabashi/assets/raw/814f6efe24bc9aca5d9d6ca6259279733529e300/rollup-plugin-jspicl/spritesheetLiveReload.gif)

**Note:** Automatic PICO-8 reload is supported on macOS and Linux. On Windows, PICO-8 will launch but you'll need to press Ctrl+R to reload manually.

## Requirements

- Node.js 22+

## Related

- [@jspicl/core](../core) - The transpiler library
- [Games made with jspicl](https://github.com/topics/jspicl-sample)

## License

MIT
