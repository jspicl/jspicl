import transpile from "../transpile";
import { normalizeName } from "../helpers";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
export const VariableDeclarator = ({ id, init }) => {
  const { name } = id;
  const value = transpile(init) || "nil";

  return `local ${normalizeName(name)} = ${value}`;
};
