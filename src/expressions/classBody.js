import { transpile } from "../transpile";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
export const ClassBody = ({ body }) =>
  `{
    ${transpile(body, { arraySeparator: ",\n" })}
  }`;
