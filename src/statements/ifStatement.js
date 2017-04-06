import traverser from "../traverser";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#if-statement
export const IfStatement = ({ test, consequent, alternate }) => {
  const testExpression = traverser(test);
  const statementBody = traverser(consequent);
  const alternateStatement = traverser(alternate);

  const closingStatement = alternateStatement && `else${alternateStatement}` || "end";

  return `if (${testExpression}) then
    ${statementBody}
  ${closingStatement}`;
};