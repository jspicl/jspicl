import { FunctionDeclaration } from "../declarations";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-expression
export const FunctionExpression = (node, config) =>
  FunctionDeclaration({
    ...node,
    id: null
  }, config);

FunctionExpression.scopeBoundary = true;
