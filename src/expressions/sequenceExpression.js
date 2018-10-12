// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#sequence-expression
export const SequenceExpression = ({ expressions }, { transpile }) =>
  transpile(expressions, { arraySeparator: "\n" });
