import * as esprima from "esprima";
import {ExpressionStatement} from "estree";
import {AssignmentExpression} from "../../src/syntax-tree/expressions";
import {createJspiclTranspiler} from "../../src/transpile";

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
