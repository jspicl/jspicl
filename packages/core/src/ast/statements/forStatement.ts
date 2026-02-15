import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isForStatement = (node?: ASTNode | null): node is ForStatement =>
  node?.type === "ForStatement";

export const ForStatement: AstNodeVisitor<ForStatement> = (
  {body, init, test, update},
  {transpile}
) =>
  `${transpile(init)}
  while ${transpile(test)} do
    ${transpile(body)}
    ${transpile(update, {arraySeparator: "\n"})}
  end`;
