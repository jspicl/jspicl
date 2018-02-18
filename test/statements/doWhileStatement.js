import assert from "assert";
import { DoWhileStatement } from "statements";

describe("DoWhileStatement", () => {
  it("transpiles body and test expression", () => {
    const input = {
      body: {
        type: "Literal",
        raw: "body"
      },
      test: {
        type: "Literal",
        raw: "value"
      }
    };

    const output = `repeat
    body
  until not (value)`;

    assert.equal(DoWhileStatement(input), output);
  });
});
