import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isConditionalExpression = (
  node?: ASTNode | null
): node is ConditionalExpression => node?.type === "ConditionalExpression";

export const ConditionalExpression: AstNodeVisitor<ConditionalExpression> = (
  {test, consequent, alternate},
  {transpile}
) => {
  const testExpression = transpile(test);
  const consequentPath = transpile(consequent);
  const alternatePath = transpile(alternate);

  return `(function () if ${testExpression} then return ${consequentPath} else return ${alternatePath} end end)()`;
};
