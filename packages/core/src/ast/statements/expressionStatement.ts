import {FunctionExpression} from "../expressions/functionExpression.js";
import {wrapWithParantheses} from "../../helpers/wrapWithParantheses.js";
import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#expression-statement
export const ExpressionStatement: AstNodeVisitor = (
  {expression, directive},
  {transpile}
) =>
  !directive
    ? wrapWithParantheses(
        expression.type === FunctionExpression.name,
        transpile(expression)
      )
    : "";
