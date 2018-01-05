import transpile from "../transpile";
import { mapToPolyfill } from "../polyfiller";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
export const CallExpression = ({ callee, arguments: args }) => {
  const argumentList = transpile(args, { arraySeparator: ", " });

  // Is it a function inside an object?
  if (callee.object) {
    const context = transpile(callee.object);
    const functionName = transpile(callee.property);

    return mapToPolyfill({ context, functionName, argumentList, general: true, array: true });
  }

  // Regular function call
  return `${transpile(callee)}(${argumentList})`;
};
