import assert from "assert";
import { WhileStatement } from "statements";
const esprima = require("esprima");

describe("WhileStatememt", () => {
  it("renders a while statement with a test expression and body", () => {
    const input = "while (testExpression) { content; }";
    const output = `while testExpression do
    content
  end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(WhileStatement(statement), output);
  });
});
