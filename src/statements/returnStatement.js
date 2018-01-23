import { transpile } from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#return-statement
export const ReturnStatement = ({ argument }) => {
  const value = transpile(argument);

  return value ? `return ${value}` : "do return end";
};
