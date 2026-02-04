import type {AstNodeVisitor} from "../../types.js";

export const UpdateExpression: AstNodeVisitor<UpdateExpression> = (
  {argument, operator},
  {transpile}
) => {
  const identifier = transpile(argument);

  return `${identifier}${operator[0]}=1`;
};
