---
layout: post.liquid
title: Reference - CLI
sort: 3.2
---

# CLI Reference

Usage:

```bash-with-tab
jspicl-cli input [<args>]
```

### Arguments

<ul class="argument-list">
  <li>
    <code>--input: string</code>
    <span class="required-field">required</span>
    <p>Your game's entry point. This file can then import other modules.</p>
  </li>
  <li>
    <code>--output: string</code>
    <span class="required-field">required</span>
    <p>Where to output the PICO-8 cardridge.</p>
  </li>
  <li>
    <code>--spritesheetImagePath: string</code>
    <p>Path to a spritesheet file. Only PNGs are supported.</p>
  </li>
  <li>
    <code>--cartridgePath: string</code>
    <p>
      Path to an existing cardridge to reuse sound, music and state flags from.
      Normally you would point this to the generated cartridge so that you can
      save the assets directly and reuse them.
    </p>
  </li>
  <li>
    <code>--includeBanner: boolean = true</code>
    <p>
      Include a short comment at the very top of the generated Lua code that
      contains info about <a href="https://github.com/jspicl/jspicl">jspicl</a>.
      Does not increase the token count.
    </p>
  </li>
  <li>
    <code>--jsOutput: string</code>
    <p>
      Where to output the flattened and transpiled JavaScript code. You may use
      this with <a href="https://astexplorer.net">astexplorer</a> to inspect the
      AST. Make sure that Esprima is selected as the parser. Used for debugging
      purposes.
    </p>
  </li>
  <li>
    <code>--luaOutput: string</code>
    <p>Where to output the transpiled Lua code. Used for debugging purposes.</p>
  </li>
  <li>
    <code>--showStats: boolean = true</code>
    <p>
      Display statistics about the generated cartridge. Useful for determining
      how much resources your game is using.
    </p>
  </li>
  <li>
    <code>--pipeOutputToConsole: boolean</code>
    <p>
      Output all console.log to terminal that launched PICO-8. For debugging
      purposes.
    </p>
  </li>
  <li>
    <code>--reloadOnSave: boolean</code>
    <p>Reload PICO-8 when the cartridge has been updated.</p>
  </li>
  <li>
    <code>--customPicoPath: string</code>
    <p>
      Provide a path to the PICO-8 executable if it's not installed in the
      default location.
    </p>
  </li>
  <li>
    <code>--prettify: boolean = true</code>
    <p>Prettifies the transpiled code. By default, jspicl formats the Lua output for you but if performance ever
      becomes an issue you can turn this off by setting this to false.</p>
  </li>
  <li>
    <code>--watch</code>
    <p>
      Runs the game in PICO-8 and reloads the cartridge when the source files
      change.
    </p>
  </li>
</ul>

## Watch mode

The CLI will listen for changes when the `--watch` option is passed.

<img width="100%" src="https://i.imgur.com/QYj4Xga.gif">

This applies for the spritesheet aswell. Simply save your image and your changes will be reloaded in PICO-8.

<img width="100%" src="https://github.com/AgronKabashi/assets/raw/814f6efe24bc9aca5d9d6ca6259279733529e300/rollup-plugin-jspicl/spritesheetLiveReload.gif">

**NOTE:** Reloading the cartridge is currently only supported on MacOS.
