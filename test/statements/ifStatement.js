import assert from "assert";
import { IfStatement } from "statements";

describe("IfStatement", () => {
  it("renders an if statement using a test expression and consequent", () => {
    const input = {
      test: {
        type: "Literal",
        raw: "testExpression"
      },
      consequent: {
        type: "Literal",
        raw: "content"
      }
    };
    const output = `if (testExpression) then
    content
  end`;

    assert.equal(IfStatement(input), output);
  });

  it("renders an else statement", () => {
    const input = {
      test: {
        type: "Literal",
        raw: "testExpression"
      },
      consequent: {
        type: "Literal",
        raw: "content"
      },
      alternate: {
        type: "Literal",
        raw: "alternative"
      }
    };
    const output = `if (testExpression) then
    content
  else alternative end`;

    assert.equal(IfStatement(input), output);
  });

  it("renders an else-if statement", () => {
    const input = {
      test: {
        type: "Literal",
        raw: "testExpression"
      },
      consequent: {
        type: "Literal",
        raw: "content"
      },
      alternate: {
        type: "IfStatement",
        test: {
          type: "Literal",
          raw: "testExpression2"
        },
        consequent: {
          type: "Literal",
          raw: "content2"
        }
      }
    };
    const output = `if (testExpression) then
    content
  elseif (testExpression2) then
    content2
  end`;

    assert.equal(IfStatement(input), output);
  });

  it("renders multiple else-if statements and one else statement", () => {
    const input = {
      test: {
        type: "Literal",
        raw: "testExpression"
      },
      consequent: {
        type: "Literal",
        raw: "content"
      },
      alternate: {
        type: "IfStatement",
        test: {
          type: "Literal",
          raw: "testExpression2"
        },
        consequent: {
          type: "Literal",
          raw: "content2"
        },
        alternate: {
          type: "IfStatement",
          test: {
            type: "Literal",
            raw: "testExpression3"
          },
          consequent: {
            type: "Literal",
            raw: "content3"
          },
          alternate: {
            type: "Literal",
            raw: "content4"
          }
        }
      }
    };
    const output = `if (testExpression) then
    content
  elseif (testExpression2) then
    content2
  elseif (testExpression3) then
    content3
  else content4 end`;

    assert.equal(IfStatement(input), output);
  });
});
