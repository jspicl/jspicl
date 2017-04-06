import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#unary-expression
export const UnaryExpression = ({ operator, argument }) => {
  const { type } = argument;
  const value = traverser(argument);
  const expression = type === UnaryExpression.name || operator !== "~" ? value : `(${value})`;

  return operator === "void" ? "nil" : `${operator}${expression}`;
};