import assert from "assert";
import { ReturnStatement } from "statements";

describe("ReturnStatement", () => {
  it("should handle return statements with no argument", () => {
    assert.equal(ReturnStatement({}), "do return end");
  });

  it("should return value if argument is supplied", () => {
    const input = {
      argument: {
        type: "Literal",
        raw: 1
      }
    };

    assert.equal(ReturnStatement(input), `return ${input.argument.raw}`);
  });
});
