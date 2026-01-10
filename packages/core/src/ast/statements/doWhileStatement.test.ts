import esprima from "esprima";
import {DoWhileStatement} from "./doWhileStatement.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

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
