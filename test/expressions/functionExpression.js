import assert from "assert";
import { FunctionExpression } from "expressions";
import esprima from "esprima";
import createJspiclTranspiler from "transpile";

describe("FunctionExpression", () => {
  const transpile = createJspiclTranspiler();

  it("renders a function with content", () => {
    const input = "(function a() { content; })";
    const output = `function ()
    content
  end`;
    const { body } = esprima.parse(input);
    const [{ expression: statement }] = body;

    assert.equal(FunctionExpression(statement, { transpile }), output);
  });

  it("renders a function that accepts arguments", () => {
    const input = "(function a(arg1) { content; })";
    const output = `function (arg1)
    content
  end`;
    const { body } = esprima.parse(input);
    const [{ expression: statement }] = body;

    assert.equal(FunctionExpression(statement, { transpile }), output);
  });
});
