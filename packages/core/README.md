# @jspicl/core

The transpiler library that converts JavaScript to PICO-8 Lua. Use this to build custom tools, integrate into existing pipelines, or when you need fine-grained control over transpilation.

> **Most users should use [@jspicl/cli](../cli)** - it handles bundling, transpiling, and cartridge generation in one step.

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
}

function _draw() {
  cls();
  circfill(x, y, 4, 8);
}
`;

const result = jspicl(javascript);
console.log(result.code);
```

**Output:**

```lua
function _init()
  x = 64
  y = 64
end

function _update()
  if btn(0) then
    x -= 1
  end
  if btn(1) then
    x += 1
  end
end

function _draw()
  cls()
  circfill(x, y, 4, 8)
end
```

## Advanced Usage

Extend or replace transpilation behavior with custom mappers:

```javascript
const result = jspicl(javascript, {
  customMappers: {
    // Replace how while loops are transpiled
    WhileStatement: ({body, test}, {transpile}) =>
      `while ${transpile(test)} do\n${transpile(body)}\nend`
  }
});
```

## Documentation

Visit [jspicl.github.io](https://jspicl.github.io/reference/api/) for the full API reference and customization guides.
