import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isThrowStatement = (
  node?: ASTNode | null
): node is ThrowStatement => node?.type === "ThrowStatement";

// https://esprima.readthedocs.io/en/latest/syntax-tree-format.html#throw-statement
export const ThrowStatement: AstNodeVisitor<ThrowStatement> = (
  {argument},
  {transpile}
) => {
  const transpiledArgument = transpile(argument)
    .replace(/\n/g, "\\n")
    .replace(/"/g, '\\"');

  return `assert(false, "${transpiledArgument}")`;
};
