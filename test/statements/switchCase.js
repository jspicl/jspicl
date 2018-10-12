import assert from "assert";
import { SwitchCase } from "statements";
import createJspiclTranspiler from "transpile";

describe("SwitchCase", () => {
  const transpile = createJspiclTranspiler();

  it("throws an error if it's a fallthrough statement", () => {
    const input = {
      consequent: []
    };

    assert.throws(() => SwitchCase(input, { transpile }));
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

    assert.equal(SwitchCase(input, { transpile }), output);
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

    assert.equal(SwitchCase(input, { transpile }), output);
  });
});
