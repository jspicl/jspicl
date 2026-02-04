import {getPolyfilledMemberExpression} from "../../polyfills/getPolyfilledMemberExpression.js";
import type {AstNodeVisitor} from "../../types.js";

export const MemberExpression: AstNodeVisitor<MemberExpression> = (
  {computed, object, property},
  {transpile}
) => getPolyfilledMemberExpression({transpile, computed, object, property});
