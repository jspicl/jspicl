import { polyfillMemberExpression } from "../polyfiller";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
export const MemberExpression = ({ computed, object, property }) =>
  polyfillMemberExpression({ computed, object, property });
