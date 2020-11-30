import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#array-expression
export const ArrayExpression: AstNodeParser = ({elements}, {transpile}) =>
  `{
    ${transpile(elements, {arraySeparator: ", "})}
  }`;
