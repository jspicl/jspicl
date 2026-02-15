import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isBlockStatement = (
  node?: ASTNode | null
): node is BlockStatement => node?.type === "BlockStatement";

export const BlockStatement: AstNodeVisitor<BlockStatement> = (
  {body},
  {transpile}
) => transpile(body);

BlockStatement.scopeBoundary = true;
