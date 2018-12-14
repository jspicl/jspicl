import { FunctionDeclaration } from "../declarations";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#arrow-function-expression
export const ArrowFunctionExpression = (...args) => FunctionDeclaration(...args);

ArrowFunctionExpression.scopeBoundary = true;
