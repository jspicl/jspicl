import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#variable-declaration
export const VariableDeclaration: AstNodeVisitor = (
  {declarations},
  {transpile}
) => transpile(declarations);
