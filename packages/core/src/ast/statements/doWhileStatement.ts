import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#do-while-statement
export const DoWhileStatement: AstNodeVisitor = ({body, test}, {transpile}) =>
  `repeat
    ${transpile(body)}
  until not (${transpile(test)})`;
