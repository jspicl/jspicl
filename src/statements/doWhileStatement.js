// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#do-while-statement
export const DoWhileStatement = ({ body, test }, { transpile }) =>
  `repeat
    ${transpile(body)}
  until not (${transpile(test)})`;
