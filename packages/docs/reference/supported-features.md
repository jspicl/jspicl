---
layout: post.liquid
title: Supported Features
description: JavaScript features supported by jspicl. Includes polyfills for arrays, strings, objects, and Math methods.
sort: 4.3
---

# Supported Features

This page lists the JavaScript features that jspicl supports and how they're transpiled to PICO-8 Lua.

## Language Features

### Variables

| JavaScript | Lua |
|------------|-----|
| `let x = 1` | `local x = 1` |
| `const y = 2` | `local y = 2` |
| `var z = 3` | `z = 3` (global) |

### Functions

```javascript
function greet(name) {
  return "hello " + name;
}

const add = (a, b) => a + b;
```

```lua
function greet(name)
  return "hello " .. name
end

local add = function(a, b)
  return a + b
end
```

### Control Flow

All standard control flow is supported:

- `if` / `else if` / `else`
- `for` loops (standard, for...of)
- `while` loops
- `switch` statements (transpiled to if/elseif chains)

### Operators

| JavaScript | Lua | Notes |
|------------|-----|-------|
| `+` (strings) | `..` | String concatenation |
| `===`, `!==` | `==`, `~=` | Equality |
| `&&`, `\|\|` | `and`, `or` | Logical |
| `!` | `not` | Negation |
| `%` | `%` | Modulo |
| `**` | `^` | Exponentiation |

### Destructuring

```javascript
const {x, y} = position;
const [first, second] = items;
```

```lua
local x = position.x
local y = position.y
local first = items[1]
local second = items[2]
```

## Polyfills

When you use JavaScript methods that don't exist in Lua, jspicl provides polyfill implementations. These are returned separately in the `polyfills` object.

### Array Methods

| Method | Description |
|--------|-------------|
| `arr.map(fn)` | Transform each element |
| `arr.filter(fn)` | Keep elements matching predicate |
| `arr.reduce(fn, init)` | Reduce to single value |
| `arr.forEach(fn)` | Iterate without returning |
| `arr.includes(val)` | Check if value exists |
| `arr.findIndex(fn)` | Find index of matching element |
| `arr.join(sep)` | Join elements into string |
| `arr.push(val)` | Add element to end |
| `arr.pop()` | Remove and return last element |
| `arr.sort(fn)` | Sort elements (in-place) |
| `arr.length` | Get array length (via `#arr`) |

### String Methods

| Method | Description |
|--------|-------------|
| `str.split(sep)` | Split into array |
| `str.substr(start, len)` | Extract substring by length |
| `str.substring(start, end)` | Extract substring by indices |
| `str.toString()` | Convert to string |
| `String.fromCharCode(n)` | Character from code (uses `chr()`) |

### Object Methods

| Method | Description |
|--------|-------------|
| `Object.assign(target, source)` | Merge objects |
| `Object.keys(obj)` | Get array of keys |
| `Object.values(obj)` | Get array of values |
| `Object.entries(obj)` | Get array of [key, value] pairs |

### Math Methods

These map directly to Lua/PICO-8 equivalents:

| JavaScript | PICO-8 |
|------------|--------|
| `Math.abs(x)` | `abs(x)` |
| `Math.floor(x)` | `flr(x)` |
| `Math.ceil(x)` | `ceil(x)` |
| `Math.min(a, b)` | `min(a, b)` |
| `Math.max(a, b)` | `max(a, b)` |
| `Math.sqrt(x)` | `sqrt(x)` |
| `Math.sin(x)` | `sin(x)` |
| `Math.random()` | `rnd()` |

### Console

| JavaScript | PICO-8 |
|------------|--------|
| `console.log(msg)` | `printh(msg)` |

## Using Polyfills

Polyfills are returned in the `polyfills` object:

```javascript
const {code, polyfills} = jspicl(source);

// Combine polyfills with your code
const finalCode = Object.values(polyfills).join("\n") + "\n" + code;
```

When using the CLI, polyfills are automatically included in the cartridge.

## Unsupported Features

The following JavaScript features are **not supported**:

- `async` / `await`
- Generators (`function*`)
- Classes (use plain objects and functions)
- `try` / `catch` / `finally`
- Regular expressions
- `typeof`, `instanceof`
- Spread operator in some contexts

## Array Indexing

**Important:** Lua arrays are 1-indexed, JavaScript arrays are 0-indexed.

jspicl does **not** automatically convert indices. You need to account for this in your code:

```javascript
// JavaScript (0-indexed)
const first = items[0];

// In PICO-8 Lua, this will be items[0], which returns nil
// Use 1-indexed access in your JavaScript:
const first = items[1];

// Same for loops:
for (let i = 1; i <= items.length; i++) {
  // ...
}
```
