import {wrapWithParantheses} from "../../utils/wrapWithParantheses.js";
import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isExpressionStatement = (
  node?: ASTNode | null
): node is ExpressionStatement => node?.type === "ExpressionStatement";

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
