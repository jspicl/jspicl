// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-declaration
export const ClassBody = ({ body }, { transpile }) =>
  `{
    ${transpile(body, { arraySeparator: ",\n" })}
  }`;
