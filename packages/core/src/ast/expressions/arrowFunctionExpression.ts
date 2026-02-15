import type {ASTNode, AstNodeVisitor} from "../../types.js";
import {assert} from "../../utils/assert.js";
import {FunctionDeclaration} from "../declarations/functionDeclaration.js";

export const isArrowFunctionExpression = (
  node?: ASTNode | null
): node is ArrowFunctionExpression => node?.type === "ArrowFunctionExpression";

export const ArrowFunctionExpression: AstNodeVisitor<
  ArrowFunctionExpression
> = (node, options) => {
  assert(!node.async, "Async arrow functions are not supported.");
  assert(!node.generator, "Generator arrow functions are not supported.");

  const body: BlockStatement =
    node.body.type !== "BlockStatement"
      ? {
          type: "BlockStatement",
          body: [
            {
              type: "ReturnStatement",
              argument: node.body
            }
          ]
        }
      : node.body;

  return FunctionDeclaration(
    {
      id: node.id,
      params: node.params,
      body,
      async: false,
      generator: false,
      expression: false,
      type: "FunctionDeclaration"
    },
    options
  );
};

ArrowFunctionExpression.scopeBoundary = true;
