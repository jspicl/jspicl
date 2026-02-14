---
layout: post.liquid
title: Example Projects
sort: 6
---

# Example Projects

Games and templates built with jspicl.

<div class="link-list">
  <a
    class="link-item"
    href="https://github.com/jspicl/jspicl-mario-sample"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src="/assets/images/mario.png" alt="Mario Sample" />
    <span>
      <strong>Mario Sample</strong>
      A platformer template with Mario-style mechanics: running, jumping,
      enemies, and tile-based collision.
    </span>
  </a>

  <a
    class="link-item"
    href="https://github.com/jspicl/jspicl-megaman-sample"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src="/assets/images/megaman.svg" alt="Megaman Sample" />
    <span>
      <strong>Megaman Sample</strong>
      Action platformer template with shooting mechanics, enemy AI,
      and screen transitions.
    </span>
  </a>

  <a
    class="link-item"
    href="https://github.com/jspicl/jspicl-starter"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src="/assets/images/repo.svg" alt="Starter Template" />
    <span>
      <strong>Starter Template</strong>
      Minimal project setup to start building from scratch.
      Includes config, example game loop, and build scripts.
    </span>
  </a>
</div>

## Community Games

Have you built something with jspicl? Games tagged with
[jspicl-sample](https://github.com/topics/jspicl-sample) on GitHub
will appear here.

## Code Patterns

### Game Loop

```js
let x = 64;
let y = 64;

function _update() {
  if (btn(0)) x -= 1;
  if (btn(1)) x += 1;
  if (btn(2)) y -= 1;
  if (btn(3)) y += 1;
}

function _draw() {
  cls();
  spr(1, x, y);
}
```

### Entity Management

```js
const entities = [];

function spawnEnemy(x, y) {
  entities.push({x, y, type: "enemy", hp: 3});
}

function _update() {
  for (let i = 1; i <= entities.length; i++) {
    const e = entities[i];
    if (e.type === "enemy") {
      e.x -= 1; // Move left
    }
  }
}
```

### Collision Detection

```js
function collides(a, b) {
  return a.x < b.x + 8 &&
         a.x + 8 > b.x &&
         a.y < b.y + 8 &&
         a.y + 8 > b.y;
}
```

### State Machine

```js
let state = "menu";

function _update() {
  if (state === "menu") {
    if (btnp(4)) state = "game";
  } else if (state === "game") {
    updateGame();
  } else if (state === "gameover") {
    if (btnp(4)) state = "menu";
  }
}

function _draw() {
  cls();
  if (state === "menu") {
    print("press x to start", 32, 64, 7);
  } else if (state === "game") {
    drawGame();
  } else if (state === "gameover") {
    print("game over", 44, 64, 8);
  }
}
```
