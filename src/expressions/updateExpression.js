import { transpile } from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#update-expression
export const UpdateExpression = ({ argument, operator }) => {
  const identifier = transpile(argument);

  return `${identifier}${operator[0]}=1`;
};
