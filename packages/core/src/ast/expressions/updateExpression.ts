import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isUpdateExpression = (
  node?: ASTNode | null
): node is UpdateExpression => node?.type === "UpdateExpression";

export const UpdateExpression: AstNodeVisitor<UpdateExpression> = (
  {argument, operator},
  {transpile}
) => {
  const identifier = transpile(argument);

  return `${identifier}${operator[0]}=1`;
};
