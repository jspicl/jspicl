import assert from "assert";
import { getRequiredPolyfills } from "polyfiller";

describe("getRequiredPolyfills", () => {
  const input = `
    _assign()
    nope_filter()
    nope._includes()
    _join(_map())
  `;
  it("return a table of detected polyfills", () => {
    const polyfills = getRequiredPolyfills(input);
    assert.deepEqual(Object.keys(polyfills), ["_assign", "_join", "_map"]);
  });
});
