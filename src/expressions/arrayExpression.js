// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#array-expression
export const ArrayExpression = ({ elements }, { transpile }) =>
  `{
    ${transpile(elements, { arraySeparator: ", " })}
  }`;

