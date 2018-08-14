import assert from "assert";
import { AssignmentExpression } from "expressions";
import esprima from "esprima";

describe("AssignmentExpression", () => {
  ["*=", "+=", "-=", "%=", "/="].forEach(operator =>
    it(`renders two expressions separated by an ${operator}`, () => {
      const input = `variable ${operator} value`;
      const output = `variable${operator}value`;
      const { body } = esprima.parse(input);
      const [{ expression: statement }] = body;

      assert.equal(AssignmentExpression(statement), output);
    })
  );

});
