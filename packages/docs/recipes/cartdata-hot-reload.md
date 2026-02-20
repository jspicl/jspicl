---
layout: post.liquid
title: Cartdata with Hot Reload
sort: 5.2
---

# Cartdata with Hot Reload

This recipe explains how to use your own `cartdata()` for save data while keeping the CLI's hot reload functionality working.

## The Problem

The CLI uses PICO-8's `cartdata()` mechanism to signal hot reloads. However, PICO-8 only allows **one `cartdata()` call per cart**. If you call `cartdata()` in your game for saving high scores or progress, you'll get a conflict.

## Solution

Configure the CLI to use the same cartdata ID as your game:

```typescript
// jspicl.config.ts
import type {Config} from "@jspicl/cli/types";

const config: Config = {
  spritesheetImagePath: "assets/sprites.png",
  jsOutput: "build/game.js",
  picoOptions: {
    cartDataId: "mygame_save" // Use your game's cartdata ID
  }
  // ...
};

export default config;
```

In your game code, use the same ID:

```js
function _init() {
  cartdata("mygame_save");
  highscore = dget(0); // Load high score from slot 0
}

function saveHighscore(score) {
  if (score > highscore) {
    highscore = score;
    dset(0, highscore); // Save to slot 0
  }
}
```

## Important: Reserved Slot

The CLI reserves **slot 63** (`dget(63)` / `dset(63)`) for hot reload signals. Do not use this slot in your game.

**Available slots:** 0-62 (63 slots total)

```js
// Safe to use
dset(0, highscore);
dset(1, playerLevel);
dset(2, unlockedStages);
// ...
dset(62, lastSetting);

// DO NOT USE - reserved for hot reload
// dset(63, anything);
```

## Complete Example

```js
const SLOT_HIGHSCORE = 0;
const SLOT_SOUND_ON = 1;
const SLOT_MUSIC_ON = 2;

function _init() {
  cartdata("mygame_save");

  // Load saved data
  highscore = dget(SLOT_HIGHSCORE);
  soundOn = dget(SLOT_SOUND_ON) != 0;
  musicOn = dget(SLOT_MUSIC_ON) != 0;
}

function saveGame() {
  dset(SLOT_HIGHSCORE, highscore);
  dset(SLOT_SOUND_ON, soundOn ? 1 : 0);
  dset(SLOT_MUSIC_ON, musicOn ? 1 : 0);
}
```
