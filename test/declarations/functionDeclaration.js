import assert from "assert";
import { FunctionDeclaration } from "declarations";
import esprima from "esprima";
import createJspiclTranspiler from "transpile";

describe("FunctionDeclaration", () => {
  const transpile = createJspiclTranspiler();

  it("adds scope boundary", () => {
    assert.equal(FunctionDeclaration.scopeBoundary, true);
  });

  it("renders a function with content", () => {
    const input = "function a() { content; }";
    const output = `function a()
    content
  end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(FunctionDeclaration(statement, { transpile }), output);
  });

  it("renders a function that accepts arguments", () => {
    const input = "function a(arg1) { content; }";
    const output = `function a(arg1)
    content
  end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(FunctionDeclaration(statement, { transpile }), output);
  });
});
