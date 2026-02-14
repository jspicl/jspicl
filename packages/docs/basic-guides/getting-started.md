---
layout: post.liquid
title: Getting Started
sort: 1.1
---

# Getting Started

The jspicl CLI streamlines your PICO-8 game development by
taking care of the build process so you can focus on the implementation.

**Features:**

- Comes with its own build pipeline so you don't have to set one up yourself.
- Supports treeshaking, preventing unused code from being included and increasing your token count.
- Use a PNG file for the spritesheet, enabling you to update it using an image editor of choice.
- Live reloading of PICO-8 cartridge whenever source code or spritesheet is updated.

## Installation (optional)

Depending on your use case you can install the CLI globally, locally or use npx to run it directly.

```bash-with-tab
npm install jspicl-cli -g
npm install jspicl-cli
npx jspicl-cli [<args>]
```

Recommended use-case is to install it locally in your project and include it in the scripts section in package.json.

## Usage

Let's start by creating a file with the following content:

```js-with-tab
function _draw() {
  cls();
  print("hello world");
}
```

That's it! Now all you have to do is supply jspicl-cli with your game file to generate a PICO-8 cartridge and run it in PICO-8:

```bash-with-tab
jspicl-cli PATH_TO_YOUR_FILE game.p8 --watch
```

Assuming you have PICO-8 installed in your system you should see the following:

<img src="/assets/images/pico8-hello-world.png" width="320" class="center" alt="Hello World" />

Any changes to the source code will reload PICO-8 automatically for you **(_only on Mac OS for now, other OS will need a manual reload with Ctrl+R_)**.
