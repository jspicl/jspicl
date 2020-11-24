import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#block-statement
export const BlockStatement: AstNodeParser = ({body}, {transpile}) =>
  transpile(body);

BlockStatement.scopeBoundary = true;
