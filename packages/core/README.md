# @jspicl/core

The core transpiler library for jspicl. Converts JavaScript to PICO-8 Lua.

<a href="https://www.npmjs.com/package/@jspicl/core" target="_blank" rel="noopener noreferrer">
  <img alt="npm version" src="https://img.shields.io/npm/v/@jspicl/core.svg?style=for-the-badge" />
  <img alt="License" src="https://img.shields.io/npm/l/@jspicl/core.svg?style=for-the-badge">
</a>

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

## API

### `jspicl(source, options?)`

Transpiles JavaScript source code to PICO-8 Lua.

#### Parameters

- `source` (string) - The JavaScript source code to transpile
- `options` (object, optional)
  - `prettify` (boolean, default: `true`) - Whether to format the output with proper indentation
  - `customMappers` (object) - Custom AST node handlers to override or extend transpilation

#### Returns

An object containing:

- `code` (string) - The transpiled Lua code
- `polyfills` (object) - Map of required polyfill function names to their Lua implementations

### Types

Types can be imported from `@jspicl/core/types`:

```typescript
import type {
  JspiclOptions,
  JspiclOutput,
  AstNodeParser
} from "@jspicl/core/types";
```

## Custom Mappers

You can provide custom mappers to override how specific AST node types are transpiled:

```javascript
import {jspicl} from "@jspicl/core";

const customMappers = {
  Literal: ({raw}) => {
    // Custom handling for literals
    return raw === "null" ? "nil" : raw;
  }
};

const result = jspicl(source, {customMappers});
```

Each mapper receives the AST node and an options object with:

- `transpile` - Function to recursively transpile child nodes
- `scope` - Object containing variable metadata and scope information

## Supported Polyfills

When your JavaScript uses methods without direct Lua equivalents, jspicl automatically detects and provides polyfill implementations:

- Array methods: `map`, `filter`, `reduce`, `includes`, `findIndex`, `join`, `pop`, `sort`
- String methods: `split`, `substr`, `substring`, `toString`
- Object methods: `Object.assign`, `Object.keys`, `Object.values`, `Object.entries`

The polyfills are returned separately so you can include them once at the top of your PICO-8 cartridge.

## Requirements

- Node.js 22+

## License

MIT
