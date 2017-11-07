import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#assignment-expression
export const AssignmentExpression = ({ operator, left, right }) => {
  const leftExpression = transpile(left);
  const rightExpression = transpile(right);

  return `${leftExpression} ${operator} ${rightExpression}`;
};
