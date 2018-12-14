import assert from "assert";
import { UnaryExpression } from "expressions";
import esprima from "esprima";
import createJspiclTranspiler from "transpile";

describe("UnaryExpression", () => {
  const transpile = createJspiclTranspiler();

  [
    { input: "!a", output: "not a" },
    { input: "+a", output: "+a" },
    { input: "-a", output: "-a" },
    { input: "!!a", output: "not not a" },
    { input: "void a", output: "nil" },
    { input: "!+a", output: "not +a" }
  ].forEach(({ input, output }) =>
    it(`renders the unary expression '${output}'`, () => {
      const { body } = esprima.parse(input);
      const [{ expression: statement }] = body;
      assert.equal(UnaryExpression(statement, { transpile }), output);
    }));

  it("throws an error if operator ~ is used", () => {
    const { body } = esprima.parse("~~1");
    const [{ expression: statement }] = body;
    assert.throws(() => UnaryExpression(statement, { transpile }));
  });
});
