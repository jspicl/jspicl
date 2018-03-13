import assert from "assert";
import { ArrowFunctionExpression } from "expressions";

describe("ArrowFunctionExpression", () => {
  it("renders a function with content", () => {
    const input = {
      params: [],
      body: {
        type: "Literal",
        raw: "content"
      }
    };

    const output = `
  function ()
    content
  end`;

    assert.equal(ArrowFunctionExpression(input), output);
  });

  it("renders a function that accepts arguments", () => {
    const input = {
      params: [
        {
          type: "Literal",
          raw: "arg1"
        }
      ],
      body: {
        type: "Literal",
        raw: "content"
      }
    };

    const output = `
  function (arg1)
    content
  end`;

    assert.equal(ArrowFunctionExpression(input), output);
  });
});
