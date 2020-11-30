import {EmptyStatement} from "../../src/syntax-tree/statements";
import {createJspiclTranspiler} from "../../src/transpile";

describe("EmptyStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("returns an empty string", () => {
    expect(EmptyStatement({}, parserOptions)).toBe("");
  });
});
