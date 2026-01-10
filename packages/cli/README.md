# @jspicl/cli

jspicl CLI is a command line tool that simplifies PICO-8 game development in JavaScript.

**Features:**

- Comes with its own set of build pipeline so you don't need one.
- JavaScript to PICO-8 Lua transpilation through [jspicl](https://github.com/AgronKabashi/jspicl).
- Treeshaking which prevents unused code from being included and increasing your token count.
- Allows a PNG file to be used as a spritesheet, no need to edit your assets in PICO-8 anymore. Use your image editor of choice.
- Live reloading of PICO-8 cartridge whenever code or spritesheet is updated. See your changes live!

**Future goals:**

- Importing audio files to be used as SFX or music.

## Installation

```Shell
npm install --save-dev @jspicl/cli
```

## Usage

In order to generate a cartridge you need to supply at least four mandatory options:

```Shell
jspicl-cli
  --input <entryfile.js>
  --output <outputFile.p8>
  --spritesheetImagePath <pathToSpriteSheetFile.png>
  --cartridgePath <pathToExistingCartridge.p8>
```

## Options

| Name                 | Type    | Description                                                                                                                                                                                                            |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input                | string  | Your game's entry point. This file can then import other modules. `[required]`                                                                                                                                         |
| output               | string  | Where to output the PICO-8 cardridge `[required]`                                                                                                                                                                      |
| spritesheetImagePath | string  | Path to a spritesheet file. Only PNGs are supported. `[required]`                                                                                                                                                      |
| cartridgePath        | string  | Path to an existing cardridge to reuse sound, music and state flags from. Normally you would point this to the generated cartridge so that you can save the assets directly and reuse them. `[required]`.              |
| includeBanner        | boolean | Include a short comment at the very top of the generated LUA code that contains info about [jspicl](https://github.com/AgronKabashi/jspicl). Does not affect token count.                                              |
| jsOutput             | string  | Where to output the flattened and transpiled JavaScript code. You may use this with [astexplorer](https://astexplorer.net) to inspect the AST, just make sure to select Esprima as the parser. For debugging purposes. |
| luaOutput            | string  | Where to output the transpiled LUA code. For debugging purposes.                                                                                                                                                       |
| showStats            | boolean | Display statistics about the generated cartridge. Useful for determining how much resources your game is using.                                                                                                        |
| pipeOutputToConsole  | boolean | Output all console.log to terminal that launched PICO-8. For debugging purposes.                                                                                                                                       |
| reloadOnSave         | boolean | Reload PICO-8 when the cartridge has been updated.                                                                                                                                                                     |
| customPicoPath       | string  | Custom path to the PICO-8 executable.                                                                                                                                                                                  |
| prettify             | boolean | Format the generated LUA code.                                                                                                                                                                                         |
| watch                |         | Runs the cartridge in PICO-8 and rebuilds it when the source files change.                                                                                                                                             |

## Watch mode

The CLI will listen for changes when the `--watch` option is passed.

![](https://i.imgur.com/QYj4Xga.gif)

This applies for the spritesheet aswell. Simply save your image and your changes will be reloaded in PICO-8.

![](https://github.com/AgronKabashi/assets/raw/814f6efe24bc9aca5d9d6ca6259279733529e300/rollup-plugin-jspicl/spritesheetLiveReload.gif)

**NOTE:** Reloading the cartridge is currently only supported on MacOS.

## Other `jspicl` related projects

- [jspicl](https://github.com/AgronKabashi/jspicl)
- [Games made with jspicl](https://github.com/topics/jspicl-sample)
