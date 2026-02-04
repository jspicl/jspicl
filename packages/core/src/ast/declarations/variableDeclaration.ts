import type {AstNodeVisitor} from "../../types.js";

export const VariableDeclaration: AstNodeVisitor<VariableDeclaration> = (
  {declarations},
  {transpile}
) => transpile(declarations);
