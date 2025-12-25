import {getPolyfilledMemberExpression} from "../../polyfills/get-polyfilled-member-expression.js";
import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
export const MemberExpression: AstNodeVisitor = (
  {computed, object, property},
  {transpile}
) => getPolyfilledMemberExpression({transpile, computed, object, property});
