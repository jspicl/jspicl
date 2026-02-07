import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isVariableDeclaration = (
  node?: ASTNode | null
): node is VariableDeclaration => node?.type === "VariableDeclaration";

export const VariableDeclaration: AstNodeVisitor<VariableDeclaration> = (
  {declarations},
  {transpile}
) => transpile(declarations);
