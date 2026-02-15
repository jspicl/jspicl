import {SwitchCase} from "./switchCase.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

describe("SwitchCase", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("throws an error if it's a fallthrough statement", () => {
    const input = {
      consequent: []
    };

    expect(() => SwitchCase(input, parserOptions)).toThrow();
  });

  it("renders a case", () => {
    const input = {
      test: {
        type: "Literal",
        raw: "test"
      },
      consequent: [
        {
          type: "Literal",
          raw: "content"
        }
      ]
    };

    const output = `if test == switchCase then
    content
  `;

    expect(SwitchCase(input, parserOptions)).toBe(output);
  });

  it("renders a default case", () => {
    const input = {
      consequent: [
        {
          type: "Literal",
          raw: "content"
        }
      ]
    };

    const output = `
content`;

    expect(SwitchCase(input, parserOptions)).toBe(output);
  });
});
