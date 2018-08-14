import assert from "assert";
import { ConditionalExpression } from "expressions";
import esprima from "esprima";

describe("ConditionalExpression", () => {
  it("renders a conditional expression as an inline function with if/else statement", () => {
    const input = "a ? b : c";
    const output = "(function () if a then return b else return c end end)()";
    const { body } = esprima.parse(input);
    const [{ expression: statement }] = body;

    assert.equal(ConditionalExpression(statement), output);
  });

  it("renders a nested conditional expression as an inline function with if/else statements", () => {
    const input = "a ? b ? c() : d : f()";
    const output = "(function () if a then return (function () if b then return c() else return d end end)() else return f() end end)()";
    const { body } = esprima.parse(input);
    const [{ expression: statement }] = body;

    assert.equal(ConditionalExpression(statement), output);
  });
});
