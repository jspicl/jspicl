import assert from "assert";
import { AssignmentExpression } from "expressions";

describe("AssignmentExpression", () => {
  it("renders two expressions separated by an operator  ", () => {
    const input = {
      left: {
        type: "Literal",
        raw: "1"
      },
      right: {
        type: "Literal",
        raw: "2"
      },
      operator: "+"
    };

    const output = "1 + 2";

    assert.equal(AssignmentExpression(input), output);
  });
});
