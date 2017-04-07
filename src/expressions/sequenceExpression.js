import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#sequence-expression
export const SequenceExpression = ({ expressions }) => {
  return traverser(expressions, { arraySeparator: "\n" });
};