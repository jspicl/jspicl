import { normalizeName } from "helpers";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const Property = ({ key, value }, { transpile }) => {
  const { name, value: alternativeName = "" } = key; // The key could be a Literal or an Identifier

  return `${normalizeName(name || alternativeName)} = ${transpile(value)}`;
};
