import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
export const ClassBody: AstNodeVisitor = ({body}, {transpile}) =>
  `{
    ${transpile(body, {arraySeparator: ",\n"})}
  }`;
