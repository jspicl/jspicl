import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isIfStatement = (node?: ASTNode | null): node is IfStatement =>
  node?.type === "IfStatement";

const IfStatement: AstNodeVisitor<IfStatement> = (
  {test, consequent, alternate},
  {transpile}
) => {
  const testExpression = transpile(test);
  const statementBody = transpile(consequent);
  const alternateStatement = transpile(alternate);

  const alternateIsIfStatement = alternate && alternate.type === "IfStatement";

  let closingStatement = "end";
  if (alternateStatement) {
    closingStatement = alternateIsIfStatement
      ? `else${alternateStatement}`
      : `else ${alternateStatement} end`;
  }

  return `if ${testExpression} then
    ${statementBody}
  ${closingStatement}`;
};

export {IfStatement};
