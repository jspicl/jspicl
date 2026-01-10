# CLAUDE.md

This file provides guidance to Claude Code when working with the core package.

> **Read `SESSIONS.md` first** - It contains the log of previous work sessions.

## Project Overview

jspicl is a JavaScript to PICO-8 Lua transpiler. It parses JavaScript code using esprima to create an AST, then transpiles it to the Lua subset that PICO-8 supports.

## Commands

- `yarn build` - Build the project using TypeScript compiler
- `yarn clean` - Remove the dist folder
- `yarn test` - Run all tests
- `yarn test:watch` - Run tests in watch mode

## Architecture

### Core Transpilation Flow

1. **Entry point** (`src/index.ts`): The `jspicl()` function takes JavaScript source code and options, parses it via esprima, transpiles via trastpiler, optionally prettifies, and returns the Lua code with required polyfills.

2. **Transpiler** (`src/transpile.ts`): Creates a trastpiler instance configured with AST node mappers. The `trastpiler` library handles AST traversal and scope management.

3. **Syntax tree mappers** (`src/syntax-tree/`): Contains handlers for each JavaScript AST node type, organized into:
   - `declarations/` - Variable, function, and class declarations
   - `expressions/` - All expression types (call, binary, member, etc.)
   - `statements/` - Control flow statements (if, for, while, switch, etc.)

   Each mapper is an `AstNodeParser` function that receives a node and options (including `transpile` function and `scope`) and returns the Lua string representation.

4. **Polyfills** (`src/polyfills/`): JavaScript methods without direct Lua equivalents are transpiled to polyfill function calls (prefixed with `_`, e.g., `_map()`, `_filter()`). The `getRequiredPolyfills()` function scans the output code and returns implementations for detected polyfills.

5. **Prettify** (`src/prettify.ts`): Formats the output Lua code with proper indentation based on `end` keywords and block structures.

### Key Types (`src/types.ts`)

- `JspiclOptions` - Configuration: `prettify` boolean, `customMappers` for extending/overriding node handlers
- `JspiclOutput` - Returns `code` (Lua string) and `polyfills` (map of required polyfill implementations)
- `AstNodeParser` - Function signature for syntax tree mappers

### Custom Mappers

Users can provide `customMappers` to override or extend how specific AST node types are transpiled. Each custom mapper receives the node and an options object with `transpile` (for recursive transpilation) and `scope` (for variable tracking).

## Testing

Tests are co-located with source files using the `*.test.ts` naming convention. The test framework is Vitest.

## Technology Stack

- **TypeScript** with strict mode
- **Pure ESM** - No CommonJS support
- **Node.js 22+** required
- **Yarn** for package management
- **Vitest** for testing
