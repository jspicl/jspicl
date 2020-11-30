import * as esprima from "esprima";
import {FunctionDeclaration} from "../../src/syntax-tree";
import {createJspiclTranspiler} from "../../src/transpile";

describe("FunctionDeclaration", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("adds scope boundary", () => {
    expect(FunctionDeclaration.scopeBoundary).toBe(true);
  });

  it("renders a function with content", () => {
    const input = "function a() { content; }";
    const output = `function a()
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(FunctionDeclaration(statement, parserOptions)).toBe(output);
  });

  it("renders a function that accepts arguments", () => {
    const input = "function a(arg1) { content; }";
    const output = `function a(arg1)
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(FunctionDeclaration(statement, parserOptions)).toBe(output);
  });
});
