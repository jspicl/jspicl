import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isUnaryExpression = (
  node?: ASTNode | null
): node is UnaryExpression => node?.type === "UnaryExpression";

export const UnaryExpression: AstNodeVisitor<UnaryExpression> = (
  {operator, argument},
  {transpile}
) => {
  const value = transpile(argument);

  if (operator === "~") {
    throw new Error("Unary operator ~ is not supported.");
  }

  const luaOperator = operator === "!" ? "not " : operator;
  return operator === "void" ? "nil" : `${luaOperator}${value}`;
};
