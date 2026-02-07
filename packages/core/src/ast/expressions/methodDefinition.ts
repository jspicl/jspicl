import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isMethodDefinition = (
  node?: ASTNode | null
): node is MethodDefinition => node?.type === "MethodDefinition";

export const MethodDefinition: AstNodeVisitor<MethodDefinition> = (
  {key, value},
  {transpile}
) => `${transpile(key)} = ${transpile(value)}`;
