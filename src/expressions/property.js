import { normalizeName } from "../helpers";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const Property = ({ key, value }, { transpile }) => {
  const { name } = key;

  return `${normalizeName(name)} = ${transpile(value)}`;
};
