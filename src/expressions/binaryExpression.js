import { transpile } from "../transpile";

const operatorTable = {
  "!==": "!=",
  "===": "=="
};

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#binary-expression
export const BinaryExpression = ({ operator, left, right }) => {
  let leftExpression = transpile(left);
  let rightExpression = transpile(right);
  const luaOperator = operatorTable[operator] || operator;

  if (luaOperator === "*" || luaOperator === "/" || luaOperator === "%") {
    if (left.type === BinaryExpression.name) {
      leftExpression = `(${leftExpression})`;
    }

    if (right.type === BinaryExpression.name) {
      rightExpression = `(${rightExpression})`;
    }
  }

  return `${leftExpression} ${luaOperator} ${rightExpression}`;
};
