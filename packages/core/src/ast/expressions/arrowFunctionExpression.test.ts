import esprima from "esprima";
import type {ExpressionStatement} from "estree";
import {ArrowFunctionExpression} from "./arrowFunctionExpression.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

describe("ArrowFunctionExpression", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("adds a scope boundary", () => {
    expect(ArrowFunctionExpression.scopeBoundary).toBe(true);
  });

  it("renders a function with content", () => {
    const input = "() => { content; }";
    const output = `function ()
    content
  end`;
    const {body} = esprima.parseScript(input);
    const {expression} = body[0] as ExpressionStatement;

    expect(ArrowFunctionExpression(expression, parserOptions)).toBe(output);
  });

  it("renders a function that accepts arguments", () => {
    const input = "(arg1) => { content; }";
    const output = `function (arg1)
    content
  end`;
    const {body} = esprima.parseScript(input);
    const {expression} = body[0] as ExpressionStatement;

    expect(ArrowFunctionExpression(expression, parserOptions)).toBe(output);
  });
});
