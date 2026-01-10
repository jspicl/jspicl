import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#array-expression
export const ArrayExpression: AstNodeVisitor = ({elements}, {transpile}) =>
  `{
    ${transpile(elements, {arraySeparator: ", "})}
  }`;
