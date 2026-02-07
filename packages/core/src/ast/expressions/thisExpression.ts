import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isThisExpression = (
  node?: ASTNode | null
): node is ThisExpression => node?.type === "ThisExpression";

export const ThisExpression: AstNodeVisitor<ThisExpression> = () => "this";
