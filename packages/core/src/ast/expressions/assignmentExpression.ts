import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isAssignmentExpression = (
  node?: ASTNode | null
): node is AssignmentExpression => node?.type === "AssignmentExpression";

export const AssignmentExpression: AstNodeVisitor<AssignmentExpression> = (
  {operator, left, right},
  {transpile}
) => {
  const leftExpression = transpile(left);
  const rightExpression = transpile(right);

  return `${leftExpression}${operator}${rightExpression}`;
};
