import assert from "assert";
import { WhileStatement } from "statements";
import esprima from "esprima";
import createJspiclTranspiler from "transpile";

describe("WhileStatement", () => {
  const transpile = createJspiclTranspiler();

  it("renders a while statement with a test expression and body", () => {
    const input = "while (testexpression) { content; }";
    const output = `while testexpression do
    content
  end`;
    const { body: [statement] } = esprima.parse(input);

    assert.equal(WhileStatement(statement, { transpile }), output);
  });
});
