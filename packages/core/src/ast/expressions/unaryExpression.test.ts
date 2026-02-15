import esprima from "esprima";
import type {ExpressionStatement} from "estree";
import {UnaryExpression} from "./unaryExpression.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

describe("UnaryExpression", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  [
    {input: "!a", output: "not a"},
    {input: "+a", output: "+a"},
    {input: "-a", output: "-a"},
    {input: "!!a", output: "not not a"},
    {input: "void a", output: "nil"},
    {input: "!+a", output: "not +a"}
  ].forEach(({input, output}) =>
    it(`renders the unary expression '${output}'`, () => {
      const {body} = esprima.parseScript(input);
      const {expression} = body[0] as ExpressionStatement;

      expect(UnaryExpression(expression, parserOptions)).toBe(output);
    })
  );

  it("throws an error if operator ~ is used", () => {
    const {body} = esprima.parseScript("~~1");
    const {expression} = body[0] as ExpressionStatement;

    expect(() => UnaryExpression(expression, parserOptions)).toThrow();
  });
});
