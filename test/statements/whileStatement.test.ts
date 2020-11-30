import * as esprima from "esprima";
import {WhileStatement} from "../../src/syntax-tree/statements";
import {createJspiclTranspiler} from "../../src/transpile";

describe("WhileStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("renders a while statement with a test expression and body", () => {
    const input = "while (testexpression) { content; }";
    const output = `while testexpression do
    content
  end`;
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(WhileStatement(statement, parserOptions)).toBe(output);
  });
});
