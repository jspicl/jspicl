import esprima from "esprima";
import type {ExpressionStatement} from "estree";
import {AssignmentExpression} from "./assignmentExpression.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

describe("AssignmentExpression", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  ["*=", "+=", "-=", "%=", "/="].forEach((operator) =>
    it(`renders two expressions separated by an ${operator}`, () => {
      const input = `variable ${operator} value`;
      const output = `variable${operator}value`;
      const {body} = esprima.parseScript(input);
      const {expression} = body[0] as ExpressionStatement;

      expect(AssignmentExpression(expression, parserOptions)).toBe(output);
    })
  );
});
