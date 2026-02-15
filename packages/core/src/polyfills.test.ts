import {describe, it, expect} from "vitest";
import {getRequiredPolyfills} from "./polyfills/getRequiredPolyfills.js";

describe("getRequiredPolyfills", () => {
  const input = `
    _assign()
    nope_filter()
    nope._includes()
    _join(_map())
  `;

  it("return a table of detected polyfills", () => {
    const polyfills = getRequiredPolyfills(input);
    expect(Object.keys(polyfills)).toEqual(["_assign", "_join", "_map"]);
  });
});
