import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#unary-expression
export const UnaryExpression: AstNodeVisitor = (
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
