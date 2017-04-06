import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#logical-expression
export const LogicalExpression = ({ operator, left, right }) => {
  const leftExpression = traverser(left);
  const rightExpression = traverser(right);
  const op = operator === "||" ? "OR" : "AND";

  return `${leftExpression} ${op} ${rightExpression}`;
};