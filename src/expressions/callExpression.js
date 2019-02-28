import { getPolyfilledCallExpression } from "polyfiller";
import { FunctionExpression } from "./functionExpression";
import { wrapWithParantheses } from "helpers";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
export const CallExpression = ({ callee, arguments: args }, { transpile }) => {
  const argumentList = transpile(args, { arraySeparator: ", " });

  // Is it a function inside an object?
  if (callee.object) {
    return getPolyfilledCallExpression({ transpile, callee, argumentList });
  }

  // Regular function call
  const calleeExpression = wrapWithParantheses(
    callee.type === FunctionExpression.name,
    transpile(callee)
  );
  return `${calleeExpression}(${argumentList})`;
};
