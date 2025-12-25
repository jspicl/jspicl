import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#sequence-expression
export const SequenceExpression: AstNodeVisitor = (
  {expressions},
  {transpile}
) => transpile(expressions, {arraySeparator: "\n"});
