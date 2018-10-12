// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#update-expression
export const UpdateExpression = ({ argument, operator }, { transpile }) => {
  const identifier = transpile(argument);

  return `${identifier}${operator[0]}=1`;
};
