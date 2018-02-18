import assert from "assert";
import { BlockStatement } from "statements";

describe("BlockStatement", () => {
  it("returns undefined if body is missing", () => {
    assert.equal(BlockStatement({}), undefined);
  });

  it("processes body", () => {
    assert.equal(BlockStatement({ body: { type: "Literal", raw: "value" } }), "value");
  });

  it("adds a scope boundary", () => {
    assert.equal(BlockStatement.scopeBoundary, true);
  });
});
