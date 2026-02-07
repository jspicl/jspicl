import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isDoWhileStatement = (
  node?: ASTNode | null
): node is DoWhileStatement => node?.type === "DoWhileStatement";

export const DoWhileStatement: AstNodeVisitor<DoWhileStatement> = (
  {body, test},
  {transpile}
) =>
  `repeat
    ${transpile(body)}
  until not (${transpile(test)})`;
