import {EmptyStatement} from "./emptyStatement.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

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
