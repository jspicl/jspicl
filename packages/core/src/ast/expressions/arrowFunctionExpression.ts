import type {AstNodeVisitor} from "../../types.js";
import {FunctionDeclaration} from "../declarations/functionDeclaration.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#arrow-function-expression
export const ArrowFunctionExpression: AstNodeVisitor = (...args) =>
  FunctionDeclaration(...args);

ArrowFunctionExpression.scopeBoundary = true;
