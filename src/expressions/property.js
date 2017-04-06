import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const Property = ({ key, value }) => {
  const { name } = key;

  return `${name} = ${traverser(value)}`;
};