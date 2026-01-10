import {getPolyfilledCallExpression} from "../../polyfills/getPolyfilledCallExpression.js";
import {FunctionExpression} from "./functionExpression.js";
import {wrapWithParantheses} from "../../helpers/wrapWithParantheses.js";
import type {AstNodeVisitor} from "../../types.js";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
export const CallExpression: AstNodeVisitor = (
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
    callee.type === FunctionExpression.name,
    transpile(callee)
  );
  return `${calleeExpression}(${argumentList})`;
};
