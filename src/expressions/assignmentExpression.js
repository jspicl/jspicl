import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#assignment-expression
export const AssignmentExpression = ({ operator, left, right }) => {
  const leftExpression = traverser(left);
  const rightExpression = traverser(right);

  return `${leftExpression} ${operator} ${rightExpression}`;
};