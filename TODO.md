# TODO: PICO-8 Latest Version Compatibility

This document tracks changes needed to support PICO-8 0.2.5+ features.

## Bitwise Operators

### 1. Bitwise NOT (`~`) - Unary Operator
**File:** `src/syntax-tree/expressions/unaryExpression.ts:10-12`

**Current behavior:** Throws error "Unary operator ~ is not supported."

**PICO-8 0.2.5+ support:** The `~` operator is now supported as bitwise NOT (same as `bnot()` function).

**Proposed change:** Map JavaScript `~x` to PICO-8 `~x`

### 2. Bitwise XOR (`^`) - Binary Operator
**File:** `src/syntax-tree/expressions/binaryExpression.ts:3-6`

**Current behavior:** JavaScript `^` passes through unchanged, but PICO-8 uses `^^` for XOR.

**PICO-8 support:** Both `^^` and `~` (as binary operator) work for XOR in PICO-8 0.2.5+.

**Proposed change:** Add `"^": "^^"` to the operator table.

### 3. Other Bitwise Operators (Verify)
These JavaScript operators should pass through correctly to PICO-8:
- `&` (AND) → `&` in PICO-8
- `|` (OR) → `|` in PICO-8
- `<<` (left shift) → `<<` in PICO-8
- `>>` (right shift) → `>>` in PICO-8
- `>>>` (unsigned right shift) → `>>>` in PICO-8

### 4. Compound Bitwise Assignment Operators (v0.2.5d)
PICO-8 added compound assignment for bitwise operations:
- `>>=` (right shift assign)
- `<<>=` (left rotate assign)
- `>><` (right rotate assign)

**Proposed change:** Verify these pass through correctly or add mappings if needed.

---

## New Language Features

### 5. String Indexing Shorthand (v0.2.5)
**PICO-8 0.2.5+ feature:** `str[pos]` is equivalent to `sub(str, pos, pos)`

**Potential use:** Could add a `charAt` polyfill using this syntax:
```lua
-- str.charAt(pos) could become str[pos+1] (adjusting for 1-based indexing)
```

**File:** `src/polyfills/constants.ts`

### 6. `inext()` Function (v0.2.5)
New iterator function for array-style iteration compatibility.

**Potential use:** Could be used in polyfills for array iteration methods.

### 7. Long Comments/Strings Syntax (v0.2.5)
PICO-8 now supports `[=*[ ]=*]` syntax for multi-line strings/comments.

**Note:** Not directly relevant to transpilation, but good to know for generated code.

---

## New Built-in Functions

### 8. Rounded Rectangle Functions (v0.2.7) ✅ NATIVE
```lua
rrect(x, y, w, h, corner_radius, col)
rrectfill(x, y, w, h, corner_radius, col)
```
New drawing functions for rounded rectangles.

**Status:** Native PICO-8 functions - call directly from JavaScript, no mapping needed.

### 9. Enhanced `chr()` Function (v0.2.4) ✅ IMPLEMENTED
`chr()` now accepts multiple arguments to create arbitrary-length strings.

**Status:** Implemented - `String.fromCharCode(a, b, c)` now maps to `chr(a, b, c)`

**File:** `src/polyfills/constants.ts`

### 10. `sfx()` Return Value (v0.2.7) ✅ NATIVE
`sfx(n)` now returns the channel index where sound was played.

**Status:** Native PICO-8 behavior - no transpiler changes needed.

---

## New System/Memory Features ✅ ALL NATIVE

All system/memory features are native PICO-8 capabilities accessible via `peek()`, `poke()`, and `stat()`. No transpiler changes needed - use these directly in JavaScript.

### 11. Button State Memory Access (v0.2.5d)
Button states exposed in memory at `0x5f4c` (8 bytes).
```javascript
// Usage: peek(0x5f4c) to read button states
```

### 12. Character Wrap Mode (v0.2.5d)
Enable via `poke(0x5f36, 0x80)`

### 13. Video Memory Mapping (v0.2.6)
Video and spritesheet memory can map to `0x8000`, `0xa000`, `0xc000`, or `0xe000`.

### 14. Multiple `cartdata()` IDs (v0.2.7)
Can now switch between up to 4 different cartdata IDs per session.

### 15. Current Working Directory (v0.2.5)
`stat(124)` returns current working directory.

### 16. Audio Buffer State (v0.2.6)
`stat(111)` for audio buffer overfill detection.

---

## New Audio Features ✅ ALL NATIVE

All audio features are native PICO-8 capabilities. No transpiler changes needed.

### 17. Custom Waveform Instruments (v0.2.6)
PICO-8 now supports custom waveform instruments for audio synthesis.

**Status:** PICO-8 editor/runtime feature - not code-related.

### 18. Audio Recording (v0.2.5)
```lua
extcmd("audio_rec")
extcmd("audio_end")
```
For downloadable WAV exports in HTML/BBS.

**Status:** Native PICO-8 function - call `extcmd()` directly from JavaScript.

---

## New Text/Print Features

### 19. Text Decorations (v0.2.7)
- `"\^o8ff..."` - Outlined text
- `"\^u"` - Underlined text
- `"\^;"` and `"\^,"` - Padding-respecting characters

### 20. Custom One-off Characters (v0.2.4)
`?"\^:447cb67c3e7f0106 hey"` for inline custom character sprites.

### 21. Variable-width P8SCII Fonts (v0.2.5)
Support for variable-width fonts in text rendering.

---

## Multicart/Export Enhancements

### 22. Increased Multicart Limit (v0.2.7)
- Maximum export: 32 cartridges (up from 16)
- Maximum serial file size: 512k (up from 256k)

### 23. URL-encoded Cartridges (v0.2.4)
`save @url` encodes cartridges as shareable URLs (≤2040 chars).

### 24. Code-only Exports (v0.2.4)
`EXPORT -T` for code-only exports.

---

## Breaking Changes to Be Aware Of

### PICO-8 0.2.5+ Breaking Changes
- `x % 0` now returns `0` (previously returned `x`)
- String index out-of-range returns `nil` instead of empty string
- Short-form print (`?`) no longer supported (preprocessor removed)
- Nested long comments/strings no longer permitted

---

## References

- [PICO-8 Changelog](https://www.lexaloffle.com/dl/docs/pico-8_changelog.txt)
- [PICO-8 0.2.6 Release](https://www.lexaloffle.com/bbs/?tid=140421)
- [PICO-8 Bitwise Operations](https://pico-8.fandom.com/wiki/Bitwise_Operations)
- [PICO-8 Manual](https://www.lexaloffle.com/dl/docs/pico-8_manual.html)
