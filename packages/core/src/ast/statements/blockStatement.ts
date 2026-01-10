import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#block-statement
export const BlockStatement: AstNodeVisitor = ({body}, {transpile}) =>
  transpile(body);

BlockStatement.scopeBoundary = true;
