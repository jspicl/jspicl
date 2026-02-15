import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isBinaryExpression = (
  node?: ASTNode | null
): node is BinaryExpression => node?.type === "BinaryExpression";

const operatorTable: Record<string, string> = {
  "!==": "!=",
  "===": "=="
};

export const BinaryExpression: AstNodeVisitor<BinaryExpression> = (
  {operator, left, right},
  {transpile}
) => {
  let leftExpression = transpile(left);
  let rightExpression = transpile(right);
  const luaOperator = operatorTable[operator] || operator;

  if (luaOperator === "*" || luaOperator === "/" || luaOperator === "%") {
    if (left.type === "BinaryExpression") {
      leftExpression = `(${leftExpression})`;
    }

    if (right.type === "BinaryExpression") {
      rightExpression = `(${rightExpression})`;
    }
  }

  return `${leftExpression} ${luaOperator} ${rightExpression}`;
};
