import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const ObjectExpression: AstNodeVisitor = ({properties}, {transpile}) =>
  `{
    ${transpile(properties, {arraySeparator: ",\n"})}
  }`;
