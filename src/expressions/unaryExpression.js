// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#unary-expression
export const UnaryExpression = ({ operator, argument }, { transpile }) => {
  const { type } = argument;
  const value = transpile(argument);
  const luaOperator = operator === "!" ? "not " : operator;
  const expression = type === UnaryExpression.name || operator !== "~" ? value : `(${value})`;

  return operator === "void" ? "nil" : `${luaOperator}${expression}`;
};
