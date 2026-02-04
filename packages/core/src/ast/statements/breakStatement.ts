import type {AstNodeVisitor} from "../../types.js";

export const BreakStatement: AstNodeVisitor<BreakStatement> = (
  _,
  {scope: {isInsideSwitch}}
) => (isInsideSwitch ? "" : "break");
