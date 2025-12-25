import {ReturnStatement} from "./returnStatement.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

describe("ReturnStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("handles return statements with no argument", () => {
    expect(ReturnStatement({}, parserOptions)).toBe("do return end");
  });

  it("returns 'value' if argument is supplied", () => {
    const input = {
      argument: {
        type: "Literal",
        raw: 1
      }
    };

    expect(ReturnStatement(input, parserOptions)).toBe(
      `return ${input.argument.raw}`
    );
  });
});
