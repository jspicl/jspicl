import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#for-statement
export const WhileStatement: AstNodeVisitor = ({body, test}, {transpile}) =>
  `while ${transpile(test)} do
    ${transpile(body)}
  end`;
