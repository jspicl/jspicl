// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#class-expression
export const MethodDefinition = ({ key, value }, { transpile }) =>
  `${transpile(key)} = ${transpile(value)}`;
