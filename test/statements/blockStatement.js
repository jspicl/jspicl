import assert from "assert";
import { BlockStatement } from "statements";

describe("BlockStatement", () => {
  it("returns empty string if body is missing", () => {
    assert.equal(BlockStatement({}), "");
  });

  it("processes body", () => {
    assert.equal(BlockStatement({ body: { type: "Literal", raw: "value" } }), "value");
  });

  it("adds a scope boundary", () => {
    assert.equal(BlockStatement.scopeBoundary, true);
  });
});
