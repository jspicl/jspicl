import assert from "assert";
import { BreakStatement } from "statements";
import createJspiclTranspiler from "transpile";

describe("BreakStatement", () => {
  const transpile = createJspiclTranspiler();

  it("returns `break` if not inside switch statement", () => {
    assert.equal(BreakStatement(null, { scope: {} }), "break");
    assert.equal(BreakStatement(null, { transpile, scope: { isInsideSwitch: false } }), "break");
  });

  it("returns an empty string if inside switch statement", () => {
    assert.equal(BreakStatement(null, { transpile, scope: { isInsideSwitch: true } }), "");
  });
});
