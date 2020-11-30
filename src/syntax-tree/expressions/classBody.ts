import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
export const ClassBody: AstNodeParser = ({body}, {transpile}) =>
  `{
    ${transpile(body, {arraySeparator: ",\n"})}
  }`;
