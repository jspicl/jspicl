import { FunctionDeclaration } from "../declarations";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#function-expression
export const FunctionExpression = args =>
  FunctionDeclaration(Object.assign({}, args, {
    id: null
  }));
