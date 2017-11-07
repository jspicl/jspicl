import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
export const VariableDeclarator = ({ id, init }) => {
  const { name } = id;
  const value = transpile(init) || "nil";

  return `local ${name} = ${value}`;
};
