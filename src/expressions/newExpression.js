// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
export const NewExpression = ({ arguments: args, callee }, { transpile }) => {
  const className = `class_${transpile(callee)}`;
  const classArguments = transpile(args, { arraySeparator: "," });

  return `${className}(${classArguments})`;
};
