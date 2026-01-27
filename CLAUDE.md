# CLAUDE.md

## FIRST ACTION - READ SESSION FILES

**STOP. Before doing anything else, you MUST read the session files:**

1. `packages/core/SESSIONS.md`
2. `packages/cli/SESSIONS.md`

Do this immediately and proactively at the start of every session - do not wait for the user to ask. These files contain critical context about recent work.

---

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

jspicl is a JavaScript to PICO-8 Lua transpiler monorepo. It enables writing PICO-8 games in JavaScript, which are transpiled to the Lua subset that PICO-8 supports.

## Monorepo Structure

This is a Yarn 4 workspaces monorepo with two packages:

- **@jspicl/core** (`packages/core/`) - The transpiler library that converts JavaScript AST to Lua
- **@jspicl/cli** (`packages/cli/`) - Command-line tool for bundling, transpiling, and building .p8 cartridges

Each package has its own `CLAUDE.md` with package-specific architecture details.

## Commands

```bash
# Root level (runs across all packages)
yarn build           # Build all packages (topological order)
yarn clean           # Clean all packages
yarn test            # Run all tests once
yarn test:watch      # Run tests in watch mode
yarn lint            # Check formatting with Prettier
yarn format          # Format all code with Prettier

# Run single test file
yarn vitest run packages/core/src/jspicl.test.ts
```

## Architecture

### Transpilation Flow

1. **Bundle** (CLI only): esbuild bundles JavaScript entry point with tree-shaking
2. **Parse**: esprima parses JavaScript to AST
3. **Transpile**: trastpiler traverses AST, each node type has a handler in `src/ast/` that outputs Lua
4. **Polyfill**: JavaScript methods without Lua equivalents (e.g., `array.map()`) become `_map()` calls; implementations are collected and returned separately
5. **Prettify**: Output formatted with proper Lua indentation
6. **Cartridge** (CLI only): Lua code embedded into .p8 file with optional spritesheet

### Key Patterns

- **AST handlers**: Located in `packages/core/src/ast/{declarations,expressions,statements}/`. Each handler receives a node and returns Lua code string.
- **Polyfill convention**: Polyfilled methods are prefixed with `_` (e.g., `_filter()`, `_reduce()`). Implementations in `packages/core/src/polyfills/defaultImplementations/`.
- **Custom mappers**: Users can override any AST node handler via the `customMappers` option.

## Technology Stack

- TypeScript (strict mode, ESM only)
- Node.js 22+ required
- Yarn 4 for package management
- Vitest for testing (co-located `*.test.ts` files)
- Prettier for formatting

## Testing

Tests are co-located with source files using `*.test.ts` naming. For ESM path resolution in tests:

```typescript
import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));
```
