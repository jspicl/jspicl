import esprima from "esprima";
import {ExpressionStatement} from "./expressionStatement.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";
import type {ASTNode} from "trastpiler";

describe("ExpressionStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("ignores 'use strict' directive", () => {
    const input = "'use strict'";
    const {
      body: [statement]
    } = esprima.parseScript(input);

    expect(ExpressionStatement(statement, parserOptions)).toBe("");
  });

  it("ignores local 'use strict' directive", () => {
    const input = "function a () { 'use strict' }";
    const {
      body: [statement]
    } = esprima.parseScript(input);
    const output = "function a()\n    \n  end";

    expect(transpile(statement as ASTNode)).toBe(output);
  });
});
