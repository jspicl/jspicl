import * as esprima from "esprima";
import {DoWhileStatement} from "../../src/syntax-tree/statements";
import {createJspiclTranspiler} from "../../src/transpile";

describe("DoWhileStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("transpiles body and test expression", () => {
    const input = "while (testexpression) { body; }";
    const {
      body: [statement]
    } = esprima.parseScript(input);

    const output = `repeat
    body
  until not (testexpression)`;

    expect(DoWhileStatement(statement, parserOptions)).toBe(output);
  });
});
