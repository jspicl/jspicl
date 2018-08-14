import assert from "assert";
import { UpdateExpression } from "expressions";
import esprima from "esprima";

describe("UpdateExpression", () => {
  [
    ["++", "+="],
    ["--", "-="]
  ].forEach(([jsOperator, luaOperator]) =>
    it(`returns 'variable${luaOperator}1' expression for ${jsOperator} updateExpression`, () => {
      const input = `variable${jsOperator}`;
      const output = `variable${luaOperator}1`;
      const { body: [{ expression: statement }] } = esprima.parse(input);

      assert.equal(UpdateExpression(statement), output);
    })
  );
});
