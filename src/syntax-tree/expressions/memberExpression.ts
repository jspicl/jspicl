import {getPolyfilledMemberExpression} from "../../polyfills/get-polyfilled-member-expression";
import {AstNodeParser} from "../../types";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#member-expression
export const MemberExpression: AstNodeParser = (
  {computed, object, property},
  {transpile}
) => getPolyfilledMemberExpression({transpile, computed, object, property});
