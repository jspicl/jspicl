import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#update-expression
export const UpdateExpression: AstNodeParser = (
  {argument, operator},
  {transpile}
) => {
  const identifier = transpile(argument);

  return `${identifier}${operator[0]}=1`;
};
