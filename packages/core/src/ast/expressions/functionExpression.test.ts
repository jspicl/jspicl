import esprima from "esprima";
import type {ExpressionStatement} from "estree";
import {FunctionExpression} from "./functionExpression.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

describe("FunctionExpression", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("adds a scope boundary", () => {
    expect(FunctionExpression.scopeBoundary).toBe(true);
  });

  it("renders a function with content", () => {
    const input = "(function a() { content; })";
    const output = `function ()
    content
  end`;
    const {body} = esprima.parseScript(input);
    const {expression} = body[0] as ExpressionStatement;

    expect(
      FunctionExpression(expression as FunctionExpression, parserOptions)
    ).toBe(output);
  });

  it("renders a function that accepts arguments", () => {
    const input = "(function a(arg1) { content; })";
    const output = `function (arg1)
    content
  end`;
    const {body} = esprima.parseScript(input);
    const {expression} = body[0] as ExpressionStatement;

    expect(
      FunctionExpression(expression as FunctionExpression, parserOptions)
    ).toBe(output);
  });
});
