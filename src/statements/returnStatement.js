import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#return-statement
export const ReturnStatement = ({ argument }) => {
  const value = traverser(argument);

  return value ? `return ${value}` : "do return end";
};
