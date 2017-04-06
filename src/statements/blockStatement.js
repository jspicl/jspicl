import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#block-statement
export const BlockStatement = ({ body }) => {
  return traverser(body);
};