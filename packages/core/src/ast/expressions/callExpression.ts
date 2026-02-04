import {getPolyfilledCallExpression} from "../../polyfills/getPolyfilledCallExpression.js";
import {wrapWithParantheses} from "../../utils/wrapWithParantheses.js";
import type {AstNodeVisitor} from "../../types.js";

export const CallExpression: AstNodeVisitor<CallExpression> = (
  {callee, arguments: args},
  {transpile}
) => {
  const argumentList = transpile(args, {arraySeparator: ", "});

  // Is it a function inside an object?
  if (callee.object) {
    return getPolyfilledCallExpression({transpile, callee, argumentList});
  }

  // Regular function call
  const calleeExpression = wrapWithParantheses(
    callee.type === "FunctionExpression",
    transpile(callee)
  );
  return `${calleeExpression}(${argumentList})`;
};
