# CLAUDE.md

This file provides guidance to Claude Code when working with the CLI package.

> **Read `SESSIONS.md` first** - It contains the log of previous work sessions.

## Project Overview

The CLI package (`@jspicl/cli`) provides a command-line interface for the jspicl transpiler. It bundles JavaScript with esbuild, transpiles to Lua using `@jspicl/core`, and outputs PICO-8 cartridges (.p8 files).

## Commands

- `yarn build` - Type-check with tsc, then bundle with esbuild to `dist/cli.js`
- `yarn typecheck` - Type-check only (no output)
- `yarn clean` - Remove the dist folder
- `yarn test` - Run tests (currently none exist for CLI)

## Architecture

### Build System

The CLI uses esbuild for bundling with tsc for type-checking:

```bash
tsc --noEmit && esbuild src/index.ts --bundle --platform=node --format=esm --packages=external --banner:js='#!/usr/bin/env node' --outfile=dist/cli.js
```

- `tsc --noEmit` - Type-checks without emitting files
- `esbuild` - Bundles to single file with shebang
- `--packages=external` - Keeps dependencies external (installed via npm)
- Output: `dist/cli.js` (~6.8kb)

### Entry Flow

1. `dist/cli.js` - Bundled CLI entry point (includes shebang)
2. Parses args with yargs, starts esbuild context
3. esbuild bundles user's JS, then jspicl transpiles to Lua
4. Output written to .p8 cartridge file

### Directory Structure

```
src/
├── index.ts              # Main entry point
├── types.ts              # TypeScript interfaces
├── watch-plugin.ts       # esbuild plugin for watch mode
├── launcher/
│   ├── cli-arguments.ts  # Yargs argument definitions
│   └── cli-launcher.ts   # EMPTY FILE - needs removal
└── api/
    ├── logging.ts        # Console logging utilities
    ├── pico8-launcher.ts # PICO-8 process spawning
    ├── cartridge.ts      # Cartridge parsing/generation
    ├── spritesheet.ts    # PNG to PICO-8 spritesheet
    ├── transpile.ts      # COMMENTED OUT - needs removal
    ├── token-counter.ts  # Lua token counting
    └── constants.ts      # Banner and color palette
```

### Key Dependencies

- **yargs** - CLI argument parsing
- **esbuild** - JavaScript bundling
- **chokidar** - File system watching
- **pngjs** - PNG image processing
- **@jspicl/core** - The transpiler core

## Known Issues & TODOs

### Critical

- [ ] **Debug output in production** - `console.log(options)` at `index.ts:37` prints raw options to console
- [ ] **Type safety** - `options: any` at `index.ts:35` lacks proper typing
- [ ] **Resource leak** - Global `picoProcess` in `pico8-launcher.ts` could leak if multiple instances

### Code Quality

- [ ] **Empty file** - `launcher/cli-launcher.ts` is empty and should be deleted
- [ ] **Dead code** - `api/transpile.ts` is entirely commented out, should be deleted
- [ ] **Type mismatch** - `polyfillTransform` in `cli-arguments.ts:55` described as "path" but typed as `boolean`
- [ ] **Mixed logging** - `console.log` used directly instead of logging utilities in `watch-plugin.ts:53`, `index.ts:37`

### Missing Features

- [ ] **No --help flag** - `.help(false)` at `index.ts:24` disables help output
- [ ] **No --version flag** - Users can't check CLI version
- [ ] **No input validation** - Missing files cause crashes instead of helpful errors
- [ ] **No proper exit codes** - Scripts can't detect failure states
- [ ] **No tests** - CLI has no test coverage (old mocha tests in `test/` are outdated)

### Architecture Improvements

- [ ] Consider switching from yargs to Commander.js for simpler API
- [ ] Consolidate logging into unified logger with debug levels
- [ ] Extract build/watch logic into separate manager classes
- [ ] Add schema validation for config files (zod or joi)
- [ ] Fix CJS/ESM mismatch - `require()` used in ESM for config loading at `cli-arguments.ts:70`

## Lessons Learned

### Monorepo Structure

- This is a Yarn workspaces monorepo with packages in `packages/`
- Root `vitest.workspace.ts` references `packages/*/vitest.config.ts`
- Each package should have its own `vitest.config.ts` with `include: ["src/**/*.test.ts"]`
- TypeScript build should exclude test files via `"exclude": ["src/**/*.test.ts"]` in tsconfig.json
- Always clean `dist/` after changing tsconfig exclude patterns

### Testing

- Tests use Vitest, not Mocha (old tests in `test/` are outdated)
- Test files should be co-located with source: `*.test.ts`
- Fixture files should use `__dirname` for path resolution in ESM:
  ```typescript
  import {fileURLToPath} from "node:url";
  import {dirname, join} from "node:path";
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const fixturePath = join(__dirname, "../fixtures/file.txt");
  ```

### Build System

- Uses esbuild for bundling JavaScript before transpilation
- Watch mode uses chokidar with debounced rebuilds
- PICO-8 can be auto-reloaded via AppleScript (macOS) or PowerShell (Windows)

## Code Style

- Pure ESM (no CommonJS)
- Strict TypeScript with `noUnusedLocals`, `noUnusedParameters`
- Node.js 22+ required
- Use logging utilities from `api/logging.ts` instead of direct `console.log`
