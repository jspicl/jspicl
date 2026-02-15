import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isObjectExpression = (
  node?: ASTNode | null
): node is ObjectExpression => node?.type === "ObjectExpression";

export const ObjectExpression: AstNodeVisitor<ObjectExpression> = (
  {properties},
  {transpile}
) =>
  `{
    ${transpile(properties, {arraySeparator: ",\n"})}
  }`;
