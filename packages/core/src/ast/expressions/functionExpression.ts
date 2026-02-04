import type {AstNodeVisitor} from "../../types.js";
import {assert} from "../../utils/assert.js";
import {FunctionDeclaration} from "../declarations/functionDeclaration.js";

export const FunctionExpression: AstNodeVisitor<FunctionExpression> = (
  node,
  options
) => {
  assert(!node.async, "Async arrow functions are not supported.");
  assert(!node.generator, "Generator arrow functions are not supported.");

  return FunctionDeclaration(
    {
      id: null,
      params: node.params,
      body: node.body,
      async: node.async,
      generator: node.generator,
      type: "FunctionDeclaration"
    },
    options
  );
};

FunctionExpression.scopeBoundary = true;
