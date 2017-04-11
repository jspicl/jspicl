import traverser from "../traverser";
import polyfiller from "../polyfiller";

// http://esprima.readthedocs.io/en/latest/syntax-tree-format.html#call-and-new-expressions
export const CallExpression = ({ callee, arguments: args }) => {
  let argumentList = traverser(args, { arraySeparator: ", " });

  if (callee.object) {
    const objectName = callee.object.name;
    const propertyName = callee.property.name;
    let objectCallName = `${objectName}.${propertyName}`;

    return polyfiller(objectCallName, argumentList, { general: true, array: true });
  }
  else {
    return `${callee.name}(${argumentList})`;
  }
};