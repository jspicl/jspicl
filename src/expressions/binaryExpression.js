import traverser from "../traverser";

const operatorTable = {
  "!==": "!=",
  "===": "==",
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#binary-expression
export const BinaryExpression = ({ operator, left, right }) => {
  let leftExpression = traverser(left);
  let rightExpression = traverser(right);
  const luaOperator = operatorTable[operator] || operator;

  if (luaOperator === "*" || luaOperator === "/" || luaOperator === "%") {
    if (left.type === BinaryExpression.name) {
      leftExpression = `(${leftExpression})`;
    }

    if (right.type === BinaryExpression.name) {
      rightExpression = `(${leftExpression})`;
    }
  }

  return `${leftExpression} ${luaOperator} ${rightExpression}`;
};