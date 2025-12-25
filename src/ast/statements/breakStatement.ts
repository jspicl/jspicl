import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#break-statement
export const BreakStatement: AstNodeVisitor = (_, {scope: {isInsideSwitch}}) =>
  isInsideSwitch ? "" : "break";
