const wrapWithParanthesesIfNeeded = (type, operator, expression) => type === LogicalExpression.name && operator === "and" ? `(${expression})` : expression; // eslint-disable-line no-use-before-define

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#logical-expression
export const LogicalExpression = ({ operator, left, right }, { transpile }) => {
  const logicalOperator = operator === "||" ? "or" : "and";
  const leftExpression = wrapWithParanthesesIfNeeded(left.type, logicalOperator, transpile(left));
  const rightExpression = wrapWithParanthesesIfNeeded(right.type, logicalOperator, transpile(right));

  return `${leftExpression} ${logicalOperator} ${rightExpression}`;
};
