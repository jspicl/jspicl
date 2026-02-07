import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isBreakStatement = (
  node?: ASTNode | null
): node is BreakStatement => node?.type === "BreakStatement";

export const BreakStatement: AstNodeVisitor<BreakStatement> = (
  _,
  {scope: {isInsideSwitch}}
) => (isInsideSwitch ? "" : "break");
