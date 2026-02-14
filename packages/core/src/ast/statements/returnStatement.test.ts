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
    const input: ReturnStatement = {
      type: "ReturnStatement",
      argument: {
        type: "Literal",
        raw: "1",
        value: 1
      } as Literal
    };

    expect(ReturnStatement(input, parserOptions)).toBe(
      `return ${input.argument!.raw}`
    );
  });

  it("handles SequenceExpressions", () => {
    const input: ReturnStatement = {
      type: "ReturnStatement",
      argument: {
        type: "SequenceExpression",
        expressions: [
          {
            type: "AssignmentExpression",
            operator: "%",
            left: {
              type: "AssignmentExpression",
              operator: "=",
              left: {
                type: "Identifier",
                name: "O"
              },
              right: {
                type: "BinaryExpression",
                operator: "+",
                left: {
                  type: "Identifier",
                  name: "O"
                },
                right: {
                  type: "Literal",
                  raw: 1
                }
              }
            },
            right: {
              type: "Literal",
              raw: 100
            }
          },
          {
            type: "Identifier",
            name: "O"
          }
        ] as ReturnStatement["argument"][]
      } as SequenceExpression
    };

    const result = ReturnStatement(input, parserOptions);
    expect(result).toBe(`o=o + 1%100\nreturn o`);
  });
});
