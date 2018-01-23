import { transpile } from "../transpile";
import { normalizeName } from "../helpers";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const Property = ({ key, value }) => {
  const { name } = key;

  return `${normalizeName(name)} = ${transpile(value)}`;
};
