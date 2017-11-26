import transpile from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-expression
export const MethodDefinition = ({ key, value }) => {
  return `${transpile(key)} = ${transpile(value)}`;
};
