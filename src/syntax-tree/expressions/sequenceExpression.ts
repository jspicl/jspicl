import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#sequence-expression
export const SequenceExpression: AstNodeParser = ({expressions}, {transpile}) =>
  transpile(expressions, {arraySeparator: "\n"});
