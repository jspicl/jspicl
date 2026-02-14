---
layout: post.liquid
title: Getting Started
sort: 1.1
---

# Getting Started

The jspicl CLI streamlines your PICO-8 game development by
taking care of the build process so you can focus on the implementation.

**Features:**

- Built-in build pipeline powered by esbuild
- Tree-shaking to minimize token count
- PNG spritesheet support - use your favorite image editor
- Live reloading with watch mode

## Installation

```bash
npm install -D @jspicl/cli
```

## Usage

First, create a config file:

```typescript
// jspicl.config.ts
import type {Config} from "@jspicl/cli/types";

const config: Config = {
  jsOutput: "build/game.js",
  showStats: true
};

export default config;
```

Then create your game file:

```js
function _draw() {
  cls();
  print("hello world");
}
```

Now run the CLI to generate a PICO-8 cartridge:

```bash
jspicl src/game.js build/game.p8 --config jspicl.config.ts --watch
```

Assuming you have PICO-8 installed on your system, you should see the following:

<img src="/assets/images/pico8-hello-world.png" width="320" class="center" alt="Hello World" />

Any changes to the source code will reload PICO-8 automatically for you.

**Note:** Automatic PICO-8 reload is supported on macOS and Linux. On Windows, PICO-8 will launch but you'll need to press Ctrl+R to reload manually.
