// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#return-statement
export const ReturnStatement = ({ argument }, { transpile }) => {
  const value = transpile(argument);

  return value ? `return ${value}` : "do return end";
};
