// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#if-statement
export const IfStatement = ({ test, consequent, alternate }, { transpile }) => {
  const testExpression = transpile(test);
  const statementBody = transpile(consequent);
  const alternateStatement = transpile(alternate);

  const alternateIsIfStatement = alternate && alternate.type === IfStatement.name;

  let closingStatement = "end";
  if (alternateStatement) {
    closingStatement = alternateIsIfStatement ? `else${alternateStatement}` : `else ${alternateStatement} end`;
  }

  return `if ${testExpression} then
    ${statementBody}
  ${closingStatement}`;
};
