import transpile from "../transpile";
import polyfiller from "../polyfiller";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
export const CallExpression = ({ callee, arguments: args }) => {
  const argumentList = transpile(args, { arraySeparator: ", " });

  // Is it a function inside an object?
  if (callee.object) {
    const { name: objectName } = callee.object;
    const { name: functionName } = callee.property;

    return polyfiller({ objectName, functionName, argumentList, general: true, array: true });
  }

  // Regular function call
  return `${callee.name}(${argumentList})`;
};
