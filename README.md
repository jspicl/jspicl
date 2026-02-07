<p align="center">
  <img src="https://raw.githubusercontent.com/AgronKabashi/assets/51844924e69fdef3129a04573f60b262f41cbea4/jspicl/logo-366x250.png" width="320">
</p>

# jspicl

A JavaScript to PICO-8 Lua transpiler. Write your PICO-8 games in JavaScript!

## Packages

This monorepo contains two packages:

| Package | Description |
| ------- | ----------- |
| [@jspicl/core](./packages/core) | The transpiler library - converts JavaScript to PICO-8 Lua |
| [@jspicl/cli](./packages/cli) | Command-line tool for building PICO-8 cartridges |

## Quick Start

For most users, the CLI is the easiest way to get started:

```bash
npm install -D @jspicl/cli
```

```bash
jspicl src/game.js output.p8 --config jspicl.config.ts --watch
```

See the [CLI documentation](./packages/cli/README.md) for config file setup and options.

## Using the Core Library

If you want to integrate jspicl into your own build pipeline:

```bash
npm install @jspicl/core
```

```javascript
import {jspicl} from "@jspicl/core";

const result = jspicl(`
  function _init() {
    x = 64;
    y = 64;
  }

  function _draw() {
    cls();
    circfill(x, y, 4, 8);
  }
`);

console.log(result.code);      // Lua code
console.log(result.polyfills); // Required polyfill implementations
```

See the [Core documentation](./packages/core/README.md) for the full API.

## Development

```bash
# Install dependencies
yarn install

# Build all packages
yarn build

# Run tests
yarn test

# Format code
yarn format
```

## Requirements

- Node.js 22+

## License

MIT
