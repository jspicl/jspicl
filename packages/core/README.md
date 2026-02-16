# @jspicl/core

The core transpiler library for jspicl. Converts JavaScript to PICO-8 Lua.

## Installation

```bash
npm install @jspicl/core
```

## Usage

```javascript
import {jspicl} from "@jspicl/core";

const javascript = `
function _init() {
  x = 64;
  y = 64;
}

function _update() {
  if (btn(0)) x -= 1;
  if (btn(1)) x += 1;
  if (btn(2)) y -= 1;
  if (btn(3)) y += 1;
}

function _draw() {
  cls();
  circfill(x, y, 4, 8);
}
`;

const result = jspicl(javascript);
console.log(result.code);
// Output: Lua code ready for PICO-8

console.log(result.polyfills);
// Output: Any required polyfill implementations
```

Visit [jspicl.github.io](https://jspicl.github.io/reference/api/) for detailed documentation.
