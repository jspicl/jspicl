---
layout: post.liquid
title: Troubleshooting
description: Common jspicl issues and solutions. Array indexing, token limits, and debugging tips.
sort: 3.2
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

## PICO-8 Won't Auto-Reload

**Problem:** Changes don't appear in PICO-8 automatically.

**Checklist:**

1. **OS Support** - Auto-reload works on macOS and Linux. Windows requires manual Ctrl+R.

2. **Executable Path** - The cli will use default Pico-8 installation paths by default. If you've installed it in a different path, please ensure `picoOptions.executablePath` points to the correct PICO-8 binary:

   ```typescript
   // jspicl.config.ts
   export default {
    picoOptions: {
      // macOS
      executablePath: "/Applications/PICO-8.app/Contents/MacOS/pico8"
      // Linux
      executablePath: "~/home/USERNAME~/pico-8/pico8"
    }
   }
   ```

3. **Cart Data Path** - Hot reload uses cart data to enable hot reloading. If you're not using the default folder please make sure that you're setting it explicitly in the config:
   ```typescript
   // jspicl.config.ts
   export default {
     picoOptions: {
       cartDataPath: "~/Library/Application Support/pico-8/cdata/"
     }
   };
   ```

## Spritesheet Not Loading

**Problem:** Sprites appear as black boxes or don't show.

**Checklist:**

1. **File format** - Only PNG is supported.

2. **Dimensions** - Must be 128x128 pixels

3. **Path** - Unless you specify an absolute path, paths will be relative to the config file location:
   ```typescript
   // If config is in project root
   {
     spritesheetImagePath: "assets/sprites.png";
   }
   ```

## "Unsupported syntax" Error

**Problem:** jspicl throws an error about unsupported syntax.

**Common causes:**

| Syntax        | Status        | Alternative          |
| ------------- | ------------- | -------------------- |
| `async/await` | Not supported | Use synchronous code |
| `generators`  | Not supported | Use loops            |

If you need unsupported syntax, you can use `customMappers` to add support.

## Build Works But Game Crashes

**Problem:** Cartridge generates but PICO-8 shows runtime errors.

**Debug steps:**

1. **Check Lua output** - Look at the generated code in Pico-8 directly or set `luaOutput` to inspect generated code:

   ```typescript
   {
     luaOutput: "build/debug.lua";
   }
   ```

2. **Enable console output**:

   ```typescript
   {
     pipeOutputToConsole: true; // printh will output to the terminal
   }
   ```

3. **Common runtime issues:**
   - Nil access (usually 0-index vs 1-index)
   - Missing `local` (jspicl adds these, but check custom code)
   - Infinite loops blocking PICO-8
