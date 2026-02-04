import {wrapWithParantheses} from "../../utils/wrapWithParantheses.js";
import type {AstNodeVisitor} from "../../types.js";

export const LogicalExpression: AstNodeVisitor<LogicalExpression> = (
  {operator, left, right},
  {transpile}
) => {
  const logicalOperator = operator === "||" ? "or" : "and";
  const leftExpression = wrapWithParantheses(
    left.type === "LogicalExpression" && logicalOperator === "and",
    transpile(left)
  );

  const rightExpression = wrapWithParantheses(
    right.type === "LogicalExpression" && logicalOperator === "and",
    transpile(right)
  );

  return `${leftExpression} ${logicalOperator} ${rightExpression}`;
};
