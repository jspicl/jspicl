// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#for-statement
export const WhileStatement = ({ body, test }, { transpile }) =>
  `while ${transpile(test)} do
    ${transpile(body)}
  end`;
