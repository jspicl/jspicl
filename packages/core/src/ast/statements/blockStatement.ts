import type {AstNodeVisitor} from "../../types.js";

export const BlockStatement: AstNodeVisitor<BlockStatement> = (
  {body},
  {transpile}
) => transpile(body);

BlockStatement.scopeBoundary = true;
