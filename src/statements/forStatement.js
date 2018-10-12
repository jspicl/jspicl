// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#while-statement
export const ForStatement = ({ body, init, test, update }, { transpile }) =>
  `${transpile(init)}
  while ${transpile(test)} do
    ${transpile(body)}
    ${transpile(update, { arraySeparator: "\n" })}
  end`;
