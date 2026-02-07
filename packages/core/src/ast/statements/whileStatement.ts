import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isWhileStatement = (
  node?: ASTNode | null
): node is WhileStatement => node?.type === "WhileStatement";

export const WhileStatement: AstNodeVisitor<WhileStatement> = (
  {body, test},
  {transpile}
) =>
  `while ${transpile(test)} do
    ${transpile(body)}
  end`;
