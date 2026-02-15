import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isEmptyStatement = (
  node?: ASTNode | null
): node is EmptyStatement => node?.type === "EmptyStatement";

export const EmptyStatement: AstNodeVisitor<EmptyStatement> = () => "";
