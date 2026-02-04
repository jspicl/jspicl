import type {AstNodeVisitor} from "../../types.js";

export const ReturnStatement: AstNodeVisitor<ReturnStatement> = (
  {argument},
  {transpile}
) => {
  const value = transpile(argument);

  return value ? `return ${value}` : "do return end";
};
