import {AstNodeParser} from "../../types";
import {FunctionDeclaration} from "../declarations";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#arrow-function-expression
export const ArrowFunctionExpression: AstNodeParser = (...args) =>
  FunctionDeclaration(...args);

ArrowFunctionExpression.scopeBoundary = true;
