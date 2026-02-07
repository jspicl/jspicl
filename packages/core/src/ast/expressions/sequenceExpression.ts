import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isSequenceExpression = (
  node?: ASTNode | null
): node is SequenceExpression => node?.type === "SequenceExpression";

export const SequenceExpression: AstNodeVisitor<SequenceExpression> = (
  {expressions},
  {transpile}
) => transpile(expressions, {arraySeparator: "\n"});
