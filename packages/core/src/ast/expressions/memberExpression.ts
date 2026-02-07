import {getPolyfilledMemberExpression} from "../../polyfills/getPolyfilledMemberExpression.js";
import type {ASTNode, AstNodeVisitor} from "../../types.js";

export const isMemberExpression = (
  node?: ASTNode | null
): node is MemberExpression => node?.type === "MemberExpression";

export const MemberExpression: AstNodeVisitor<MemberExpression> = (
  {computed, object, property},
  {transpile}
) => getPolyfilledMemberExpression({transpile, computed, object, property});
