import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isReturnStatement = (
  node?: ASTNode | null
): node is ReturnStatement => node?.type === "ReturnStatement";

export const ReturnStatement: AstNodeVisitor<ReturnStatement> = (
  {argument},
  {transpile}
) => {
  const value = transpile(argument);

  return value ? `return ${value}` : "do return end";
};
