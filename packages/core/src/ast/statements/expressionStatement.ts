import {wrapWithParantheses} from "../../utils/wrapWithParantheses.js";
import type {AstNodeVisitor} from "../../types.js";

export const ExpressionStatement: AstNodeVisitor<ExpressionStatement> = (
  {expression, directive},
  {transpile}
) =>
  !directive
    ? wrapWithParantheses(
        expression.type === "FunctionExpression",
        transpile(expression)
      )
    : "";
