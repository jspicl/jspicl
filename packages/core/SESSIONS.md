# Session Log - @jspicl/core

## 2026-01-11

### Monorepo restructuring

The repository was restructured from a single package to a Yarn workspaces monorepo:

- Core transpiler moved to `packages/core/`
- CLI split into separate `packages/cli/` package
- Root-level CLAUDE.md added for monorepo guidance
- Switched from Yarn PnP to node_modules linker (`.yarnrc.yml`)

See git history for the 15 commits detailing the restructure.

## 2026-01-10

### Fixed: Tests running from dist/

Tests were executing from both `src/` and `dist/` folders (55 test files instead of 26). The `dist/` folder contained compiled `.test.js` files from before `tsconfig.json` was updated to exclude them.

**Solution:** Clean dist and rebuild. The tsconfig already has `"exclude": ["src/**/*.test.ts"]`.

```bash
rm -rf packages/core/dist && yarn build
```

### Fixed: Fixture path resolution in prettify.test.ts

The test was reading fixtures with `readFileSync("./fixtures/luacode.lua")` which resolved relative to cwd (repo root), not the test file location.

**Solution:** Use `import.meta.url` for ESM path resolution:

```typescript
import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = readFileSync(join(__dirname, "../fixtures/luacode.lua")).toString();
```

### Updated: vitest.workspace.ts

Changed workspace config to explicitly reference package configs:

```typescript
export default defineWorkspace(["packages/*/vitest.config.ts"]);
```

### Status

- All 97 tests passing
- Build working correctly
