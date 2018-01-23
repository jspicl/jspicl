import { transpile } from "../transpile";
import { polyfillCallExpression } from "../polyfiller";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
export const CallExpression = ({ callee, arguments: args }, scope) => {
  const argumentList = transpile(args, { arraySeparator: ", " });

  // Is it a function inside an object?
  if (callee.object) {
    return polyfillCallExpression({ callee, argumentList });
  }

  // Regular function call
  return `${transpile(callee)}(${argumentList})`;
};
