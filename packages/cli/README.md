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
jspicl <input> <output> [options]
```

**Example:**

```bash
jspicl src/game.js build/game.p8 \
  --cartridgePath build/game.p8 \
  --spritesheetImagePath assets/sprites.png \
  --watch
```

## Options

| Name                     | Type    | Default | Description                                             |
| ------------------------ | ------- | ------- | ------------------------------------------------------- |
| `--cartridgePath`        | string  |         | Path to existing cartridge (reuses sound, music, flags) |
| `--spritesheetImagePath` | string  |         | Path to PNG spritesheet                                 |
| `--watch`                | boolean | false   | Watch for changes and rebuild automatically             |
| `--prettify`             | boolean | true    | Format the generated Lua code                           |
| `--showStats`            | boolean | true    | Display build statistics                                |
| `--includeBanner`        | boolean | true    | Include jspicl info comment in output                   |
| `--reloadOnSave`         | boolean | true    | Reload PICO-8 when cartridge is updated                 |
| `--picoPath`             | string  |         | Custom path to PICO-8 executable                        |
| `--jsOutput`             | string  |         | Path to output bundled JavaScript (for debugging)       |
| `--luaOutput`            | string  |         | Path to output transpiled Lua (for debugging)           |
| `--pipeOutputToConsole`  | boolean | false   | Pipe console.log to terminal                            |
| `-c, --config`           | string  |         | Path to config file                                     |

## Watch Mode

With `--watch`, the CLI rebuilds automatically when source files change:

![](https://i.imgur.com/QYj4Xga.gif)

This applies for the spritesheet as well. Simply save your image and your changes will be reloaded in PICO-8.

![](https://github.com/AgronKabashi/assets/raw/814f6efe24bc9aca5d9d6ca6259279733529e300/rollup-plugin-jspicl/spritesheetLiveReload.gif)

**Note:** Automatic PICO-8 reload is currently only supported on macOS.

## Requirements

- Node.js 22+

## Related

- [@jspicl/core](../core) - The transpiler library
- [Games made with jspicl](https://github.com/topics/jspicl-sample)

## License

MIT
