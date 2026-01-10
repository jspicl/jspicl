import esprima from "esprima";
import type {ExpressionStatement} from "estree";
import {UpdateExpression} from "./updateExpression.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

describe("UpdateExpression", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  [
    ["++", "+="],
    ["--", "-="]
  ].forEach(([jsOperator, luaOperator]) =>
    it(`returns 'variable${luaOperator}1' expression for ${jsOperator} updateExpression`, () => {
      const input = `variable${jsOperator}`;
      const output = `variable${luaOperator}1`;
      const {body} = esprima.parseScript(input);
      const {expression} = body[0] as ExpressionStatement;

      expect(UpdateExpression(expression, parserOptions)).toBe(output);
    })
  );
});
