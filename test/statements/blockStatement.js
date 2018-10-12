import assert from "assert";
import { BlockStatement } from "statements";
import createJspiclTranspiler from "transpile";

describe("BlockStatement", () => {
  const transpile = createJspiclTranspiler();

  it("returns empty string if body is missing", () => {
    assert.equal(BlockStatement({}, { transpile }), "");
  });

  it("processes body", () => {
    assert.equal(BlockStatement({ body: { type: "Literal", raw: "value" } }, { transpile }), "value");
  });

  it("adds a scope boundary", () => {
    assert.equal(BlockStatement.scopeBoundary, true);
  });
});
