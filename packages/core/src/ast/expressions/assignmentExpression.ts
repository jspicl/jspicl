import type {AstNodeVisitor} from "../../types.js";

export const AssignmentExpression: AstNodeVisitor<AssignmentExpression> = (
  {operator, left, right},
  {transpile}
) => {
  const leftExpression = transpile(left);
  const rightExpression = transpile(right);

  return `${leftExpression}${operator}${rightExpression}`;
};
