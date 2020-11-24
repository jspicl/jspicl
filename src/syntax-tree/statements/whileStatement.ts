import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#for-statement
export const WhileStatement: AstNodeParser = ({body, test}, {transpile}) =>
  `while ${transpile(test)} do
    ${transpile(body)}
  end`;
