import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isArrayExpression = (
  node?: ASTNode | null
): node is ArrayExpression => node?.type === "ArrayExpression";

export const ArrayExpression: AstNodeVisitor<ArrayExpression> = (
  {elements},
  {transpile}
) =>
  `{
    ${transpile(elements, {arraySeparator: ", "})}
  }`;
