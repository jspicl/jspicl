import assert from "assert";
import { SwitchCase } from "statements";

describe("SwitchCase", () => {
  it("throws an error if it's a fallthrough statement", () => {
    const input = {
      consequent: []
    };

    assert.throws(() => SwitchCase(input));
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

    assert.equal(SwitchCase(input), output);
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

    assert.equal(SwitchCase(input), output);
  });
});
