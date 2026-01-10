import type {AstNodeVisitor} from "../../types.js";
import {FunctionDeclaration} from "../declarations/functionDeclaration.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-expression
export const FunctionExpression: AstNodeVisitor = (node, options) =>
  FunctionDeclaration(
    {
      ...node,
      id: null
    },
    options
  );

FunctionExpression.scopeBoundary = true;
