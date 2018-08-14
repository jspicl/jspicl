import assert from "assert";
import { ArrowFunctionExpression } from "expressions";
import esprima from "esprima";

describe("ArrowFunctionExpression", () => {
  it("renders a function with content", () => {
    const input = "() => { content; }";
    const output = `function ()
    content
  end`;
    const { body } = esprima.parse(input);
    const [{ expression: statement }] = body;

    assert.equal(ArrowFunctionExpression(statement), output);
  });

  it("renders a function that accepts arguments", () => {
    const input = "(arg1) => { content; }";
    const output = `function (arg1)
    content
  end`;
    const { body } = esprima.parse(input);
    const [{ expression: statement }] = body;

    assert.equal(ArrowFunctionExpression(statement), output);
  });
});
