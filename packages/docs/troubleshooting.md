---
layout: post.liquid
title: Troubleshooting
sort: 5
---

# Troubleshooting

## Array Index Off By One

**Problem:** My array access returns the wrong element.

**Cause:** Lua uses 1-based indexing, JavaScript uses 0-based.

```js
// JavaScript - gets first element
const first = arr[0];

// Generated Lua - still uses 0, but Lua arrays start at 1!
local first = arr[0]  -- Returns nil
```

**Solution:** Explicitly use 1-based indexing in your JavaScript when targeting PICO-8:

```js
// Use 1-based indexing
const first = arr[1];

// Or add 1 to loop indices
for (let i = 1; i <= arr.length; i++) {
  // ...
}
```

---

## PICO-8 Won't Auto-Reload

**Problem:** Changes don't appear in PICO-8 automatically.

**Checklist:**

1. **OS Support** - Auto-reload works on macOS and Linux. Windows requires manual Ctrl+R.

2. **Executable Path** - Ensure `picoOptions.executablePath` points to the correct PICO-8 binary:
   ```typescript
   picoOptions: {
     // macOS
     executablePath: "/Applications/PICO-8.app/Contents/MacOS/pico8"
     // Linux
     executablePath: "/home/user/pico-8/pico8"
   }
   ```

3. **Cart Data Path** - Hot reload uses cart data. Verify the path exists:
   ```typescript
   picoOptions: {
     cartDataPath: "~/.lexaloffle/pico-8/cdata"
   }
   ```

---

## Token Count Too High

**Problem:** PICO-8 reports "out of tokens" error.

**Solutions:**

1. **Check tree-shaking** - Ensure unused code isn't being included. The CLI uses esbuild's tree-shaking by default.

2. **Avoid polyfill-heavy methods** - Each polyfill adds tokens:
   ```js
   // Heavy - adds _map polyfill (~25 tokens)
   const doubled = arr.map(x => x * 2);

   // Lighter - native loop
   const doubled = [];
   for (let i = 1; i <= arr.length; i++) {
     doubled[i] = arr[i] * 2;
   }
   ```

3. **Use PICO-8 built-ins** - Prefer `foreach`, `all`, `add`, `del` over JS equivalents.

4. **Enable minify (experimental)**:
   ```typescript
   {
     minify: true
   }
   ```

---

## Spritesheet Not Loading

**Problem:** Sprites appear as black boxes or don't show.

**Checklist:**

1. **File format** - Only PNG is supported.

2. **Dimensions** - Must be 128x128 pixels (or 128x64/128x32 for partial sheets).

3. **Path** - Paths are relative to the config file location:
   ```typescript
   // If config is in project root
   {
     spritesheetImagePath: "assets/sprites.png"
   }
   ```

---

## "Unsupported syntax" Error

**Problem:** jspicl throws an error about unsupported syntax.

**Common causes:**

| Syntax | Status | Alternative |
|--------|--------|-------------|
| `async/await` | Not supported | Use synchronous code |
| `class` | Not supported | Use functions and tables |
| `generators` | Not supported | Use loops |
| `import/export` | Handled by bundler | Works with CLI |

If you need unsupported syntax, use `customMappers` to add support or pre-process with Babel/esbuild.

---

## Build Works But Game Crashes

**Problem:** Cartridge generates but PICO-8 shows runtime errors.

**Debug steps:**

1. **Check Lua output** - Set `luaOutput` to inspect generated code:
   ```typescript
   {
     luaOutput: "build/debug.lua"
   }
   ```

2. **Enable console output**:
   ```typescript
   {
     pipeOutputToConsole: true
   }
   ```

3. **Common runtime issues:**
   - Nil access (usually 0-index vs 1-index)
   - Missing `local` (jspicl adds these, but check custom code)
   - Infinite loops blocking PICO-8
