// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#object-expression
export const ObjectExpression = ({ properties }, { transpile }) =>
  `{
    ${transpile(properties, { arraySeparator: ",\n" })}
  }`;

