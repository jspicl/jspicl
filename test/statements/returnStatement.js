import assert from "assert";
import { ReturnStatement } from "statements";
import createJspiclTranspiler from "transpile";

describe("ReturnStatement", () => {
  const transpile = createJspiclTranspiler();

  it("handles return statements with no argument", () => {
    assert.equal(ReturnStatement({}, { transpile }), "do return end");
  });

  it("returns 'value' if argument is supplied", () => {
    const input = {
      argument: {
        type: "Literal",
        raw: 1
      }
    };

    assert.equal(ReturnStatement(input, { transpile }), `return ${input.argument.raw}`);
  });
});
