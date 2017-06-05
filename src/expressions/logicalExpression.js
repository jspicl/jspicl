import traverser from "../traverser";

const decorateExpression = (type, operator, expression) => type === LogicalExpression.name && operator === "and" ? `(${expression})` : expression;

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#logical-expression
export const LogicalExpression = ({ operator, left, right }) => {
  const logicalOperator = operator === "||" ? "or" : "and";
  const leftExpression = decorateExpression(left.type, logicalOperator, traverser(left));
  const rightExpression = decorateExpression(right.type, logicalOperator, traverser(right));

  return `${leftExpression} ${logicalOperator} ${rightExpression}`;
};