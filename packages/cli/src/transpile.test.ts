import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {describe, it, expect} from "vitest";
import {transpile} from "./transpile.js";
import type {Config} from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const defaultConfig: Config = {
  spritesheetImagePath: "",
  jsOutput: "build/game.js",
  includeBanner: false,
  showStats: false
};

describe("transpile", () => {
  it("includes banner when configured", () => {
    const {lua} = transpile("var a = 1;", {
      ...defaultConfig,
      includeBanner: true
    });
    const expected = `--[[
generated with jspicl,
a javascript to pico-8 lua
transpiler.

please report any bugs at:
https://github.com/jspicl/jspicl/issues
]]--
local a = 1`;

    expect(lua).toEqual(expected);
  });

  it("applies custom polyfill transform", () => {
    const {lua} = transpile("[1,2,3].map(x => x * 2);", {
      ...defaultConfig,
      polyfillTransform: (polyfills) => {
        return Object.entries(polyfills)
          .map(([name, impl]) => `-- polyfill: ${name}\n${impl}`)
          .join("\n");
      }
    });
    const expected = fs.readFileSync(
      path.join(__dirname, "../test/fixtures/transpile/expected/customPolyfill.txt"),
      "utf8"
    );
    expect(lua).toEqual(expected);
  });
});
