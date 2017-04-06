import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#expression-statement
export const ExpressionStatement = ({ expression }) => {
  return traverser(expression);
};