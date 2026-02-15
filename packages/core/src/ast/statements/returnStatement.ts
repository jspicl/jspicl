import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isReturnStatement = (
  node?: ASTNode | null
): node is ReturnStatement => node?.type === "ReturnStatement";

export const ReturnStatement: AstNodeVisitor<ReturnStatement> = (
  {argument},
  {transpile}
) => {
  // It's common for minification of Javascript to yield return statements like `return (a, b, c)`,
  // which is a sequence expression. In Lua, we need to split the sequence expression into multiple lines and return the last expression.
  if (argument?.type === "SequenceExpression") {
    const lastExpression =
      argument.expressions[argument.expressions.length - 1];
    const expressions = argument.expressions.slice(0, -1);
    const transpiledExpressions = transpile(expressions);
    const transpiledLastExpresion = transpile(lastExpression);

    return `${transpiledExpressions}\nreturn ${transpiledLastExpresion}`;
  }

  const value = transpile(argument);

  return value ? `return ${value}` : "do return end";
};
