import assert from "assert";
import { ThrowStatement } from "statements";
import esprima from "esprima";
import createJspiclTranspiler from "transpile";

describe("ThrowStatement", () => {
  const transpile = createJspiclTranspiler();

  it("renders an assert with empty error message", () => {
    assert.equal(ThrowStatement({}, { transpile }), "assert(false, \"\")");
  });

  it("renders an assert with an error message", () => {
    const { body: [argument] } = esprima.parse("Error('Error message')");
    assert.equal(ThrowStatement({ argument }, { transpile }), "assert(false, \"error('Error message')\")");
  });

  it("renders an assert with a custom object", () => {
    const { body: [argument] } = esprima.parse(`(${JSON.stringify({ message: "Error message" })})`);
    assert.equal(ThrowStatement({ argument }, { transpile }), "assert(false, \"{\\n    message = \\\"Error message\\\"\\n  }\")");
  });
});
