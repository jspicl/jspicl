import assert from "assert";
import esprima from "esprima";
import createJspiclTranspiler from "transpile";
import { ExpressionStatement } from "statements";

describe("ExpressionStatement", () => {
  const transpile = createJspiclTranspiler();

  it("ignores 'use strict' directive", () => {
    const input = "'use strict'";
    const { body: [statement] } = esprima.parse(input);

    assert.equal(ExpressionStatement(statement, { transpile }), "");
  });

  it("ignores local 'use strict' directive", () => {
    const input = "function a () { 'use strict' }";
    const { body: [statement] } = esprima.parse(input);
    const output = "function a()\n    \n  end";

    assert.equal(transpile(statement), output);
  });
});
