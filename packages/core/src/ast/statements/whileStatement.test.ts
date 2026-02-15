import esprima from "esprima";
import {WhileStatement} from "./whileStatement.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

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
