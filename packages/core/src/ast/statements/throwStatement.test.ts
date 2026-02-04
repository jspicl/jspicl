import esprima from "esprima";
import {ThrowStatement} from "./throwStatement.js";
import {createJspiclTranspiler} from "../../transpile.js";
import {describe, it, expect} from "vitest";

describe("ThrowStatement", () => {
  const transpile = createJspiclTranspiler();
  const parserOptions = {
    transpile,
    scope: {
      variables: {}
    }
  };

  it("renders an assert with empty error message", () => {
    expect(
      ThrowStatement(
        {
          type: "ThrowStatement",
          argument: {
            type: "Literal",
            value: "",
            raw: '""'
          }
        },
        parserOptions
      )
    ).toBe('assert(false, "\\"\\"")');
  });

  it("renders an assert with an error message", () => {
    const {
      body: [argument]
    } = esprima.parseScript("Error('Error message')");
    expect(
      ThrowStatement(
        {
          type: "ThrowStatement",
          argument: argument as unknown as Expression
        },
        parserOptions
      )
    ).toBe("assert(false, \"error('Error message')\")");
  });

  it("renders an assert with a custom object", () => {
    const {
      body: [argument]
    } = esprima.parseScript(`(${JSON.stringify({message: "Error message"})})`);
    expect(
      ThrowStatement(
        {type: "ThrowStatement", argument: argument as unknown as Expression},
        parserOptions
      )
    ).toBe('assert(false, "{\\n    message = \\"Error message\\"\\n  }")');
  });
});
