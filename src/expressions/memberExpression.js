import { getPolyfilledMemberExpression } from "../polyfiller";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
export const MemberExpression = ({ computed, object, property }, { transpile }) =>
  getPolyfilledMemberExpression({ transpile, computed, object, property });
