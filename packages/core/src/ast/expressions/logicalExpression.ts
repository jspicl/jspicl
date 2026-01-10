import {wrapWithParantheses} from "../../helpers/wrapWithParantheses.js";
import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#logical-expression
export const LogicalExpression: AstNodeVisitor = (
  {operator, left, right},
  {transpile}
) => {
  const logicalOperator = operator === "||" ? "or" : "and";
  const leftExpression = wrapWithParantheses(
    left.type === LogicalExpression.name && logicalOperator === "and",
    transpile(left)
  );

  const rightExpression = wrapWithParantheses(
    right.type === LogicalExpression.name && logicalOperator === "and",
    transpile(right)
  );

  return `${leftExpression} ${logicalOperator} ${rightExpression}`;
};
