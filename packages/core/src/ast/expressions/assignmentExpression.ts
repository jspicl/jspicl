import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#assignment-expression
export const AssignmentExpression: AstNodeVisitor = (
  {operator, left, right},
  {transpile}
) => {
  const leftExpression = transpile(left);
  const rightExpression = transpile(right);

  return `${leftExpression}${operator}${rightExpression}`;
};
