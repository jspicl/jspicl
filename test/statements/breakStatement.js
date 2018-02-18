import assert from "assert";
import { BreakStatement } from "statements";

describe("BreakStatement", () => {
  it("returns `break` if not inside switch statement", () => {
    assert.equal(BreakStatement(null, {}), "break");
    assert.equal(BreakStatement(null, { isInsideSwitch: false }), "break");
  });

  it("returns an empty string if inside switch statement", () => {
    assert.equal(BreakStatement(null, { isInsideSwitch: true }), "");
  });
});
