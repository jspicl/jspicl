// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#block-statement
export const BlockStatement = ({ body }, { transpile }) => transpile(body);

BlockStatement.scopeBoundary = true;
