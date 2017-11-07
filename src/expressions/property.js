import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const Property = ({ key, value }) => {
  const { name } = key;

  return `${name} = ${transpile(value)}`;
};
